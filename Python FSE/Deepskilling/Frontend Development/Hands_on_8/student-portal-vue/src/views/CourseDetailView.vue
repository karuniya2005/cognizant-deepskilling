<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useEnrollmentStore } from '../stores/enrollment';

const route = useRoute();
const router = useRouter();
const enrollmentStore = useEnrollmentStore();

// Mock course lookup
const courseId = parseInt(route.params.id);
const mockCourses = [
  { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, grade: 'A' },
  { id: 2, name: 'Web Development', code: 'WEB201', credits: 3, grade: 'A-' },
  { id: 3, name: 'Database Systems', code: 'DB301', credits: 3, grade: 'B+' },
  { id: 4, name: 'Algorithms', code: 'ALG401', credits: 4, grade: 'A' },
  { id: 5, name: 'Software Engineering', code: 'SE202', credits: 3, grade: 'B' }
];

const course = mockCourses.find(c => c.id === courseId);

const handleEnroll = () => {
  if (course) {
    enrollmentStore.enroll(course);
    // Redirect to profile view programmatically
    router.push('/profile');
  }
};
</script>

<template>
  <div class="detail-view" v-if="course">
    <h2>{{ course.code }} - {{ course.name }}</h2>
    <p><strong>Credits:</strong> {{ course.credits }}</p>
    <p><strong>Grade:</strong> {{ course.grade }}</p>
    <button type="button" @click="handleEnroll" class="enroll-btn">Enroll Course</button>
  </div>
  <div v-else>
    <h2>Course Not Found</h2>
  </div>
</template>

<style scoped>
.enroll-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.enroll-btn:hover {
  background-color: #1d4ed8;
}
</style>