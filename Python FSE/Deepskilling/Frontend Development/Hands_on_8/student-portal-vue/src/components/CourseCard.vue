<script setup>
defineProps({
  id: Number,
  name: String,
  code: String,
  credits: Number,
  grade: String
});
</script>

<template>
  <article class="course-card">
    <h3>{{ code }} - {{ name }}</h3>
    <p>Grade: {{ grade }}</p>
    <span>Credits: {{ credits }}</span>
    <br />
    <RouterLink :to="`/courses/${id}`" class="details-btn">View Details</RouterLink>
  </article>
</template>

<style scoped>
.course-card {
  background-color: #ffffff;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.course-card h3 {
  color: #1e293b;
  margin-bottom: 0.4rem;
}

.details-btn {
  display: inline-block;
  margin-top: 0.8rem;
  padding: 0.4rem 0.8rem;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
}

.details-btn:hover {
  background-color: #1d4ed8;
}
</style>