import React, { useState } from 'react';

const UserData = ({ userData, setUserData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <div className="email">
                <label>Email:</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="name">
                <label>Name:</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className="zip-code">
                <label>Zip Code:</label>
                <input type="text" name="zipCode" value={userData.zipCode} onChange={handleChange} />
            </div>
        </>
    );
};

export default UserData;
