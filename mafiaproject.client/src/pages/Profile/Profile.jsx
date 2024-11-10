import React, { useState, useEffect } from 'react';
import './Profile.css';
import Button from '../../shared/Button/Button';
import UserService from '../../services/UserService';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'; 
import ProfPhoto from '../../photo/mafia.jpg';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [editedImage, setEditedImage] = useState(ProfPhoto);
    const [editedUsername, setEditedUsername] = useState('Имя пользователя');
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setTimeout(() => {
                setUserData(storedUserData);
                setEditedImage(storedUserData.photoUrl || ProfPhoto);
                setEditedUsername(storedUserData.nick || '');
                setLoading(false); 
            }, 5000);
        } else {
            setLoading(false);
        }
    }, []);

    const handleEditClick = () => {
        // if (userData) {
            setIsEditing(true);
            setEditedImage(userData.photoUrl || ProfPhoto);
            setEditedUsername(userData.nick || '');
        // }
    };

    const handleSaveChanges = async () => {
        console.log('Сохранение изменений')
        try {
            const updatedUser = await UserService.updateUser(userData.id, editedUsername, userData.email, editedImage instanceof File ? editedImage : null);
            setUserData(updatedUser); 
            setIsEditing(false);
            toast.success('Изменения успешно сохранены!')
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
                setEditedImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <ThreeDots 
                    height="100" 
                    width="100" 
                    color="#00BFFF" 
                    ariaLabel="loading" 
                />
            </div>
        );
    }

    return (
        <div className='profile_page'> 
        <ToastContainer />    
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
                {!isEditing && !userData && ( 
                    <div className="edit_profile">
                        <Link  to="/Signin">Авторизоваться</Link> 
                    </div>
                )}
                {!isEditing &&  userData &&(
                    <div className="edit_profile">
                        <button onClick={handleEditClick}>Редактировать профиль</button>
                    </div>
                )}
            </div>
            {isEditing && (
                <div className='button_change_or_reset'>
                    <Button text='Сохранить изменения' onClick={handleSaveChanges} />
                    <Button text='Сбросить изменения' onClick={handleDiscardChanges} />
                </div>
            )}
        </div>
    );
};

export default Profile;