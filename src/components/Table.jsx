import React from "react";
import Icon from "./AppIcon";
import Image from "./AppImage";
import { Pagination } from "antd";

const Table = ({
  columns,
  data,
  isLoading,
  error,
  sortConfig = { key: null, direction: "ascending" },
  onSort,
  page,
  pageSize,
  total,
  onPageChange,
  onRetry,
  getRowClassName,
}) => {
  const renderHeader = () => {
    return (
      <thead className="bg-gray-50">
        <tr>
          {columns?.length > 0 &&
            columns?.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? "cursor-pointer select-none" : ""
                } ${column.headerClassName || ""}`}
                onClick={() => column.sortable && onSort(column.key)}
              >
                <div
                  className={`flex items-center space-x-1 ${
                    column.heaserTextAlign || ""
                  }`}
                >
                  <span>{column.label}</span>
                  {column.sortable && (
                    <span className="inline-flex flex-col">
                      <Icon
                        name="ChevronUp"
                        size={12}
                        className={`${
                          sortConfig.key === column.key &&
                          sortConfig.direction === "ascending"
                            ? "text-primary-600"
                            : "text-gray-400"
                        }`}
                      />
                      <Icon
                        name="ChevronDown"
                        size={12}
                        className={`${
                          sortConfig.key === column.key &&
                          sortConfig.direction === "descending"
                            ? "text-primary-600"
                            : "text-gray-400"
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
        {data.map((item, rowIndex) => (
          <tr
            key={item._id ?? item.id ?? rowIndex}
            className={`${
              getRowClassName ? getRowClassName(item) : ""
            } hover:bg-gray-50 focus-within:bg-gray-50 outline-none`}
            tabIndex="0"
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                  column.className || ""
                }`}
              >
                {column.render
                  ? column.render(item, rowIndex)
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
              <Icon name="AlertCircle" size={32} className="text-error mb-2" />
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
            className="p-4 text-center text-sm text-gray-500"
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/assets/no-data.svg"}
                alt="No Data"
                className="w-1/6"
              />
            </div>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <div
      id="table-scroll"
      className="overflow-x-auto"
      style={{
        scrollbarWidth: "thin", // Firefox
        scrollbarColor: "#888 transparent", // thumb | track
      }}
    >
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
      {data.length > 0 && (
        <Pagination
          align="end"
          className="p-4 space-x-2"
          current={page}
          size="small"
          showSizeChanger={false}
          showQuickJumper={false}
          total={total}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      )}

      {/* Inline scrollbar styling for WebKit browsers */}
      <style jsx>{`
        /* Chrome, Edge, Safari */
        #table-scroll::-webkit-scrollbar {
          height: 6px; /* horizontal scrollbar thickness */
        }
        #table-scroll::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 3px;
        }
        #table-scroll::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Table;
