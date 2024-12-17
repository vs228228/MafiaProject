import React from 'react';
import MafiaPicture from '../../assets/photo/person.png';
import './HomePage.css';
import Button from '../../shared/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import LogOutLogic from '../../servicesLogic/LogOutLogic/LogOutLogic.jsx';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';


const HomePage = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!Cookies.get('token');
    const { t } = useTranslation();

    const handleSignInClick = () => {
        navigate('/SignIn');
    };
    
    const handlePlayClick = () => {
        navigate('/LobbyWindow');
    };
    const { handleLogout } = LogOutLogic();

    return (
        <div className='home_page'>
            <div className="emblem_page_text">
                <div className="page_mafia">
                    <img src={MafiaPicture} alt='mafia_picture' />
                    <div className="text_mafia">MAFIA</div>
                </div>
                <div className="buttons">
                    <Button text={t('stateLobby.play')} colorClass="red" onClick={handlePlayClick} />
                    {isAuthenticated ? (
                        <Button text={t('logout')} colorClass="white" onClick={handleLogout} />
                    ) : (
                        <Button text={t('login')} colorClass="white" onClick={handleSignInClick} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
