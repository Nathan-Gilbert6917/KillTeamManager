import React from "react";

import './Modal.css';

import Button from '../Button/Button';
import OutsideAlerter from "../OutsideAlerter/OutsideAlerter";

const Modal = ({ title, handleClose, show, children }) => {
  const showHideClassName = show ? "modal-container display-block" : "modal-container display-none";

  return (
    <div className={showHideClassName}>
      <OutsideAlerter handleClick={() => handleClose()}>
        <section className="modal-main-container">
        <div className="modal-header-container">
          <h1 className="modal-title">{title}</h1>
        </div>
        <div className="modal-content-container">
          {children}
        </div>  
        <div className="modal-footer-container">
          <Button label="Done" handleClick={() => handleClose()}/>
          <Button label="Cancel" isInverted handleClick={() => handleClose()}/>
        </div>
        </section>
      </OutsideAlerter>
    </div>
  );
};

export default Modal;