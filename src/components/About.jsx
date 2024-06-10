import React from 'react';
import './css/About.css';
import react from '../images/react-icon.png';
import html from '../images/html.png';
import css from '../images/css.png';
import javascript from '../images/javascript.png';
import nodejs from '../images/nodejs.png';
import mongodb from '../images/mongodb.png';
import whiteN from '../images/white-nodejs.png';
import whiteMON from '../images/mongodb-white.png';
import figma from '../images/figma.png';
import canva from '../images/canva.png';

function About(props) {
  return (
    <div className='about-container'>
      <section className='left-sec'>
        <div className='f-grid'>
          <img src={react} alt="react" />
          <input type="range" name="react" id="react" value={75} draggable={false} title='75%' />
          <img src={html} alt="html" />
          <input type="range" name="html" id="html" value={90} draggable={false} title='90%' />
          <img src={css} alt="css" />
          <input type="range" name="css" id="css" value={90} draggable={false} title='90%' />
        </div>
        <div className='s-grid'>
          <img src={props.IsDarkMode ? nodejs : whiteN} alt="nodejs" />
          <input type="range" name="nodejs" id="node" value={70} draggable={false} title='70%' />
          <img src={javascript} alt="js" />
          <input type="range" name="js" id="js" value={80} draggable={false} title='80%' />
          <img src={props.IsDarkMode ? mongodb : whiteMON} alt="mongodb" />
          <input type="range" name="mongodb" id="mongodb" value={40} draggable={false} title='40%' />
        </div>
        <div className='l-grid'>
          <img src={figma} alt="figma" />
          <input type="range" name="figma" id="figma" value={86} draggable={false} title='86%' />
          <img src={canva} alt="canva" />
          <input type="range" name="canva" id="canva" value={90} draggable={false} title='90%' />
        </div>
      </section>
      <section className='right-sec'>
        <h1 className={!props.IsDarkMode ? 'whitep' : 'blackp'}>About Me</h1>
        <p className={!props.IsDarkMode ? 'whitep' : 'blackp'}>As an IT developer and graphic designer, I am passionate about bridging creativity with technical expertise to craft innovative solutions. I Illuminate in bringing ideas to life through code and design. My journey began with a deep fascination for technology, which led me to specialize in web development, where I excel in front-end design and user experience optimization. my proficiency in graphic design allows me to create captivating visuals that resonate with audiences and enhance digital experiences. With a commitment to continuous learning and a keep an eye for details. Let's collaborate to transform ideas into impactful realities.</p>
      </section>
    </div>
  );
}

export default About;
