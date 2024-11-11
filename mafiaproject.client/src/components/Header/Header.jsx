import React from 'react';
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';
 import {toast} from 'react-toastify'
 import { useNavigate } from 'react-router-dom';

const Header = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm('Вы действительно хотите выйти?');
    if(confirmLogout){
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      toast.success("Вы вышли из системы.");
      setTimeout(()=>{
        navigate('/SignIn');
    }, 1500)
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
              <NavLink to='/' end className={location.pathname === '/home ' ? 'active' : ''}>Главная</NavLink>
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
                  <NavLink onClick={handleLogout} className={location.pathname === '/SignIn ' ? 'active' : ''}>Выйти</NavLink>
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