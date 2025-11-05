import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import constants from "../utils/constants";
import Icon from "../components/AppIcon";

function Sidebar({ variant = "expanded", className = "", onToggle, ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(variant === "collapsed");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    categories.forEach((category) => {
      category.items.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            if (location.pathname.startsWith(child.path)) {
              setOpenDropdown(item.name);
            }
          });
        }
      });
    });
  }, [location.pathname]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) onToggle(newState);
  };

  // Toggle mobile sidebar
  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const categories = [
    {
      name: "Overview",
      items: [
        {
          name: "Dashboard",
          icon: "LayoutDashboard",
          path: constants.route.dashboard,
        },
      ],
    },
    {
      name: "Account",
      items: [
        {
          name: "Profile",
          icon: "User",
          path: constants.route.profile,
        },
      ],
    },
  ];

  // Sidebar width classes based on state
  const sidebarWidthClass = isCollapsed ? "w-16" : "w-64";

  // Mobile sidebar classes
  const mobileSidebarClasses = isMobileOpen
    ? "translate-x-0 ease-out"
    : "-translate-x-full ease-in";

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const renderNavItems = (items) => {
    return items.map((item) => {
      const isActive = location.pathname === item.path;
      const hasChildren = item.children && item.children.length > 0;
      const isDropdownOpen = openDropdown === item.name;

      return (
        <div key={item.name}>
          {hasChildren ? (
            <button
              type="button"
              onClick={() => handleDropdownToggle(item.name)}
              className={`
              flex items-center px-2 py-2 w-full text-sm font-medium rounded-md
              ${
                isDropdownOpen
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
              }
              ${isCollapsed ? "justify-center" : ""}
            `}
            >
              <Icon
                name={item.icon}
                size={20}
                className={
                  isDropdownOpen ? "text-primary-600" : "text-gray-500"
                }
              />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
              {!isCollapsed && (
                <Icon
                  name={isDropdownOpen ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="ml-auto text-gray-400"
                />
              )}
            </button>
          ) : (
            <Link
              to={item.path}
              className={`
              flex items-center px-2 py-2 text-sm font-medium rounded-md
              ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
              }
              ${isCollapsed ? "justify-center" : ""}
            `}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                name={item.icon}
                size={20}
                className={isActive ? "text-primary-600" : "text-gray-500"}
              />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          )}

          {/* Render children only when dropdown open */}
          {hasChildren && isDropdownOpen && !isCollapsed && (
            <div className="ml-6 mt-1 space-y-1">
              {renderNavItems(item.children)}
            </div>
          )}
        </div>
      );
    });
  };

  // Render categories with their items
  const renderCategories = () => {
    return categories.map((category) => (
      <div key={category.name} className={`mb-6`}>
        {!isCollapsed && (
          <h3
            className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
              category.name === "Account" ? "mt-6" : ""
            }`}
          >
            {category.name}
          </h3>
        )}
        <div className={`mt-2 space-y-1 ${isCollapsed ? "space-y-2" : ""}`}>
          {renderNavItems(category.items)}
        </div>
      </div>
    ));
  };

  // Desktop sidebar
  const desktopSidebar = (
    <div
      className={`
        hidden md:flex md:flex-col md:fixed md:inset-y-0 
        bg-white border-r border-gray-200
        transition-width duration-300 ease-in-out
        ${sidebarWidthClass}
        ${className}
      `}
      {...props}
    >
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Sidebar header with logo */}
        <div
          className={`flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <Link to={constants.route.dashboard} className="flex items-center">
            <img
              src="/assets/images/logo/eternitai-x-icon.jpeg"
              alt="Logo"
              className="w-8 h-8 rounded-full"
            />
            {!isCollapsed && (
              <span className="ml-2 text-xl font-bold text-gray-900">
                EternitAI-X Admin
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {variant === "with-categories" && renderCategories()}
        </nav>

        {/* Sidebar footer with collapse button */}
        <div
          className={`p-4 border-t border-gray-200 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar
  const mobileSidebar = (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={toggleMobile}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`
          md:hidden fixed inset-y-0 left-0 flex flex-col z-30 w-72 max-w-xs
          bg-white shadow-xl transform transition-transform duration-300
          ${mobileSidebarClasses}
        `}
      >
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Mobile sidebar header */}
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <Link to={constants.route.dashboard} className="flex items-center">
              <div className="text-primary-600">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 9C8 7.34315 9.34315 6 11 6H21C22.6569 6 24 7.34315 24 9V23C24 24.6569 22.6569 26 21 26H11C9.34315 26 8 24.6569 8 23V9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 13C14 11.8954 14.8954 11 16 11C17.1046 11 18 11.8954 18 13V23C18 24.1046 17.1046 25 16 25C14.8954 25 14 24.1046 14 23V13Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                AppDash
              </span>
            </Link>
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={toggleMobile}
              aria-label="Close sidebar"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {variant === "with-categories" && renderCategories()}
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed bottom-4 left-4 z-10">
        <button
          type="button"
          className="p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={toggleMobile}
          aria-label="Open sidebar"
        >
          <Icon name="Menu" size={24} />
        </button>
      </div>
    </>
  );

  return (
    <>
      {desktopSidebar}
      {variant === "mobile" && mobileSidebar}
    </>
  );
}

export default Sidebar;
