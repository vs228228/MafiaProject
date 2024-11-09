import React from 'react';
import Input from '../../shared/Input/Input.jsx';

const LoginForm = ({togglePasswordVisibility,showPassword, handleLogin,setEmail, setPassword}) => {
   
    
    return (
        <form onSubmit={handleLogin}>
            <Input 
                type='text' 
                name='email' 
                label='Электронная почта' 
                required={true} 
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
                onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    );
};

export default LoginForm;