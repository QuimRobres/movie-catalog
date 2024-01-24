import React from "react";

const Textarea = ({ handleChange, inputValue, label }) => {
  const onChange = (e) => {
    if (handleChange) handleChange(e.target.value);
  };
  return (
    <div className=" w-full">
      <p className="pb-2 text-xl">{label}</p>
      <textarea
        className="outline-0 p-1 appearance-none border border border-cyberPink rounded p-1 w-3/4"
        rows="12"
        style={{ background: "none", resize: "none", width: "100%" }}
        maxLength={600}
        onChange={(e) => onChange(e)}
        value={inputValue}
      />
    </div>
  );
};

export default Textarea;
