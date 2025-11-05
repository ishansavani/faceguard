import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  label,
  name = "description",
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="mb-4">
    {label && (
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
    )}
    <ReactQuill
      value={value}
      onChange={(content) => {
        onChange({ target: { name, value: content } });
      }}
      placeholder={placeholder}
      className={`bg-white ${error ? "border-red-500" : "border-gray-300"}`}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      }}
    />

    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    <style>
      {`
                .ql-editor {
                    min-height: 185px;
                }
            `}
    </style>
  </div>
);

export default RichTextEditor;
