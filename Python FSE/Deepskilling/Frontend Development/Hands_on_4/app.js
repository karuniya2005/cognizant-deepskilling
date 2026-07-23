// Local mock data array
const mockCourses = [
  { id: 1, name: "Data Structures", code: "CS101", credits: 4 },
  { id: 2, name: "Web Development", code: "WEB201", credits: 3 },
  { id: 3, name: "Database Systems", code: "DB301", credits: 3 }
];

// --- Task 1: Promises & async/await ---

// Fetch single user with Promise chaining
function fetchUserChain(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => res.json())
    .then(user => console.log('Promise Chain User Name:', user.name))
    .catch(err => console.error('Chain Error:', err));
}

// Fetch single user with async/await
async function fetchUserAsync(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();
    console.log('Async/Await User Name:', user.name);
  } catch (err) {
    console.error('Async Error:', err);
  }
}

// Simulate 1-second network delay to fetch local courses
function fetchAllCourses() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCourses), 1000);
  });
}

// Render delayed courses
async function loadCourses() {
  const loadingEl = document.getElementById('course-loading');
  const gridEl = document.querySelector('.course-grid');

  const courses = await fetchAllCourses();

  loadingEl.style.display = 'none';
  courses.forEach(c => {
    const card = document.createElement('article');
    card.className = 'course-card';
    card.innerHTML = `<h3>${c.code} - ${c.name}</h3><p>Credits: ${c.credits}</p>`;
    gridEl.appendChild(card);
  });
}

// Promise.all demo: fetch user 1 and user 2 simultaneously
async function fetchMultipleUsers() {
  const [user1Res, user2Res] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users/1'),
    fetch('https://jsonplaceholder.typicode.com/users/2')
  ]);
  const user1 = await user1Res.json();
  const user2 = await user2Res.json();
  console.log('Promise.all Users Loaded:', user1.name, 'AND', user2.name);
}


// --- Task 2: Fetch API with Error Handling ---

async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return await response.json();
}

async function loadNotifications(url = 'https://jsonplaceholder.typicode.com/posts?_limit=4') {
  const loadingEl = document.getElementById('notify-loading');
  const errorEl = document.getElementById('notify-error');
  const retryBtn = document.getElementById('retry-btn');
  const gridEl = document.getElementById('notifications-grid');

  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';
  retryBtn.style.display = 'none';
  gridEl.innerHTML = '';

  try {
    const posts = await apiFetch(url);
    loadingEl.style.display = 'none';

    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'notification-card';
      card.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
      gridEl.appendChild(card);
    });
  } catch (error) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    retryBtn.style.display = 'inline-block';
    errorEl.textContent = `Failed to load notifications: ${error.message}`;
  }
}


// --- Task 3: Axios Integration & Interceptors ---

// Axios Request Interceptor
axios.interceptors.request.use(config => {
  console.log(`[Axios Request] API call started: ${config.url}`);
  return config;
});

// Fetch posts belonging specifically to userId 1 using Axios
async function loadAxiosNotifications() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: { userId: 1 }
    });
    console.log('Axios Posts for User 1:', response.data.slice(0, 3));
  } catch (error) {
    console.error('Axios Error:', error);
  }
}

/* 
  FETCH vs AXIOS DIFFERENCES (Task 3 Comparison):
  1. JSON Parsing: Axios automatically parses JSON response; Fetch requires manual `.json()` parsing.
  2. Error Handling: Axios automatically rejects/throws errors on non-2xx HTTP status codes (e.g., 404, 500); Fetch only rejects on network failure and requires checking `response.ok`.
  3. Syntax & Features: Axios has built-in request interceptors, timeout support, and query params object support; Fetch requires manual URL string query construction and AbortController for timeouts.
*/


// --- Initializations ---
document.getElementById('retry-btn').addEventListener('click', () => {
  loadNotifications(); // Reload valid endpoint
});

// Run task executions
fetchUserChain(1);
fetchUserAsync(2);
fetchMultipleUsers();
loadCourses();
loadNotifications(); // Valid fetch test
loadAxiosNotifications();

// Uncomment line below to test error handling UI flow:
// loadNotifications('https://jsonplaceholder.typicode.com/nonexistent');