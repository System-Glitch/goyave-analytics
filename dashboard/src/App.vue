<script setup lang="ts">
import { Ref, inject, ref } from 'vue';
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
const authenticated = inject<Ref<boolean>>('authenticated', ref(false))
</script>

<template>
  <login v-if="!authenticated"/>
  <Dashboard v-else/>
</template>
