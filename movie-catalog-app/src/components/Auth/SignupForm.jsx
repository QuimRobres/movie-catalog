import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { authServices } from "../../infraestructure/services/auth.services";

const SignUpForm = ({ onClick }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateEmail = () => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(formData.email);
  };

  const validarPassword = () => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return regexPassword.test(formData.password);
  };

  const validateForm = () => {
    let canSend = true;
    const newErrors = { ...formErrors };
    if (formData.name.length === 0) {
      newErrors.name = "This field is mandatory";
      canSend = false;
    } else {
      newErrors.name = "";
    }
    if (!formData.email.length) {
      newErrors.email = "This field is mandatory";
      canSend = false;
    } else if (!validateEmail()) {
      newErrors.email = "Wrong email format";
      canSend = false;
    } else {
      newErrors.email = "";
    }
    if (formData.password.length === 0) {
      newErrors.password = "This field is mandatory";
      canSend = false;
    } else if (!validarPassword()) {
      newErrors.password = "Wrong password format";
      canSend = false;
    } else {
      newErrors.password = "";
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
      canSend = false;
    } else {
      newErrors.repeatPassword = "";
    }
    setFormErrors(newErrors);
    return canSend;
  };

  const handleFormChange = (value, type) => {
    setFormData((data) => ({
      ...data,
      [type]: value,
    }));
  };

  const handleSignup = () => {
    if (validateForm()) {
      console.log("okays");
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      authServices()
        .signup(userData)
        .then(() => {
          navigate("/");
        });
    } else {
      return;
    }
  };

  return (
    <div className="flex pl-4 pr-4 flex-col border-2 border-cyberBlue rounded-xl items-center w-3/4 pt-16 pb-8  shadow-lg  shadow-cyberBlue gap-8 bg-cyberDarkBlue">
      <Input
        type="text"
        handleChange={(value) => handleFormChange(value, "name")}
        label="Full Name"
        errorMessage={formErrors.name}
      />
      <Input
        type="text"
        handleChange={(value) => handleFormChange(value, "email")}
        label="E-mail"
        errorMessage={formErrors.email}
      />

      <Input
        type="password"
        handleChange={(value) => handleFormChange(value, "password")}
        label="Password"
        subtitle="Min 6 characters. ex: Abcd16. "
        errorMessage={formErrors.password}
      />
      <Input
        type="password"
        handleChange={(value) => handleFormChange(value, "repeatPassword")}
        label="Repeat Password"
        errorMessage={formErrors.repeatPassword}
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
