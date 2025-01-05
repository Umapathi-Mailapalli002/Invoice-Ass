import React from "react";
import { Button, Alert } from "./index";

const ReusableForm = ({
  formContainerClass,
  inputContainerClass,
  inputClass,
  labelClass,
  switchToText,
  formFields,
  submitHandler,
  buttonText,
  switchText,
  error,
  switchAction,
  ...props
}) => {
  return (
    <form
      onSubmit={submitHandler}
      className={`space-y-5 ${formContainerClass}`}
      {...props}
    >
      {error && <Alert alertType="Error" message={error} />}
      {formFields.map((field, index) => (
        <div key={index} className={inputContainerClass}>
          <label
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass}`}
          >
            {field.label}
          </label>
          <input
            autoComplete="off"
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            className={`${inputClass} w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100`}
            aria-autocomplete="false"
            required={field.required}
            {...field.inputProps}
          />
        </div>
      ))}

      <Button
        type="submit"
        className={`w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition dark:bg-blue-700`}
      >
        {buttonText}
      </Button>

      <div className="mt-4 text-center">
        <p className="text-sm">
          {switchText}{" "}
          <button
            type="button"
            onClick={switchAction}
            className="dark:text-teal-500 text-blue-600 hover:underline"
          >
            {switchToText}
          </button>
        </p>
      </div>
    </form>
  );
};

export default ReusableForm;
