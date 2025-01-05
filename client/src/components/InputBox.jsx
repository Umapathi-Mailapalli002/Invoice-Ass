import React, { useId } from "react";

const InputBox = React.forwardRef(function InputBox(
  {
    className = "w-full",
    containerClass = "",
    labelClass="",
    type = "text",
    label,
    value,
    onChange,
    placeholder = "",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <>
      <div className={containerClass}>
        {label && (
          <label
            className={`m-2 font-medium text-gray-700 dark:text-gray-300 ${labelClass}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input autoComplete="off"
          type={type}
          className={`p-2 placeholder:text-sm placeholder:italic h-12 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none ${className}`}
          {...props}
          ref={ref}
          id={id}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </>
  );
});

export default InputBox;
