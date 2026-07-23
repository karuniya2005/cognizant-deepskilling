import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CoursesPage from './pages/CoursesPage';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <CoursesPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
