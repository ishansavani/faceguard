import { Avatar, Dropdown } from "antd";
import { AppContext } from "../context/AppContext";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import constants from "../utils/constants";
import Icon from "../components/AppIcon";

function Header({ variant = "default", className = "", ...props }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contextValues = React.useContext(AppContext);
  const location = useLocation();

  const navItems = [
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

  const isCompact = variant === "compact";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const avatarMenu = {
    items: [
      {
        key: "userInfo",
        label: (
          <Link
            to={constants.route.profile}
            className="rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
          >
            <Icon name="User" size={18} className="mr-2" />
            Profile
          </Link>
        ),
      },
      {
        key: "signout",
        label: (
          <Link
            to={constants.route.login}
            className="rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
            onClick={() => {
              setIsMobileMenuOpen(false);
              contextValues.setStore(
                {
                  userdata: null,
                  authToken: null,
                  isAdmin: false,
                },
                true,
              );
            }}
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Log out
          </Link>
        ),
      },
    ],
  };

  return (
    <header
      className={`
        md:bg-white bg-primary-700 border-b border-gray-200 relative
        ${isCompact ? "py-2" : "h-16 pt-2"}
        ${className}
      `}
      {...props}
    >
      <div className="max-w-full mx-auto px-4 sm:px-2 lg:px-2">
        <div className="flex justify-between items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link
              to={constants.route.deepfakeAnalysis}
              className="flex items-center"
            >
              <div className="md:hidden text-primary-600 mr-2">
                <img
                  className="w-auto h-10"
                  src="/assets/logo/logo3.png"
                  alt="FaceGuard Logo"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className={`${isMobileMenuOpen ? "hidden" : "block"} 
              md:flex justify-center`}
            >
              <div
                className="px-3 py-2 rounded-md text-sm md:text-lg 
                   font-medium flex items-center md:text-primary-700 text-white bg-primary-50"
              >
                <Icon
                  name={contextValues?.store?.headerData?.icon}
                  size={16}
                  className="mr-1.5"
                />
                {contextValues.store?.headerData?.title || "Dashboard"}
              </div>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Log Out */}
            <div className="relative hidden md:block">
              <Dropdown
                menu={avatarMenu}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Avatar
                  alt="user avatar"
                  size="small"
                  className="cursor-pointer bg-gray-500 dark:bg-gray-700"
                >
                  {contextValues?.store?.userdata?.email?.[0]?.toUpperCase()}
                </Avatar>
              </Dropdown>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="p-2 md:text-gray-500 text-gray-300 rounded-md hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-label="Main menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 mx-2 rounded-md text-base font-medium flex items-center transition-colors duration-200
                  ${
                    location.pathname === item.path
                      ? "text-primary-700 bg-primary-100 border-l-4 border-primary-600"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} size={18} className="mr-3" />
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                to={constants.route.login}
                className="px-4 py-3 mx-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 flex items-center transition-colors duration-200"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  contextValues.setStore(
                    {
                      userdata: null,
                      authToken: null,
                      isAdmin: false,
                    },
                    true,
                  );
                }}
              >
                <Icon name="LogOut" size={18} className="mr-3" />
                Log out
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
