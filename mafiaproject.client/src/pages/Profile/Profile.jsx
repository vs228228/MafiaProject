import React, { useState, useEffect } from 'react';
import './Profile.css';
import Button from '../../shared/Button/Button';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import ProfPhoto from '../../photo/mafia.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [editedImage, setEditedImage] = useState(ProfPhoto);
    const { t } = useTranslation();
    const [editedUsername, setEditedUsername] = useState(t('username'));
    const [loading, setLoading] = useState(true);
    const [editedImageFile, setEditedImageFile] = useState();
    

    const handleSignInClick = () => {
        navigate('/SignIn');
    };

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setTimeout(() => {
                UserService.getUserByEmail(storedUserData.email)
                    .then(data => {
                        setUserData(data);
                        setEditedImage(createImagePath(data.pathToPic) || ProfPhoto);
                        setEditedUsername(data.nick || '');
                        setLoading(false);
                    })
                    .catch(() => setLoading(false));
            }, 1000);
        } else {
            setLoading(false);
        }
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedImage(createImagePath(userData.pathToPic) || ProfPhoto);
        setEditedUsername(userData.nick || '');
    };

    const createImagePath = (imagePath) => {
        const Path = 'https://localhost:7081/';
        return imagePath ? `${Path}${imagePath}` : null;
    }

    const handleSaveChanges = async () => {
        console.log('Сохранение изменений', { id: userData.id, nick: editedUsername, photo: editedImageFile });
        try {
            await UserService.updateUser(userData.id, editedUsername, editedImageFile);

            const updatedUser = await UserService.getUserByEmail(userData.email);
            if (updatedUser) {
                setUserData(updatedUser);
                setEditedImage(createImagePath(updatedUser.pathToPic) || ProfPhoto);
                setEditedUsername(updatedUser.nick || '');
                toast.success(t('SuccessfullySave'));
                setIsEditing(false);
            } else {
                throw new Error('Не удалось получить обновленные данные пользователя');
            }
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error);
            toast.error(t('toastError.FailedSave'));
        }
    };

    const handleDiscardChanges = () => {
        if (userData) {
            setEditedImage(createImagePath(userData.pathToPic) || ProfPhoto);
            setEditedUsername(userData.nick || '');
        }
        setIsEditing(false);
    };

    const handleChangePicture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedImage(reader.result);
                setEditedImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleDeleteProfile = async () => {
        if (window.confirm(t('toastInfo.question'))) {
            try {
                await UserService.deleteUser(userData.id);
                toast.success(t('toastSuccess.SuccessfullyDelete'));
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/SignIn');
                }, 1500);

            } catch (error) {
                console.error('Возникла ошибка при удалении профиля');
                toast.error(t('toastError.ErrorDeleteProfile'));
            }
        } else {
            toast.info(t('toastInfo.RemainLogged'));
        }
    };

    if (loading) {
        return (<div className="loading-container">
            <ReactLoading type={"spin"} color={"red"} height={50} width={50} /></div>
        );
    }

    return (
        <div className='profile_page'>
            <div className='profile_page_change'>
                {isEditing ? (
                    <div className="info_about_user">
                        <img src={editedImage} alt='User profile' className='profile_photo' />
                        <button onClick={handleButtonClick}>{t('changePhoto')}</button>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleChangePicture}
                        />
                        <div>
                            {t('username')}
                            <input
                                type="text"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="info_about_user">
                        <img src={userData ? createImagePath(userData.pathToPic) || ProfPhoto : ProfPhoto} alt='User profile' className='profile_photo' />
                        <div><span>{t('username')}</span> {userData ? userData.nick : 'Пользователь не авторизован'}</div>
                        <div><span>{t('wins')}</span> {userData ? userData.wins : 0}</div>
                        <div><span>{t('defeats')}</span> {userData ? userData.losses : 0}</div>
                    </div>
                )}
                {!isEditing && (
                    <div className="edit_profile">
                        {userData ? (
                            <button onClick={handleEditClick}>{t("Profile.editProfile")}</button>
                        ) : (
                            <button onClick={handleSignInClick}>{t("Profile.logIn")}</button>
                        )}
                    </div>
                )}
            </div>
            {isEditing && (
                <div className='button_change_or_reset'>
                    <Button text={t('Profile.SaveChanges')} onClick={handleSaveChanges} />
                    <Button text={t('Profile.ResetChanges')} onClick={handleDiscardChanges} />
                    <Button text={t('Profile.DeleteProfile')} onClick={handleDeleteProfile} />
                </div>
            )}
        </div>
    );
};

export default Profile;