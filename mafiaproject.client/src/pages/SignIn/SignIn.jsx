import React, { useState } from 'react';
import './SignIn.css';
import Button from '../../shared/Button/Button';
import { FaArrowLeftLong } from "react-icons/fa6";
import CheckBox from '../../shared/CheckBoxGroup/CheckBox';
import Input from '../../shared/Input/Input';
import { CiLock } from "react-icons/ci";

const SignIn = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [forgetPasswordMode, setForgetPasswordMode] = useState(false);


    const togglePasswordVisibility = () => {//видимость пароля в полях ввода
        setShowPassword(prev => !prev);
    };
    
    const handleRegisterClick = () => {//изменяет состояние приложения, чтобы отобразить форму регистрации
        setIsRegistering(true);
        setForgetPasswordMode(false);
    };

    const handleLoginClick = () => {//изменяет состояние приложения, чтобы отобразить форму входа
        setIsRegistering(false);
        setSiteRulesAccepted(false);
        setPrivacyPolicyAccepted(false);
        setForgetPasswordMode(false);
    };

    const handleSiteRulesChange = () => {//управляет состоянием согласия пользователя с правилами сайта
        setSiteRulesAccepted(!siteRulesAccepted);
    };

    const handlePrivacyPolicyChange = () => {//соглашение с политикой конфидициальности
        setPrivacyPolicyAccepted(!privacyPolicyAccepted);
    };

    const handleForgotPasswordClick = () => {//забыли пароль- перехоод в другую форму
        setForgetPasswordMode(true);
    };

    const isRegisterButtonDisabled = !(siteRulesAccepted && privacyPolicyAccepted);

    return (
        <div className='signIn_Block'>
            {forgetPasswordMode ?(
                <>
                    <div className='Lock_icon'><CiLock size={50}/></div>
                    <h2>Восстановление пароля</h2>
                    <form>
                        <Input
                             type='email' 
                             name='email' 
                             label='Введите вашу электронную почту' 
                             required={true}
                        />
                        
                        <Button type='submit' text='Получить пароль' />
                    </form>
                    <FaArrowLeftLong
                        onClick={handleLoginClick}
                        className="login-button"
                    />
                </>
            ) : (
                <>
                    <h2>{isRegistering ? 'Регистрация' : 'Войти'}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input type='text' name='username' label='Имя пользователя' required={true}/>
                        <Input 
                            type={showPassword ? 'text' : 'password'} 
                            name='password' 
                            label='Пароль' 
                            showToggleButton 
                            togglePasswordVisibility={togglePasswordVisibility}
                            isPasswordVisible={showPassword}
                        />
                    
                        {isRegistering && (
                            <>
                                <Input type='password' name='confirm-password' label='Подтвердите пароль' required={true} />
                                <Input type='text' name='email' label='Электронная почта' required={true} />
                                <CheckBox
                                    siteRulesAccepted={siteRulesAccepted} 
                                    privacyPolicyAccepted={privacyPolicyAccepted}
                                    handleSiteRulesChange={handleSiteRulesChange}
                                    handlePrivacyPolicyChange={handlePrivacyPolicyChange}
                                />
                            </>
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
