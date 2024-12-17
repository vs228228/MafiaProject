import React, { useState } from 'react';
import './AboutGame.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import gameRules from './GameRules.js';
import cardCitizen from '../../assets/photo/photoOfRoleInGame/card_citizen.png';
import cardDoctor from '../../assets/photo/photoOfRoleInGame/card_doctor.png';
import cardMafia from '../../assets/photo/photoOfRoleInGame/card_mafia.png';
import cardPolice from '../../assets/photo/photoOfRoleInGame/card_police.png';
import cardSpy from '../../assets/photo/photoOfRoleInGame/card_spy.png';
import cardBulletproof from '../../assets/photo/photoOfRoleInGame/card_bulletproof.png';
import { useTranslation } from 'react-i18next';

const AboutGame = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [animationClass, setAnimationClass] = useState('');
    const { t } = useTranslation();

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
                <div className="left_images">
                    <img src={cardCitizen} alt="Citizen Card" />
                    <img src={cardSpy} alt="Spy Card" />
                    <img src={cardDoctor} alt="Doctor Card" />
                </div>
                
                <div className="book_slider">
                    <div className="left_button" onClick={prevPage}>
                        <FaAngleLeft />
                    </div>
                    
                    <div className={`book_content ${animationClass}`}>
                        <p><i><b>{t(gameRules[currentPage].role)}</b></i></p>
                        <p>{t(gameRules[currentPage].content)}</p>
                        {gameRules[currentPage].content2 && <p>{t(gameRules[currentPage].content2)}</p>}
                        {gameRules[currentPage].content3 && <p>{t(gameRules[currentPage].content3)}</p>}
                        {gameRules[currentPage].content4 && <p>{t(gameRules[currentPage].content4)}</p>}
                        {gameRules[currentPage].content5 && <p>{t(gameRules[currentPage].content5)}</p>}
                    </div>
                    
                    <div className="right_button" onClick={nextPage}>
                        <FaAngleRight />
                    </div>
                </div>
                
                <div className="right_images">
                    <img src={cardMafia} alt="Mafia Card" />
                    <img src={cardBulletproof} alt="Bulletproof Card" />
                    <img src={cardPolice} alt="Police Card" />
                </div>
            </div>
        </div>
    );
};

export default AboutGame;
