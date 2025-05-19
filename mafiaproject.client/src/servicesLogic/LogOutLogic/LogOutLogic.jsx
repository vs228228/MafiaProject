import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const LogOutLogic = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        const confirmLogout = window.confirm(t('toastInfo.GoOut'));
        if (confirmLogout) {
            Cookies.remove('token');
            Cookies.remove('userData');
            Cookies.remove('refreshToken');
            localStorage.removeItem('accessToken');
            toast.success(t('toastInfo.loggedOut'));
            setTimeout(()=>{
                navigate('/SignIn');
            }, 1500)
        } else {
            toast.info(t('toastInfo.RemainLogged'));
        }
    };
    return { handleLogout };
};

export default LogOutLogic;