import { useAuthStore } from '@/store/useAuthStore';
import SuperAdminDashboard from './SuperAdminDashboard';
import SchoolAdminDashboard from './SchoolAdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import ParentDashboard from './ParentDashboard';

const Dashboard = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'regional_admin':
      return <SuperAdminDashboard />;
    case 'school_admin':
      return <SchoolAdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'learner':
      return <ParentDashboard />;
    default:
      return <SchoolAdminDashboard />;
  }
};

export default Dashboard;
