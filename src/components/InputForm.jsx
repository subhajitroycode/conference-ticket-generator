import React from "react";

const InputForm = ({ id, name, value, placeholder, onChange }) => {
  return (
    <>
      <label htmlFor={id} className="mb-1.5">
        {name}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder || ""}
        className="px-2.5 py-2 bg-neutral-700/30 border border-neutral-500 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-500 rounded-lg mb-4 hover:bg-neutral-700/70 cursor-pointer"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputForm;
