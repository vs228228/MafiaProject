import React,{useState} from 'react';
import './ModalWindow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from '../../shared/Button/Button'
import Input from '../../shared/Input/Input';

const EntranceLobby = ({onClose,isOpen, modalType }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        
        <form >
            <Input type='text' name='roomId' label='ID комнаты' required={true} />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={showPassword}
            />
            <div className="button_in_lobby">
                <Button type="submit" text='Войти' />
            </div>
        </form>
        
    )
}

export default EntranceLobby