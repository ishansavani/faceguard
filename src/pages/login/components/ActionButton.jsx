import React from "react";
import Icon from "../../../components/AppIcon";

const ActionButton = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  // Button variants
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-error hover:bg-rose-700 text-white",
  };

  // Button sizes
  const sizes = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""} 
        flex justify-center items-center rounded-md font-medium 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        transition-colors duration-200 ease-in-out
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Icon name="Loader2" className="animate-spin mr-2" size={18} />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ActionButton;