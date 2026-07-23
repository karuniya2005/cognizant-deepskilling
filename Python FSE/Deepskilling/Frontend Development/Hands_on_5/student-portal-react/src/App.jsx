import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseCard from './components/CourseCard';
import StudentProfile from './components/StudentProfile';
import { initialCourses } from './data';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // --- Task 3: Fetch Data via useEffect on Mount ---
  useEffect(() => {
    // Simulating API call to fetch courses
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((posts) => {
        // Map API posts to course shape, using initial local courses as reference
        const mappedCourses = posts.map((post, index) => ({
          id: post.id,
          name: initialCourses[index]?.name || post.title.slice(0, 15),
          code: initialCourses[index]?.code || `CS10${post.id}`,
          credits: initialCourses[index]?.credits || 3,
          grade: initialCourses[index]?.grade || 'A'
        }));
        setCourses(mappedCourses);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array: runs once on component mount

  // --- Task 3: Effect monitoring course updates ---
  useEffect(() => {
    /* 
      DEPENDENCY ARRAY EXPLANATION:
      Including 'courses' in the array tells React to run this effect ONLY when the 'courses' state variable updates. 
      If omitted, the effect runs after EVERY render, which could cause infinite re-render loops if state changes occur inside it.
    */
    if (courses.length > 0) {
      console.log('Courses state updated:', courses);
    }
  }, [courses]);

  // Handle enrolling into a course (Lifting State Up)
  const handleEnroll = (courseToEnroll) => {
    if (!enrolledCourses.some(c => c.id === courseToEnroll.id)) {
      setEnrolledCourses(prev => [...prev, courseToEnroll]);
    }
  };

  // Filter courses based on user search term
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header siteName="Student Portal" enrolledCount={enrolledCourses.length} />

      <main className="container">
        <StudentProfile />

        <hr />

        <section className="courses-section">
          <h2>Available Courses</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {/* Conditional Rendering */}
          {loading && <p className="status-msg">Loading courses from API...</p>}
          {error && <p className="error-msg">Error: {error}</p>}

          {!loading && !error && (
            <div className="course-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}