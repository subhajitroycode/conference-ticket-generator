import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
    avatar: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const validateFile = (file) => {
    if (file.size > 512000) {
      setErrorMessage("File too large. Please upload a photo under 500KB.");
      return false;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Invalid file type. Please upload a JPG or PNG image.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/ticket-confirmation", {
      state: {
        userData: formData,
      },
      replace: true,
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragover" || e.type === "dragenter") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setErrorMessage("");

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log(file);

      if (validateFile(file)) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarPreview(imageUrl);
        setFormData({ ...formData, avatar: file });
      }
    }
  };

  const handleFile = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (validateFile(file)) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarPreview(imageUrl);
        setFormData({ ...formData, avatar: file });
      }
    }
  };

  const handleClick = () => {
    if (!avatarPreview) inputRef.current.click();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-5xl leading-tight text-center">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <p className="text-lg mt-2 mb-5 text-neutral-300 text-center">
        Secure your spot at next year's biggest coding conference.
      </p>

      <form className="flex flex-col mx-auto w-[358px]" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="avatar">
            Upload Avatar
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center h-28 bg-neutral-700/30 flex flex-col items-center justify-center relative ${
              dragActive ? "border-neutral-0" : "border-neutral-500"
            } ${!avatarPreview && "cursor-pointer hover:bg-neutral-700/70"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
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
              onChange={handleFile}
            />
          </div>
          <div className="mt-2.5 flex">
            {errorMessage ? (
              <>
                <img
                  src="/icon-info-error.svg"
                  alt="error info icon"
                  className="h-3.5 w-3.5"
                />
                <p className="text-xs ml-1.5 text-orange-500">{errorMessage}</p>
              </>
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
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder="Full Name"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
