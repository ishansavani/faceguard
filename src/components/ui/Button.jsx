import React from "react";
import { Button } from "antd";

const CommonButton = ({
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  title = "",
  ...props
}) => {
  const sizeMap = {
    xs: "small",
    sm: "small",
    md: "middle",
    lg: "large",
    xl: "large",
  };

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors duration-200";

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base",
  };

  const variantClasses = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-400",
    outline:
      "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:text-primary-300 disabled:border-primary-300",
    ghost:
      "bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 disabled:text-primary-300",
    danger:
      "bg-error text-white hover:bg-error-700 focus:ring-2 focus:ring-offset-2 focus:ring-error disabled:bg-error-300",
  };

  const disabledClasses = disabled ? "cursor-not-allowed opacity-60" : "";

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${disabledClasses}
    ${className}
  `;

  return (
    <Button
      type={type}
      disabled={disabled}
      size={sizeMap[size] || "middle"}
      className={`${buttonClasses} flex justify-center items-center`}
      {...props}
    >
      {title}
    </Button>
  );
};

export default CommonButton;
