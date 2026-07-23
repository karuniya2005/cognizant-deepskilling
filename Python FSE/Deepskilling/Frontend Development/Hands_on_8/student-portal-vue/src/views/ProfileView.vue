<script setup>
import { useEnrollmentStore } from '../stores/enrollment';

const enrollmentStore = useEnrollmentStore();
</script>

<template>
  <div class="profile-view">
    <h2>Student Profile</h2>
    <h3>Enrolled Courses Summary</h3>
    
    <p><strong>Total Enrolled Credits:</strong> {{ enrollmentStore.totalCredits }}</p>

    <div v-if="enrollmentStore.enrolledCourses.length === 0">
      <p>No courses currently enrolled.</p>
    </div>

    <ul v-else class="enrolled-list">
      <li v-for="course in enrollmentStore.enrolledCourses" :key="course.id" class="enrolled-item">
        <span>{{ course.code }} - {{ course.name }} ({{ course.credits }} Credits)</span>
        <button type="button" @click="enrollmentStore.unenroll(course.id)" class="remove-btn">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.enrolled-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.enrolled-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.remove-btn {
  padding: 0.3rem 0.6rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>