import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  Calendar,
  ClipboardList,
  MessageSquare,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserPlus,
  BookOpen,
  DollarSign,
  FileText,
  BarChart3,
  Building2,
  Smartphone,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const roleNavItems = {
  super_admin: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "Regional Overview", icon: MapPin, href: "/regions" },
    { title: "Schools", icon: School, href: "/schools" },
    { title: "Users Management", icon: Users, href: "/users" },
    { title: "Admissions", icon: UserPlus, href: "/admissions", badge: 24 },
    { title: "SMS Registrations", icon: Smartphone, href: "/sms-registrations", badge: 8 },
    { title: "Resource Allocation", icon: Building2, href: "/resources" },
    { title: "Reports & Analytics", icon: BarChart3, href: "/reports" },
    { title: "Policy Management", icon: FileText, href: "/policies" },
    { title: "Settings", icon: Settings, href: "/settings" },
  ],
  regional_admin: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "Schools", icon: School, href: "/schools" },
    { title: "Teacher Assignment", icon: Users, href: "/teachers" },
    { title: "Admissions", icon: UserPlus, href: "/admissions", badge: 12 },
    { title: "Resource Allocation", icon: Building2, href: "/resources" },
    { title: "Reports", icon: BarChart3, href: "/reports" },
  ],
  school_admin: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "Learners", icon: GraduationCap, href: "/learners" },
    { title: "New Admissions", icon: UserPlus, href: "/admissions", badge: 5 },
    { title: "Classes", icon: BookOpen, href: "/classes" },
    { title: "Teachers", icon: Users, href: "/teachers" },
    { title: "Attendance", icon: ClipboardList, href: "/attendance" },
    { title: "Fees & Accounts", icon: DollarSign, href: "/fees" },
    { title: "Reports", icon: BarChart3, href: "/reports" },
  ],
  teacher: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "My Classes", icon: BookOpen, href: "/classes" },
    { title: "Attendance", icon: ClipboardList, href: "/attendance" },
    { title: "Learners", icon: GraduationCap, href: "/learners" },
    { title: "Schedule", icon: Calendar, href: "/schedule" },
    { title: "Messages", icon: MessageSquare, href: "/messages", badge: 3 },
  ],
  parent: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "My Children", icon: GraduationCap, href: "/children" },
    { title: "Register Child", icon: UserPlus, href: "/register-child" },
    { title: "Attendance", icon: ClipboardList, href: "/attendance" },
    { title: "Fees", icon: DollarSign, href: "/fees" },
    { title: "Messages", icon: MessageSquare, href: "/messages", badge: 2 },
  ],
  learner: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/" },
    { title: "My Schedule", icon: Calendar, href: "/schedule" },
    { title: "Grades", icon: BarChart3, href: "/grades" },
    { title: "Attendance", icon: ClipboardList, href: "/attendance" },
    { title: "Messages", icon: MessageSquare, href: "/messages" },
  ],
};

const roleLabels = {
  super_admin: { label: "Super Admin", color: "bg-destructive text-destructive-foreground" },
  regional_admin: { label: "Regional Admin", color: "bg-primary text-primary-foreground" },
  school_admin: { label: "School Admin", color: "bg-accent text-accent-foreground" },
  teacher: { label: "Teacher", color: "bg-secondary text-secondary-foreground" },
  parent: { label: "Parent", color: "bg-primary-light" },
  learner: { label: "Learner", color: "bg-accent-light" },
};

export function AppSidebar({ userRole, user }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = roleNavItems[userRole] || [];
  const roleInfo = roleLabels[userRole] || { label: "User", color: "bg-muted" };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">iSMS</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* User Info Profile */}
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground font-semibold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <Badge className={cn("text-[10px] px-1.5 py-0 mt-1 uppercase font-bold", roleInfo.color)}>
                {roleInfo.label}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            const linkContent = (
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="h-5 min-w-5 text-[10px] flex items-center justify-center px-1">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <Badge variant="destructive" className="h-4 min-w-4 text-[10px]">
                        {item.badge}
                      </Badge>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.href}>{linkContent}</div>;
          })}
        </nav>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center"
              )}
            >
              <Bell className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Notifications</span>}
            </Button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">Notifications</TooltipContent>}
        </Tooltip>
        
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive",
                collapsed && "justify-center"
              )}
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Logout</span>}
            </Button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
        </Tooltip>
      </div>
    </aside>
  );
}