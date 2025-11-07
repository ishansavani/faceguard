import React from "react";
import Icon from "../../../components/AppIcon";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="rounded-md bg-error bg-opacity-10 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon name="AlertCircle" className="h-5 w-5 text-error" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">
            {message}
          </p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 text-error hover:bg-error hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error"
              >
                <span className="sr-only">Dismiss</span>
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;