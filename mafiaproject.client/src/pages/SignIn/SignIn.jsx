import React, { useState } from 'react';
import './SignIn.css';
import Button from '../../shared/Button/Button';
import { FaArrowLeftLong } from "react-icons/fa6";
import ForgotPasswordForm from '../../components/Authentication/ForgotPasswordForm';
import RegisterForm from '../../components/Authentication/RegisterForm';
import LoginForm from '../../components/Authentication/LoginForm';
import UserService from '../../services/UserService';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignIn = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [forgetPasswordMode, setForgetPasswordMode] = useState(false);
    const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    
    const handleRegisterClick = () => {
        setIsRegistering(true);
        setForgetPasswordMode(false);
        setUsername('');
        setEmail('');
        setPassword('');
        setSiteRulesAccepted(false);
        setPrivacyPolicyAccepted(false);
    };

    const handleLoginClick = () => {
        setIsRegistering(false);
        setForgetPasswordMode(false);
        setEmail('');
        setPassword('');
    };

    const handleForgotPasswordClick = () => {
        setForgetPasswordMode(true);
        setEmail('');
    };

    const handleLogin = async (email, password) => {
        // console.log('Вход');
        // console.log('Email:', email); 
        // console.log('Password:', password);
        try {
            const response = await UserService.tryAuthUser(email, password);
            // localStorage.setItem('token', response.token);
            Cookies.set('token', response.token, { expires: 7 });
            const userData = await UserService.getUserByEmail(email);
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userId',userData.id);
            navigate('/');
            toast.success('Вход выполнен успешно!');
        } catch (error) {
            toast.error('Пользователь не найден, зарегистрируйтесь или проверьте вводимые данные');
        }
    };

    const handleRegister = async (email, password, username) => {
        // console.log('Регистрация');
        // console.log('Имя пользователя:', username);
        // console.log('Email:', email);
        // console.log('Пароль:', password);
        // console.log('Согласие с правилами:', siteRulesAccepted);
        // console.log('Согласие с политикой конфиденциальности:', privacyPolicyAccepted);

        if (!siteRulesAccepted || !privacyPolicyAccepted) {
            toast.error('Пожалуйста, примите правила сайта и политику конфиденциальности.');
            return;
        }
        try {
            const response = await UserService.tryAddUser(username, email, password);
            console.log(response);
            toast.success('Регистрация прошла успешно! Вы можете войти в систему!');
            const userData = await UserService.getUserByEmail(email);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            setIsRegistering(false);
            setUsername('');
            setEmail('');
            setPassword('');
            } catch (error) {
                console.error('Ошибка регистрации:', error);
                toast.error('Ошибка регистрации. Проверьте введенные данные и повторите попытку.');
            }
        };
        const handleFormSubmit = (e) => {
            e.preventDefault(); 
            if (isRegistering) {
                handleRegister(email, password, username);
            } else {
                handleLogin(email, password);
            }
        };
    
    return (
        <div className='signIn_Block'>
            {forgetPasswordMode ? (
                <ForgotPasswordForm 
                    handleLoginClick={handleLoginClick}
                    FaArrowLeftLong={FaArrowLeftLong}
                    email={email}
                    setEmail={setEmail}
                />
            ) : (
                <>
                    <h2>{isRegistering ? 'Регистрация' : 'Войти'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        {isRegistering ? (
                            <RegisterForm
                                username={username}
                                setUsername={setUsername}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                siteRulesAccepted={siteRulesAccepted}
                                privacyPolicyAccepted={privacyPolicyAccepted}
                                setSiteRulesAccepted={setSiteRulesAccepted}
                                setPrivacyPolicyAccepted={setPrivacyPolicyAccepted}
                                togglePasswordVisibility={togglePasswordVisibility}
                                showPassword={showPassword}
                                handleRegister={handleRegister} 
                            />
                        ) : (
                            <LoginForm
                            email={email} 
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                            showPassword={showPassword}
                            onSubmit={handleLogin}
                            />
                        )}
                    </form>
                   
                    {!forgetPasswordMode && (
                        <div className="button_button">
                            {!isRegistering ? (
                                <Button
                                    onClick={handleRegisterClick}
                                    className="register-button"
                                    text='Зарегистрироваться'
                                />
                            ) : (
                                <FaArrowLeftLong
                                    onClick={handleLoginClick}
                                    className="login-button"
                                />
                            )}
                        </div>
                    )}
                     {!isRegistering && (
                        <span 
                            className="forgetPassword" 
                            onClick={handleForgotPasswordClick} 
                        > 
                            Забыли пароль?
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default SignIn;