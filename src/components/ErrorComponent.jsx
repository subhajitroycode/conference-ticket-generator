import React from "react";

const ErrorComponent = ({ errorText }) => {
  return (
    <>
      <img
        src="/icon-info-error.svg"
        alt="error info icon"
        className="h-3.5 w-3.5"
      />
      <p className="text-xs ml-1.5 text-orange-500">{errorText}</p>
    </>
  );
};

export default ErrorComponent;
