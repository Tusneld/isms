import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Page Imports
import LoginPage from "./pages/LoginPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import RegionalDashboard from "./pages/RegionalDashboard";
import SchoolAdminDashboard from "./pages/SchoolAdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import SMSRegistrations from "./pages/SMSRegistrations";
import AttendanceManagement from "./pages/AttendanceManagement";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import TeacherGrading from "./pages/TeacherGrading";

/**
 * NotFoundLogger
 * Logs 404 attempts for debugging during development.
 */
const NotFoundLogger = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("❌ 404 hit at:", location.pathname);
  }, [location]);
  return <NotFound />;
};

/**
 * ProtectedRoute
 * Logic to gate access based on authentication and user roles.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const saved = localStorage.getItem("isms_user");
  const user = saved ? JSON.parse(saved) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn(`User role ${user.role} not authorized for this route.`);
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * --- ROLE-BASED LAYOUT WRAPPERS ---
 */
const SuperAdminLayout = ({ children }) => (
  <AppLayout userRole="super_admin" userName="John Nangombe">{children}</AppLayout>
);
const RegionalLayout = ({ children }) => (
  <AppLayout userRole="regional_admin" userName="Director: Khomas Region">{children}</AppLayout>
);
const SchoolAdminLayout = ({ children }) => (
  <AppLayout userRole="school_admin" userName="Ms. Amupadhi">{children}</AppLayout>
);
const TeacherLayout = ({ children }) => (
  <AppLayout userRole="teacher" userName="Mr. Shilongo">{children}</AppLayout>
);
const ParentLayout = ({ children }) => (
  <AppLayout userRole="parent" userName="Mrs. Shikongo">{children}</AppLayout>
);
const LearnerLayout = ({ children }) => (
  <AppLayout userRole="learner" userName="Maria Shikongo">{children}</AppLayout>
);
const SponsorLayout = ({ children }) => (
  <AppLayout userRole="sponsor" userName="NamPower Foundation">{children}</AppLayout>
);

/**
 * Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Super Admin Section */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <SuperAdminLayout><SuperAdminDashboard /></SuperAdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/sms-registrations" element={
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <SuperAdminLayout><SMSRegistrations /></SuperAdminLayout>
          </ProtectedRoute>
        } />

        {/* Regional Section */}
        <Route path="/regional" element={
          <ProtectedRoute allowedRoles={["regional_admin"]}>
            <RegionalLayout><RegionalDashboard /></RegionalLayout>
          </ProtectedRoute>
        } />

        {/* School Section */}
        <Route path="/school" element={
          <ProtectedRoute allowedRoles={["school_admin"]}>
            <SchoolAdminLayout><SchoolAdminDashboard /></SchoolAdminLayout>
          </ProtectedRoute>
        } />

        {/* Teacher Section */}
        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLayout><TeacherDashboard /></TeacherLayout>
          </ProtectedRoute>
        } />
        <Route path="/teacher/attendance" element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLayout><AttendanceManagement /></TeacherLayout>
          </ProtectedRoute>
        } />
        <Route path="/teacher/grading" element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherLayout><TeacherGrading /></TeacherLayout>
          </ProtectedRoute>
        } />

        {/* Parent, Learner, Sponsor Sections */}
        <Route path="/parent" element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentLayout><ParentDashboard /></ParentLayout>
          </ProtectedRoute>
        } />
        <Route path="/learner" element={
          <ProtectedRoute allowedRoles={["learner"]}>
            <LearnerLayout><LearnerDashboard /></LearnerLayout>
          </ProtectedRoute>
        } />
        <Route path="/sponsor" element={
          <ProtectedRoute allowedRoles={["sponsor"]}>
            <SponsorLayout><SponsorDashboard /></SponsorLayout>
          </ProtectedRoute>
        } />

        {/* System Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFoundLogger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;