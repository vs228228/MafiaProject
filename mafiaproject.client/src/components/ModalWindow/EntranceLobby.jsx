import React, {useState, useEffect} from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import {toast } from 'react-toastify';
import LobbyService from '../../services/LobbyService';
import { useNavigate } from 'react-router-dom';

const EntranceLobby = ({
    showPassword,
    togglePasswordVisibility,
    lobby,
}) => {
    
    const [lobbyId, setLobbyId] = useState(lobby?.id ? parseInt(lobby.id, 10) : '');
    const [RoomPassword, setRoomPassword] = useState('');
    const [creatorId, setCreatorId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {

            setCreatorId(parseInt(userId, 10));

        } else {
            toast.error('ID пользователя не найден');
        }
    }, []);

    const handleLobbyIdChange = (value) => {
        const numericValue = value === '' ? '' : parseInt(value, 10);
        if (!isNaN(numericValue)) {
            setLobbyId(numericValue);
        }
    };

    const handleEnterClick = async (event) => {
        event.preventDefault();

        if (!lobbyId) {
            toast.error('ID комнаты не может быть пустым');
            return;
        }

        if (lobby.password && !RoomPassword.trim()) {
            toast.error('Пароль не может быть пустым');
            return;
        }
        console.log('Данные для подключения:', {
            creatorId,
            lobbyId,
            RoomPassword
        });
        try {
            toast.info('Подключение...');
            await LobbyService.connectToLobby(lobbyId,creatorId, RoomPassword);
            toast.success('Вы успешно вошли в лобби!');
            setTimeout(()=>{
                navigate('/WebChat')
            }, 1000)
            
        } catch (error) {
        
            toast.error('Ошибка подключения, повторите еще раз');
            console.log(error.message)
        }
    }


    return (
        <form onSubmit={handleEnterClick}>
            <Input
                type='text'
                name='roomId'
                label='ID комнаты'
                required={true}
                value={lobbyId}
                onChange={(e) => handleLobbyIdChange(e.target.value)}
            />
            {lobby.password && (
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
            )}
            <div className="button_in_lobby">
                <Button type="submit" text="Войти" />
            </div>
        </form>
    );
};

export default EntranceLobby;