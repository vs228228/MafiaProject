import React, { useState } from 'react';
import './Profile.css';
import Image from '../../photo/mafia.jpg';
import Button from '../../shared/Button/Button';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        // Логика для сохранения изменений
        setIsEditing(false);
    };

    const handleDiscardChanges = () => {
        // Сброс изменений
        setIsEditing(false);
    };

    return (
        <div className='profile_page'>
            <div className='profile_page_change'>
                {isEditing ? (
                    <div className="info_about_user">
                        <img src={Image} alt='User profile' className='profile_photo' />
                        <div>Имя пользователя:</div>
                    </div>
                ) : (
                    <div className="info_about_user">
                        <img src={Image} alt='User profile' className='profile_photo' />
                        <div>Имя пользователя:</div>
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
