import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

const PhoneNumberInput = ({ phone, setPhone, onLogin, loading }) => {
  return (
    <div className='verify-container'>
      <div className='icon'>
        <BsTelephoneFill size={30} />
      </div>
      <label className="label-text" htmlFor='phone'>Verify your phone number</label>
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={setPhone}
        id='phone'
        className="phone-input"
      />
      <button onClick={onLogin}>
        {loading && <CgSpinner className='animate-spin' />}
        <span>Send code via SMS</span>
      </button>
    </div>
  );
};

export default PhoneNumberInput;
