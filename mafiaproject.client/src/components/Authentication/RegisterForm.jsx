import React from 'react';
import Input from '../../shared/Input/Input';
import CheckBox from '../../shared/CheckBoxGroup/CheckBox';
import Button from '../../shared/Button/Button';
import {handleSubmit as handleFormSubmit } from '../../servicesLogic/FormUtilsEmail/FormUtilsEmail';
import { useTranslation } from 'react-i18next';

const RegisterForm = ({
    username, setUsername,
    email, setEmail,
    password, setPassword,
    siteRulesAccepted, privacyPolicyAccepted,
    setSiteRulesAccepted, setPrivacyPolicyAccepted,
    handleRegister, togglePasswordVisibility,
    showPassword
}) => {

    const { t } = useTranslation();
    const handleSiteRulesChange = () => {
        setSiteRulesAccepted(prev => !prev);
    };

    const handlePrivacyPolicyChange = () => {
        setPrivacyPolicyAccepted(prev => !prev);
    };

    const handleSubmit = (e) => {
        if (handleFormSubmit(e, () => handleRegister(email, password, username), email,t)){ }
    };

    return (
        <div>
            <Input 
                type='text' 
                name='username' 
                label={t('username')} 
                required={true} 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label={t('password')}
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
                label={t('post')}
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
            <Button type="submit" text={t('register')} onClick={handleSubmit} />
        </div>
    );
};

export default RegisterForm;