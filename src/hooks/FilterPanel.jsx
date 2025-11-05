import { useState, useEffect } from "react";
import { DatePicker, Select, Button, Drawer, Badge } from "antd";
import { Filter, RotateCcw } from "lucide-react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function FilterPanel({
  onFiltersChange,
  initialFilters = {},
  className = "",
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    createdDateRange: null,
    updatedDateRange: null,
    createdBy: null,
    ...initialFilters,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.status && filters.status !== "all") count++;
    if (filters.createdDateRange && filters.createdDateRange.length === 2)
      count++;
    if (filters.updatedDateRange && filters.updatedDateRange.length === 2)
      count++;
    if (filters.createdBy) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  // Status options
  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Deleted", value: "deleted" },
  ];

  // User options
  const userOptions = [
    { label: "John Doe", value: "john_doe" },
    { label: "Jane Smith", value: "jane_smith" },
    { label: "Admin", value: "admin" },
    { label: "System", value: "system" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: null,
      createdDateRange: null,
      updatedDateRange: null,
      createdBy: null,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      {/* Filter Button */}
      <div className={className}>
        <Badge count={activeFiltersCount} size="small">
          <Button
            icon={<Filter className="w-4 h-4" />}
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2"
          >
            Filters
          </Button>
        </Badge>
      </div>

      {/* Filter Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span>Filters</span>
            <Button
              type="text"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleClearFilters}
              className="flex items-center gap-1"
            >
              Clear All
            </Button>
          </div>
        }
        placement="right"
        width={400}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              placeholder="Select status"
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
              className="w-full"
              allowClear
            >
              {statusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Created Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created Date Range
            </label>
            <RangePicker
              value={filters.createdDateRange}
              onChange={(dates) =>
                handleFilterChange("createdDateRange", dates)
              }
              className="w-full"
              format="YYYY-MM-DD"
              placeholder={["Start Date", "End Date"]}
            />
          </div>

          {/* Updated Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Updated Date Range
            </label>
            <RangePicker
              value={filters.updatedDateRange}
              onChange={(dates) =>
                handleFilterChange("updatedDateRange", dates)
              }
              className="w-full"
              format="YYYY-MM-DD"
              placeholder={["Start Date", "End Date"]}
            />
          </div>

          {/* Created By Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created By User
            </label>
            <Select
              placeholder="Select user"
              value={filters.createdBy}
              onChange={(value) => handleFilterChange("createdBy", value)}
              className="w-full"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {userOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Active Filters ({activeFiltersCount})
              </h4>
              <div className="space-y-1 text-xs text-blue-600">
                {filters.status && filters.status !== "all" && (
                  <div>
                    Status:{" "}
                    {
                      statusOptions.find((s) => s.value === filters.status)
                        ?.label
                    }
                  </div>
                )}
                {filters.createdDateRange &&
                  filters.createdDateRange.length === 2 && (
                    <div>
                      Created:{" "}
                      {dayjs(filters.createdDateRange[0]).format(
                        "MMM DD, YYYY"
                      )}{" "}
                      -{" "}
                      {dayjs(filters.createdDateRange[1]).format(
                        "MMM DD, YYYY"
                      )}
                    </div>
                  )}
                {filters.updatedDateRange &&
                  filters.updatedDateRange.length === 2 && (
                    <div>
                      Updated:{" "}
                      {dayjs(filters.updatedDateRange[0]).format(
                        "MMM DD, YYYY"
                      )}{" "}
                      -{" "}
                      {dayjs(filters.updatedDateRange[1]).format(
                        "MMM DD, YYYY"
                      )}
                    </div>
                  )}
                {filters.createdBy && (
                  <div>
                    Created By:{" "}
                    {
                      userOptions.find((u) => u.value === filters.createdBy)
                        ?.label
                    }
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}
