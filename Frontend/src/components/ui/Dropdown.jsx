import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  variant = 'single',
  withSearch = false,
  withGroups = false,
  withIcons = false,
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && withSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, withSearch]);
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };
  
  const handleOptionClick = (option) => {
    if (variant === 'multi') {
      const newValue = Array.isArray(value) ? [...value] : [];
      const optionIndex = newValue.findIndex(item => item.value === option.value);
      
      if (optionIndex > -1) {
        newValue.splice(optionIndex, 1);
      } else {
        newValue.push(option);
      }
      
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };
  
  const isOptionSelected = (option) => {
    if (variant === 'multi') {
      return Array.isArray(value) && value.some(item => item.value === option.value);
    }
    return value && value.value === option.value;
  };
  
  const filteredOptions = withSearch && searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;
  
  // Group options if needed
  const groupedOptions = withGroups
    ? filteredOptions.reduce((acc, option) => {
        const group = option.group || 'Other';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(option);
        return acc;
      }, {})
    : null;
  
  const renderOptions = () => {
    if (withGroups) {
      return Object.entries(groupedOptions).map(([group, groupOptions]) => (
        <div key={group}>
          <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
            {group}
          </div>
          {groupOptions.map(renderOption)}
        </div>
      ));
    }
    
    return filteredOptions.map(renderOption);
  };
  
  const renderOption = (option) => {
    const isSelected = isOptionSelected(option);
    
    return (
      <div
        key={option.value}
        className={`
          px-4 py-2 cursor-pointer flex items-center
          ${isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}
        `}
        onClick={() => handleOptionClick(option)}
        role="option"
        aria-selected={isSelected}
      >
        {variant === 'multi' && (
          <div className="mr-2 flex-shrink-0">
            <div className={`w-4 h-4 border rounded flex items-center justify-center ${isSelected ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
              {isSelected && <Icon name="Check" size={12} className="text-white" />}
            </div>
          </div>
        )}
        
        {withIcons && option.icon && (
          <Icon name={option.icon} size={18} className="mr-2 text-gray-500" />
        )}
        
        <span className="truncate">{option.label}</span>
      </div>
    );
  };
  
  const renderValue = () => {
    if (!value) {
      return <span className="text-gray-500">{placeholder}</span>;
    }
    
    if (variant === 'multi' && Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-gray-500">{placeholder}</span>;
      }
      
      if (value.length === 1) {
        return <span>{value[0].label}</span>;
      }
      
      return <span>{value.length} items selected</span>;
    }
    
    return <span>{value.label}</span>;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`
          relative bg-white border rounded-md shadow-sm px-3 py-2 cursor-pointer
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'}
          ${error ? 'border-error' : 'border-gray-300'}
          ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
        `}
        onClick={toggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="truncate">{renderValue()}</div>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={18} 
            className="text-gray-400 ml-2" 
          />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {withSearch && (
            <div className="sticky top-0 p-2 bg-white border-b border-gray-200">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md pl-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
            </div>
          )}
          
          <div role="listbox" className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              renderOptions()
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;