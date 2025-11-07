import React from 'react';

function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  header,
  footer,
  ...props
}) {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 overflow-hidden';
  
  const variantClasses = {
    default: '',
    interactive: 'transition-shadow hover:shadow-md cursor-pointer',
    compact: 'p-3',
    elevated: 'shadow-md',
  };
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant] || ''}
    ${variant !== 'compact' && variant !== 'interactive' ? 'p-4' : ''}
    ${className}
  `;

  const cardContent = (
    <>
      {header && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          {typeof header === 'string' ? (
            <h3 className="text-lg font-medium text-gray-900">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}
      
      <div className={variant === 'compact' || header || footer ? 'p-4' : ''}>
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </>
  );

  if (variant === 'interactive') {
    return (
      <div 
        className={classes}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick && onClick(e);
          }
        }}
        {...props}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      {cardContent}
    </div>
  );
}

export default Card;