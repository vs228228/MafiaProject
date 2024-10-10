import React from 'react'
import MafiaPicture from '../../photo/person.png';
import './HomePage.css';
import Button from '../../shared/Button/Button.jsx'


const HomePage = () => {
  return (
    <div className='home_page'>

     <div className="emblem_page_text">

        <div className="page_mafia">
            <img src={MafiaPicture} alt='mafia_picture'/>
            <div className="text_mafia">MAFIA</div>
        </div>
      
        <div className="buttons">
          <Button text="Играть" colorClass="red" />
          <Button text='Войти' colorClass="white"/>
        </div>

      </div>
    </div>
  )
}

export default HomePage