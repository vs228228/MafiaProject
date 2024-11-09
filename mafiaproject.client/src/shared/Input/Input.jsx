import React from 'react'
import './Input.css'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

const Input = ({ type, name, 
    label, required, showToggleButton, 
    togglePasswordVisibility, 
    isPasswordVisible, value, onChange }) => {
    
    return (
        <div className='user-box'>
            <input
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
            />
            <label>{label}<span>{required ? '*' : ''}</span></label>
            {showToggleButton && (
                <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
            >
                {isPasswordVisible ? <IoEyeSharp /> : <FaEyeSlash />}
            </button>
            )}
        </div>
    );
}

export default Input