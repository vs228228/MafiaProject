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
import { useTranslation } from 'react-i18next';


const SignIn = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [forgetPasswordMode, setForgetPasswordMode] = useState(false);
    const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    const { t } = useTranslation();
    
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
    
        try {
            const response = await UserService.tryAuthUser(email, password);
            Cookies.set('token', response.token, { expires: 7 });
            const userData = await UserService.getUserByEmail(email);
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userId',userData.id);
            localStorage.setItem('userName',userData.nick);
            // const name =  localStorage.getItem('userName');
            // console.log(name);
            console.log(userData)
            navigate('/');
            toast.success(t('toastSuccess.SuccessfullyEntered'));
        } catch (error) {
            toast.error(t('toastError.UserNotFound'));
        }
    };

    const handleRegister = async (email, password, username) => {
      
        if (!siteRulesAccepted || !privacyPolicyAccepted) {
            toast.info(t('toastInfo.PrivacyPolicy'));
            return;
        }
        try {
            const response = await UserService.tryAddUser(username, email, password);
            console.log(response);
            toast.success(t('toastSuccess.SuccessRegistration'));
            const userData = await UserService.getUserByEmail(email);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            setIsRegistering(false);
            
            setUsername('');
            setEmail('');
            setPassword('');

            } catch (error) {
                console.error('Ошибка регистрации:', error);
                toast.error(t('toastError.RegistrationError'));
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
                    <h2>{isRegistering ? t('register') : t('login')}</h2>
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
                                    text={t('register')}
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
                            {t('forgotPassword.forgotPassword')}
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default SignIn;