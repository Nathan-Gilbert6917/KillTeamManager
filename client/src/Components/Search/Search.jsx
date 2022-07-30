import React from 'react';

import './SearchBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const SearchBar = ({handleOnChange, handleClick}) => {

  return (
    <div className="search-bar-container">
      <span className="search-bar-icon">
        <FontAwesomeIcon  icon={solid('magnifying-glass')} onClick={handleClick}/>
      </span>
      <input
        type="text"
        className="search-bar-text-field"
        placeholder="Search..."
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  )
}

export default SearchBar;