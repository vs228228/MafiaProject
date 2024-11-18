import React from 'react';
import Input from '../../shared/Input/Input.jsx';
import Button from '../../shared/Button/Button.jsx';
import { handleSubmit as handleFormSubmit } from '../../servicesLogic/FormUtilsEmail/FormUtilsEmail.jsx';

const LoginForm = ({ email, setEmail, password, setPassword, togglePasswordVisibility, showPassword, onSubmit }) => {
   
    const handleSubmit = (e) => {
        if (handleFormSubmit(e, () => onSubmit(email, password), email)) { }
    }; 

    return (
        <div>
            <Input 
                type='email' 
                name='email' 
                label='Электронная почта' 
                required={true} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button type="submit" onClick={handleSubmit} text='Войти'/>
        </div>
    );
};

export default LoginForm;