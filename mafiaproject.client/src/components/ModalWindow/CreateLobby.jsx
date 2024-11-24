import React from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import { toast } from 'react-toastify';
import LobbyService from '../../services/LobbyService';

const CreateLobby = ({
    showPassword,
    RoomName, setRoomName,
    RoomId, setRoomId,
    RoomPassword, setRoomPassword,
    togglePasswordVisibility,updateLobbies,
   
}) => {

    const handleCreateClick = async (event) => {
        event.preventDefault();
        console.log(RoomName);
        console.log(RoomId);
        console.log(RoomPassword);
        
        const lobbyCreateDTO = {
            name: RoomName,
            password: RoomPassword,
            // players: [
            //     { id: 'player1', isAlive: true }, 
            //     { id: 'player2', isAlive: true }  
            // ]
        };
        
        try {
            const response = await LobbyService.createLobby(lobbyCreateDTO); 
            console.log(response);
            toast.success(`Вы создали комнату с именем ${RoomName}`); 
            localStorage.setItem('lobbyData', JSON.stringify(response));
           
            // const userData = await LobbyService.getLobbyById(RoomId);
            // localStorage.setItem('userData', JSON.stringify(userData));
            // updateLobbies(response);
            
            
           
        } catch (error) {
            console.error("Ошибка при создании комнаты:", error);
            toast.error('Ошибка при создании лобби');
        }
    }

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
            {/* <Input 
                type='text' 
                name='roomId' 
                label='ID комнаты' 
                required={true}
                value={RoomId} 
                onChange={(e) => setRoomId(e.target.value)}
            /> */}
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