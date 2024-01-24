import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { authServices } from "../../infraestructure/services/auth.services";
import Modal from "../../components/Modal/Modal";

const LoginForm = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (value, type) => {
    setFormData((data) => ({
      ...data,
      [type]: value,
    }));
  };

  const login = () => {
    console.log("formdata", formData);
    authServices()
      .login(formData)
      .then((res) => {
        if (res !== "success") {
          setModalMessage(res);
          setShowModal(true);
        }
        console.log("test kimo success");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="flex pl-4 pr-4 flex-col border-2 border-cyberBlue rounded-xl items-center w-3/4 pt-16 pb-8  shadow-lg  shadow-cyberBlue gap-8 bg-cyberDarkBlue">
      <Input
        type="text"
        handleChange={(value) => handleFormChange(value, "email")}
        label="E-mail"
      />
      <Input
        type="password"
        handleChange={(value) => handleFormChange(value, "password")}
        label="Password"
      />
      <div className="pt-8">
        <Button text="Login" onClick={login} />
        <p className="text-center pt-2 text-sm">Don't have an account?</p>
        <p
          className="text-center text-sm underline cursor-pointer"
          onClick={onClick}
        >
          Register Now!
        </p>
      </div>
      {showModal ? (
        <Modal onClose={handleCloseModal}>
          <p className="text-center w-150px text-lg font-bold">
            {modalMessage}
          </p>
        </Modal>
      ) : null}
    </div>
  );
};

export default LoginForm;
