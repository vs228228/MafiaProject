import React, { useState } from 'react';
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';
import LogOutLogic from '../../servicesLogic/LogOutLogic/LogOutLogic';
import { TbWorld } from "react-icons/tb";
import Cookies from 'js-cookie';
import { useTranslation } from "react-i18next";

const Header = () => {
  const location = useLocation();
  const { handleLogout } = LogOutLogic();
  const { t, i18n } = useTranslation();
  const isAuthenticated = !!Cookies.get('token');
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

  const toggleLanguageMenu = () => {
    setLanguageMenuVisible(!languageMenuVisible);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setLanguageMenuVisible(false); 
  };

  return (
    <div className='header'>
      <div className='header_links'>
        <div className="emblem_logo_link">
          <li>
              <NavLink to='/'>M</NavLink>
          </li>
        </div>
        
        <div className="pages_link">
          <nav>
            <li>
              <NavLink to='/' end className={location.pathname === '/home ' ? 'active' : ''}> {t('main')}</NavLink>
            </li>
            <li>
              <NavLink to='/aboutGame' className={location.pathname === '/aboutGame ' ? 'active' : ''}>{t('aboutGame')}</NavLink>
            </li>
            <li>
              <NavLink to='/aboutAuthor' className={location.pathname === '/aboutAuthor ' ? 'active' : ''}>{t('aboutAuthors')}</NavLink>
            </li>
            <li>
              <NavLink to='/profile' className={location.pathname === '/profile ' ? 'active' : ''}>{t('profile')}</NavLink>
            </li>
            <li style={{ position: 'relative' }}>
              <div onClick={toggleLanguageMenu} className='world_element'>
                <TbWorld />
              </div>
              {languageMenuVisible && (
                <div className="language_menu">
                  <button onClick={() => changeLanguage('en')}>English</button>
                  <button onClick={() => changeLanguage('ru')}>Русский</button>
                </div>
              )}
            </li>
            <li>
                {isAuthenticated ? (
                  <NavLink onClick={handleLogout} className={location.pathname === '/SignIn ' ? 'active' : ''}>{t('logout')}</NavLink>
                ) : ( 
                  <NavLink to='/SignIn' className={location.pathname === '/SignIn ' ? 'active' : ''}>{t('login')}</NavLink>
                 )}
            </li>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
