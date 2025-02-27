import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
    avatar: null,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/ticket-confirmation", {
      state: {
        userData: formData,
      },
      replace: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        placeholder="Full Name"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
