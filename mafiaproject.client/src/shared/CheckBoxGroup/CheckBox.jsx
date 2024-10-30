import React from 'react'
import './CheckBox.css'

const CheckBox = ({ siteRulesAccepted, privacyPolicyAccepted, handleSiteRulesChange, handlePrivacyPolicyChange }) => {
    return (
        <div className='checkbox-group'>
            <label style={{ color: !siteRulesAccepted ? 'red' : 'inherit' }}>
                <input type='checkbox' onChange={handleSiteRulesChange} /> Я принимаю правила сайта
            </label>
            <label style={{ color: !privacyPolicyAccepted ? 'red' : 'inherit' }}>
                <input type='checkbox' onChange={handlePrivacyPolicyChange} /> Я принимаю политику конфиденциальности
            </label>
        </div>
    );
}

export default CheckBox