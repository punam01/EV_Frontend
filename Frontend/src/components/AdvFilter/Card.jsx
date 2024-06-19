import React from 'react'

const Card = ({img,title,star,reviews,prevPrice}) => {
  return (
    <section className="vehicles-item">
      <img className="card-img" src={img} alt="" />
      <div className="card-details">
        <p className="card-title">{title}</p>
        <p className="card-title">${prevPrice}</p>
      </div>
    </section>
  )
}

export default Card
