import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBagHeartFill } from 'react-icons/bs'
import './Vehicles.css'
import Card from '../../components/AdvFilter/Card'
const Vehicles = ({result}) => {
    return (
        <section className='vehicles-card-container'>
            {result}
        </section>
    )
}

export default Vehicles
