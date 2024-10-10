import React from 'react'
import './AboutAuthor.css'
import developers from './developer.js';


const AboutAuthor = () => {
  return (
    <div className='developer_page'>
      {developers.map((developer) => (
        <div key={developer.id} className="developer_block_text-img">
          <div className="developer_photo">
            <img src={developer.photo} alt={developer.fullName} />
          </div>
          <div className="about_developer">
            <h3>{developer.fullName}</h3>
            <p>{developer.position}</p>
            <p>{developer.age}</p>
            <p>{developer.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AboutAuthor