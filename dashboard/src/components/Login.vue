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
  <header>
    <span class="title">
      <img src="/goyave.svg" class="logo" alt="Logo" aria-hidden="true"/>
      Goyave analytics
    </span>
  </header>
  <div class="main-container">
    <form @submit.prevent="submit">
      <input name="email" type="email" placeholder="Email" v-model="email"/>
      <input name="password" type="password" placeholder="Password" v-model="password"/>
      <div class="right">
        <input type="submit" value="Login" class="button" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.main-container {
    padding: 2rem;
}

.main-container form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  max-width: 200px;
  background-color: white;
  padding: 1.5rem 2rem 1rem 2rem;
  border-radius: 2rem;

}

.right {
  display: flex;
  justify-content: right;
}

input[type=email], input[type=text], input[type=password] {
  appearance: none;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
}
</style>