import React from 'react';
import './ModalWindow.css';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';

const EntranceLobby = ({
    showPassword,
    RoomId, setRoomId,
    RoomPassword, setRoomPassword,
    togglePasswordVisibility
}) => {
    
    return (
        <form>
            <Input 
                type='text' 
                name='roomId' 
                label='ID комнаты' 
                required={true}
                value={RoomId}
                onChange={(e) => setRoomId(e.target.value)}
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