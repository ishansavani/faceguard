import React from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Utils from "./utils/utils";
import constants from "./utils/constants";

export const AuthWrapper = ({ children }) => {
  const contextValues = React.useContext(AppContext);
  const token =
    contextValues.store.authToken ?? Utils.getCachedVariables("authToken");

  if (!token) {
    return <Navigate to={constants.route.login} />;
  }

  return children;
};
