import React from "react";
import Icon from "../../../components/AppIcon";

const StatCard = ({
  title,
  value,
  suffix = "",
  icon,
  trend = 0,
  isLoading = false,
  onClick
}) => {
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Determine trend icon and color
  const trendIcon = trend >= 0 ? "TrendingUp" : "TrendingDown";
  const trendColor = trend >= 0 ? "text-success" : "text-error";

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
          ) : (
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {formatNumber(value)}
              {suffix}
            </p>
          )}
        </div>
        <div className="p-2 bg-primary-50 rounded-lg">
          <Icon name={icon} size={20} className="text-primary-600" />
        </div>
      </div>

      {/* {isLoading ? (
        <div className="h-5 w-16 bg-gray-200 animate-pulse rounded mt-3"></div>
      ) : (
        <div className="mt-3 flex items-center">
          <Icon
            name={trendIcon}
            size={16}
            className={trendColor}
          />
          <span className={`ml-1 text-sm font-medium ${trendColor}`}>
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
          <span className="ml-1 text-sm text-gray-500">vs last period</span>
        </div>
      )} */}
    </div>
  );
};

export default StatCard;