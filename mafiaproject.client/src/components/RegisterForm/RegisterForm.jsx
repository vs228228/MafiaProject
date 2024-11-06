import React from 'react';
import Input from '../../shared/Input/Input';
import CheckBox from '../../shared/CheckBoxGroup/CheckBox';

const RegisterForm = ({siteRulesAccepted, privacyPolicyAccepted, setSiteRulesAccepted, setPrivacyPolicyAccepted, handleRegister}  ) => {

    const handleSiteRulesChange = () => {//управляет состоянием согласия пользователя с правилами сайта
        setSiteRulesAccepted(!siteRulesAccepted);
    };

    const handlePrivacyPolicyChange = () => {//соглашение с политикой конфидициальности
        setPrivacyPolicyAccepted(!privacyPolicyAccepted);
    };

    
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Input type='text' name='username' label='Имя пользователя' required={true} />
            <Input type='password' name='password' label='Пароль' required={true} />
            <Input type='password' name='confirm-password' label='Подтвердите пароль' required={true} />
            <Input type='text' name='email' label='Электронная почта' required={true} />
            <CheckBox
                siteRulesAccepted={siteRulesAccepted} 
                privacyPolicyAccepted={privacyPolicyAccepted}
                handleSiteRulesChange={handleSiteRulesChange}
                handlePrivacyPolicyChange={handlePrivacyPolicyChange}
            />
        </form>
    );
};

export default RegisterForm;