import { courses } from './data.js';

let currentCourses = [...courses];

// --- Task 1: ES6+ Syntax Practice ---
// Array.map()
const formattedCourses = courses.map(({ code, name, credits }) => `${code} ${name} (${credits} credits)`);
console.log('Formatted Courses:', formattedCourses);

// Array.filter()
const highCreditCourses = courses.filter(course => course.credits >= 4);
console.log('Courses with >= 4 credits:', highCreditCourses.length);

// Array.reduce()
const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
console.log('Total Enrolled Credits:', totalCredits);


// --- Task 2: DOM Selection & Dynamic Rendering ---
const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.querySelector('#total-credits');
const searchInput = document.querySelector('#search-courses');
const sortBtn = document.querySelector('#sort-btn');
const selectedCourseBox = document.querySelector('#selected-course');

// Function to render course cards in the DOM
const renderCourses = (courseList) => {
  courseGrid.innerHTML = ''; // Clear container

  courseList.forEach(({ id, name, code, credits, grade }) => {
    const card = document.createElement('article');
    card.className = 'course-card';
    card.dataset.name = name;
    card.dataset.grade = grade;

    card.innerHTML = `
      <h3>${code} - ${name}</h3>
      <p>Grade: ${grade}</p>
      <span>Credits: ${credits}</span>
    `;

    courseGrid.appendChild(card);
  });

  // Calculate and update total credits dynamically
  const displayedTotal = courseList.reduce((acc, course) => acc + course.credits, 0);
  totalCreditsEl.textContent = `Total Credits Enrolled: ${displayedTotal}`;
};


// --- Task 3: Event Listeners & Interactivity ---

// Search Filter
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  currentCourses = courses.filter(course => 
    course.name.toLowerCase().includes(query) || course.code.toLowerCase().includes(query)
  );
  renderCourses(currentCourses);
});

// Sort by Credits (Descending)
sortBtn.addEventListener('click', () => {
  currentCourses.sort((a, b) => b.credits - a.credits);
  renderCourses(currentCourses);
});

// Event Delegation for Card Clicks
courseGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.course-card');
  if (!card) return;

  const { name, grade } = card.dataset;
  selectedCourseBox.textContent = `Selected Course: ${name} | Grade: ${grade}`;
});


// Initial Render
renderCourses(currentCourses);