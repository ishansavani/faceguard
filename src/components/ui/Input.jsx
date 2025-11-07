import React, { forwardRef, useState } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  icon,
  error,
  hint,
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  id,
  name,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const uniqueId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  const inputClasses = `
    block w-full rounded-md shadow-sm
    ${error ? 'border-error focus:border-error focus:ring-error' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'}
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
    ${readOnly ? 'bg-gray-50 cursor-default' : ''}
    ${icon ? 'pl-10' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={uniqueId} 
          className={`block text-sm font-medium mb-1 ${error ? 'text-error' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name={icon} className={`${error ? 'text-error' : 'text-gray-400'}`} size={20} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          id={uniqueId}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error || hint ? `${uniqueId}-description` : undefined}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon name="AlertCircle" className="text-error" size={20} />
          </div>
        )}
      </div>
      
      {(error || hint) && (
        <p 
          id={`${uniqueId}-description`} 
          className={`mt-1 text-sm ${error ? 'text-error' : 'text-gray-500'}`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;