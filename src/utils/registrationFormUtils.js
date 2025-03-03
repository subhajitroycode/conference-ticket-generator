const validateFile = (file, setErrorMessage, errorMessage) => {
  if (file.size > 512000) {
    setErrorMessage({
      ...errorMessage,
      avatar: "File too large. Please upload a photo under 500KB.",
    });
    return false;
  }

  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!validTypes.includes(file.type)) {
    setErrorMessage({
      ...errorMessage,
      avatar: "Invalid file type. Please upload a JPG or PNG image.",
    });
    return false;
  }

  return true;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (formData, setErrorMessage) => {
  const { fullName, email, githubUsername, avatar } = formData;
  const newErrors = {
    avatar: "",
    fullName: "",
    email: "",
    githubUsername: "",
  };

  if (!fullName) {
    newErrors.fullName = "Please enter your Full Name.";
  }

  if (!email) {
    newErrors.email = "Please enter your Email Address.";
  } else if (!validateEmail(email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!githubUsername) {
    newErrors.githubUsername = "Please enter your GitHub Username.";
  }

  if (!avatar) {
    newErrors.avatar = "Please upload your photo.";
  }

  setErrorMessage(newErrors);

  // Check if there are any errors
  return !Object.values(newErrors).some((error) => error !== "");
};

const handleDrag = (e, setDragActive) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.type === "dragover" || e.type === "dragenter") setDragActive(true);
  else if (e.type === "dragleave") setDragActive(false);
};

const handleDrop = (
  e,
  setDragActive,
  setErrorMessage,
  errorMessage,
  setAvatarPreview,
  setFormData,
  formData
) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  setErrorMessage({ ...errorMessage, avatar: "" });

  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];

    if (validateFile(file, setErrorMessage, { avatar: "" })) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setFormData({ ...formData, avatar: file });
    }
  }
};

const handleFile = (
  e,
  setErrorMessage,
  setAvatarPreview,
  setFormData,
  formData
) => {
  e.preventDefault();
  setErrorMessage("");

  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    if (validateFile(file, setErrorMessage, { avatar: "" })) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setFormData({ ...formData, avatar: file });
    }
  }
};

export { validateForm, handleDrag, handleDrop, handleFile };
