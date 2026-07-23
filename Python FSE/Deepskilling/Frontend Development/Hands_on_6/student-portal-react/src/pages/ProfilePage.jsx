import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unenroll } from '../store/enrollmentSlice';

export default function ProfilePage() {
  const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses);
  const dispatch = useDispatch();

  return (
    <div className="page">
      <h2>Student Profile</h2>
      <h3>Enrolled Courses ({enrolledCourses.length})</h3>

      {enrolledCourses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <ul className="enrolled-list">
          {enrolledCourses.map((course) => (
            <li key={course.id} className="enrolled-item">
              <span>{course.code} - {course.name} ({course.credits} Credits)</span>
              <button 
                type="button" 
                onClick={() => dispatch(unenroll(course.id))}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}