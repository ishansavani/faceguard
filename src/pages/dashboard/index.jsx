import React, { useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Utils from "../../utils/utils";
import StatCard from "./components/StatCard";
import Layout from "../../layout/Layout";

const EmptyChartState = ({ message }) => (
  <div className="h-[350px] flex items-center justify-center text-gray-400 italic">
    {message}
  </div>
);

const Dashboard = () => {
  const contextValues = React.useContext(AppContext);
  const DASHBOARD_FILTER_KEY = "dashboard_filters";
  const [dateRange, setDateRange] = useState("today");
  const [customRange, setCustomRange] = useState({ start: null, end: null });

  useEffect(() => {
    contextValues.setStore({
      headerData: { title: "Dashboard", icon: "LayoutDashboard" },
    });
  }, [contextValues]);

  const formatCurrency = (amount) => {
    if (amount == null || isNaN(amount)) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(DASHBOARD_FILTER_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setDateRange(parsed.dateRange || "today");
      if (parsed.dateRange === "custom" && parsed.customRange) {
        setCustomRange(parsed.customRange);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      DASHBOARD_FILTER_KEY,
      JSON.stringify({
        dateRange,
        customRange,
      })
    );
  }, [dateRange, customRange]);

  return (
    <Layout>
      {/* Filters */}
      <div className="text-3xl font-semibold mb-4">
        Welcome, {Utils.getNameFromEmail(contextValues?.store?.userdata?.email)}
      </div>

      <div className="space-y-4">
        {/* Quick Cards (always from global data) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <>
            <StatCard title="Total Orders" value={0} icon="ShoppingCart" />
            <StatCard
              title="Total Revenue"
              value={formatCurrency(0)}
              icon="DollarSign"
            />
            <StatCard
              title="Total Expense"
              value={formatCurrency(0)}
              icon="CreditCard"
            />
            <StatCard title="Net Profit" value={0} icon="TrendingUp" />
          </>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2>Sales Distribution</h2>
            <EmptyChartState message="No sales distribution data available" />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="mb-4">Revenue Over Time</h2>
            <EmptyChartState message="No revenue data available" />
          </div>
        </div>

        {/* Product Table (product-specific if selected, else global) */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <h2>Product Sales Breakdown</h2>
          <EmptyChartState message="No product sales data available" />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
