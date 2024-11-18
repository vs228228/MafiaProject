import { toast } from 'react-toastify'

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
};

export const handleSubmit = (e, callback, email) => {
    e.preventDefault();
    if (!validateEmail(email)) {
        toast.error('Пожалуйста, введите правильный адрес электронной почты.'); 
        return false;
    }
    callback(); // переданная функция для обработки отправки
    return true;
};