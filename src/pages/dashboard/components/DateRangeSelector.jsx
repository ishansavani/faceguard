import React, { useEffect, useState } from "react";
import { Select, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const dateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'This Year', value: 'thisYear' },
  { label: 'All Time', value: 'allTime' },
  { label: 'Custom Range', value: 'custom' },
];

const DateRangeSelector = ({ selected, onChange, customRange, onCustomRangeChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile if < 768px
    };
    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateRangeChange = (value) => {
    onChange(value);
  };

  const handleCustomRangeChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      onCustomRangeChange({
        start: start.toISOString(),
        end: end.toISOString(),
      });
    } else {
      onCustomRangeChange({ start: null, end: null });
    }
  };

  return (
    <>
      <style>
        {`
        .mobile-range-picker .ant-picker-panels {
          display: flex;
          flex-direction: column;
          width: 70vw;
          max-width: 400px;
        }
        .desktop-range-picker .ant-picker-panels {
          flex-direction: row;
        }
      `}
      </style>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
        <Select
          value={selected}
          onChange={handleDateRangeChange}
          options={dateOptions}
          className="w-full sm:w-[180px]"
          getPopupContainer={(trigger) => trigger.parentNode}
        />
        {selected === "custom" && (
          <RangePicker
            className="w-full sm:w-auto"
            onChange={handleCustomRangeChange}
            value={
              customRange.start && customRange.end
                ? [moment(customRange.start), moment(customRange.end)]
                : null
            }
            getPopupContainer={() => document.body}
            placement="bottomLeft"
            dropdownClassName={isMobile ? "mobile-range-picker" : "desktop-range-picker"}
          />
        )}
      </div>
    </>
  );
};

export default DateRangeSelector;