// import React, { useState } from 'react';
// import Button from '../../shared/Button/Button';
// import Input from '../../shared/Input/Input';
// import CheckBoxGroup from '../../shared/CheckBoxGroup/CheckBox';

// const RegisterForm = ({ onBack }) => {
//     const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
//     const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

//     const isRegisterButtonDisabled = !(siteRulesAccepted && privacyPolicyAccepted);

//     return (
//         <form onSubmit={(e) => e.preventDefault()}>
//             <Input type='text' name='username' label='Имя пользователя' required={true} />
//             <Input type='password' name='password' label='Пароль' required={true} />
//             <Input type='password' name='confirm-password' label='Подтвердите пароль' required={true} />
//             <Input type='text' name='email' label='Электронная почта' required={true} />
//             <CheckBoxGroup
//                 siteRulesAccepted={siteRulesAccepted}
//                 privacyPolicyAccepted={privacyPolicyAccepted}
//                 setSiteRulesAccepted={setSiteRulesAccepted}
//                 setPrivacyPolicyAccepted={setPrivacyPolicyAccepted}
//             />
//             <Button type='submit' disabled={isRegisterButtonDisabled} text='Регистрация' />
//             <button onClick={onBack}>Назад</button>
//         </form>
//     );
// };

// export default RegisterForm;