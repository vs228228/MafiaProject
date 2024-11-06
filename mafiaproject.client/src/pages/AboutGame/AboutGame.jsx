import React, { useState } from 'react';
import './AboutGame.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import gameRules from './GameRules.js';
import cardCitizen from '../../photo/photoOfRoleInGame/card_citizen.png';
import cardDoctor from '../../photo/photoOfRoleInGame/card_doctor.png';
import cardMafia from '../../photo/photoOfRoleInGame/card_mafia.png';
import cardPolice from '../../photo/photoOfRoleInGame/card_police.png';
import cardSpy from '../../photo/photoOfRoleInGame/card_spy.png';
import cardBulletproof from '../../photo/photoOfRoleInGame/card_bulletproof.png';

const AboutGame = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const nextPage = () => {
    if (currentPage < gameRules.length - 1) {
      setAnimationClass('slide-out-left');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setAnimationClass('slide-in-right');
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setAnimationClass('slide-out-right');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setAnimationClass('slide-in-left');
      }, 400);
    }
  };

  return (
    <div className='page_about_game'>
      <div className="image_container">
        {/* Две картинки слева */}
        <div className="left_images">
          <img src={cardCitizen} alt="Citizen Card" />
          <img src={cardSpy} alt="Spy Card" />
          <img src={cardDoctor} alt="Doctor Card" />
        </div>
        
        {/* Слайдер */}
        <div className="book_slider">
          <div className="left_button" onClick={prevPage}>
            <FaAngleLeft />
          </div>
          
          <div className={`book_content ${animationClass}`}>
            <p><i><b>{gameRules[currentPage].role}</b></i></p>
            <p>{gameRules[currentPage].content}</p>
            <p>
              {gameRules[currentPage].content2}<br/><br/>
              {gameRules[currentPage].content3}<br/><br/>
              {gameRules[currentPage].content4}<br/><br/>
              {gameRules[currentPage].content5}
            </p>
          </div>
          
          <div className="right_button" onClick={nextPage}>
            <FaAngleRight />
          </div>
        </div>
        
        {/* Три картинки справа */}
        <div className="right_images">
          <img src={cardMafia} alt="Mafia Card" />
          <img src={cardBulletproof} alt="Doctor Card" />
          <img src={cardPolice} alt="Police Card" />
          
        </div>
      </div>
    </div>
  );
};

export default AboutGame;