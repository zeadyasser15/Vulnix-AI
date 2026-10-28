import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import VerifyEmailPage from "./features/auth/pages/VerifyEmailPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./features/history/pages/HistoryPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import SettingsPage from "./features/profile/pages/SettingsPage";
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScanPage from "./features/scan/pages/ScanPage";
import ReportPage from "./features/report/pages/ReportPage";

function App() {
  return (
    <>
      <h1 className=""></h1>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* User */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/reports/:reportId" element={<ReportPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
