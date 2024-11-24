import React from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import {toast } from 'react-toastify';
import LobbyService from '../../services/LobbyService';

const EntranceLobby = ({
    showPassword,
    RoomPassword, setRoomPassword,
    togglePasswordVisibility,
    creatorId,setCreatorId
}) => {
    
    // const handleEnterClick = async (event) => {
    //     event.preventDefault();

    //     if (!creatorId) {
    //         toast.error('ID комнаты не может быть пустым');
    //         return;
    //     }
    //     if (!RoomPassword) {
    //         toast.error('Пароль не может быть пустым');
    //         return;
    //     }
    //     try {
    //         // Здесь вы можете вызвать метод для подключения к лобби
    //         await LobbyService.disconnectFromLobby(creatorId, RoomPassword); // Предполагая, что метод connectToLobby принимает ID комнаты и пароль
    //         toast.success('Вы успешно вошли в лобби!');
    //     } catch (error) {
    //         console.error("Ошибка при входе в лобби:", error);
    //         toast.error(error.message); // Отображаем сообщение ошибки
    //     }
    // };

    return (
        <form >
            <Input 
                type='text' 
                name='roomId' 
                label='ID комнаты' 
                required={true}
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}
            />       
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                value={RoomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                isPasswordVisible={showPassword}
            />
            <div className="button_in_lobby">
                <Button type="submit" text='Войти' />
            </div>
        </form>
    );
}

export default EntranceLobby;