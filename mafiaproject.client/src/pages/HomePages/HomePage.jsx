import React from 'react'
import MafiaPicture from '../../photo/person.png';
import './HomePage.css';
import Button from '../../shared/Button/Button.jsx'
import { NavLink, useLocation } from 'react-router-dom';


const HomePage = () => {
  
  const location = useLocation();

  return (
    <div className='home_page'>

     <div className="emblem_page_text">

        <div className="page_mafia">
            <img src={MafiaPicture} alt='mafia_picture'/>
            <div className="text_mafia">MAFIA</div>
        </div>
      
        <div className="buttons">
          <Button text="Играть" colorClass="red" />
          <NavLink to='/SignIn' className={location.pathname === '/SignIn ' ? 'active' : ''}><Button text='Войти' colorClass="white"/></NavLink>
        </div>

      </div>
    </div>
  )
}

export default HomePage