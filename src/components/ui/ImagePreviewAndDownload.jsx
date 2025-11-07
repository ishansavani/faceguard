import React from 'react';
import { Image } from 'antd';
import Icon from 'components/AppIcon';

const ImagePreview = ({ src, width = 100, height }) => {
  const onDownload = () => {
    const suffix = '.png';
    const filename = `${Date.now()}${suffix}`;

    fetch(src)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  


  return (
    <>
    <style jsx global>{`
  .ant-image-preview-progress {
    display: none !important;
  }
     .ant-image-preview-root .ant-image-preview-mask {
    background-color: rgba(0, 0, 0, 0.85) !important;
  }
`}</style>

    
    <Image.PreviewGroup
      preview={{
        mask: (
          <div className="flex items-center justify-center w-full h-full">
            <Icon name="Eye" size={24} color="white" />
          </div>
        ),
        toolbarRender: () => (
          <div className="flex justify-end w-full pr-4">
            <Icon
              name="Download"
              size={22}
              color="white"
              className="cursor-pointer"
              onClick={onDownload}
            />
          </div>
        ),
        icons: {
          close: (
            <Icon
              name="X"
              size={24}
              color="white"
              className="hover:text-red-500"
            />
          ),
        
        },
      }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        preview={{
          mask: (
            <div className="flex items-center justify-center w-full h-full">
              <Icon name="Eye" size={22} color="white" />
            </div>
          ),
        }}
        style={{
          borderRadius: 4,
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />
    </Image.PreviewGroup>
    </>
  );
};

export default ImagePreview;
