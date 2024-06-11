import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Img from './images/darkmode.png';
import Img2 from './images/lightmode.png';
import "@fontsource/kanit"; 
import "@fontsource/kanit/400.css"; 
import "@fontsource/kanit/400-italic.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        <header>
          <nav>
            <ul>
              <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
              <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            </ul>
          </nav>
          <div className='light-dark' onClick={toggleTheme}>
            <img src={isDarkMode ? Img2 : Img} alt="Toggle Theme" />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About IsDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<Contact IsDarkMode={isDarkMode} />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
