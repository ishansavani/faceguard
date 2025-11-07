import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../../../components/AppIcon";

const Toast = ({
  message,
  type = "info",
  duration = 5000,
  position = "bottom-right",
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Define icon and color based on type
  const toastConfig = {
    success: {
      icon: "CheckCircle",
      bgColor: "bg-success",
      textColor: "text-white",
    },
    error: {
      icon: "AlertCircle",
      bgColor: "bg-error",
      textColor: "text-white",
    },
    warning: {
      icon: "AlertTriangle",
      bgColor: "bg-warning",
      textColor: "text-white",
    },
    info: {
      icon: "Info",
      bgColor: "bg-info",
      textColor: "text-white",
    },
  };

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  // Auto-dismiss toast after duration
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for fade-out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for fade-out animation
  };

  const { icon, bgColor, textColor } = toastConfig[type] || toastConfig.info;

  return createPortal(
    <div
      className={`fixed ${
        positionClasses[position]
      } z-50 flex items-center max-w-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`${bgColor} ${textColor} rounded-lg shadow-lg flex items-center p-4 min-w-[300px]`}
      >
        <div className="flex-shrink-0 mr-3">
          <Icon name={icon} size={20} />
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 ml-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full"
          onClick={handleClose}
          aria-label="Close"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Toast;