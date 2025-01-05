import React, { useState } from "react";
import {Loading, ReusableForm} from "../index";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../auth/userAuthSlice";
const LoginModal = ({ onSwitchToSignup }) => {
  const dispatch = useDispatch();
 const state = useSelector(
    (state) => state.userAuth
  );
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (state.loading) {
    return (
      <Loading/>
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const {identifier, password} = formData;
    dispatch(login({username: identifier, email: identifier, password: password}))
    document.cookie = `accessToken=${state.token}`
  };

  const formFields = [
    {
      label: "Email Or Username",
      type: "text",
      name: "identifier",
      value: formData.identifier,
      onChange: handleInputChange,
      placeholder: "Enter email or username",
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
      <h2 className="text-2xl font-bold my-3 text-center">Sign in to your account</h2>

      <ReusableForm
        formFields={formFields}
        submitHandler={handleSubmit}
        buttonText="Sign In"
        switchText="Don't have an account?"
        switchToText="signup"
        switchAction={onSwitchToSignup}
        error={state.error}
      />
    </div>
  );
};

export default LoginModal;
