import React from "react";

const Button = ({ text, onClick, isDisabled }) => {
  const handleClick = () => {
    if (onClick && !isDisabled) onClick();
  };

  return (
    <div
      className={`bg-cyberPurple p-2 pl-8 pr-8 rounded flex justify-center items-center ${
        isDisabled ? "opacity-35 " : ""
      } `}
      onClick={handleClick}
    >
      <p className="font-bold text-center">{text}</p>
    </div>
  );
};

export default Button;
