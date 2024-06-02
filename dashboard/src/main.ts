import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'

const authenticated = ref(false)

createApp(App).provide('authenticated', authenticated).mount('#app')
