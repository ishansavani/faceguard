import React from "react";
import { Select } from "antd";

const { Option } = Select;

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  placeholder = "Select an option",
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        id={name}
        value={value || undefined}
        onChange={(val) => onChange({ target: { name, value: val } })}
        className="w-full h-11 !shadow-sm"
        placeholder={placeholder}
        status={error ? "error" : ""}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
      {error && (
        <p className="text-red-500 text-sm mt-1 focus:shadow-[0_0_0_2px_rgba(64,150,255,0.1)]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
