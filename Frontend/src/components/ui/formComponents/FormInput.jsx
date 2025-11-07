import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  min,
  step, // <-- add step prop
}) => (
  <div>
    {label && (
      <label htmlFor={name} className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
    )}
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`
        block w-full rounded-md shadow-sm 
        focus:ring-[#4096ff] focus:ring-0 focus:outline-none
        hover:border-[#4096ff]
        ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-[#1677ff] focus:shadow-[0_0_0_2px_rgba(64,150,255,0.1)]"
        }
      `}
      min={min}
      step={step} // <-- pass step to input
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormInput;
