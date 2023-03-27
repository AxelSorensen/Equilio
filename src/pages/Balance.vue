<script>

import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import { supabase } from '../lib/supabaseClient'
import '../../src/style.css'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import { post, fetchData, calcLabels, calcBalance, calcAllLabels, fetchTransactions } from '../lib/fetch'

export default {
  components: {
    LineChart, BarChart, ClipLoader, BeatLoader
  },
  data() {
    return {
      post: post,
      fetchData: fetchData,
      calcLabels: calcLabels,
      calcBalance: calcBalance,
      calcAllLabels: calcAllLabels,
      fetchTransactions: fetchTransactions,
      modalOpen: false,
      modal: null,
      data: null,
      labels: null,
      transactions: [],
      post_data: { deliveries: null, distance: null, earnings: null, cost: null, category: 'Shopping', date: new Date(Date.now()).toISOString()},
      mounted: false,
      fetched: false,
      period: '1W',
      categories: [{ category: 'Shopping', icon: 'fa-cart-shopping' }, { category: 'Takeaway', icon: 'fa-utensils' }, { category: 'Party', icon: 'fa-wine-glass' }, { category: 'Other', icon: 'fa-question' }],
      periods: [{ text: '1W', days: 7 }, { text: '1M', days: 30 }, { text: '1Y', days: 365 }, { text: 'ALL', days: 0 }]
    }
  },
  methods: {
    changePeriod(text) {
      this.period = text;

    },
    changeCategory(id) {
      this.post_data.category = id

    },
    openModal(e) {
      if (e.target.textContent == 'Add income') {
        this.modal = 0;
      } else if (e.target.textContent == 'Add expense') {
        this.modal = 1;
      }
      this.modalOpen = !this.modalOpen
    },
    closeModal() {
      this.modalOpen = !this.modalOpen;
      this.post_data = { deliveries: null, distance: null, earnings: null, cost: null, category: 'Shopping', date: new Date(Date.now()).toISOString()}
    },
    async addIncome() {
      this.post('income', { date: this.post_data.date, deliveries: this.post_data.deliveries, distance: this.post_data.distance, earnings: this.post_data.earnings })
      this.closeModal()
      this.fetched = false;
      
      let days = this.periods.find(obj => obj.text == this.period).days
      if(days == 0) {
        this.labels = this.calcAllLabels(days).reverse()
      } else {
        this.labels = this.calcLabels(days)
      }
      this.data = await this.calcBalance(this.labels);
      this.transactions = await fetchTransactions(days);
      this.fetched = true;


    },
    async addExpense() {
      this.post('expense', { date: Date.now(), cost: this.post_data.cost, category: this.post_data.category })
      this.closeModal()
      this.fetched = false;
      
      let days = this.periods.find(obj => obj.text == this.period).days
      if(days == 0) {
        this.labels = this.calcAllLabels(days).reverse()
      } else {
        this.labels = this.calcLabels(days)
      }
      this.data = await this.calcBalance(this.labels);
      this.transactions = await fetchTransactions(days);
      this.fetched = true;

    }
  },
  async mounted() {
    this.labels = this.calcLabels(this.periods[0].days)
    this.data = await calcBalance(this.labels); 
    this.transactions = await fetchTransactions(this.periods[0].days);
    this.fetched = true;
    this.mounted = true;
  },
  computed: {
    income_filled() {
      return this.post_data.deliveries && this.post_data.distance && this.post_data.earnings
    },
    expense_filled() {
      return this.post_data.cost && this.post_data.category
    },
    balance() {
      if(this.data) {
        return this.data[this.data.length-1].balance.toFixed(2);
      }
    },
    days() {
      return this.periods.find(obj => obj.text == this.period).days
    }

  },
  watch: {
    period: async function (newVal) {
      this.fetched = false;
      
      let days = this.periods.find(obj => obj.text == newVal).days
      if(days == 0) {
        this.labels = this.calcAllLabels(days).reverse()
      } else {
        this.labels = this.calcLabels(days)
      }
      this.data = await this.calcBalance(this.labels);
      this.transactions = await fetchTransactions(days);
      this.fetched = true;
    }
  }
}
</script>

<template>
  <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal card">
      <div class="close" @click="closeModal"><font-awesome-icon icon="fa-solid fa-xmark" class="black" /></div>
      <h5 class="tc dark-grey">Metrics</h5>
      <div v-if="modal == 0" class="inputs">
        <div class="row">
          <label for="">Date</label>
          <input class="date" type="date" v-model="post_data
            .date.split('T')[0]">
        </div>
        <div class="row">
          <label for="">Deliveries</label>
          <input v-model="post_data
            .deliveries">
        </div>
        <div class="row">
          <label for="">Distance</label>
          <input v-model="post_data
            .distance">
        </div>
        <div class="row">
          <label for="">Earnings</label>
          <input v-model="post_data
            .earnings">
        </div>
      </div>
      <div v-else-if="modal == 1" class="inputs">
        <div class="row">
          <label for="">Date</label>
          <input class="date" type="date" v-model="post_data
            .date.split('T')[0]">
        </div>
        <div class="row">
          
          <label for="">Cost</label>
          <input v-model="post_data
            .cost">
        </div>

        <div class="column">
          <label class="tc">Category</label>
          <div class="categories">
            <font-awesome-icon :icon="'fa-solid ' + cat.icon" class="black" v-for="cat in categories" :id="cat.category"
              :class="{ selected: post_data.category == cat.category }" @click="changeCategory(cat.category)" />
          </div>


        </div>
      </div>
      <div v-if="modal == 0" :class="{ 'button primary': true, 'disabled': !income_filled }" @click="addIncome()">Add income
      </div>
      <div v-else="modal == 0" :class="{ 'button primary': true, 'disabled': !expense_filled }" @click="addExpense()">Add
        expense</div>
    </div>

  </div>
  <div class="content">

    <div id="chart" class="card">
      <div class="chart-header">
        <h5>Balance <font-awesome-icon icon="fa-solid fa-dollar-sign" class="black" /></h5>
        <h4 v-if="fetched" :class="{'green': balance > 0, 'red': balance < 0}" id="num">{{ balance }} DKK</h4>
        <BeatLoader v-else class="loader" color="#c8c8c8" size="8px" style="height: 2em;"/>
      </div>
      <LineChart v-if="fetched" :data="data.slice(-days).map(item => item.balance)"
        :labels="period == 'ALL' ? data.map(item => item.date.slice(5, 10)) : labels.map(item => item.slice(5, 10))" />
      <div v-else class="loading">
        <ClipLoader color="#c8c8c8" />
      </div>
    </div>
    <div class="chart-period">
      <p v-for="item in periods" :class="{ selected: period == item.text }" @click="changePeriod(item.text)">{{ item.text
      }}
      </p>
    </div>
    <div class="card">
      <div v-if="fetched" class="list">
        <div v-for="transaction in transactions?.slice().reverse()" class="list-item">
          <p>{{ transaction.category || 'Income' }}</p>
          <p class="dark-grey">{{ transaction.date?.slice(0,10) }}</p>
          <p :class="{'red': transaction.cost, 'green':transaction.earnings}">{{-transaction.cost?.toFixed(2) || (transaction.earnings * 0.6).toFixed(2) }} DKK</p>
        </div>
      </div>
      <div v-else class="loading">
        <ClipLoader color="#c8c8c8" />
      </div>
    </div>
    <div class="buttons">
      <div class="button primary" @click="openModal">Add income</div>
      <div class="button secondary" @click="openModal">Add expense</div>
    </div>
  </div>
</template>

<style scoped>
.card:has(.list) {
  padding: 0;

}


.row {
  justify-content: space-between;
  align-items: center;
}

.list-item {
  border: .5px solid rgb(224, 224, 224);
  height: 30px;

  padding: 16px;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  justify-content: space-between;
  align-items: center;
}

.list-item > *:nth-child(3) {
  text-align: right;
}

.list-item > *:nth-child(2) {
  text-align: center;
}

.list {
  overflow-y: scroll;

}

.content {

  grid-template-rows: max-content fit-content(1em) minmax(0, 1fr) 60px;

  height: calc(100vh - 60px - 16*2px);
}

.buttons {
  grid-row: 4;
  display: flex;
  justify-items: center;
  gap: 16px;
}

.button {

  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

}

.close {
  cursor: pointer;
  display: flex;
  background-color: rgb(213, 65, 65);
  position: absolute;
  height: 40px;
  width: 40px;
  right: 0px;
  border-radius: 0 5px 0 5px;


  justify-content: center;
  align-items: center;
  color: rgb(137, 17, 17);


}

.center {
  align-items: center;
  text-align: center;
}

.categories {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  border-radius: 25px;
  background-color: rgb(238, 238, 238);
  width: 100%;
}

.categories>* {
  display: grid;
  place-items: center;
  cursor: pointer;
  width: 12px;
  text-align: center;
  height: 12px;
  border-radius: 100%;
  font-size: .6em;
  padding: 12px;
}

.categories>*.selected {
  background-color: var(--black);
  color: white;
}

.modal {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1em 1fr 60px;
  margin: 16px;
  height: 50%;
  width: 100%;
  align-self: center;
  justify-content: space-between;
  gap: 16px;

}

.disabled {
  background-color: rgb(235, 235, 235);
  color: rgb(179, 179, 179);
  pointer-events: none;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;

}


.modal-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  background-color: rgb(0, 0, 0, 0.3);

}

.date {
  font-weight: 500;
  font-size: .8em;
}

input {
  font-weight: 700;
  text-align: center;
  height: 1em;
  width: 100px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: rgb(235, 235, 235);
  font-size: 1em;
  padding: 8px;
  color: rgb(30, 30, 30);
}</style>
