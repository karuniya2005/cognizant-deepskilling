import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialCourses } from '../data';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = initialCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h2>Available Courses</h2>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.code} - {course.name}</h3>
            <p>Credits: {course.credits}</p>
            <Link to={`/courses/${course.id}`} className="details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}