import React, { useState } from 'react';
import './SignIn.css';
import Button from '../../shared/Button/Button'

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [siteRulesAccepted, setSiteRulesAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
    setSiteRulesAccepted(false);
    setPrivacyPolicyAccepted(false);
  };

  const handleSiteRulesChange = () => {
    setSiteRulesAccepted(!siteRulesAccepted);
  };

  const handlePrivacyPolicyChange = () => {
    setPrivacyPolicyAccepted(!privacyPolicyAccepted);
  };

  const isRegisterButtonDisabled = !(siteRulesAccepted && privacyPolicyAccepted);

  return (
    <div className='signIn_Block'>
      <h2>{isRegistering ? 'Регистрация' : 'Войти'}</h2>
      <form>
        <div className='user-box'>
          <input type='text' name='username' required />
          <label>Имя пользователя</label>
        </div>
        <div className='user-box'>
          <input type='password' name='password' required />
          <label>Пароль</label>
        </div>
        {isRegistering && (
          <>
            <div className='user-box'>
              <input type='text' name='email' required />
              <label>Электронная почта</label>
            </div>
            <div className='user-box'>
              <input type='password' name='confirm-password' required />
              <label>Подтвердите пароль</label>
            </div>
            <div className='checkbox-group'>
              <label>
                <input type='checkbox' onChange={handleSiteRulesChange} /> Я принимаю правила сайта
              </label>
              <label>
                <input type='checkbox' onChange={handlePrivacyPolicyChange} /> Я принимаю политику конфиденциальности
              </label>
            </div>
          </>
        )}
          <Button 
          type='submit' 
          disabled={isRegistering && isRegisterButtonDisabled} 
          text={isRegistering ? 'Регистрация' : 'Войти'}
        />
      </form>
      {!isRegistering ? (
        <Button 
          onClick={handleRegisterClick} 
          className="register-button" 
          text='Зарегистрироваться'
        />
      ) : (
        <Button 
          onClick={handleLoginClick} 
          className="login-button" 
          text='Войти'
        />
      )}
    </div>
  );
};

export default SignIn;
