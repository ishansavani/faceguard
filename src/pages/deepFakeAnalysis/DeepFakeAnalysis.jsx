import { Upload } from 'antd'
import React from 'react'

const DeepFakeAnalysis = () => {
  const Dragger = Upload
  return (
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col">
          <Dragger>
            
          </Dragger>
        </div>
      </div>
  )
}

export default DeepFakeAnalysis