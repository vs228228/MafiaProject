import React from 'react';
// import Button from '../../shared/Button/Button.jsx';
import Input from '../../shared/Input/Input.jsx';

const LoginForm = ({togglePasswordVisibility,showPassword, handleLogin}) => {
   
    
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Input type='text' name='username' label='Имя пользователя' required={true} />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                required={true}
            />
        </form>
    );
};

export default LoginForm;