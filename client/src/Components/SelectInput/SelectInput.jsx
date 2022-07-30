import React from 'react';

import './SelectBar.css';

const SelectBar = ({value, data, handleOnChange}) => {

  const arrayOptions = data;

  return (
    <>  
      <select className="select-bar-input" value={value} onChange={(e) => handleOnChange(e)}>
        {arrayOptions.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.text}
            </option> 
          )
        })}
      </select>
    </>
  )
}

export default SelectBar;
