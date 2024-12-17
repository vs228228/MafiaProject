import React, { useState, useEffect } from 'react';
import './LobbyWindow.css';
import LobbyService from '../../services/LobbyService.js';
import Button from '../../shared/Button/Button.jsx';
import ModalWin from '../../components/ModalWindow/ModalWindow.jsx';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import UseModalWin from '../../servicesLogic/UseModalWin/UseModalWin.jsx';

const LobbyWindow = () => {
  
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!Cookies.get('token');
  const { t } = useTranslation();

  const {
    isModalOpen,
        modalType,
        selectedLobby,
        handleOpenModal,
        handleCloseModal,
  } = UseModalWin({ isAuthenticated, t })

  const fetchLobbies = async () => {
    setLoading(true);
    try {
      const allLobbies = await LobbyService.getAllLobbies();
      setLobbies(allLobbies);
      
    } catch (error) {
      toast.error(t('toastError.errorLoading'));
    } 
    finally {
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
                  <th>{t('roomName')}</th>
                  <th>Id</th>
                  <th>{t('type')}</th>
                  <th>{t('status')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {lobbies.map(lobby => (
                  <tr key={lobby.id}>
                    <td>{lobby.name}</td>
                    <td>{lobby.id}</td>
                    <td>{lobby.password ? t('closed') : t('open')}</td>
                    <td>{lobby.countOfPlayers}  / 10</td>
                    <td>
                    <button onClick={() => handleOpenModal('entrance', lobby)}>{t('stateLobby.play')}</button>
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
