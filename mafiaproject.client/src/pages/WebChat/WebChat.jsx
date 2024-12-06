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
        toast.error('Данные пользователя или лобби отсутствуют.');
        return;
      }
      await LobbyService.disconnectFromLobby(lobbyId, playerId);
      toast.success('Вы успешно вышли из лобби!');
      navigate('/LobbyWindow');
    } catch (error) {
      console.error('Ошибка при выходе из лобби:', error.message);
      toast.error('Произошла ошибка при выходе из лобби. Попробуйте снова.');
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
          <div className="camera">Ожидание игрока</div>
        ))}
        <div className="camera">Ожидание игрока</div>
        <div className="camera-large">Подтвердите готовность   / 10 </div>
        <div className="camera">Ожидание игрока</div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="camera">Ожидание игрока</div>
        ))}
      </div>

      <div className="logic_button">
        <ButtonForChat icon={camera ? CiVideoOn : CiVideoOff} text={camera ? "Камера вкл." : "Камера выкл."} onClick={toggleButtonCamera} />
        <ButtonForChat icon={micro ? CiMicrophoneOn : CiMicrophoneOff} text={micro ? "Микрофон вкл." : "Микрофон выкл."} onClick={toggleButtonMicro} />
        <ButtonForChat icon={RxCross2} text="Выйти" onClick={handleExit} />
        {isReady && <ButtonForChat icon={CiFlag1} text="Готов" onClick={handleReady} />}
      </div>
    </div>
  );
};

export default WebChat;
