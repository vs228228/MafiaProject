import React,{useState} from 'react';
import './ModalWindow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from '../../shared/Button/Button'
import Input from '../../shared/Input/Input'


const ModalWindow = ({ isOpen, onClose, modalType }) => {
    const [showPassword, setShowPassword] = useState(false);
    if (!isOpen) return null; 

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className='modalWin_'>
            <div className="form_for_create_or_entrance">
                <AiOutlineCloseCircle className="close-button" onClick={onClose} />
                
                <h2>{modalType === 'entrance' ? 'Войти в лобби' : 'Создать лобби'}</h2>
                <form>
                {modalType === 'entrance' && (
                <>
                    <Input type='text' name='roomId' label='ID комнаты' require={true} />
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        name='password' 
                        label='Пароль' 
                        showToggleButton 
                        togglePasswordVisibility={togglePasswordVisibility}
                        isPasswordVisible={showPassword}
                    />  
                </>
                )}
                {modalType === 'create' && (
                    <>
                    <Input type='text' name='roomId' label='ID комнаты' required={true} />
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        name='password' 
                        label='Пароль' 
                        showToggleButton 
                        togglePasswordVisibility={togglePasswordVisibility}
                        isPasswordVisible={showPassword}
                    />
                </>
                )}
                <div className="button_in_lobby">
                    <Button className='button_entrance' type="submit" text={modalType === 'entrance' ? 'Войти' : 'Создать'} />
                </div>
                </form>
            
            </div>
        </div>
    );
}

export default ModalWindow;