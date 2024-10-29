import React, { useState } from 'react'
import './LobbyWin.css'
import Button from '../../shared/Button/Button.jsx'
import ModalWin from '../../shared/ModalWindow/ModalWindow.jsx'

const LobbyWin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalType, setModalType] = useState('');

    const handleOpenModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
  return (
    <div className='Lobby_Win'>
        <div className="lobby_win">
            <div className="Button_entrance_or_create_lobby">
              <Button onClick={() => handleOpenModal('entrance')} text='Вход в лобби' />
              <Button onClick={() => handleOpenModal('create')} text='Создать новое лобби' />
              <ModalWin
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalType={modalType}
                        
              />
            </div>

            <div className="list_of_lobby">

            </div>
        </div>
    </div>
  )
}

export default LobbyWin;