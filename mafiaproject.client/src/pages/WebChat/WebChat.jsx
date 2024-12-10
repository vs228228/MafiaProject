import React, { useState, useEffect } from 'react';
import '../WebChat/WebChat.css';
import LobbyService from '../../services/LobbyService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SignalService from '../../services/SignalService.js';
import PlayerService from '../../services/PlayerService'

import ButtonForChat from '../../shared/Button/ButtonForChat';
import { CiVideoOff, CiVideoOn, CiMicrophoneOff, CiMicrophoneOn, CiFlag1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";



const WebChat = () => {
  const navigate = useNavigate();

  const playerId = parseInt(localStorage.getItem('playerId'), 10); 
  const lobbyId = parseInt(localStorage.getItem('lobbyId'), 10); 
  const { t } = useTranslation();
  
  const [camera, setCamera] = useState(true);
  const [micro, setMicro] = useState(true);
  const [isReady, setIsReady] = useState(true);
  const [videoStreams, setVideoStreams] = useState({});
  const lobbyName = localStorage.getItem('lobbyName');

  useEffect(() => {
    const setupSignalR = async () => {
      await SignalService.connectToHub('https://localhost:7081/hubs/GameHub');
      // await SignalService.joinLobby(lobbyName);
      await SignalService.setupLocalStream();//Запрос к камере и микрофону с сохранением локального потока
  
      
    
    };
    setupSignalR().catch(err => {
      console.error("Error setting up SignalR: ", err);
    });
    return () => {// Убираем обработчики при размонтировании компонента
      SignalService.leaveLobby(lobbyName);
    };
  }, [lobbyName]);
  

  const handleExit = async () => {
    try {
      if (!lobbyId || !playerId) {
        toast.error(t('toastError.ErrorData'));
        return;
      }
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
    SignalService.toggleCamera(!camera);
  };

  const toggleButtonMicro = () => {
    setMicro(!micro);
    SignalService.toggleMicrophone(!micro);
  };

  const handleReady = () => {
    setIsReady(false);
  };

  return (
    <div className="webChat">
    <div className="placeForCamera">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} id="videos" className="camera"></div>
      ))}
      <div key={4} id="videos" className="camera">{t('WebChat.WaitingPlayer')}</div>
      <div className="camera-large">{t('WebChat.ConfirmReadiness')} / 10</div>
      <div key={5} id="videos" className="camera">{t('WebChat.WaitingPlayer')}</div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index + 6} id="videos" className="camera">{t('WebChat.WaitingPlayer')}</div>
      ))}
    </div>
  

      <div className="logic_button">
        <ButtonForChat icon={camera ? CiVideoOn : CiVideoOff} text={camera ? t('WebChat.CameraOn') : t('WebChat.CameraOff')} onClick={toggleButtonCamera} />
        <ButtonForChat icon={micro ? CiMicrophoneOn : CiMicrophoneOff} text={micro ? t('WebChat.MicrophoneOn') : t('WebChat.MicrophoneOff')} onClick={toggleButtonMicro} />
        <ButtonForChat icon={RxCross2} text={t('logout')} onClick={handleExit} />
        {isReady && <ButtonForChat icon={CiFlag1} text={t('WebChat.ready')} onClick={handleReady} />}
      </div>
    </div>
  );
};

export default WebChat;
