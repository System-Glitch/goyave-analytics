<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getPerPage, getOverall, ByTime, ByURI } from '../supabase'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const perPage = ref<ByURI[]>([])
const overall = ref<ByTime[]>([])

const refresh = () => {
  getPerPage().then(r => {
    perPage.value = r
  })
  getOverall().then(r => {
    overall.value = r
  })
}

const chartData = computed(() => {
  return {
    labels: overall.value.map(v => v.viewed_at.slice(0, 'yyyy-mm-dd'.length)),
    datasets: [{
      label: 'Overall page views',
      data: overall.value.map(v => v.count),
      backgroundColor: '#00aed8',
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

onMounted(refresh)
</script>

<template>
  <header>
    <span class="title">
      <img src="/goyave.svg" class="logo" alt="Logo" aria-hidden="true"/>
      Goyave analytics
    </span>
    <button class="button" type="button" @click.prevent="refresh">Refresh</button>
  </header>
  <div class="main-container">
    <div>
      <table>
        <thead>
          <tr>
            <th>Page</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in perPage">
            <td>{{ page.uri }}</td>
            <td>{{ page.count }}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{{ perPage.reduce((acc, v) => acc + v.count, 0) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart-container">
      <Bar
        id="overall-chart"
        :options="chartOptions"
        :data="chartData"
      />
  </div>
  </div>
</template>

<style scoped>
  table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
    width: 100%;
  }

  table thead tr {
    background-color: #00a3cc;
    color: #ffffff;
    text-align: left;
  }

  th, td {
    text-align: left; 
    padding: 12px 15px;
  }

  table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  table tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
  }

  table tbody tr:last-of-type {
      border-bottom: 2px solid #00a3cc;
  }

  .chart-container {
    min-height: 500px;
    grid-column: span 2 / span 2;
  }

  .main-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: minmax(0, 1fr);
    gap: 2rem;
    padding: 2rem;
  }

  @media (max-width: 1023px) {
    .main-container {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
</style>