import React from 'react'
import './LocationContainer.css'

const LocationContainer = ({ locations, selectedLocation, handleLocationSelect }) => {
    console.log(locations)
    return (
        <div className="location-container">
            <h3 className='location-container__title'>Select demo ride location</h3>
            <div className="location-container__item">
                {locations? locations.map(location => (
                    <div
                        key={location._id}
                        className={`location-container__card ${selectedLocation === location ? 'location-container__card--active' : ''}`}
                        onClick={() => handleLocationSelect(location)}
                    >
                        <p className="location-container__name">
                            {location.name},
                            {location.city},
                            {location.address}
                        </p>
                        <p className="location-container__contact">
                            {location.contact.replace('+','')}
                        </p>
                    </div>
                )):
                (<div className="error">
                    No location found!
                </div>) }
            </div>
        </div>
    )
}

export default LocationContainer
