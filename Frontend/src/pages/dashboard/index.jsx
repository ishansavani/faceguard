import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Utils from "../../utils/utils";

const Dashboard = () => {
  const contextValues = useContext(AppContext);

  useEffect(() => {
    contextValues.setStore({
      headerData: { title: "Dashboard", icon: "LayoutDashboard" },
    });
  }, [contextValues]);

  return (
    <>
      <div className="text-3xl font-semibold mb-4">
        Welcome, {Utils.getNameFromEmail(contextValues?.store?.userdata?.email)}
      </div>
    </>
  );
};

export default Dashboard;
