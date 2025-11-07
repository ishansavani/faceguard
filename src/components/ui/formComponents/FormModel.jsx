import React from "react";

const FormModal = ({
  title,
  children,
  onClose,
  onSubmit,
  disabled,
  submitText = "Save",
  open = false,
}) =>
  open && (
    <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[100vh] custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        {children}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );

export default FormModal;
