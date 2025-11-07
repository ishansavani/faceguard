import React from "react";
import { Input } from "antd";

const FormInput = ({
  label,
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {type === "password" ? (
        <Input.Password
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2 ${error
            ? "border-error focus:ring-error focus:border-error"
            : "border-gray-300"
            } text-lg rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 focus:ring-2 focus:outline-none`}
          {...props}
        />
      ) : (
        <Input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={` w-full px-3 py-2  ${error
            ? "border-error focus:ring-error focus:border-error"
            : "border-gray-300"
            } text-lg rounded-md shadow-sm  focus:border-primary-500 focus:ring-0 focus:outline-none`}
          {...props}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
