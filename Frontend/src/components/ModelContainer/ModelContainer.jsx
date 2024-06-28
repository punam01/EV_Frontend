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
        </div>

    )
}

export default ModelContainer
