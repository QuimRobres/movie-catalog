import React from "react";

const Input = ({ type = "text", handleChange, inputValue, label }) => {
  const onChange = (e) => {
    if (handleChange) handleChange(e.target.value);
  };

  return (
    <div className="w-3/4">
      <p className="pb-2 text-xl">{label}</p>
      <div className="appearance-none border border-cyberPink rounded p-1 w-full">
        <input
          className="outline-0 p-1"
          type={type}
          onChange={(e) => onChange(e)}
          value={inputValue}
          style={{ background: "none", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Input;
