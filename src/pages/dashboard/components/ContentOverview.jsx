import React from "react";
import Icon from "../../../components/AppIcon";

const ContentOverview = ({ data, isLoading = false }) => {
  // Content type definitions with icons
  const contentTypes = [
    { key: "articles", label: "Articles", icon: "FileText" },
    { key: "videos", label: "Videos", icon: "Video" },
    { key: "downloads", label: "Downloads", icon: "Download" },
    { key: "products", label: "Products", icon: "ShoppingBag" },
  ];

  // Calculate total for percentage
  const calculateTotal = () => {
    if (!data) return 0;
    return Object.values(data).reduce((sum, value) => sum + value, 0);
  };

  const total = calculateTotal();

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900">Content Overview</h3>
      </div>
      
      <div className="flex-1 p-4">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded mb-6"></div>
            {contentTypes.map((type, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="h-8 w-8 rounded bg-gray-200 animate-pulse mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !data ? (
          // Empty state
          <div className="text-center text-gray-500 py-8">
            <Icon name="FileQuestion" size={24} className="mx-auto mb-2 text-gray-400" />
            <p>No content data available</p>
          </div>
        ) : (
          // Content overview
          <>
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-900 mb-1">
                Total Content Items: {total.toLocaleString()}
              </h4>
              <p className="text-sm text-gray-500">
                Distribution across content types
              </p>
            </div>
            
            <div className="space-y-4">
              {contentTypes.map((type) => {
                const value = data[type.key] || 0;
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                
                return (
                  <div key={type.key}>
                    <div className="flex items-center mb-1">
                      <div className="p-2 bg-primary-50 rounded mr-3">
                        <Icon name={type.icon} size={16} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-medium text-gray-900">
                            {type.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            {value.toLocaleString()} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary-600"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 mt-auto">
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 focus:outline-none focus:underline">
          Manage content
        </button>
      </div>
    </div>
  );
};

export default ContentOverview;