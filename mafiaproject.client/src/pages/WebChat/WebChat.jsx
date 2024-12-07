import React, { useState } from 'react';
import '../WebChat/WebChat.css';
import LobbyService from '../../services/LobbyService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


import ButtonForChat from '../../shared/Button/ButtonForChat';
import { CiVideoOff, CiVideoOn, CiMicrophoneOff, CiMicrophoneOn, CiFlag1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const WebChat = () => {
  const navigate = useNavigate();

  const playerId = parseInt(localStorage.getItem('playerId'), 10); 
  const lobbyId = parseInt(localStorage.getItem('lobbyId'), 10); 
  const { t } = useTranslation();
  
  const [camera, setCamera] = useState(false);
  const [micro, setMicro] = useState(false);
  const [isReady, setIsReady] = useState(true);

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
  };

  const toggleButtonMicro = () => {
    setMicro(!micro);
  };

  const handleReady = () => {
    setIsReady(false);
  };

  return (
    <div className="webChat">
      <div className="placeForCamera">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="camera">{t('WebChat.WaitingPlayer')}</div>
        ))}
        <div className="camera">{t('WebChat.WaitingPlayer')}</div>
        <div className="camera-large">{t('WebChat.ConfirmReadiness')}   / 10 </div>
        <div className="camera">{t('WebChat.WaitingPlayer')}</div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="camera">{t('WebChat.WaitingPlayer')}</div>
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
