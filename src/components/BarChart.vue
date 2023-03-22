<template>
  <div>
    <Bar id="line-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js'
import { CHART_COLORS } from './utils'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Filler, Title)



export default {
  name: 'BarChart',
  components: { Bar },
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
            ticks: {

            },
            grid: {
              color: '#dcdcdc',
              lineWidth: 1,
            }

          },
          x: {
            grid: {
              color: '#dcdcdc',
              lineWidth: 0,
            },
            ticks: {
              autoSkip: true,

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
          data: this.data,
          backgroundColor: CHART_COLORS.blue,
        }
        ]
      }
    },
  }
}
</script>
<style scoped></style>