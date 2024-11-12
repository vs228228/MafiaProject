import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LogOutLogic = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Вы действительно хотите выйти?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            toast.success("Вы вышли из системы.");
            navigate('/SignIn');
        } else {
            toast.info("Вы остались в системе.");
        }
    };
    return { handleLogout };
};

export default LogOutLogic;