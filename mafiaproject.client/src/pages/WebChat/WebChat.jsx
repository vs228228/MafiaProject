import React, { useState, useEffect } from 'react';
import '../WebChat/WebChat.css';
import LobbyService from '../../services/LobbyService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import signalService from '../../services/SignalService.js';
import { FaRegUser } from "react-icons/fa";
import ButtonForChat from '../../shared/Button/ButtonForChat';
import { CiVideoOff, CiVideoOn, CiMicrophoneOff, CiMicrophoneOn, CiFlag1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import playerService from '../../services/PlayerService.js';

const WebChat = () => {
  const navigate = useNavigate();

  const playerId = parseInt(localStorage.getItem('playerId'), 10); 
  const lobbyId = parseInt(localStorage.getItem('lobbyId'), 10); 
  const { t } = useTranslation();
  const [players, setPlayers] = useState([]);
  
  const [camera, setCamera] = useState(true);
  const [micro, setMicro] = useState(true);
  const [isReady, setIsReady] = useState(true);
  
  const lobbyName = localStorage.getItem('lobbyName');
  const name =  localStorage.getItem('userName');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersList = await playerService.getAllPlayers(lobbyId);
        console.log(playersList);
        setPlayers(playersList);
      } catch (error) {
        console.error('Ошибка при загрузке игроков:', error);
      }
    };
  
    const setupSignalR = async () => {
        await signalService.connectToHub('https://localhost:7081/hubs/GameHub', playerId);
      await signalService.joinLobby(lobbyName);
    };

    const blockBackNavigation = () => {
      window.history.pushState(null, '', window.location.href);
    };

    setupSignalR();
    fetchPlayers();

    blockBackNavigation();
    window.addEventListener('popstate', blockBackNavigation);

    return () => {
      signalService.leaveLobby(lobbyName);
      window.removeEventListener('popstate', blockBackNavigation);
    };
  }, [lobbyName, lobbyId]);
  

  const handleExit = async () => {
    try {
      if (!lobbyId || !playerId) {
        toast.error(t('toastError.ErrorData'));
        return;
      }
  
      setCamera(false);
      setMicro(false);
    
      await LobbyService.disconnectFromLobby(lobbyId, playerId);
      toast.success(t('toastSuccess.SuccessLogOut'));
      navigate('/LobbyWindow');
    } catch (error) {
      console.error('Ошибка при выходе из лобби:', error.message);
      toast.error(t('toastError.ErrorLogOutLobby'));
    }
  };

  const toggleButtonCamera = () => {
    setCamera(!camera);
    signalService.toggleLocalCamera(!camera);
  };

  const toggleButtonMicro = () => {
    setMicro(!micro);
    signalService.toggleLocalMicrophone(!micro);
  };

  const handleReady = async  () => {
    
      try {
        await playerService.changeReady(playerId, !isReady); 
        setIsReady(!isReady); 
        toast(`игрок '${name}' готов` )
      } catch (error) {
        console.error('Ошибка при изменении готовности:', error);
        toast.error(t('toastError.ErrorChangingReady'));
      
    };
  };

    return (
      <div className="webChat">
      <div className="placeForCamera" id="video"> 
        {players.map((player) => (
          <div key={player.id} className="camera" id="videos">
            <span className="player-name">{player.position || `Player ${name}`}</span>
            
          </div>
        ))}
      </div>

      <div className="logic_button">
        <ButtonForChat icon={camera ? CiVideoOn : CiVideoOff} text={camera ? t('WebChat.CameraOn') : t('WebChat.CameraOff')} onClick={toggleButtonCamera} />
        <ButtonForChat icon={micro ? CiMicrophoneOn : CiMicrophoneOff} text={micro ? t('WebChat.MicrophoneOn') : t('WebChat.MicrophoneOff')} onClick={toggleButtonMicro} />
        <ButtonForChat icon={RxCross2} text={t('logout')} onClick={handleExit} />
        <ButtonForChat icon={FaRegUser} text={t('vote')}  />
        {isReady && <ButtonForChat icon={CiFlag1} text={t('WebChat.ready')} onClick={handleReady} />}
       
      </div>
    </div>
  );
};

export default WebChat;