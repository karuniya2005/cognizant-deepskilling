import React from 'react';

export default function CourseCard({ id, name, code, credits, grade, onEnroll }) {
  return (
    <article className="course-card">
      <h3>{code} - {name}</h3>
      <p>Grade: {grade}</p>
      <span>Credits: {credits}</span>
      <br />
      <button 
        type="button" 
        onClick={() => onEnroll({ id, name, code, credits, grade })}
        className="enroll-btn"
      >
        Enroll
      </button>
    </article>
  );
}