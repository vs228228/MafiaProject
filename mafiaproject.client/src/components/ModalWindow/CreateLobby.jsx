import React, { useEffect, useState } from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import { toast } from 'react-toastify';
import LobbyService from '../../services/LobbyService';
import { useTranslation } from 'react-i18next';


const CreateLobby = ({
    showPassword,
    RoomName, setRoomName,
    RoomPassword, setRoomPassword,
    togglePasswordVisibility,
    setLobbies
}) => {
    const [creatorId, setCreatorId] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        // console.log(userId) 
      
        if (userId) {
            setCreatorId(userId);
        } else {
            toast.error(t('toastError.personIdNotFound'));
        }
    }, []);

    const handleCreateClick = async (event) => {
        event.preventDefault();

        if (!creatorId) {
            toast.error(t('toastError.personIdNotFound'));
            return;
        }
        if (!RoomName) {
            toast.error(t('toastError.RoomNameRequired'));
            return;
        }

        try {
            // Проверяем, существует ли лобби с таким названием
            const existingLobbies = await LobbyService.getAllLobbies();
            const isLobbyExists = existingLobbies.some(lobby => lobby.name.toLowerCase() === RoomName.toLowerCase());

            if (isLobbyExists) {
                toast.error(t('toastError.NamAlreadyExists'));
                return;
            }

            const LobbyData = await LobbyService.createLobby({
                creatorId,
                name: RoomName,
                password: RoomPassword || '',
            });

           
            toast.success(`${t('toastSuccess.createdRoom')} "${RoomName}"`);
            localStorage.setItem('lobbyData', JSON.stringify(LobbyData));
            setRoomName('');
            setRoomPassword('');
            
            const updatedLobbies = await LobbyService.getAllLobbies();
            setLobbies(updatedLobbies);
        } catch (error) {
            console.error(t('toastError.errorCreating'), error);
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
                label={t('roomName')}
                required={true}
                value={RoomName} 
                onChange={(e) => setRoomName(e.target.value)}
            />
            <Input 
                type={showPassword ? 'text' : 'password'} 
                name='password' 
                label={t('password')}
                showToggleButton 
                togglePasswordVisibility={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                value={RoomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
            />
            <div className="button_in_lobby">
                <Button type="submit" text={t('stateLobby.create')} />
            </div>
        </form>
    );
}

export default CreateLobby;
