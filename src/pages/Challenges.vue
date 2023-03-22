<script>

import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import { supabase } from '../lib/supabaseClient'
import '../style.css'


export default {
  components: {
    LineChart, BarChart
  },
  data() {
    return {
      data: null,
      labels: [],
      mounted: false,
    }
  },
  methods: {
    async addIncome() {
      const { data, error } = await supabase
        .from('Balance')
        .insert([
          { amount: 300 },
        ])
      this.fetchData()
    },
    async fetchData() {
      supabase.from('Balance').select().then(({ data, error }) => {
        if (error) {
          console.log(error)
          return
        }
        this.data = data.map(item => item.amount);
        this.labels = data.map(item => item.date.slice(5, 10))
        this.labels.sort(function (a, b) { return new Date(a) - new Date(b) });
      })
    }
  },
  async mounted() {
    this.fetchData()
    this.mounted = true;
  }
}
</script>

<template>
  <div class="content">
    <div class="card-list">
      <h5>Current challenges</h5>

      <div v-for="i in 1" class="card">
        <div class="row">
          <font-awesome-icon icon="fa-solid fa-trophy" class="ch-icon dark-grey" />
          <p>248 km left to Rome</p>
          <div class="progress-group">
            <div class="progress-bar">
              <div class="progress">
              </div>
            </div>
            <p>301 / 301</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-list">
      <h5>Finished challenges</h5>

      <div v-for="i in 2" class="card">
        <div class="row">
          <font-awesome-icon icon="fa-solid fa-trophy" class="ch-icon gold" />
          <p>You have biked to XXXXXX</p>
          <div class="progress-group">
            <div class="progress-bar">
              <div class="progress done">
              </div>
            </div>
            <p>301 / 301</p>
          </div>
        </div>

      </div>
    </div>
    <div>
      <font-awesome-icon icon="fa-solid fa-plus" class="add" />
    </div>

  </div>
</template>

<style scoped>
.content {
  grid-template-rows: fit-content(1fr) fit-content(1fr) fit-content();
  text-align: center;
}

/* hr {
  margin: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  align-self: center;

} */

.content h5 {

  color: rgb(100, 100, 100);
}

.row {
  align-items: center;

}

.row>p {
  flex: 1;
  text-align: left;
}

.ch-icon {
  flex: 0;
  font-size: 2em;
}

.done {
  width: 100%;
  background-color: rgb(56, 208, 112);
}

.card {
  height: 50px;
  justify-content: center;
}

.add {
  margin-top: 16px;
  background-color: rgb(255, 255, 255);
  width: 1em;
  height: 1em;
  padding: 1em;
  color: rgb(30, 30, 30);
  border-radius: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);

}


</style>