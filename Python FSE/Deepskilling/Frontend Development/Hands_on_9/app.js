const courses = [
  { id: 1, name: "Data Structures", code: "CS101", credits: 4 },
  { id: 2, name: "Web Development", code: "WEB201", credits: 3 },
  { id: 3, name: "Database Systems", code: "DB301", credits: 3 },
  { id: 4, name: "Algorithms", code: "ALG401", credits: 4 },
  { id: 5, name: "Software Engineering", code: "SE202", credits: 3 }
];

const courseGrid = document.getElementById('course-grid');
const searchInput = document.getElementById('course-search');
const searchStatus = document.getElementById('search-status');

// Render Cards with Accessibility attributes
function renderCourses(list) {
  courseGrid.innerHTML = '';

  list.forEach(course => {
    const card = document.createElement('article');
    card.className = 'course-card';
    
    // Task 2: Make cards keyboard navigatable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${course.code} ${course.name}, ${course.credits} credits. Press enter to select.`);

    card.innerHTML = `
      <h3>${course.code} - ${course.name}</h3>
      <p>Credits: ${course.credits}</p>
    `;

    // Click handler
    card.addEventListener('click', () => alertSelectedCourse(course.name));

    // Task 2: Keyboard Enter / Space key press handling
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        alertSelectedCourse(course.name);
      }
    });

    courseGrid.appendChild(card);
  });

  // Task 2: Update ARIA live region for screen readers
  searchStatus.textContent = `${list.length} course${list.length === 1 ? '' : 's'} available.`;
}

function alertSelectedCourse(name) {
  alert(`Course selected: ${name}`);
}

// Search Filter with Screen Reader Announcements
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = courses.filter(c => 
    c.name.toLowerCase().includes(query) || c.code.toLowerCase().includes(query)
  );
  renderCourses(filtered);
});

// Initial Render
renderCourses(courses);