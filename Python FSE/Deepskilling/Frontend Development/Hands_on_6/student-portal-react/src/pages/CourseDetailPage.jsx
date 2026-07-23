import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enroll } from '../store/enrollmentSlice';
import { initialCourses } from '../data';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const course = initialCourses.find(c => c.id === parseInt(courseId));

  if (!course) {
    return <div className="page"><h2>Course not found!</h2></div>;
  }

  const handleEnroll = () => {
    dispatch(enroll(course));
    navigate('/profile'); // Redirect to profile page after enrolling
  };

  return (
    <div className="page">
      <h2>{course.code} - {course.name}</h2>
      <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Grade:</strong> {course.grade}</p>
      <button type="button" onClick={handleEnroll} className="enroll-btn">
        Enroll Now
      </button>
    </div>
  );
}