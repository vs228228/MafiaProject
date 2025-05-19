import { toast } from 'react-toastify'

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
};

export const handleSubmit = (e, callback, email,t) => {
    e.preventDefault();
    if (!validateEmail(email)) {
        toast.error(t('toastError.ErrorEmail')); 
        return false;
    }
    callback(); 
    return true;
};