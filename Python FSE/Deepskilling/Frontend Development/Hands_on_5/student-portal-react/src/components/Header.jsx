import React from 'react';

export default function Header({ siteName, enrolledCount }) {
  return (
    <header className="header">
      <h1>{siteName}</h1>
      <nav>
        <span>Enrolled Courses: <strong>{enrolledCount}</strong></span>
      </nav>
    </header>
  );
}