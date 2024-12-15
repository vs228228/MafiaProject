import React, {useState, useEffect} from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import {toast } from 'react-toastify';
import LobbyService from '../../services/LobbyService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EntranceLobby = ({
    showPassword,
    togglePasswordVisibility,
    lobby,
}) => {
   
    const [lobbyId, setLobbyId] = useState(lobby?.id ? parseInt(lobby.id, 10) : '');
    const [RoomPassword, setRoomPassword] = useState('');
    const [creatorId, setCreatorId] = useState(0);
    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {

            setCreatorId(parseInt(userId, 10));

        } else {
            toast.error(t('idPersonNotFound'));
        }
    }, [t]);

    const handleLobbyIdChange = (value) => {
        const numericValue = value === '' ? '' : parseInt(value, 10);
        if (!isNaN(numericValue)) {
            setLobbyId(numericValue);
        }
    };

    const handleEnterClick = async (event) => {
        event.preventDefault();

        if (!lobbyId) {
            toast.error(t('IdRoomIsEmpty'));
            return;
        }

        if (lobby.password && !RoomPassword.trim()) {
            toast.error(t('toastError.passwordIsNotEmpty'));
            return;
        }
        console.log('Данные для подключения:', {
            creatorId,
            lobbyId,
            RoomPassword
        });
        try {
            
            await LobbyService.connectToLobby(lobbyId, creatorId, RoomPassword);
            localStorage.setItem('lobbyId', lobbyId);

            
            toast.success(t('toastSuccess.SuccessfullyEntered'));
            setTimeout(()=>{
                navigate('/WebChat');
            }, 500)
            
        } catch (error) {
        
            toast.error(t('toastError.ConnectionError'));
            console.log(error.message)
        }
    }

    return (
        <form onSubmit={handleEnterClick}>
            <Input
                type='text'
                name='roomId'
                label={t('IdRoom')}
                required={true}
                value={lobbyId}
                onChange={(e) => handleLobbyIdChange(e.target.value)}
            />
            {lobby.password && (
                <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    label={t('password')}
                    showToggleButton
                    togglePasswordVisibility={togglePasswordVisibility}
                    value={RoomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    isPasswordVisible={showPassword}
                />
            )}
            <div className="button_in_lobby">
                <Button type="submit" text={t('login')} />
            </div>
        </form>
    );
};

export default EntranceLobby;