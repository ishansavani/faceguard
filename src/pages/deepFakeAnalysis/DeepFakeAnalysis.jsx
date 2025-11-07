import { message, Upload } from "antd";
import { useContext, useEffect } from "react";
import Icon from "../../components/AppIcon";
import { AppContext } from "../../context/AppContext";
import Utils from "../../utils/utils";

const DeepFakeAnalysis = () => {
  const contextValues = useContext(AppContext);
  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    contextValues.setStore({
      headerData: {
        title: ` Welcome, ${Utils.getNameFromEmail(
          contextValues?.store?.userdata?.email,
        )}`,
        icon: "Hand",
      },
    });
  }, []);

  return (
    <div className="w-full h-full flex justify-center p-2">
      <Dragger
        {...props}
        className="!w-full !h-full !flex !justify-center !items-center 
        !flex-col !gap-4 !bg-transparent"
      >
        <Icon
          name="UploadCloud"
          size={48}
          color="#1890ff"
          className="mx-auto"
        />
        <p className="text-lg font-medium text-gray-700">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
};

export default DeepFakeAnalysis;
