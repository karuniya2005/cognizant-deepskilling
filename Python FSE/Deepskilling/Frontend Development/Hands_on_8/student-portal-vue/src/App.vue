<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div class="app">
    <Header />
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f6f9;
  color: #333;
}

.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>