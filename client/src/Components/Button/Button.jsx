import React from "react";
import "./Button.css";

const Button = ({
  label,
  icon,
  isCircular,
  isInverted,
  showShadow,
  disabled,
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
      <span className={buttonIconClass}>{icon}</span>
      <span className="button-label">{label}</span>
    </button>
  );
};

export default Button;
