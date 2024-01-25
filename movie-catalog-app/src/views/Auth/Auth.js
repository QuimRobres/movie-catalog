import React, { useState } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import SignUpForm from "../../components/Auth/SignupForm";

const Auth = () => {
  const [signupForm, setSignupForm] = useState(false);

  return (
    <div className="flex justify-center items-center mt-quarterTopScreen pb-8">
      {signupForm ? (
        <SignUpForm onClick={() => setSignupForm(false)} />
      ) : (
        <LoginForm onClick={() => setSignupForm(true)} />
      )}
    </div>
  );
};

export default Auth;
