import React, { useState, useEffect } from 'react'
import './LobbyWindow.css';
import LobbyService from '../../services/LobbyService.js';
import Button from '../../shared/Button/Button.jsx'
import ModalWin from '../../components/ModalWindow/ModalWindow.jsx'
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LobbyWindow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalType, setModalType] = useState('');
  // const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!Cookies.get('token');
  const navigate = useNavigate();


    const handleOpenModal = (type) => {
      if (!isAuthenticated) {
          toast.error('Пожалуйста, войдите в систему и повторите попытку');
          setTimeout(() => {
            navigate('/LobbyWindow');
                }, 2000);
                return;
      }
      setModalType(type);
      setIsModalOpen(true);
  };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

  //   const fetchLobbies = async () => {
  //     setLoading(true);
  //     try {
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //         const allLobbies = await LobbyService.getAllLobbies();
  //         setLobbies(allLobbies);
          
  //     } catch (error) {
  //         setLoading(false);
  //         toast.error('Ошибка при загрузке лобби')
  //       }
  //   };

  // useEffect(() => {
  //   fetchLobbies();
  // }, []);

  // const updateLobbies = (newLobby) => {
  //   setLobbies((prevLobbies) => [...prevLobbies, newLobby]);
  // };

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
                // updateLobbies={updateLobbies}      
              />
            </div>

            <div className="list_of_lobby">
          {loading ? ( 
            <div className="loading-container">
              <ReactLoading type="spin" color="red" height={50} width={50} />
            </div>
          ) : ( 
            <table>
              <thead>
                <tr>
                  <th>Название комнаты</th>
                  <th>Тип</th>
                  <th>Статус</th>
                </tr>
              </thead>
              {/* <tbody>
                {lobbies.map(lobby => (
                  <tr key={lobby.id}>
                    <td>{lobby.name}</td>
                    <td>{lobby.password ? 'Закрытый' : 'Открытый'}</td>
                    <button>войти</button>
                  </tr>
                ))}
              </tbody> */}
            </table>
          )} 
        </div>
        </div>
    </div>
  )
}

export default LobbyWindow;