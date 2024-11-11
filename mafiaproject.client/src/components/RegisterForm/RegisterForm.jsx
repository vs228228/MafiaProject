import React from 'react';
import Input from '../../shared/Input/Input';
import CheckBox from '../../shared/CheckBoxGroup/CheckBox';
import Button from '../../shared/Button/Button';
import { toast } from 'react-toastify'

const RegisterForm = ({
    username, setUsername,
    email, setEmail,
    password, setPassword,
    siteRulesAccepted, privacyPolicyAccepted,
    setSiteRulesAccepted, setPrivacyPolicyAccepted,
    handleRegister, togglePasswordVisibility,
    showPassword
}) => {

    const handleSiteRulesChange = () => {
        setSiteRulesAccepted(prev => !prev);
    };

    const handlePrivacyPolicyChange = () => {
        setPrivacyPolicyAccepted(prev => !prev);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) 
            {
                toast.error('Пожалуйста, введите правильный адрес электронной почты.'); 
                return;
            }
        handleRegister(email, password, username); 
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                type='text' 
                name='username' 
                label='Имя пользователя' 
                required={true} 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                required={true}
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
                type='text'
                name='email' 
                label='Электронная почта' 
                required={true} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CheckBox
                siteRulesAccepted={siteRulesAccepted}
                privacyPolicyAccepted={privacyPolicyAccepted}
                handleSiteRulesChange={handleSiteRulesChange}
                handlePrivacyPolicyChange={handlePrivacyPolicyChange}
            />
            <Button type="submit" text='Зарегистрироваться' onClick={handleSubmit} />
        </form>
    );
};

export default RegisterForm;