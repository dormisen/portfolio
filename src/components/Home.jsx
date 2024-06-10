import React from 'react';
import './css/Home.css';
import Avatarlight from '../images/Rectangle.png';

function Home() {
  return (
    <div className="home-container">
      <section className='Mainbody'>
        <div className='leftSide'>
          <h1 className='hi'>HI!</h1>
          <h1 className='name'>I am RIDA<br /><span>Aitiquen</span></h1>
          <h4 className='description'>I'm A Junior Full-Stack Devloper && <br />A Graphic Designer </h4>
        </div>
        <div className='rightSide'>
          <img src={Avatarlight} alt="Avatar" />
        </div>
      </section>
    </div>
  );
}

export default Home;
