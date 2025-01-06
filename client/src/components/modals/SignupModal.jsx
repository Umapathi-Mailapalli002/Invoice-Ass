import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../auth/userAuthSlice";
import { Loading, ReusableForm } from "../index";
const SignupModal = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const state = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (state.loading) {
    return <Loading />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username: formData.username, password: formData.password, email: formData.email }));
  };

  const formFields = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: formData.username,
      onChange: handleInputChange,
      placeholder: "Enter username",
      required: true,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleInputChange,
      placeholder: "Enter email",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formData.password,
      onChange: handleInputChange,
      placeholder: "Enter password",
      required: true,
    },
  ];

  return (
    <div className="w-full max-w-md relative bg-gradient-to-br from-blue-200 via-cyan-100 to-blue-300 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-gray-100 rounded-lg shadow-lg py-5 px-6 z-10">
      <h2 className="text-2xl font-bold mb-2 text-center">Create account</h2>
      <div className="flex justify-center mb-2">
      </div>

      <ReusableForm
        formFields={formFields}
        submitHandler={handleSubmit}
        buttonText="Sign Up"
        switchText="Already have an account?"
        switchAction={onSwitchToLogin}
        switchToText="login"
        error={state.error}
      />
    </div>
  );
};

export default SignupModal;
