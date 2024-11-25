import React, { useState } from 'react';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import LobbyService from '../../services/LobbyService';
import { toast } from 'react-toastify';

const DeleteLobby = ({ setLobbies, onClose }) => {
    const [roomId, setRoomId] = useState('');

    const handleDeleteLobby = async (event) => {
        // const confirmDelete = window.confirm("Вы действительно хотите удалить комнату?");
        // if (!confirmDelete) {
        //     return; 
        // }
        event.preventDefault();
        if (!roomId) {
            toast.info('Пожалуйста, введите ID комнаты!');
            return;
        }
        try {
            
            await LobbyService.deleteLobby(roomId);
            toast.success(`Лобби с ID ${roomId} успешно удалено`);
            setRoomId('');

            //обновление лобби
            const updatedLobbies = await LobbyService.getAllLobbies();
            setLobbies(updatedLobbies);

            onClose();
        } catch (error) {
            console.error("Ошибка при удалении лобби:", error);
            toast.info(`Комната с id ${roomId} не найдена`)
            setRoomId('');
            onClose(); 
        }
    };

    return (
        <form onSubmit={handleDeleteLobby}>
            <Input 
                type='text' 
                name='roomId' 
                label='ID комнаты' 
                required={true}
                value={roomId || ''}
                onChange={(e) => setRoomId(e.target.value)}
            />       
            <div className="button_in_lobby">
                <Button type="submit" text='Удалить' />
            </div>
        </form>
    );
}

export default DeleteLobby;