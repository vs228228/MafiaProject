import React, { useState } from 'react';
import './SignIn.css';
import Button from '../../shared/Button/Button';
import { FaArrowLeftLong } from "react-icons/fa6";
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPasswordForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

const SignIn = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [forgetPasswordMode, setForgetPasswordMode] = useState(false);
    const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);


    const togglePasswordVisibility = () => {//видимость пароля в полях ввода
        setShowPassword(prev => !prev);
    };
    
    const handleRegisterClick = () => {//изменяет состояние приложения, чтобы отобразить форму регистрации
        setIsRegistering(true);
        setForgetPasswordMode(false);
    };

    const handleLoginClick = () => {//изменяет состояние приложения, чтобы отобразить форму входа
        setIsRegistering(false);
        setForgetPasswordMode(false);
    };

    const handleForgotPasswordClick = () => {//забыли пароль- перехоод в другую форму
        setForgetPasswordMode(true);
    };
    const handleLogin = async () => {
       console.log('Вход');
    };

    const handleRegister = async () => {
        console.log('Регистрация');
    };
    const isRegisterButtonDisabled = !(siteRulesAccepted && privacyPolicyAccepted);

    return (
        <div className='signIn_Block'>
            {forgetPasswordMode ?(
                <>
                    <ForgotPasswordForm 
                    handleLoginClick={handleLoginClick}
                    FaArrowLeftLong={FaArrowLeftLong}/>
                </>
            ) : (
                <>
                    <h2>{isRegistering ? 'Регистрация' : 'Войти'}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                
                    {isRegistering ? (
                            <RegisterForm
                                siteRulesAccepted={siteRulesAccepted}
                                privacyPolicyAccepted={privacyPolicyAccepted}
                                setSiteRulesAccepted={setSiteRulesAccepted}
                                setPrivacyPolicyAccepted={setPrivacyPolicyAccepted}
                            />
                        ) : (
                            <LoginForm
                                togglePasswordVisibility={togglePasswordVisibility}
                                showPassword={showPassword}
                            />
                        )}
                    </form>
                    {!isRegistering && (
                        <span 
                            className="forgetPassword" 
                            onClick={handleForgotPasswordClick} 
                        > Забыли пароль?
                        </span>
                    )}
                    {!forgetPasswordMode && (
                        <div className="button_button">
                            <Button
                                    type='submit'
                                    disabled={isRegistering && isRegisterButtonDisabled}
                                    text={isRegistering ? 'Регистрация' : 'Войти'}
                                    onClick={isRegistering ? handleRegister : handleLogin}
                                />
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
                </>
            )}
        </div>
    );
};

export default SignIn;
