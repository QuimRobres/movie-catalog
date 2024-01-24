// Modal.js
import React from "react";
import closeIcon from "../../img/icons/close.svg";

const Modal = ({ onClose, children }) => {
  return (
    <div className="absolute top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-cyberTurqoise pl-16 pr-16 pt-6 pb-8 rounded bg-cyberDarkBlue">
      <img
        className="absolute right-2.5 top-2.5"
        src={closeIcon}
        onClick={onClose}
        alT="close icon"
      />
      <div className="flex flex-col justify-center items-center pt-6 pb-3">
        {children}
      </div>
    </div>
  );
};

export default Modal;
