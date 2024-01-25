import React from "react";

const Input = ({
  type = "text",
  handleChange,
  inputValue,
  label,
  subtitle,
  errorMessage,
}) => {
  const onChange = (e) => {
    if (handleChange) handleChange(e.target.value);
  };

  return (
    <div className="w-3/4">
      <div className="pb-2">
        <p className=" text-xl">{label}</p>
        <p className="text-xs">{subtitle}</p>
      </div>
      <div className="appearance-none border border-cyberPink rounded p-1 w-full">
        <input
          className="outline-0 p-1"
          type={type}
          onChange={(e) => onChange(e)}
          value={inputValue}
          style={{ background: "none", width: "100%" }}
        />
      </div>
      {errorMessage ? <p className="absolute text-sm">{errorMessage}</p> : null}
    </div>
  );
};

export default Input;
