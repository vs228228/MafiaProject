import React,{useState} from 'react';
import './ModalWindow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from '../Button/Button'
import Input from '../Input/Input'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";


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
                    <Input type='text' name='roomId' label='ID комнаты' required={true} />
                   
                   {/* <div className="input_with_button"> */}
                        <Input type={showPassword ? 'text' : 'password'}  name='password' label='Пароль' required={false} />
                        {/* <button 
                            type="button" 
                            className="toggle-password" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ?  <IoEyeSharp />: <FaEyeSlash />}
                        </button>
                    </div>  */}
                    {/* <button 
                            type="button" 
                            className="toggle-password" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ?  <IoEyeSharp />: <FaEyeSlash />}
                        </button> */}
                </>
                )}
                {modalType === 'create' && (
                    <>
                    <Input type='text' name='lobbyName' label='Название комнаты' required={true} />
                    <Input  type={showPassword ? 'text' : 'password'} name='password' label='Пароль' />
                    {/* <button 
                            type="button" 
                            className="toggle-password" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEyeSharp />: <FaEyeSlash />}
                        </button> */}
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