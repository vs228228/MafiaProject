import React, { useState } from 'react';
import './Profile.css';
import Image from '../../photo/mafia.jpg';
import Button from '../../shared/Button/Button';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(Image);
    const [username, setUsername] = useState('');
    const [editedImage, setEditedImage] = useState(Image);
    const [editedUsername, setEditedUsername] = useState('Имя пользователя');

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedImage(profileImage);
        setEditedUsername(username);
    };

//сохранение покуда локально, и сохраняются изменения в пределе компонента, позже свяжем с бд и будет импорт и экспорт 
//элементов
    const handleSaveChanges = () => {
        setProfileImage(editedImage);
        setUsername(editedUsername);
        setIsEditing(false);
    };

    const handleDiscardChanges = () => {
        setEditedImage(profileImage);
        setEditedUsername(username);
        setIsEditing(false);
    };

    const handleChangePicture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangeUsername = (event) => {
        setEditedUsername(event.target.value);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

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
                                onChange={handleChangeUsername}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="info_about_user">
                        <img src={profileImage} alt='User profile' className='profile_photo' />
                        <div>Имя пользователя: {username}</div>
                        <div>Выигрыши:</div>
                        <div>Поражения:</div>
                    </div>
                )}
                {!isEditing && (
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
