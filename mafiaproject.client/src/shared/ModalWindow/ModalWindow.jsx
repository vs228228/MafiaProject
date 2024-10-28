import React from 'react';
import './ModalWindow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from '../Button/Button'
import Input from '../Input/Input'

const ModalWindow = ({ isOpen, onClose, modalType }) => {
    if (!isOpen) return null; 

    return (
        <div className='modalWin_'>
            <div className="form_for_create_or_entrance">
                <AiOutlineCloseCircle className="close-button" onClick={onClose} />
                
                <h2>{modalType === 'entrance' ? 'Войти в лобби' : 'Создать лобби'}</h2>
                <form>
                {modalType === 'entrance' && (
                <>
                    <Input type='text' name='roomId' label='ID комнаты' required={true} />
                    <Input type='text' name='username' label='Имя' required={true} />
                    <Input type='password' name='password' label='Пароль' required={false} />
                </>
                )}
                {modalType === 'create' && (
                    <>
                    <Input type='text' name='lobbyName' label='Название комнаты' required={true} />
                    <Input type='password' name='password' label='Пароль' />
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