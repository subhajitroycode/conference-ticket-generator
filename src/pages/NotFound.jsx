import React from "react";

const NotFound = () => {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">ERROR 404</h1>
      <h3 className="text-lg">Whoops! looks like you've lost 😶‍🌫️</h3>
      <a href="/" className="error-link">
        Return to registration
      </a>
    </div>
  );
};

export default NotFound;
