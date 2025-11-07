import { Routes as RouterRoutes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginScreen from "./pages/login";
import { Navigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Utils from "./utils/utils";
import constants from "./utils/constants";
import Profile from "./pages/profile";
import Loading from "./components/ui/Loading";
import LazyLoading from "./components/ui/LazyLoading";
import { AuthWrapper } from "./AuthWrapper";
import DeepFakeAnalysis from "./pages/deepFakeAnalysis/DeepFakeAnalysis";
import History from "./pages/deepFakeAnalysis/History";

const PublicRoute = ({ children }) => {
  const contextValues = React.useContext(AppContext);
  const token =
    contextValues.store.authToken ?? Utils.getCachedVariables("authToken");
  if (token) {
    return <Navigate to={constants.route.deepfakeAnalysis} />;
  }
  return children;
};

const HomeRedirect = () => {
  const contextValues = React.useContext(AppContext);
  const token =
    contextValues.store.authToken ?? Utils.getCachedVariables("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(constants.route.deepfakeAnalysis);
    } else {
      navigate(constants.route.login);
    }
  }, [token, navigate]);

  return null;
};

const NotFoundRedirect = () => {
  const contextValues = React.useContext(AppContext);
  const token =
    contextValues.store.authToken ?? Utils.getCachedVariables("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(constants.route.deepfakeAnalysis);
    } else {
      navigate(constants.route.login);
    }
  }, [token, navigate]);

  return null;
};

const Routes = () => {
  const contextValues = React.useContext(AppContext);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    if (contextValues?.store?.initialLoadComplete) {
      setShowLoader(false);
    }
  }, [contextValues?.store?.initialLoadComplete]);
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Home Redirect */}
        <Route path="/" element={<HomeRedirect />} />
        {/* Public Login Page */}
        <Route
          path={constants.route.login}
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path={constants.route.deepfakeAnalysis}
          element={
            <AuthWrapper>
              <DeepFakeAnalysis />
            </AuthWrapper>
          }
        />
        <Route
          path={constants.route.history}
          element={
            <AuthWrapper>
              <History />
            </AuthWrapper>
          }
        />
        <Route
          path={constants.route.profile}
          element={
            <AuthWrapper>
              <Profile />
            </AuthWrapper>
          }
        />

        {/* Redirect all unknown routes based on auth status */}
        <Route path="*" element={<NotFoundRedirect />} />
      </RouterRoutes>
      <Loading isLoading={contextValues?.store?.isLoading} />
      <LazyLoading isLoading={showLoader} />
    </ErrorBoundary>
  );
};

export default Routes;
