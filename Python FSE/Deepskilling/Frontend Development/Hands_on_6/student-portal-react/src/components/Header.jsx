import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses);

  return (
    <header className="header">
      <h1>Student Portal</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/profile">Profile ({enrolledCourses.length})</Link>
      </nav>
    </header>
  );
}