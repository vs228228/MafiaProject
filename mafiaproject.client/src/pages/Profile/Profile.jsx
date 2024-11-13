import React, { useState, useEffect } from 'react';
import './Profile.css';
import Button from '../../shared/Button/Button';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import ProfPhoto from '../../photo/mafia.jpg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [editedImage, setEditedImage] = useState(ProfPhoto);
    const [editedUsername, setEditedUsername] = useState('Имя пользователя');
    const [loading, setLoading] = useState(true);
    const [editedImageFile, setEditedImageFile] = useState(null);

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
                        setEditedImage(data.photoUrl || ProfPhoto);
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
        setEditedImage(userData.photoUrl || ProfPhoto);
        setEditedUsername(userData.nick || '');
    };

    const handleSaveChanges = async () => {
        console.log('Сохранение изменений', { id: userData.id, nick: editedUsername, photo: editedImageFile });

        try {
            await UserService.updateUser(userData.id, editedUsername, editedImageFile);

            const updatedUser = await UserService.getUserByEmail(userData.email);
            if (updatedUser) {
                setUserData(updatedUser);
                setEditedImage(updatedUser.photoUrl || ProfPhoto);
                setEditedUsername(updatedUser.nick || '');
                toast.success('Изменения успешно сохранены!');
                setIsEditing(false);
            } else {
                throw new Error('Не удалось получить обновленные данные пользователя');
            }
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error);
            toast.error('Не удалось сохранить изменения, попробуйте снова.');
        }
    };

    const handleDiscardChanges = () => {
        if (userData) {
            setEditedImage(userData.photoUrl || ProfPhoto);
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
        if (window.confirm('Вы уверены, что хотите удалить свой профиль?')) {
            try {
                await UserService.deleteUser(userData.id);
                toast.success('Профиль успешно удален!');
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/SignIn');
                }, 1500);

            } catch (error) {
                console.error('Возникла ошибка при удалении профиля');
                toast.error('Возникла ошибка при удалении профиля, попробуйте еще раз');
            }
        } else {
            toast.info("Вы остались в системе.");
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
                        <button onClick={handleButtonClick}>изменить изображение</button>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleChangePicture}
                        />
                        <div>
                            Имя пользователя:
                            <input
                                type="text"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="info_about_user">
                        <img src={userData ? userData.photoUrl || ProfPhoto : ProfPhoto} alt='User profile' className='profile_photo' />
                        <div>Имя пользователя: {userData ? userData.nick : 'Пользователь не авторизован'}</div>
                        <div>Победы: {userData ? userData.wins : 0}</div>
                        <div>Поражения: {userData ? userData.losses : 0}</div>
                    </div>
                )}
                {!isEditing && (
                    <div className="edit_profile">
                        {userData ? (
                            <button onClick={handleEditClick}>Редактировать профиль</button>
                        ) : (
                            <button onClick={handleSignInClick}>Авторизоваться</button>
                        )}
                    </div>
                )}
            </div>
            {isEditing && (
                <div className='button_change_or_reset'>
                    <Button text='Сохранить изменения' onClick={handleSaveChanges} />
                    <Button text='Сбросить изменения' onClick={handleDiscardChanges} />
                    <Button text='Удалить профиль' onClick={handleDeleteProfile} />
                </div>
            )}
        </div>
    );
};

export default Profile;
