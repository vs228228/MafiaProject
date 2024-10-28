import React from 'react'
import './Input.css'

const Input = ({ type, name, label, required }) => {
    return (
        <div className='user-box'>
            <input
                type={type}
                name={name}
                required={required}
            />
            <label>{label}<span>{required ? '*' : ''}</span></label>
        </div>
    );
}

export default Input