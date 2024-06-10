
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
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
    var MyImg =Img;
    var MyImg2 = Img2;

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        <header>
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          <div className='light-dark'>
          <img src={!isDarkMode ? MyImg : MyImg2} onClick={toggleTheme} />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About IsDarkMode={isDarkMode}/>} />
            <Route path="/contact" element={<Contact IsDarkmode={isDarkMode}/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
