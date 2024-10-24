import React from 'react'
import './LobbyWin.css'
import Button from '../../shared/Button/Button.jsx'

const LobbyWin = () => {
  return (
    <div className='modalWin_'>
        <div className="lobby_window">
            <div className="Button_entrance_or_create_lobby">
                <Button text='Вход в лобби '/>
                <Button text='Создать новое лобби'/>
            </div>
            <div className="list_of_lobby">

            </div>
        </div>
    </div>
  )
}

export default LobbyWin