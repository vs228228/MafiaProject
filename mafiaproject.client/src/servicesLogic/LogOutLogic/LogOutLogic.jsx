import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogOutLogic = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Вы действительно хотите выйти?');
        if (confirmLogout) {
            Cookies.remove('token');
            Cookies.remove('userData');
            Cookies.remove('refreshToken');
            localStorage.removeItem('accessToken');
            toast.success("Вы вышли из системы.");
            setTimeout(()=>{
                navigate('/SignIn');
            }, 1500)
        } else {
            toast.info("Вы остались в системе.");
        }
    };
    return { handleLogout };
};

export default LogOutLogic;