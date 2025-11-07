import React from "react";
import Icon from "../../../components/AppIcon";

const SystemHealth = ({ metrics = [], isLoading = false }) => {
  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "good":
        return { icon: "CheckCircle", color: "text-success" };
      case "warning":
        return { icon: "AlertTriangle", color: "text-warning" };
      case "critical":
        return { icon: "AlertOctagon", color: "text-error" };
      default:
        return { icon: "HelpCircle", color: "text-gray-400" };
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900">System Health</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          // Loading skeleton
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))
        ) : metrics.length === 0 ? (
          // Empty state
          <div className="px-4 py-8 text-center text-gray-500">
            <Icon name="Activity" size={24} className="mx-auto mb-2 text-gray-400" />
            <p>No system health metrics available</p>
          </div>
        ) : (
          // Metrics list
          metrics.map((metric, index) => {
            const { icon, color } = getStatusInfo(metric.status);
            
            return (
              <div
                key={index}
                className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Icon name={icon} size={16} className={`${color} mr-2`} />
                    <span className="text-sm font-medium text-gray-900">
                      {metric.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {metric.value}
                    {metric.unit}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === "critical" ?"bg-error"
                        : metric.status === "warning" ?"bg-warning" :"bg-success"
                    }`}
                    style={{ width: `${Math.min(metric.value, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 mt-auto">
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 focus:outline-none focus:underline">
          View detailed system report
        </button>
      </div>
    </div>
  );
};

export default SystemHealth;