import React from 'react';
import './BlogCard.css';

const BlogCard = ({ imageSrc, headline, description, authorName, date }) => {
    return (
        <>
            <div className="box">
                <div className="imgBox">
                    <img src={imageSrc}/>
                </div>
                <div className="content">
                    <div>
                        <h2>{headline}</h2>
                        <p>{description}</p>
                        <p>{date}</p>
                    </div>
                </div>
                <button className='btn'>
                    Read
                </button>
            </div>
        </>
    );
}

export default BlogCard;
