import React, { useState } from 'react';
import './ModalWindow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import EntranceLobby from './EntranceLobby';
import CreateLobby from './CreateLobby';
import DeleteLobby from './DeleteLobby';
import { useTranslation } from 'react-i18next';


const ModalWindow = ({ isOpen, onClose, modalType, setLobbies, lobby }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [RoomName, setRoomName] = useState('');
    const [RoomPassword, setRoomPassword] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const { t } = useTranslation();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    if (!isOpen) return null;

    return (
        <div className='modalWin_'>
            <div className="form_for_create_or_entrance">
                <AiOutlineCloseCircle className="close-button" onClick={onClose} />
                <h2>{modalType === 'entrance' ? t('stateLobby.entranceInLobby') : modalType === 'create' ? t('stateLobby.createLobby') : t('stateLobby.deleteLobby')}</h2>
                
                {modalType === 'entrance' && (
                    <EntranceLobby
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        onClose={onClose}
                        lobby={lobby}  
                    />
                )}
                {modalType === 'create' && (
                    <CreateLobby
                        onClose={onClose}
                        showPassword={showPassword}
                        RoomName={RoomName}
                        setRoomName={setRoomName}
                        RoomPassword={RoomPassword}
                        creatorId={creatorId}
                        setCreatorId={setCreatorId}
                        setRoomPassword={setRoomPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                        setLobbies={setLobbies}
                    />
                )}
                {modalType === 'delete' && (
                    <DeleteLobby
                        onClose={onClose}
                        togglePasswordVisibility={togglePasswordVisibility}
                        setLobbies={setLobbies}
                    />
                )}
            </div>
        </div>
    );
};

export default ModalWindow;
