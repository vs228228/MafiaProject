import React from 'react';
import './Button.css';
import Hole from '../../photo/bullet_hole.png';


const Button = ({ text, onClick, colorClass }) => {
  const images = Array.from({ length: 3}); 
  return (
    <button className={`contact-button ${colorClass}`} onClick={onClick} style={{ position: 'relative' }}>
      {text}
      {images.map((_, index) => (
        <img 
          key={index} 
          className="button-image" 
          src={Hole} 
          alt="bullet_hole" 
          style={{
            position: 'absolute',
            top: `${Math.random() * 90}%`, 
            left: `${Math.random() * 90}%`, 
            transform: 'translate(-50%, -50%)', 
          }} 
        />
      ))}
    </button>
  );
}
export default Button;