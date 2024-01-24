import React from "react";

const Button = ({ text, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className=" bg-cyberPurple p-2 pl-8 pr-8 rounded flex justify-center items-center w-150px"
      onClick={handleClick}
    >
      <p className="font-bold text-center">{text}</p>
    </div>
  );
};

export default Button;
