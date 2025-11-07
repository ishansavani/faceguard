import React, { useRef } from 'react';
import { Typography, Image } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const FormImageUpload = ({ label, onChange, fileName, previewUrl, onRemove }) => {
  const inputRef = useRef(null);

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Reset value so same file can be re-selected
      inputRef.current.click();    // Open file dialog
    }
  };

  return (
    <div className="mb-1 relative ">
      <label className="text-sm font-medium block mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Hidden native file input */}
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />

      {/* Upload Button */}
      <button
        type="button"
        onClick={triggerFileInput}
        className="w-full border border-gray-300 text-sm p-2 rounded flex items-center justify-center gap-2"
      >
        <UploadOutlined />
        Upload Image
      </button>

      {/* File Name */}
      {fileName && (
        <Text type="secondary" className="text-xs block mt-1 italic">
          Selected: {fileName}
        </Text>
      )}

      {/* Preview & Remove */}
      {!previewUrl && (
        <div className="mt-[32px] rounded-[5px] relative w-full h-[70px] bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No image selected</span>
        </div>
      )}

      {previewUrl && (
        <div className="mt-2 relative w-full">
          <Image
            src={previewUrl}
            alt="Preview"
            height={70}
            style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2  bg-white border border-gray-300 rounded-full p-1 shadow"
            title="Remove image"
          >
            <CloseOutlined style={{ fontSize: '12px' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FormImageUpload;
