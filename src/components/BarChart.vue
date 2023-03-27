<template>
  <div>
    <Bar :key="labels" id="line-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import 'chartjs-adapter-moment';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, TimeScale } from 'chart.js'
import { CHART_COLORS } from '../lib/utils'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Filler, Title, TimeScale)



export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    data: Array,
    labels: Array,
    color: String,
  },
  data() {
    return {
      chartOptions: {
        plugins: {
          filler: {
            propagate: true
          },
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },


        },
        hover: { mode: null },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {

          y: {
            stacked: true,
            grid: {
              color: '#dcdcdc',
              lineWidth: 1,
            }

          },
          x: {
            stacked: true,
            grid: {
              color: '#dcdcdc',
              lineWidth: 0,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 7
            }

          },


        }
      }
    }
  },
  computed: {
    chartData() {
      return {


        labels: this.labels,
        datasets: [{
          backgroundColor: 'black',
          pointRadius: 0,
          borderWidth: 0,
          data: this.data[0],
          stack: 'Stack 0',
          backgroundColor: CHART_COLORS[this.color],
        }, { data: this.data[1] || null, backgroundColor: CHART_COLORS.red, stack: 'Stack 0', }
        ]
      }
    },
  }
}
</script>
<style scoped>
canvas {
  height: 200px !important;
}
</style>