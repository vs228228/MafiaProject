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
  
  const [camera, setCamera] = useState(true);
  const [micro, setMicro] = useState(true);
  const [isReady, setIsReady] = useState(true);
  const lobbyName = localStorage.getItem('lobbyName');

  useEffect(() => {
    const setupSignalR = async () => {
      await signalService.connectToHub('https://localhost:7081/hubs/GameHub');
      await signalService.joinLobby(lobbyName);
      
    
    };
    setupSignalR();
    return () => {
      signalService.leaveLobby(lobbyName);
    };
  }, [lobbyName]);
  

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

  // const getAllPlayers = async () => {
  //   try {
  //     const players = await playerService.getAllPlayers(lobbyId);
  //     console.log("Players in the lobby:", players);
  //   } catch (error) {
      
  //     toast.error(t('toastError.ErrorFetchingPlayers'));
  //   }
  // };
  
  const toggleButtonCamera = () => {
    setCamera(!camera);
    signalService.toggleCamera(!camera);
  };

  const toggleButtonMicro = () => {
    setMicro(!micro);
    signalService.toggleMicrophone(!micro);
  };

  const handleReady = () => {
    setIsReady(false);
  };

  return (
    <div className="webChat">
    <div className="placeForCamera">
  
  {Array.from({ length: 10 }).map((_, index) => (
    <div key={index} id="videos" className="camera">
    </div>
  ))}
</div>
  

      <div className="logic_button">
        <ButtonForChat icon={camera ? CiVideoOn : CiVideoOff} text={camera ? t('WebChat.CameraOn') : t('WebChat.CameraOff')} onClick={toggleButtonCamera} />
        <ButtonForChat icon={micro ? CiMicrophoneOn : CiMicrophoneOff} text={micro ? t('WebChat.MicrophoneOn') : t('WebChat.MicrophoneOff')} onClick={toggleButtonMicro} />
        <ButtonForChat icon={RxCross2} text={t('logout')} onClick={handleExit} />
        {/* <ButtonForChat icon={FaRegUser} text={t('players')}  onClick={getAllPlayers} /> */}
        {isReady && <ButtonForChat icon={CiFlag1} text={t('WebChat.ready')} onClick={handleReady} />}
        <div className="camera-large">{t('WebChat.ConfirmReadiness')} / 10</div>
      </div>
    </div>
  );
};

export default WebChat;