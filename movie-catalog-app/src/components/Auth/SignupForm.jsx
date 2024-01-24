import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { authServices } from "../../infraestructure/services/auth.services";

const SignUpForm = ({ onClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const handleFormChange = (value, type) => {
    setFormData((data) => ({
      ...data,
      [type]: value,
    }));
  };

  const handleSignup = () => {
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    authServices()
      .signup(userData)
      .then(() => {
        console.log("signed up");
      });
  };
  return (
    <div className="flex pl-4 pr-4 flex-col border-2 border-cyberBlue rounded-xl items-center w-3/4 pt-16 pb-8  shadow-lg  shadow-cyberBlue gap-8 bg-cyberDarkBlue">
      <Input
        type="text"
        handleChange={(value) => handleFormChange(value, "name")}
        label="Full Name"
      />
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
      <Input
        type="password"
        handleChange={(value) => handleFormChange(value, "repeatPSassword")}
        label="Repeat Password"
      />
      <div className="pt-8">
        <Button text="Signup" onClick={handleSignup} />
        <p className="text-center pt-2 text-sm">Already have an account?</p>
        <p
          className="text-center text-sm underline cursor-pointer"
          onClick={onClick}
        >
          Login in!
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
