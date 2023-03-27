<script>

import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import { supabase } from '../lib/supabaseClient'
import '../../src/style.css'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import { post, fetchData, calcLabels } from '../lib/fetch'

export default {
  components: {
    LineChart, BarChart, ClipLoader, BeatLoader
  },
  data() {
    return {
      fetchData: fetchData,
      calcLabels: calcLabels,
      data: null,
      labels: null,
      mounted: false,
      fetched: false,
      period: '1W',
      periods: [{ text: '1D', days: 1 }, { text: '1W', days: 7 }, { text: '1M', days: 30 }, { text: '1Y', days: 365 }, { text: 'ALL', days: 0 }]
    }
  },
  methods: {
    changePeriod(text) {
      this.period = text

    }
  },
  async mounted() {
    this.labels = this.calcLabels(this.periods[1].days)
    this.data = await this.fetchData('income', this.periods[1].days, this.labels)
    this.fetched = true;
    this.mounted = true;
  },
  computed: {
    // a computed getter
    kilometers() {
      // `this` points to the component instance
      return this.data?.reduce((a, b) => a + b.distance, 0).toFixed(2)
    },
    deliveries() {
      // `this` points to the component instance
      return this.data?.reduce((a, b) => a + b.deliveries, 0)
    },
    earnings() {
      // `this` points to the component instance

      return (this.data?.reduce((a, b) => a + b.earnings, 0) * 0.6).toFixed(2)
    },
    calories() {
      // `this` points to the component instance
      return this.data?.reduce((a, b) => a + b.distance * 32, 0).toFixed()
    }
  },
  watch: {
    period: async function (newVal) {
      this.fetched = false;
      let days = this.periods.find(obj => obj.text == newVal).days
      this.labels = this.calcLabels(days)
      this.data = await this.fetchData('income', days, this.labels)
      this.fetched = true;
    }
  }
}
</script>

<template>
  <div class="content">
    <div class="card challenge-card">
      <font-awesome-icon icon="fa-solid fa-trophy" class="card-icon" />
      <p>16 km left to Copenhagen</p>
      <div class="progress-group">
        <div class="progress-bar">
          <div class="progress">
          </div>
        </div>
        <p>227 / 301</p>
      </div>
    </div>

    <div class="chart-period">
      <p v-for="item in periods" :class="{ selected: period == item.text }" @click="changePeriod(item.text)">{{ item.text
      }}
      </p>
    </div>
    <div class="row">
      <div class="card">
        <font-awesome-icon icon="fa-solid fa-heart-pulse" class="card-icon red" />
        <p>Calories burned</p>
        <h4 v-if="fetched">{{ calories }}</h4>
        <BeatLoader class="loader" v-else color="#c8c8c8" size="8px" />
      </div>
      <div class="card">
        <font-awesome-icon icon="fa-solid fa-bag-shopping" class="card-icon green" />
        <p>Tasks delivered</p>
        <h4 v-if="fetched" class="">{{ deliveries }}</h4>
        <BeatLoader class="loader" v-else color="#c8c8c8" size="8px" />
      </div>
    </div>
    <div id="chart" class="card">
      <div class="chart-header">
        <h5>Earnings <font-awesome-icon icon="fa-solid fa-dollar-sign" class="black" /></h5>
        <h4 v-if="fetched" class="green" id="num">{{ earnings }} DKK</h4>
        <BeatLoader v-else class="loader" color="#38d070" size="8px" style="height: 2em;"/>
        <p class="dark-grey">(After tax)</p>
      </div>
      <BarChart v-if="fetched" :data="[data.map(item => item.earnings * 0.6), data.map(item => item.earnings * 0.4)]"
        :labels="period == 'ALL' ? data.map(item => item.date.slice(5, 10)) : labels.map(item => item.slice(5, 10))"
        color="green" />
      <div v-else class="loading">
        <ClipLoader color="#38d070" />
      </div>
    </div>
    <div id="chart" class="card">
      <div class="chart-header">
        <h5>Kilometers <font-awesome-icon icon="fa-solid fa-bicycle" class="" /></h5>
        <h4 class="blue">{{ kilometers }} KM</h4>
        <!-- <p class="dark-grey">(Average)</p> -->
      </div>

      <BarChart v-if="fetched" :data="[data.map(item => item.distance)]"
        :labels="period == 'ALL' ? data.map(item => item.date.slice(5, 10)) : labels.map(item => item.slice(5, 10))"
        color="blue" />
      <div v-else class="loading">
        <ClipLoader color="#48a7da" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  grid-template-rows: 100px fit-content(1em) 100px minmax(0, 1fr) minmax(0, 1fr) 60px;
}
</style>
