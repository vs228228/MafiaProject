import React from 'react';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import { CiLock } from "react-icons/ci";
import {  handleSubmit as handleFormSubmit } from '../../servicesLogic/FormUtilsEmail/FormUtilsEmail';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = ({email, setEmail, handleLoginClick, FaArrowLeftLong }) => {
   
    const { t } = useTranslation();
    const handleSubmit = (e) => {
        if (handleFormSubmit(e, () => {
            console.log('Запрос на восстановление пароля отправлен для:', email);
        }, email)) {}
    };

    return (
        <div>
            <div className='Lock_icon'><CiLock size={50} /></div>
            <h2>{t('forgotPassword.title')}</h2>
            <div>
                <Input
                    type='email'
                    name='email'
                    label={t('forgotPassword.emailLabel')}
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required={true}
                />
                <Button type='submit' text={t('forgotPassword.submitButton')} onSubmit={handleSubmit} />
            </div>
           
            <FaArrowLeftLong
                onClick={handleLoginClick}
                className="login-button"
            />
        </div>
    );
};

export default ForgotPasswordForm;