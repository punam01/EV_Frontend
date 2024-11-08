import React from 'react';

const Autopilot = ({ handleAutopilotChange }) => {
  return (
    <div className="filter">
      <label htmlFor="autopilot">Autopilot:</label>
      <input
        style={{display:'block'}}
        type="checkbox"
        id="autopilot"
        name="autopilot"
        onChange={handleAutopilotChange}
      />
    </div>
  );
};

export default Autopilot;
