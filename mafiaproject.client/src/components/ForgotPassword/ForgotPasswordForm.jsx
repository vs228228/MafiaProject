import React, { useState } from 'react';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import { CiLock } from "react-icons/ci";

const ForgotPasswordForm = ({ handleLoginClick, FaArrowLeftLong }) => {
    const [email, setEmail] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
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