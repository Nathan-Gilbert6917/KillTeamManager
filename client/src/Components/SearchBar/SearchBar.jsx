import React from "react";

import "./SearchBar.css";

import MagnifyingGlassIcon from "./magnifying-glass-solid.svg";

const SearchBar = ({ handleOnChange, handleClick }) => {
  return (
    <div className="search-bar-container">
      <span className="search-bar-icon">
        <img src={MagnifyingGlassIcon} alt="Search Icon" />
      </span>

      <input
        type="text"
        className="search-bar-text-field"
        placeholder="Search..."
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default SearchBar;
