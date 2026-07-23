<script setup>
import { ref, computed, onMounted } from 'vue';
import CourseCard from '../components/CourseCard.vue';

const courses = ref([]);
const searchTerm = ref('');

onMounted(() => {
  // Initialize mock course data on mount
  courses.value = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, grade: 'A' },
    { id: 2, name: 'Web Development', code: 'WEB201', credits: 3, grade: 'A-' },
    { id: 3, name: 'Database Systems', code: 'DB301', credits: 3, grade: 'B+' },
    { id: 4, name: 'Algorithms', code: 'ALG401', credits: 4, grade: 'A' },
    { id: 5, name: 'Software Engineering', code: 'SE202', credits: 3, grade: 'B' }
  ];
});

// Computed property for real-time reactive filtering
const filteredCourses = computed(() => {
  return courses.value.filter(course =>
    course.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<template>
  <div class="courses-view">
    <h2>Available Courses</h2>
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search courses..."
      class="search-input"
    />

    <div class="course-grid">
      <CourseCard
        v-for="course in filteredCourses"
        :key="course.id"
        v-bind="course"
      />
    </div>
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>