import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LoginScreen from "./pages/login";
import constants from "./utils/constants";
import Profile from "./pages/profile";
import DeepFakeAnalysis from "./pages/deepFakeAnalysis/DeepFakeAnalysis";
import History from "./pages/deepFakeAnalysis/History";
import LandingPage from "./pages/landing";
import ProtectedLayout from "./layout/ProtectedLayout";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path={constants.route.login} element={<LoginScreen />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route
              path={constants.route.deepfakeAnalysis}
              element={<DeepFakeAnalysis />}
            />
            <Route path={constants.route.history} element={<History />} />
            <Route path={constants.route.profile} element={<Profile />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
