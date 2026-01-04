import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SchoolAdminDashboard from "./pages/SchoolAdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import SMSRegistrations from "./pages/SMSRegistrations";
import AttendanceManagement from "./pages/AttendanceManagement";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";


// ProtectedRoute Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("isms_user");
    return saved ? JSON.parse(saved) : null;
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const SuperAdminLayout = ({ children }) => (
  <AppLayout userRole="super_admin" userName={user?.name || "John Nangombe"}>
    {children}
  </AppLayout>
);

const SchoolAdminLayout = ({ children }) => (
  <AppLayout userRole="school_admin" userName="Ms. Amupadhi">
    {children}
  </AppLayout>
);

const TeacherLayout = ({ children }) => (
  <AppLayout userRole="teacher" userName="Mr. Shilongo">
    {children}
  </AppLayout>
);

const ParentLayout = ({ children }) => (
  <AppLayout userRole="parent" userName="Mrs. Shikongo">
    {children}
  </AppLayout>
);

const LearnerLayout = ({ children }) => (
  <AppLayout userRole="learner" userName="Maria Shikongo">
    {children}
  </AppLayout>
);

const SponsorLayout = ({ children }) => (
  <AppLayout userRole="sponsor" userName="NamPower Foundation">
    {children}
  </AppLayout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <SuperAdminLayout>
                <SuperAdminDashboard />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sms-registrations"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <SuperAdminLayout>
                <SMSRegistrations />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/school"
          element={
            <ProtectedRoute allowedRoles={["school_admin"]}>
              <SchoolAdminLayout>
                <SchoolAdminDashboard />
              </SchoolAdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout>
                <TeacherDashboard />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout>
                <AttendanceManagement />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentLayout>
                <ParentDashboard />
              </ParentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/learner"
          element={
            <ProtectedRoute allowedRoles={["learner"]}>
              <LearnerLayout>
                <LearnerDashboard />
              </LearnerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor"
          element={
            <ProtectedRoute allowedRoles={["sponsor"]}>
              <SponsorLayout>
                <SponsorDashboard />
              </SponsorLayout>
            </ProtectedRoute>
          }
        />

        {/* Default & 404 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
