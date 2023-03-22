<script>

import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import { supabase } from '../lib/supabaseClient'
import '../../src/style.css'



export default {
  components: {
    LineChart, BarChart
  },
  data() {
    return {
      data: null,
      labels: [],
      mounted: false,
      chart1period: '1W',
      chart2period: '1W',
      periods: ['1D','1W','1M','1Y']
    }
  },
  methods: {
    changeChart1Period(e) {
      this.chart1period = e.target.textContent;
    },
    changeChart2Period(e) {
      this.chart2period = e.target.textContent;
    },
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
    <div class="row">
      <div class="card">
        <font-awesome-icon icon="fa-solid fa-heart-pulse" class="card-icon red" />
        <p>Calories burned</p>
        <h4>255</h4>
      </div>
      <div class="card">
        <font-awesome-icon icon="fa-solid fa-bag-shopping" class="card-icon green" />
        <p>Tasks delivered</p>
        <h4 class="">36</h4>
      </div>
    </div>
    <div id="chart" class="card">
      <div class="chart-header">
        <h5>Balance <font-awesome-icon icon="fa-solid fa-dollar-sign" class="black"/></h5>
      <h4 class="green" id="num">202.00 DKK</h4>
      </div>
      <LineChart v-if="mounted" :data="[100,-50,100,30,50,10,100,-50]" :labels="[1,2,3,4,5,6,7,8]"/>
      <div class="chart-period">
        <p v-for="period,index in periods" :class="{selected: chart1period == period}" @click="changeChart1Period($event)">{{ period }}</p>
      </div>
    </div>
    <div id="chart" class="card">
      <div class="chart-header">
        <h5>Kilometers <font-awesome-icon icon="fa-solid fa-bicycle" class=""/></h5>
      <h4 class="blue">192 KM</h4>
      </div>
      <BarChart v-if="mounted" :data="[100,50,100,30,50,10,100,50]" :labels="[1,2,3,4,5,6,7,8]"/>
      <div class="chart-period">
        <p v-for="period,index in periods" :class="{selected: chart2period == period}" @click="changeChart2Period($event)">{{ period }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  grid-template-rows: 100px 100px minmax(0, 1fr)  minmax(0, 1fr) 60px;
}
</style>