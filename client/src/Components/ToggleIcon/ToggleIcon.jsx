import React, { useState } from "react";
import "./ToggleIcon.css";

const ToggleIcon = ({ initialState = true, trueState, falseState, onClick }) => {
  const [state, setState] = useState(initialState);
  
  const handleToggle = () => {
    setState(!state);
    onClick();
  }

  console.log(initialState, trueState, falseState);

  return (
    <span onClick={() => handleToggle()}>
      { state ? 
        {trueState} : 
        {falseState}
      }
    </span>
  );
}

export default ToggleIcon;