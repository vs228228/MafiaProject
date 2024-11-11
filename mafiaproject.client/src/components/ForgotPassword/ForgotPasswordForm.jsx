import React, { useState } from 'react';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import { CiLock } from "react-icons/ci";
import {toast} from 'react-toastify';

const ForgotPasswordForm = ({ handleLoginClick, FaArrowLeftLong }) => {
    const [email, setEmail] = useState(''); 

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) 
            {
                toast.error('Пожалуйста, введите правильный адрес электронной почты.'); 
                return;
            }
        
    };

    return (
        <div>
            <div className='Lock_icon'><CiLock size={50} /></div>
            <h2>Восстановление пароля</h2>
            <form>
                <Input
                    type='email'
                    name='email'
                    label='Введите вашу электронную почту'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required={true}
                />
                <Button type='submit' text='Получить пароль' onSubmit={handleSubmit} />
            </form>
           
            <FaArrowLeftLong
                onClick={handleLoginClick}
                className="login-button"
            />
        </div>
    );
};

export default ForgotPasswordForm;