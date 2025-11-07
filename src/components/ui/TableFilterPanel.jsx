import { Select, DatePicker, Button } from "antd";
import { Filter } from "lucide-react";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

export default function TableFilterPanel({ filters, onFiltersChange }) {
    const handleChange = (key, value) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    return (
        <div className="flex items-center gap-4">
            <Select
                value={filters.dateRangeType}
                onChange={(val) => handleChange("dateRangeType", val)}
                style={{ width: 150 }}
            >
                <Select.Option value="today">Today</Select.Option>
                <Select.Option value="yesterday">Yesterday</Select.Option>
                <Select.Option value="thisWeek">This Week</Select.Option>
                <Select.Option value="thisMonth">This Month</Select.Option>
                <Select.Option value="thisYear">This Year</Select.Option>
                <Select.Option value="allTime">All Time</Select.Option>
                <Select.Option value="custom">Custom Range</Select.Option>
            </Select>

            {filters.dateRangeType === "custom" && (
                <RangePicker
                    format="YYYY-MM-DD"
                    value={filters.customDateRange}
                    onChange={(dates) => {
                        if (dates && dates.length === 2) {
                            handleChange("customDateRange", dates);
                        }
                    }}
                />
            )}
        </div>
    );
}