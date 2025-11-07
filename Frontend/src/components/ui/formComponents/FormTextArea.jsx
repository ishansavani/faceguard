import React from "react";

const FormTextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
}) => (
  <div>
    {label && (
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
    )}
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full border p-2 rounded shadow-sm ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1 focus:shadow-[0_0_0_2px_rgba(64,150,255,0.1)]">
        {error}
      </p>
    )}
  </div>
);

export default FormTextArea;
