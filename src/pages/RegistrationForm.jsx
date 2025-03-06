import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleDrop,
  handleDrag,
  handleFile,
  validateForm,
  getTicketNumber,
} from "../utils/registrationFormUtils";
import InputForm from "../components/InputForm";
import ErrorComponent from "../components/ErrorComponent";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
    avatar: null,
    ticketNumber: getTicketNumber(),
  });
  const [errorMessage, setErrorMessage] = useState({
    avatar: "",
    fullName: "",
    email: "",
    githubUsername: "",
  });
  const [dragActive, setDragActive] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formData, setErrorMessage)) {
      navigate("/ticket-confirmation", {
        state: {
          userData: formData,
        },
        replace: true,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-5xl leading-14 text-center">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <p className="text-lg mt-2 mb-5 text-neutral-300 text-center">
        Secure your spot at next year's biggest coding conference.
      </p>

      <form className="flex flex-col mx-auto w-[358px]" onSubmit={handleSubmit}>
        {/* Drag & Drop upload */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="avatar">
            Upload Avatar
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center h-28 bg-neutral-700/30 flex flex-col items-center justify-center relative ${
              dragActive ? "border-neutral-0" : "border-neutral-500"
            } ${!avatarPreview && "cursor-pointer hover:bg-neutral-700/70"}`}
            onDragEnter={(e) => handleDrag(e, setDragActive)}
            onDragLeave={(e) => handleDrag(e, setDragActive)}
            onDragOver={(e) => handleDrag(e, setDragActive)}
            onDrop={(e) =>
              handleDrop(
                e,
                setDragActive,
                setErrorMessage,
                errorMessage,
                setAvatarPreview,
                setFormData,
                formData
              )
            }
            onClick={() => {
              if (!avatarPreview) inputRef.current.click();
            }}
          >
            {avatarPreview ? (
              <div className="relative w-full h-full">
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="h-11 w-11 object-cover rounded-xl mx-auto outline outline-offset-0 outline-neutral-400 mb-2.5"
                />
                <div>
                  <button
                    className="mr-1 py-1 px-2 text-xs bg-neutral-500/30 rounded-sm cursor-pointer hover:bg-neutral-500/40"
                    onClick={(e) => {
                      e.preventDefault();
                      setAvatarPreview(null);
                      setFormData({ ...formData, avatar: null });
                      inputRef.current.value = "";
                    }}
                  >
                    Remove image
                  </button>
                  <button
                    className="ml-1 py-1 px-2 text-xs bg-neutral-500/30 rounded-sm cursor-pointer hover:bg-neutral-500/40"
                    onClick={(e) => {
                      e.preventDefault();
                      inputRef.current.click();
                    }}
                  >
                    Change image
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-neutral-500/30 h-11 w-11 flex justify-center items-center rounded-xl mb-2.5 outline outline-offset-0 outline-neutral-400">
                  <img src="/icon-upload.svg" alt="icon for photo upload" />
                </div>
                <p className="text-neutral-500">
                  Drag and drop or click to upload
                </p>
              </>
            )}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              accept=".jpeg, .jpg, .png"
              onChange={(e) =>
                handleFile(
                  e,
                  setErrorMessage,
                  setAvatarPreview,
                  setFormData,
                  formData
                )
              }
            />
          </div>
          <div className="mt-2.5 flex">
            {errorMessage.avatar ? (
              <ErrorComponent errorText={errorMessage.avatar} />
            ) : (
              <>
                <img src="/icon-info.svg" alt="info icon" />
                <p className="text-xs ml-1.5 text-neutral-300">
                  Upload your photo (JPG or PNG, max size: 500KB).
                </p>
              </>
            )}
          </div>
        </div>
        {/* Full Name */}
        <InputForm
          id="fullName"
          name="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        {errorMessage.fullName && (
          <div className="flex -mt-2.5">
            <ErrorComponent errorText={errorMessage.fullName} />
          </div>
        )}
        {/* Email */}
        <InputForm
          id="email"
          name="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@email.com"
        />
        {errorMessage.email && (
          <div className="flex -mt-2.5">
            <ErrorComponent errorText={errorMessage.email} />
          </div>
        )}
        {/* GitHub Username */}
        <InputForm
          id="githubUsername"
          name="GitHub Username"
          value={formData.githubUsername}
          onChange={(e) =>
            setFormData({ ...formData, githubUsername: e.target.value })
          }
          placeholder="@yourusername"
        />
        {errorMessage.githubUsername && (
          <div className="flex -mt-2.5">
            <ErrorComponent errorText={errorMessage.githubUsername} />
          </div>
        )}
        {/* Submit Button */}
        <button
          className="bg-orange-500 text-neutral-900 font-black rounded-lg py-2 cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-neutral-500 hover:bg-orange-700"
          type="submit"
        >
          Generate My Ticket
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
