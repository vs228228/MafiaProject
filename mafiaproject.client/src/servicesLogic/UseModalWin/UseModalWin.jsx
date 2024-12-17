import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UseModalWin = ({ isAuthenticated, t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedLobby, setSelectedLobby] = useState(null);
    const navigate = useNavigate();

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
            localStorage.setItem('lobbyName', lobby.name);
           
          }
        }
        setModalType(type);
        setIsModalOpen(true);
      };
      
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLobby(null);
      };
      return {
        isModalOpen,
        modalType,
        selectedLobby,
        handleOpenModal,
        handleCloseModal,
      };
}

export default UseModalWin