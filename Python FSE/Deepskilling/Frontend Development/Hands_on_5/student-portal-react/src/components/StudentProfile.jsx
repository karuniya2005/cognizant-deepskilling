import React, { useState } from 'react';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: 'Student 1',
    email: 'student1@gmail.com',
    semester: '6'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="profile-section">
      <h2>Student Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Name: </label>
          <input 
            type="text" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={profile.email} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Semester: </label>
          <input 
            type="number" 
            name="semester" 
            value={profile.semester} 
            onChange={handleChange} 
          />
        </div>
      </form>
    </section>
  );
}