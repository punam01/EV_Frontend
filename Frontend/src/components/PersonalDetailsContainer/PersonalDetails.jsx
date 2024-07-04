import React from 'react'
import './PersonalDetails.css'

const PersonalDetails = ({ userData, handleChange, handleRegister, disabled }) => {
    return (
        <div className="personal-details-container">
            <div className="personal-details-container__userdets">
                <div className='personal-details-container__item'>
                    <label className='personal-details-container__title'>First name</label>
                    <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} disabled={disabled} />
                </div>
                <div className='personal-details-container__item'>
                    <label className='personal-details-container__title'>Last name</label>
                    <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} disabled={disabled} />
                </div>
            </div>
            <div className='personal-details-container__email'>
                    <label className='personal-details-container__title'>Email</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} disabled={disabled} />
                    <p className='phone-verification-container__note'><span>Note:</span> Please use your active Email address for your order to receive all related information.</p>
            </div>
            <div className="personal-details-container__btn-container">
                <button className="personal-details-container__btn" onClick={handleRegister}>Register and Next</button>
            </div>
        </div>
    )
}

export default PersonalDetails
