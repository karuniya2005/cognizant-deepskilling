import apiClient from './apiClient';

export const getAllCourses = () => {
  return apiClient.get('/posts?_limit=5');
};

export const getCourseById = (id) => {
  return apiClient.get(`/posts/${id}`);
};

export const enrollStudent = (studentId, courseId) => {
  return apiClient.post('/posts', { studentId, courseId });
};