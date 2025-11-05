import React, { useRef } from "react";
import Icon from "../../../components/AppIcon";

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className = "",
}) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="Search" size={18} className="text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="block w-full pl-10 pr-10 py-2 rounded-md focus:ring-0 sm:text-sm hover:border-[#4096ff] border-gray-300 focus:border-[#1677ff] focus:shadow-[0_0_0_2px_rgba(64,150,255,0.1)]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;