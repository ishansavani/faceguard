import React from "react";
import Icon from "../../../components/AppIcon";

const ActionButton = ({
  label,
  icon,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500",
    danger: "bg-error text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-success text-white hover:bg-green-700 focus:ring-green-500",
    warning: "bg-warning text-white hover:bg-amber-600 focus:ring-amber-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type="button"
      className={`
        inline-flex items-center justify-center font-medium rounded-md
        shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 16 : size === "md" ? 18 : 20} className={label ? "mr-2" : ""} />}
      {label}
    </button>
  );
};

export default ActionButton;