import React, { useState, useEffect } from 'react';
import './LobbyWindow.css';
import LobbyService from '../../services/LobbyService.js';
import Button from '../../shared/Button/Button.jsx';
import ModalWin from '../../components/ModalWindow/ModalWindow.jsx';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';


const LobbyWindow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState(null);

  const isAuthenticated = !!Cookies.get('token');
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleOpenModal =async (type, lobby = null) => {
    if (!isAuthenticated) {
      toast.error(t('toastError.EntranceInSystem'));
      setTimeout(() => {
        navigate('/LobbyWindow');
      }, 2000);
      return;
    }

    if (lobby && type === 'entrance') {
      if(lobby.countOfPlayers >= 10){
        toast.info(t('toastInfo.roomIsCrowded'));
        return;
      }
      else{
        setSelectedLobby(lobby); 
      }
    }

    setModalType(type);
    setIsModalOpen(true);

   
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchLobbies = async () => {
    setLoading(true);
    try {
      const allLobbies = await LobbyService.getAllLobbies();
      // console.log(allLobbies)
      
      setLobbies(allLobbies);
    } catch (error) {
      toast.error(t('toastError.errorLoading'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLobbies();
  }, []);

  return (
    <div className='Lobby_Win'>
      <div className="lobby_win">
        <div className="Button_entrance_or_create_lobby">
          <Button onClick={() => handleOpenModal('create')} text={t('stateLobby.createLobby')} />
          <Button onClick={() => handleOpenModal('delete')} text={t('stateLobby.deleteLobby')} />
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
                  <th>Id</th>
                  <th>Тип</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {lobbies.map(lobby => (
                  <tr key={lobby.id}>
                    <td>{lobby.name}</td>
                    <td>{lobby.id}</td>
                    <td>{lobby.password ? 'Закрытый' : 'Открытый'}</td>
                    <td>{lobby.countOfPlayers}  / 10</td>
                    <td>
                    <button onClick={() => handleOpenModal('entrance', lobby)}>ИГРАТЬ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ModalWin
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalType={modalType}
        setLobbies={setLobbies}
        lobby={selectedLobby} 
      />
    </div>
  );
};

export default LobbyWindow;
