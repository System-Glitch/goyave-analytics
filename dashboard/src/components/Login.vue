<script setup lang="ts">
import { ref, inject, Ref } from 'vue';
import { login } from '../supabase';

const authenticated = inject<Ref<boolean>>('authenticated', ref(false))
const email = ref('')
const password = ref('')

const submit = () => {
  login(email.value, password.value).then(() => {
    authenticated.value = true
  }).catch(() => {
    authenticated.value = false
  })
  return false
}
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <input name="email" type="email" placeholder="Email" v-model="email"/>
      <input name="password" type="password" placeholder="Password" v-model="password"/>
      <input type="submit" value="Login" />
    </form>
  </div>
</template>