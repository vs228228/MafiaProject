import React from 'react';
import './Header.css'
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation();


  return (
    <div className='header'>
      <div className='header_links'>
        <div className="emblem_logo_link">
          <li>
              <NavLink to='/home'>M</NavLink>
          </li>
        </div>
        
        <div className="pages_link">
          <nav>
            <li>
              <NavLink to='/home' className={location.pathname === '/home ' ? 'active' : ''}>Главная</NavLink>
            </li>
            <li>
              <NavLink to='/aboutGame' className={location.pathname === '/aboutGame ' ? 'active' : ''}>Об игре</NavLink>
            </li>
            <li>
              <NavLink to='/aboutAuthor' className={location.pathname === '/aboutAuthor ' ? 'active' : ''}>Об авторах</NavLink>
            </li>
            <li>
              <NavLink to='/profile' className={location.pathname === '/profile ' ? 'active' : ''}>Профиль</NavLink>
            </li>
            <li>
              <NavLink to='/SignIn' className={location.pathname === '/SignIn ' ? 'active' : ''}>Регистрация</NavLink>
            </li>
          </nav>
        </div>
      </div>
        
    </div>
  )
}

export default Header