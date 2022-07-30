import React from 'react';

import './ToggleSwitch.css';

const ToggleSwitch = ({isOn, handleToggle}) => {
  return (
    <>
      <label className="toggle-switch">
        <input type="checkbox" 
               className="switch-checkbox" 
               checked={isOn}
               onChange={handleToggle}
        />
        <span className="switch-slider"></span>
      </label>
    </>
  )
}

export default ToggleSwitch;
