import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCoursesThunk, 
  selectCourses, 
  selectCoursesLoading, 
  selectCoursesError 
} from '../store/courseSlice';

export default function CoursesPage() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectCoursesLoading);
  const error = useSelector(selectCoursesError);

  useEffect(() => {
    dispatch(fetchCoursesThunk());
  }, [dispatch]);

  return (
    <div className="courses-page">
      <h2>Portal Courses (Centralised API & Redux Thunk)</h2>

      {loading && <p className="status">Loading courses via Redux Async Thunk...</p>}

      {error && (
        <div className="error-box">
          <p><strong>Error:</strong> {error}</p>
          <button type="button" onClick={() => dispatch(fetchCoursesThunk())}>
            Retry Request
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="course-grid">
          {courses.map((course) => (
            <article key={course.id} className="course-card">
              <h3>{course.code} - {course.name}</h3>
              <p>Credits: {course.credits}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}