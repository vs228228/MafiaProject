import React from 'react';
import './Button.css';

const ButtonForChat = ({ text, onClick, colorClass, icon: Icon }) => {
  return (
    <button className={`contact-button-chat ${colorClass}`} onClick={onClick}>
      <div className='textAndImage'>
        {Icon && <Icon className="button-icon" />}
        <p className="button-text">{text}</p>
      </div>
    </button>
  );
};

export default ButtonForChat;
