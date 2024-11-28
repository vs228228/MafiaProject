import React, { useEffect, useState } from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import { toast } from 'react-toastify';
import LobbyService from '../../services/LobbyService';

const CreateLobby = ({
    showPassword,
    RoomName, setRoomName,
    RoomPassword, setRoomPassword,
    togglePasswordVisibility,
    setLobbies
}) => {
    const [creatorId, setCreatorId] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        // console.log(userId) 
      
        if (userId) {
            setCreatorId(userId);
        } else {
            toast.error('ID пользователя не найден');
        }
    }, []);

    const handleCreateClick = async (event) => {
        event.preventDefault();

        if (!creatorId) {
            toast.error('ID пользователя не найден');
            return;
        }
        if (!RoomName) {
            toast.error('Название комнаты обязательно для заполнения');
            return;
        }

        try {
            // Проверяем, существует ли лобби с таким названием
            const existingLobbies = await LobbyService.getAllLobbies();
            const isLobbyExists = existingLobbies.some(lobby => lobby.name.toLowerCase() === RoomName.toLowerCase());

            if (isLobbyExists) {
                toast.error('Лобби с таким названием уже существует');
                return;
            }

            const LobbyData = await LobbyService.createLobby({
                creatorId,
                name: RoomName,
                password: RoomPassword || '',
            });

           
            toast.success(`Вы создали комнату с именем "${RoomName}"`);
            localStorage.setItem('lobbyData', JSON.stringify(LobbyData));
            setRoomName('');
            setRoomPassword('');
            
            const updatedLobbies = await LobbyService.getAllLobbies();
            setLobbies(updatedLobbies);
        } catch (error) {
            console.error("Ошибка при создании комнаты:", error);
            toast.error(error.message);
            setRoomName('');
            setRoomPassword('');
        }
    };

    return (
        <form onSubmit={handleCreateClick}>
            <Input 
                type='text' 
                name='roomName' 
                label='Название комнаты' 
                required={true}
                value={RoomName} 
                onChange={(e) => setRoomName(e.target.value)}
            />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label='Пароль' 
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                value={RoomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
            />
            <div className="button_in_lobby">
                <Button type="submit" text='Создать' />
            </div>
        </form>
    );
}

export default CreateLobby;
