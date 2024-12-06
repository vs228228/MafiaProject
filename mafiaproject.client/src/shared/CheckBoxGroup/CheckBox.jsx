import React from 'react';
import './CheckBox.css';
import { useTranslation } from 'react-i18next';

const CheckBox = ({ siteRulesAccepted, privacyPolicyAccepted, handleSiteRulesChange, handlePrivacyPolicyChange }) => {
    const { t } = useTranslation();

    return (
        <div className='checkbox-group'>
            <label style={{ color: !siteRulesAccepted ? 'red' : 'inherit' }}>
                <input type='checkbox' onChange={handleSiteRulesChange} /> {t('Profile.AcceptRules')}
            </label>
            <label style={{ color: !privacyPolicyAccepted ? 'red' : 'inherit' }}>
                <input type='checkbox' onChange={handlePrivacyPolicyChange} /> {t('Profile.acceptPrivacyPolicy')}
            </label>
        </div>
    );
}

export default CheckBox;
