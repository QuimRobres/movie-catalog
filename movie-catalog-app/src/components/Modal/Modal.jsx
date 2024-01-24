// Modal.js
import React, { useState } from "react";
import Button from "../Button/Button";
import closeIcon from "../../img/icons/close.svg";
const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-cyberGreen pl-16 pr-16 pt-6 pb-8 rounded bg-cyberDarkBlue">
      <img
        className="absolute right-2.5 top-2.5"
        src={closeIcon}
        onClick={onClose}
      />
      <div className="flex flex-col justify-center items-center pt-6 pb-3">
        {children}
      </div>
    </div>
  );
};

export default Modal;
