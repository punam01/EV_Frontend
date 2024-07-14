import React from 'react'
import './ModelContainer.css'
const ModelContainer = ({availableModels,selectedModel,handleModelChange}) => {
    return (
        <div className="model-container">
            <h3 className="model-container__title">Select Model</h3>
            <div className="model-container__item">
                {availableModels.map((model, index) => (
                    <div
                        key={index}
                        className={`model-container__card ${selectedModel === model ? 'demo-booking-details__model-card--active' : ''}`}
                        onClick={() => handleModelChange(model)}
                    >
                        <p className="model-container__text">{model}</p>
                    </div>
                ))}
            </div>
            {selectedModel && <p className='model-container__card__note-text'><strong>Note: </strong>In case a specific car model is not available, please contact our customer service team for <br/>assistance</p>}
        </div>

    )
}

export default ModelContainer
