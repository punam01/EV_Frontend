import React from 'react'
import './PersonalDetails.css'

const PersonalDetails = ({userData,handleChange,handleRegister}) => {
    return (
        <div className="personal-details-container">
            <div className='personal-details-container__item'>
                <label className='personal-details-container__title'>Enter you name</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} className='personal-details-container__input'/>
            </div>
            <div className='personal-details-container__item'>
                <label className='personal-details-container__title'>Enter your email</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} className='personal-details-container__input' />
            </div>
            <button className="personal-details-container__btn" onClick={handleRegister}>Register and Next</button>
        </div>
    )
}

export default PersonalDetails
