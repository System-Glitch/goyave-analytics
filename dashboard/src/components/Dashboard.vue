<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPerPage, getOverall, ByTime, ByURI } from '../supabase';

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

onMounted(refresh)
</script>

<template>
  <div>
    <button type="button" @click.prevent="refresh">Refresh</button>
  </div>
  <div>
    <table>
      <thead>
        <th>Page</th>
        <th>Count</th>
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
  <div>
    <table>
      <thead>
        <th>Time</th>
        <th>Count</th>
      </thead>
      <tbody>
        <tr v-for="time in overall">
          <td>{{ time.viewed_at.slice(0, 'yyyy-mm-dd'.length) }}</td>
          <td>{{ time.count }}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{{ overall.reduce((acc, v) => acc + v.count, 0) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  table {
    display: table;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid;
    text-align: left;
    padding: 0.5rem 1rem;
  }
</style>