<template>
  <div>
    <Line id="line-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { CHART_COLORS } from './utils'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Filler, Title)



export default {
  name: 'BarChart',
  components: { Line },
  props: {
    data: Array,
    labels: Array
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
        hover: {mode: null},
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },

        scales: {

          y: {
            display: false,
            min: -Math.max(Math.max(...this.data, Math.abs(Math.min(...this.data)))) - 100,
            max: Math.max(Math.max(...this.data, Math.abs(Math.min(...this.data)))) + 100,
            ticks: {
              display: false
            },
            grid: {
              color: '#dcdcdc',
              lineWidth: 0,
            }

          },
          x: {
            grid: {
              color: '#dcdcdc',

            },
            ticks: {
              autoSkip: true,
              // maxTicksLimit: 7
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
          tension: .4,
          data: this.data,
          fill: {
            target: 'origin',
            above: CHART_COLORS.green,   // Area will be red above the origin
            below: CHART_COLORS.red    // And blue below the origin
          },
          color: {
            target: 'origin',
            above: CHART_COLORS.green,   // Area will be red above the origin
            below: CHART_COLORS.red    // And blue below the origin
          }
        }
        ]
      }
    },
  }
}
</script>
<style scoped></style>