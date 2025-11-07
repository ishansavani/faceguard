import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateTimeInput = ({ value, onChange }) => {
  const [errors, setErrors] = useState({ startTime: "", endTime: "" });

  useEffect(() => {
    validateTimes();
  }, [value.startTime, value.endTime]);

  const validateTimes = () => {
    const now = dayjs();
    const start = dayjs(value.startTime);
    const end = dayjs(value.endTime);

    const newErrors = { startTime: "", endTime: "" };

    if (value.startTime && start.isBefore(now.add(1, "minute"))) {
      newErrors.startTime =
        "Start time must be at least 1 minute in the future.";
    }

    if (value.endTime && start.isAfter(end)) {
      newErrors.endTime = "End time must be after start time.";
    }

    setErrors(newErrors);
  };

  const handleChange = (key) => (date) => {
    onChange({ ...value, [key]: date ? date.toISOString() : "" });
  };

  return (
   <div className="flex gap-4 w-full">
  <div className="flex-1">
    <label className="text-sm font-medium block mb-1">
      Start Time <span className="text-red-500">*</span>
    </label>
    <DatePicker
      className="w-full h-[40px]"
      showTime
      format="YYYY-MM-DD HH:mm"
      value={value.startTime ? dayjs(value.startTime) : null}
      onChange={handleChange("startTime")}
      disabledDate={(current) =>
        current && current < dayjs().startOf("day")
      }
      required
    />
    {errors.startTime && (
      <div className="text-red-500 text-sm">{errors.startTime}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="text-sm font-medium block mb-1">
      End Time <span className="text-red-500">*</span>
    </label>
    <DatePicker
      className="w-full h-[40px]"
      showTime
      format="YYYY-MM-DD HH:mm"
      value={value.endTime ? dayjs(value.endTime) : null}
      onChange={handleChange("endTime")}
      disabledDate={(current) =>
        value.startTime
          ? current && current < dayjs(value.startTime).startOf("day")
          : current && current < dayjs().startOf("day")
      }
      required
    />
    {errors.endTime && (
      <div className="text-red-500 text-sm">{errors.endTime}</div>
    )}
  </div>
</div>

  );
};

export default DateTimeInput;
