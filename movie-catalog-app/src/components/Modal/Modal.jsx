// Modal.js
import React, { useState } from "react";
import Button from "../Button/Button";

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };
  return (
    <div className="absolute top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-cyberGreen pl-16 pr-16 pt-8 pb-8 rounded bg-cyberDarkBlue">
      <div className="flex flex-col justify-center items-center gap-8">
        {children}
        <Button text="Close" onClick={closeModal} />
      </div>
    </div>
  );
};

export default Modal;
