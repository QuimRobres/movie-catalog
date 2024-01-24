import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { authServices } from "../../infraestructure/services/auth.services";
const LoginForm = ({ onClick }) => {
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
      .then(() => {
        console.log("test kimo success");
      });
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
    </div>
  );
};

export default LoginForm;
