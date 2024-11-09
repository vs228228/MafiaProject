import React from 'react';
import Input from '../../shared/Input/Input';
import CheckBox from '../../shared/CheckBoxGroup/CheckBox';

const RegisterForm = ({username, setUsername, email, setEmail, password, setPassword,siteRulesAccepted, privacyPolicyAccepted, setSiteRulesAccepted, 
    setPrivacyPolicyAccepted, handleRegister,togglePasswordVisibility,showPassword,
    }  ) => {

    const handleSiteRulesChange = () => {//управляет состоянием согласия пользователя с правилами сайта
        setSiteRulesAccepted(!siteRulesAccepted);
    };

    const handlePrivacyPolicyChange = () => {//соглашение с политикой конфидициальности
        setPrivacyPolicyAccepted(!privacyPolicyAccepted);
    };
    
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Input type='text' name='username' label='Имя пользователя' required={true} />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                required={true}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                required={true}  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input type='text'
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
        </form>
    );
};

export default RegisterForm;