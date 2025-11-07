import React from "react";
import Icon from "../../../components/AppIcon";

const DataTable = ({
  columns,
  data,
  isLoading,
  error,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  onRetry,
  emptyMessage,
}) => {
  // Function to render table header with sort indicators
  const renderHeader = () => {
    return (
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? "cursor-pointer select-none" : ""
                }`}
              onClick={() => column.sortable && onSort(column.key)}
            >
              <div className="flex items-center space-x-1">
                <span>{column.label}</span>
                {column.sortable && (
                  <span className="inline-flex flex-col">
                    <Icon
                      name="ChevronUp"
                      size={12}
                      className={`${sortConfig.key === column.key &&
                          sortConfig.direction === "ascending" ? "text-primary-600" : "text-gray-400"
                        }`}
                    />
                    <Icon
                      name="ChevronDown"
                      size={12}
                      className={`${sortConfig.key === column.key &&
                          sortConfig.direction === "descending" ? "text-primary-600" : "text-gray-400"
                        } -mt-1`}
                    />
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderRows = () => {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr
            key={item.id}
            className="hover:bg-gray-50 focus-within:bg-gray-50 outline-none"
            tabIndex="0"
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {column.render
                  ? column.render(item)
                  : typeof item[column.key] === "string" ||
                    typeof item[column.key] === "number"
                    ? item[column.key]
                    : JSON.stringify(item[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  // Function to render loading skeleton
  const renderLoadingSkeleton = () => {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(3)].map((_, index) => (
          <tr key={index}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  // Function to render error state
  const renderError = () => {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-12 text-center text-sm text-gray-500"
          >
            <div className="flex flex-col items-center justify-center">
              <Icon
                name="AlertCircle"
                size={32}
                className="text-error mb-2"
              />
              <p className="text-gray-700 font-medium mb-2">{error}</p>
              <button
                onClick={onRetry}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Icon name="RefreshCw" size={16} className="mr-1.5" />
                Retry
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    );
  };

  // Function to render empty state
  const renderEmpty = () => {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-12 text-center text-sm text-gray-500"
          >
            <div className="flex flex-col items-center justify-center">
              <Icon
                name="Search"
                size={32}
                className="text-gray-400 mb-2"
              />
              <p className="text-gray-700 font-medium mb-2">{emptyMessage}</p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {renderHeader()}
        {isLoading
          ? renderLoadingSkeleton()
          : error
            ? renderError()
            : data.length === 0
              ? renderEmpty()
              : renderRows()}
      </table>
    </div>
  );
};

export default DataTable;