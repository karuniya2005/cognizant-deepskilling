import { createRouter, createWebHistory } from 'vue-router';
import CoursesView from '../views/CoursesView.vue';
import CourseDetailView from '../views/CourseDetailView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/courses' },
    { path: '/courses', name: 'courses', component: CoursesView },
    { path: '/courses/:id', name: 'course-detail', component: CourseDetailView },
    { path: '/profile', name: 'profile', component: ProfileView }
  ]
});

// Global Navigation Guard
router.beforeEach((to, from) => {
  console.log(`Navigating to: ${to.path}`);
});

export default router;