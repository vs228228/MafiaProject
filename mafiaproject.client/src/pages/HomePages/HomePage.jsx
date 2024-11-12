import React from 'react';
import MafiaPicture from '../../photo/person.png';
import './HomePage.css';
import Button from '../../shared/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HomePage = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleSignInClick = () => {
        navigate('/SignIn');
    };

    const handlePlayClick = () => {
        navigate('/LobbyWin');
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Вы действительно хотите выйти?');
        // toast.info("yes")
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            toast.success("Вы вышли из системы.");
            navigate('/SignIn');
        } else {
            toast.info("Вы остались в системе.");
        }
    };

    return (
        <div className='home_page'>
            <div className="emblem_page_text">
                <div className="page_mafia">
                    <img src={MafiaPicture} alt='mafia_picture' />
                    <div className="text_mafia">MAFIA</div>
                </div>
                <div className="buttons">
                    <Button text="Играть" colorClass="red" onClick={handlePlayClick} />
                    {isAuthenticated ? (
                        <Button text="Выйти" colorClass="white" onClick={handleLogout} />
                    ) : (
                        <Button text="Войти" colorClass="white" onClick={handleSignInClick} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
