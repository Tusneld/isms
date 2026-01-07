/**
 * TeacherDashboard.jsx
 * Includes: Navigation to Grading Portal and Activity Feed interaction.
 */

import {
  Users,
  ClipboardCheck,
  BookOpen,
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  LogOut,
  FileText,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// --- Sub-Component: StatCard ---
const StatCard = ({ title, value, icon, trend, variant = "default", onClick }) => {
  const variants = {
    primary: "border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer",
    success: "border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-pointer",
    warning: "border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors cursor-pointer",
  };

  return (
    <Card className={cn("p-6", variants[variant] || "", onClick && "active:scale-95")} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${trend.value > 0 ? "text-green-600" : "text-red-600"}`}>
              {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const currentTime = "11:28 AM";

  const recentActivity = [
    { id: "act-1", user: "Lukas Mende", action: "submitted Homework: Algebra II", time: "10 mins ago", type: "submission" },
    { id: "act-2", user: "System", action: "Grade 10A Attendance Report generated", time: "45 mins ago", type: "system" },
    { id: "act-3", user: "Mrs. Nghandi (Parent)", action: "sent a message regarding Samuel", time: "2 hours ago", type: "message" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good Morning, Mr. Shilongo</h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" /> {currentTime} • Wednesday, Jan 7, 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="relative h-10">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="h-10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Classes Today" value="5" icon={<BookOpen className="text-primary" />} variant="primary" />
        <StatCard title="Total Learners" value="156" icon={<Users className="text-green-600" />} variant="success" />
        <StatCard title="Today's Attendance" value="95%" icon={<ClipboardCheck className="text-yellow-600" />} variant="warning" />
        <StatCard 
          title="New Submissions" 
          value="24" 
          icon={<FileText className="text-blue-600" />} 
          variant="primary" 
          onClick={() => navigate("/teacher/grading")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schedule */}
        <Card className="lg:col-span-2 shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">You have 2 classes remaining today.</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/teacher/grading")}>
                Go to Grading Portal
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="relative pl-6 pb-6 border-l last:pb-0 border-slate-100 cursor-pointer hover:bg-slate-50 transition-all"
                  onClick={() => activity.type === 'submission' && navigate("/teacher/grading")}
                >
                  <div className={cn(
                    "absolute -left-[6px] top-0 w-3 h-3 rounded-full border-2 border-white",
                    activity.type === "submission" ? "bg-blue-500" : "bg-slate-400"
                  )} />
                  <p className="text-sm font-semibold text-slate-900">{activity.user}</p>
                  <p className="text-xs text-slate-500">{activity.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}