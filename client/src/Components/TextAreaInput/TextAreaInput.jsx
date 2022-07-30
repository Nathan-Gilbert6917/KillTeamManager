import React from 'react';
import './TextArea.css';

const TextArea = ({label, type, placeholder, name, required}) => {
  
  return (  
    <div className="textarea-container">
      <label for={name}>{label}</label>
      <textarea
        className="textarea-field"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default TextArea;