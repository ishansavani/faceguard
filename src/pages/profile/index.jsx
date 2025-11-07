import React, { useEffect } from "react";
import { Divider } from "antd";
import { AppContext } from "../../context/AppContext";
import Utils from "../../utils/utils";

const Profile = () => {
  const contextValues = React.useContext(AppContext);

  useEffect(() => {
    contextValues.setStore({
      headerData: { title: "Profile", icon: "UserCircle" },
    });
  }, [contextValues]);

  return (
      <div className="p-6 bg-gray-50 h-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col justify-center">
          <div className="text-2xl font-semibold text-gray-500">
            User Details
          </div>
          <Divider className="border border-gray-700" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-md font-medium">Name:</span>
              <span className="text-md font-bold">
                {Utils.getNameFromEmail(contextValues?.store?.userdata?.email)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-md font-medium">Email:</span>
              <span className="text-md font-bold">
                {contextValues?.store?.userdata?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
