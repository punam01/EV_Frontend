import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Zipcode = ({ closePopUp, handleZipcodeChange}) => {
    const [zipInput, setZipInput] = useState('');
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopUp();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef, closePopUp]);

    const handleConfirm = () => {
        if (zipInput.trim() === '') {
            toast.error('Zip code cannot be empty', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            handleZipcodeChange(zipInput);
            closePopUp();
        }
    };

    return (
        <>
        <ToastContainer />
            <div className="popup-container">
                <div className="popup" ref={popupRef}>
                    <h3>Zip Code</h3>
                    <input 
                        type='text' 
                        value={zipInput} 
                        onChange={(e) => setZipInput(e.target.value)}
                        className='' 
                    />
                    <button type='submit' onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </>
    );
};

export default Zipcode;
