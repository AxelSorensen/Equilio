import { supabase } from './supabaseClient'

export const post = async (table, data) => {
  await supabase
    .from(table)
    .insert(data)
}

export const fetchTransactions = async (n) => {
  const income_data = await fetchAllData('income');
  const expense_data = await fetchAllData('expense');
  let transactions = income_data.concat(expense_data);
  if(n != 0) {
    transactions = transactions.filter(obj => new Date(obj.date) > new Date(Date.now() - (n - 1) * 24 * 60 * 60 * 1000));
  }
  
  transactions.sort(function (a, b) { return new Date(a.date) - new Date(b.date)});
  return transactions;
}

export const fetchData = async (table, n, labels, padding = true) => {
  let { data, error } = await supabase
    .from(table) //table name
    .select("*") //columns to select from the database
    .gte('date', `${n == 0 ? new Date('2023-03-01').toISOString() : new Date(Date.now() - (n - 1) * 24 * 60 * 60 * 1000).toISOString()}`).order('date', { ascending: true });
  if (error) {
    console.log(error)
    return
  }
  if (padding && n != 0) {
    let dates = data.map(item => item.date.slice(0, 10));
    data = labels.map(item => {
      let i = dates.indexOf(item);
      if (i > -1) {
        return data[i]
      }
      return { earnings: 0, distance: 0, deliveries: 0, balance: 0, cost: 0 }
    })
  }
  data.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });

  return data;
}

export const fetchAllData = async (table) => {
  let { data, error } = await supabase
    .from(table) //table name
    .select("*") //columns to select from the database
    .order('date', { ascending: true });
  if (error) {
    console.log(error)
    return
  }
  data.sort(function (a, b) { return new Date(a.date) - new Date(b.date)});
  return data;
}

export const calcLabels = (n) => {
  let dates = [];
  for (let i = n - 1; i >= 0; i--) {
    dates.push(new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10))
  }
  return dates;
}

export const calcAllLabels = () => {
  const currentDate = new Date();
  const marchFirst = new Date(currentDate.getFullYear(), 2, 1); // month is zero-indexed, so 2 represents March

  const datesArray = [];

  while (currentDate >= marchFirst) {
    datesArray.push(new Date(currentDate).toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return datesArray;
}



export const calcBalance = async (labels) => {
  const income_data = await fetchAllData('income');
  const expense_data = await fetchAllData('expense');
  const allLabels = calcAllLabels();
  let income = allLabels.map(label => {
    const filteredObjects = income_data.filter(obj => obj.date.slice(0, 10) === label);
    const total = filteredObjects.reduce((acc, obj) => acc + obj.earnings * 0.6, 0);
    return { date: label, earnings: total };
  });
  
  let expense = allLabels.map(label => {
    const filteredObjects = expense_data.filter(obj => obj.date.slice(0, 10) === label);
    const total = filteredObjects.reduce((acc, obj) => acc + obj.cost, 0);
    return { date: label, cost: total };
  });

  income = [...income].reverse();
  expense = [...expense].reverse();

  let balance = [...allLabels].reverse().map((label, index) => {
    const sumOfA = income.slice(0, index+1).reduce((acc, obj) => acc + obj.earnings, 0);
    const sumOfB = expense.slice(0, index+1).reduce((acc, obj) => acc + obj.cost, 0);
    return {date: label, balance: sumOfA - sumOfB}
  });

  let dates = balance.map(item => item.date.slice(0, 10));
  balance = labels.map(item => {
    let i = dates.indexOf(item);
    if (i > -1) {
      return balance[i]
    }
    return { earnings: 0, distance: 0, deliveries: 0, balance: 0, cost: 0 }
  })

  return balance;
}