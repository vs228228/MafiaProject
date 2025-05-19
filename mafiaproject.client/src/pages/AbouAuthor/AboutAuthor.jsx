import React from 'react'
import './AboutAuthor.css'
import developers from './developer.js';
import { useTranslation } from 'react-i18next';

const AboutAuthor = () => {
  const { t } = useTranslation();

  return (
    <div className='developer_page'>
      {developers.map((developer) => (
        <div key={developer.id} className="developer_block_text-img">
          <div className="developer_photo">
            <img src={developer.photo} alt={developer.fullName} />
          </div>
          <div className="about_developer">
          <h3>{t(`developers.${developer.id}.fullName`)}</h3>
            <p>{t(`developers.${developer.id}.position`)}</p>
            <p>{t(`developers.${developer.id}.age`)}</p>
            <p>{t(`developers.${developer.id}.text`)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AboutAuthor