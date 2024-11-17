// import {React, useState} from 'react';
// import UserService from '../../services/UserService';
// import {toast} from 'react-toastify';

// const SaveData = (userData,ProfPhoto, setUserData, setEditedImage, setEditedUsername, setIsEditing) => {
 
//     const [loading, setLoading] = useState(false);

//     const handleSaveChanges = async (editedUsername, editedImageFile) => {
//         setLoading(true);
//         try {
//             await UserService.updateUser(userData.id, editedUsername, editedImageFile);

//             const updatedUser = await UserService.getUserByEmail(userData.email);
//             if (updatedUser) {
//                 setUserData(updatedUser);
//                 setEditedImage(createImagePath(updatedUser.pathToPic) || ProfPhoto);
//                 setEditedUsername(updatedUser.nick || '');
//                 toast.success('Изменения успешно сохранены!');
//                 setIsEditing(false);
//                 return { success: true };
//             } else {
//                 throw new Error('Не удалось получить обновленные данные пользователя');
//             }
//         } catch (error) {
//             console.error('Ошибка при сохранении изменений:', error);
//             toast.error('Не удалось сохранить изменения, попробуйте снова.');
//             return { success: false };
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createImagePath = (imagePath) => {
//         const Path = 'https://localhost:7081/';
//         return imagePath ? `${Path}${imagePath}` : null;
//     };

//     return { handleSaveChanges, loading };
// };

// export default SaveData