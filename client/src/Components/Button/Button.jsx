import React from "react";
import "./Button.css";

const Button = ({
  label,
  icon,
  isCircular,
  isInverted,
  showShadow,
  disabled,
  iconAlt,
  handleClick,
}) => {
  let buttonClass = isCircular ? "button-style circular" : "button-style";
  let buttonIconClass = icon ? "button-icon" : "";
  if (isInverted) {
    buttonClass += " invert";
  }

  if (showShadow) {
    buttonClass += " shadow";
  }

  return (
    <button onClick={handleClick} className={buttonClass} disabled={disabled}>
      <div className="inner-button">
        <img className={buttonIconClass} alt={iconAlt} src={icon} />
        <span className="button-label">{label}</span>
      </div>
    </button>
  );
};

export default Button;
