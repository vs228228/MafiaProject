import React, { useState, useEffect } from 'react'
import './LobbyWin.css';
import LobbyService from '../../services/LobbyService.js';
import Button from '../../shared/Button/Button.jsx'
import ModalWin from '../../components/ModalWindow/ModalWindow.jsx'

const LobbyWin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalType, setModalType] = useState('');
  const [lobbies, setLobbies] = useState([]);

    const handleOpenModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchLobbies = async () => {
      try {
          const allLobbies = await LobbyService.getAllLobbies();
          setLobbies(allLobbies);
      } catch (error) {
          console.error("Ошибка при загрузке лобби:", error);
      }
  };

  useEffect(() => {
    fetchLobbies();
  }, []);

  const updateLobbies = (newLobby) => {
    setLobbies((prevLobbies) => [...prevLobbies, newLobby]);
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
                updateLobbies={updateLobbies}      
              />
            </div>

            <div className="list_of_lobby">
              <table>
                <thead>
                  <tr>
                    <th>Название комнаты</th>
                    <th>Тип</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {lobbies.map(lobby => (
                    <tr key={lobby.id}>
                      <td>{lobby.name}</td>
                      <td>{lobby.password ? 'Закрытый' : 'Открытый'}</td>
                      {/* <td>{lobby.currentPlayers >= 10 ? 'Игра идет' : `${lobby.currentPlayers}/10 - Набор`}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default LobbyWin;