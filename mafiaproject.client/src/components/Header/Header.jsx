import React from 'react';
import './Header.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Header = () => {

  const location = useLocation();
  const history = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Вы действительно хотите выйти?');
    if(confirmLogout){
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      toast.success("Вы вышли из системы.");
      history.push('./SignIn')
    }
    else{
      toast.info("Вы остались в системе.")
    }
  };

  const isAuthenticated = !!localStorage.getItem('token');
  
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
              <NavLink to='/' exact className={location.pathname === '/home ' ? 'active' : ''}>Главная</NavLink>
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
                {isAuthenticated ? (
                    <span onClick={handleLogout} className="logout-button">Выйти</span>
                ) : (
                  <NavLink to='/SignIn' className={location.pathname === '/SignIn ' ? 'active' : ''}>Войти</NavLink>
                )}
            </li>
          </nav>
        </div>
      </div>
        
    </div>
  )
}

export default Header