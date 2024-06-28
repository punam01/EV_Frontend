import React from 'react'
import './Button.css'
const Button = ({handleBtnClick,btnText}) => {
    return (
        <div className="button-design">
            <button className="button-design__btn" onClick={handleBtnClick}>{btnText}</button>
        </div>
    )
}

export default Button
