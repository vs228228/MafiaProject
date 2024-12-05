import React, { useState } from 'react';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import LobbyService from '../../services/LobbyService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const DeleteLobby = ({ setLobbies, onClose }) => {

    const [roomId, setRoomId] = useState('');
    const { t } = useTranslation();

    const handleDeleteLobby = async (event) => {
    
        event.preventDefault();
        if (!roomId) {
            toast.info(t('toastSuccess.createdRoom'));
            return;
        }
        try {
              
            await LobbyService.deleteLobby(roomId);
            toast.success(`${t('toastSuccess.lobbyWithId')} ${roomId} ${t('toastSuccess.SuccessDelete')}`);
            setRoomId('');

            //обновление лобби
            const updatedLobbies = await LobbyService.getAllLobbies();
            setLobbies(updatedLobbies);

            onClose();
        } catch (error) {
            console.error(t('toastError.errorDelete'), error);
            toast.info(`${t('roomId')} ${roomId} ${t('notFound')}`)
            setRoomId('');
            onClose(); 
        }
    };

    return (
        <form onSubmit={handleDeleteLobby}>
            <Input 
                type='text' 
                name='roomId' 
                label={t('IdRoom')} 
                required={true}
                value={roomId || ''}
                onChange={(e) => setRoomId(e.target.value)}
            />       
            <div className="button_in_lobby">
                <Button type="submit" text={t('delete')} />
            </div>
        </form>
    );
}

export default DeleteLobby;