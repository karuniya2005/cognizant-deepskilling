<script setup>
import { RouterLink } from 'vue-router';
import { useEnrollmentStore } from '../stores/enrollment';

const enrollmentStore = useEnrollmentStore();
</script>

<template>
  <header class="header">
    <h1>Student Portal</h1>
    <nav>
      <RouterLink to="/courses">Courses</RouterLink>
      <RouterLink to="/profile">Profile ({{ enrollmentStore.enrolledCourses.length }})</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: 1.5rem;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

a.router-link-active {
  color: #38bdf8;
}
</style>