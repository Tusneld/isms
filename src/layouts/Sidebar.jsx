import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  BookOpen,
  Calendar,
  School,
  MapPin,
  UserCheck,
  Library,
  Receipt,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

const navigation = [
  { 
    title: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard, 
    roles: ['super_admin', 'regional_admin', 'school_admin', 'teacher', 'parent', 'learner', 'receptionist', 'librarian', 'accountant'] 
  },
  { 
    title: 'Regions', 
    href: '/regions', 
    icon: MapPin, 
    roles: ['super_admin'] 
  },
  { 
    title: 'Schools', 
    href: '/schools', 
    icon: School, 
    roles: ['super_admin', 'regional_admin'] 
  },
  { 
    title: 'Learners', 
    href: '/learners', 
    icon: GraduationCap, 
    roles: ['super_admin', 'regional_admin', 'school_admin', 'teacher'] 
  },
  { 
    title: 'Teachers', 
    href: '/teachers', 
    icon: Users, 
    roles: ['super_admin', 'regional_admin', 'school_admin'] 
  },
  { 
    title: 'Attendance', 
    href: '/attendance', 
    icon: ClipboardCheck, 
    roles: ['school_admin', 'teacher'] 
  },
  { 
    title: 'Timetable', 
    href: '/timetable', 
    icon: Calendar, 
    roles: ['school_admin', 'teacher', 'learner'] 
  },
  { 
    title: 'Library', 
    href: '/library', 
    icon: Library, 
    roles: ['librarian', 'school_admin'] 
  },
  { 
    title: 'Accounts', 
    href: '/accounts', 
    icon: Receipt, 
    roles: ['accountant', 'school_admin'] 
  },
  { 
    title: 'Visitors', 
    href: '/visitors', 
    icon: UserCheck, 
    roles: ['receptionist', 'school_admin'] 
  },
  { 
    title: 'My Children', 
    href: '/my-children', 
    icon: Users, 
    roles: ['parent'] 
  },
  { 
    title: 'My Classes', 
    href: '/my-classes', 
    icon: BookOpen, 
    roles: ['learner'] 
  },
];

export const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  
  const filteredNav = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">iSMS</h1>
                <p className="text-xs text-sidebar-foreground/60">School Management</p>
              </div>
            </Link>
            <button 
              onClick={onToggle}
              className="lg:hidden p-1 rounded hover:bg-sidebar-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {filteredNav.map((item) => {
                const isActive = location.pathname === item.href || 
                  location.pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sm font-semibold text-sidebar-accent-foreground">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
