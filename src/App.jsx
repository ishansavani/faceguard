import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./layout/Layout";
import LoginScreen from "./pages/login";
import { AuthWrapper } from "./AuthWrapper";
import constants from "./utils/constants";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import DeepFakeAnalysis from "./pages/deepFakeAnalysis/DeepFakeAnalysis";
import History from "./pages/deepFakeAnalysis/History";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public route */}
          <Route path={constants.route.login} element={<LoginScreen />} />

          {/* Protected routes inside Layout */}
          <Route
            element={
              <AuthWrapper>
                <Layout />
              </AuthWrapper>
            }
          >
            <Route path={constants.route.dashboard} element={<Dashboard />} />
            <Route path={constants.route.profile} element={<Profile />} />
            <Route
              path={constants.route.deepfakeAnalysis}
              element={<DeepFakeAnalysis />}
            />
            <Route path={constants.route.history} element={<History />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
