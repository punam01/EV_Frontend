import React from 'react'
import "./ZipcodeContainer.css"
import Button from '../Button/Button'

const ZipcodeContainer = ({zipCode,setZipCode,handleFetchLocations}) => {
    return (
        <div className="zipcode-container">
            <label className="zipcode-container__title">Enter Zip Code:</label>
            <input
                type="text"
                className="zipcode-container__input"
                value={zipCode}
                placeholder='eg. 400101'
                onChange={(e) => setZipCode(e.target.value)}
            />
            <Button handleBtnClick={handleFetchLocations} btnText="Find vendors Locations"/>
        </div>
    )
}

export default ZipcodeContainer
