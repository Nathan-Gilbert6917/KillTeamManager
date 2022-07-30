import React, {useState} from 'react'

import './Checkbox.css';

const Checkbox = ({label, checked}) => {

  const [isChecked, setIsChecked] = useState(checked);

  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <span aria-hidden="true"/>
        <svg
          className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={isChecked ? "#fff" : "none"}
        />
      </svg>
      <span>
        {label}
      </span>
    </label>
  )
}

export default Checkbox;