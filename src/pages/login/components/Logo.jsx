import React from "react";
import Icon from "../../../components/AppIcon";

const Logo = ({ variant = "dark" }) => {
  const textColor = variant === "dark" ? "text-gray-900" : "text-white";
  const iconColor = variant === "dark" ? "#4F46E5" : "#ffffff";

  return (
    <div className="flex items-center">
      <div className="mr-2">
        <Icon name="LayoutDashboard" size={28} color={iconColor} />
      </div>
      <span className={`text-xl font-bold ${textColor}`}>Next Admin</span>
    </div>
  );
};

export default Logo;