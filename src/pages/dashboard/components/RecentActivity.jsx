import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const RecentActivity = ({ activities = [], isLoading = false }) => {
  // Format timestamp to relative time
  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay}d ago`;
    } else if (diffHour > 0) {
      return `${diffHour}h ago`;
    } else if (diffMin > 0) {
      return `${diffMin}m ago`;
    } else {
      return "Just now";
    }
  };

  // Get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "user_signup":
        return "UserPlus";
      case "user_login":
        return "LogIn";
      case "content_created":
        return "FileText";
      case "content_updated":
        return "Edit";
      case "system_alert":
        return "Bell";
      default:
        return "Activity";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        {isLoading ? (
          // Loading skeleton
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="px-4 py-3 border-b border-gray-200 flex items-start">
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="ml-3 flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))
        ) : activities.length === 0 ? (
          // Empty state
          <div className="px-4 py-8 text-center text-gray-500">
            <Icon name="Calendar" size={24} className="mx-auto mb-2 text-gray-400" />
            <p>No recent activity to display</p>
          </div>
        ) : (
          // Activity list
          activities.map((activity) => (
            <div
              key={activity.id}
              className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start">
                {activity.avatar ? (
                  <Image
                    src={activity.avatar}
                    alt={activity.user}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <Icon name={getActivityIcon(activity.type)} size={16} className="text-primary-600" />
                  </div>
                )}
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{activity.details}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 mt-auto">
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 focus:outline-none focus:underline">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;