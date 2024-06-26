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
    <div class="table">
      <span class="table-head">Page</span>
      <span class="table-head">Count</span>
      <template v-for="page in perPage">
        <span class="table-cell">{{ page.uri }}</span>
        <span class="table-cell">{{ page.count }}</span>
      </template>
      <span class="table-footer">Total</span>
      <span class="table-footer">{{ perPage.reduce((acc, v) => acc + v.count, 0) }}</span>
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
  .table {
    display: grid;
    max-height: 500px;
    grid-template-columns: auto minmax(0, min-content);
    grid-auto-rows: min-content;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: 2px solid #00a3cc;
    overflow: auto;
    background-color: white;
  }

  .table-head {
    position: sticky;
    background-color: #00a3cc;
    color: #ffffff;
    font-weight: bold;
    text-align: left;
    top: 0;
    left: 0;
  }

  .table-footer {
    position: sticky;
    bottom: 0;
    left: 0;
    background-color: white;
    font-weight: bold;
  }

  .table-head, .table-cell, .table-footer {
    text-align: left; 
    padding: 12px 15px;
  }

  .table-cell:not(:last-child):not(:nth-last-child(2)) {
    border-bottom: 1px solid #dddddd;
  }

  .table-footer {
    border-top-width: 1px solid #dddddd;
  }

  .table-head:nth-child(even), .table-cell:nth-child(even), .table-footer:nth-child(even) {
    text-align: right;
  }

  .table-cell:nth-child(4n+1), .table-cell:nth-child(4n+2) {
      background-color: #f3f3f3;
  }

  .chart-container {
    min-height: 500px;
    grid-column: span 2;
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
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: 1fr min-content;
    }

    .chart-container {
      grid-column: span 1;
    }
  }
</style>