import React, { useState } from 'react';
import './SignIn.css';
import Button from '../../shared/Button/Button';
import { FaArrowLeftLong } from "react-icons/fa6";
import CheckBox from '../../shared/CheckBoxGroup/CheckBox';
import Input from '../../shared/Input/Input';

const SignIn = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };

    const handleLoginClick = () => {
        setIsRegistering(false);
        setSiteRulesAccepted(false);
        setPrivacyPolicyAccepted(false);
    };

    const handleSiteRulesChange = () => {
        setSiteRulesAccepted(!siteRulesAccepted);
    };

    const handlePrivacyPolicyChange = () => {
        setPrivacyPolicyAccepted(!privacyPolicyAccepted);
    };

    const isRegisterButtonDisabled = !(siteRulesAccepted && privacyPolicyAccepted);

    return (
        <div className='signIn_Block'>
            <h2>{isRegistering ? 'Регистрация' : 'Войти'}</h2>
            <form>
                <Input type='text' name='username' label='Имя пользователя' required={true}/>
                <Input type='password' name='password' label='Пароль' required={true} />
               
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
        </div>
    );
};

export default SignIn;
