import React, { useEffect, useState } from 'react';
import './UserProfilePage.css'
import { getUserByCustomId, updateUser } from '../../services/userServices';
function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="user-profile-page">
            <div className="tabs">
                <button className="tab-btn" onClick={() => setActiveTab('profile')}>Profile Settings</button>
                <button className="tab-btn" onClick={() => setActiveTab('history')}>Purchase History</button>
            </div>
            <div className="content">
                {activeTab === 'profile' ? (
                    <ProfileSettings />
                ) : (
                    <PurchaseHistory />
                )}
            </div>
        </div>
    );
}

function ProfileSettings() {
    const [userProfile, setUserProfile] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        address: '',
        pincode: '',
        custom_id:''
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchUserProfile();
        console.log(userProfile)
    }, []);

    useEffect(() => {
        console.log("UserProfile state updated:", userProfile);
    }, [userProfile]);

    const fetchUserProfile = async () => {
        try {
            const userId = localStorage.getItem('userId'); 
            console.log("user id",userId)
            if (userId) {
                const response = await getUserByCustomId(userId); 
                console.log("res",response)
                setUserProfile({
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email,
                    contact: response.contact,
                    address: response.address,
                    pincode: response.pincode,
                    custom_id: userId  
                });
                console.log(userProfile)
            } else {
                console.error('User ID not found in localStorage');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            const userId = localStorage.getItem('userId'); 
            if (userId) {
                const updatedUser = await updateUser(userId, userProfile); 
                console.log(updatedUser)
                setUserProfile({
                    first_name: updateUser.first_name,
                    last_name: updateUser.last_name,
                    email: updateUser.email,
                    contact: updateUser.contact,
                    address: updateUser.address,
                    pincode: updateUser.pincode,
                });
                setEditMode(false);
                console.log('Profile updated successfully!');
            } else {
                console.error('User ID not found in localStorage');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className='profile-settings'>
            <div className="group">
                <div className='form-label'>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={userProfile.first_name}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className='form-label'>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={userProfile.last_name}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className='form-label'>
                    <label>Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={userProfile.contact}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>
            <div className="group">
                <div className='form-label'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className='form-label'>
                    <label>Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={userProfile.pincode}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>
            <div className='form-label'>
                <label>Address</label>
                <textarea
                    name="address"
                    value={userProfile.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    rows={4}
                />
            </div>

            {!editMode ? (
                <button onClick={handleEditClick}>Edit</button>
            ) : (
                <button onClick={handleSaveClick}>Save</button>
            )}
        </div>
    );
}

function PurchaseHistory() {
    return <div>Purchase History</div>;
}

export default UserProfilePage;
