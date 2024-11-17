import React,{useState} from 'react';
import './ModalWindow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import EntranceLobby from './EntranceLobby';
import CreateLobby from './CreateLobby';

const ModalWindow = ({ isOpen, onClose, modalType }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [RoomName, setRoomName] = useState('');
    const [RoomId, setRoomId] = useState('');
    const [RoomPassword, setRoomPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    if (!isOpen) return null;

    return (
        <div className='modalWin_'>
            <div className="form_for_create_or_entrance">
                <AiOutlineCloseCircle className="close-button" onClick={onClose} />
                
                <h2>{modalType === 'entrance' ? 'Войти в лобби' : 'Создать лобби'}</h2>
                
                {modalType === 'entrance' && (
                    <EntranceLobby 
                        onClose={onClose}
                        showPassword = {showPassword}
                        RoomId={RoomId}
                        setRoomId={setRoomId}
                        RoomPassword={RoomPassword}
                        setRoomPassword={setRoomPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                )}
                {modalType === 'create' && (
                    <CreateLobby 
                    onClose={onClose}
                    showPassword = {showPassword}
                    RoomName={RoomName}
                    setRoomName = {setRoomName}
                    RoomId={RoomId}
                    setRoomId={setRoomId}
                    RoomPassword={RoomPassword}
                    setRoomPassword={setRoomPassword}
                    togglePasswordVisibility={togglePasswordVisibility} 
                    />
                )}
            </div>
        </div>
    );
};

export default ModalWindow;