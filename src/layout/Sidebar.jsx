import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import constants from "../utils/constants";
import Icon from "../components/AppIcon";

const Sidebar = ({ className = "", ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "DeepFake Analysis",
      icon: "ScanFace",
      path: constants.route.deepfakeAnalysis,
    },
    {
      name: "History",
      icon: "History",
      path: constants.route.history,
    },
    {
      name: "Profile",
      icon: "User",
      path: constants.route.profile,
    },
  ];

  return (
    <div
      className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 
        bg-white border-r border-gray-200
        transition-width duration-300 ease-in-out w-64 ${className}`}
      {...props}
    >
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-primary-700">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(constants.route.deepfakeAnalysis)}
          >
            <img
              className="w-auto h-10"
              src="/assets/logo/logo3.png"
              alt="FaceGuard Logo"
            />
            <span className="ml-2 text-xl font-semibold text-gray-300 uppercase">
              FaceGuard
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-4 py-2 mt-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-gray-300 hover:bg-primary-600 hover:text-white"
                }`}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  className={`${
                    isActive ? "text-white" : "text-gray-300"
                  } transition-colors duration-200`}
                />
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
