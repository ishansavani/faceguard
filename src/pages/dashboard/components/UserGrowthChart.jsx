import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UserGrowthChart = ({ data = [], isLoading = false }) => {
  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="text-sm font-medium text-gray-900">{formatDate(label)}</p>
          <p className="text-sm text-primary-600">
            <span className="font-medium">Users:</span> {formatNumber(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900">User Growth</h3>
      </div>
      
      <div className="flex-1 p-4">
        {isLoading ? (
          // Loading skeleton
          <div className="animate-pulse">
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : data.length === 0 ? (
          // Empty state
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>No user growth data available</p>
          </div>
        ) : (
          // Chart
          <>
            <div className="mb-4">
              <h4 className="text-base font-medium text-gray-900">
                User Growth Trend
              </h4>
              <p className="text-sm text-gray-500">
                Total users over time
              </p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    tickFormatter={(value) => formatNumber(value)}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={{ stroke: "#E5E7EB" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserGrowthChart;