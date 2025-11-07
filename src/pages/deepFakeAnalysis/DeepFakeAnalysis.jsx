import { Upload } from 'antd'
import React from 'react'

const DeepFakeAnalysis = () => {
  const Dragger = Upload
  return (
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col">
          <Dragger>
            <p className="ant-upload-drag-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Dragger>
        </div>
      </div>
  )
}

export default DeepFakeAnalysis