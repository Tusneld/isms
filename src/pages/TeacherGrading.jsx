/**
 * TeacherDashboard.jsx
 * Features including Analytics, Schedule, Activity Feed, and the link to the Grading Portal.
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
  ArrowRight
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
    <Card className={cn("p-6", variants[variant] || "", onClick && "active:scale-95 shadow-md")} onClick={onClick}>
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

  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good Morning, Mr. Shilongo</h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" /> {currentTime} • Wednesday, Jan 7, 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="relative h-10 border-slate-200">
            <Bell className="w-5 h-5 text-slate-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">5</Badge>
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="h-10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics - CLICKABLE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Classes Today" value="5" icon={<BookOpen className="text-primary" />} variant="primary" />
        <StatCard title="Total Learners" value="156" icon={<Users className="text-green-600" />} variant="success" />
        <StatCard title="Today's Attendance" value="95%" icon={<ClipboardCheck className="text-yellow-600" />} variant="warning" />
        
        {/* GRADING PORTAL LINK */}
        <StatCard 
            title="Pending Grades" 
            value="24" 
            icon={<FileText className="text-blue-600" />} 
            variant="primary" 
            onClick={() => navigate("/teacher/grading")}
            trend={{ value: 12, label: "new" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Schedule Section */}
        <Card className="lg:col-span-2 shadow-sm border-slate-100 overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <Calendar className="w-5 h-5 text-blue-600" /> Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-100">
                {[
                    { subject: "Mathematics", class: "Grade 12A", time: "10:30 - 11:30", room: "204", status: "Current" },
                    { subject: "Algebra II", class: "Grade 10B", time: "12:30 - 13:30", room: "204", status: "Upcoming" }
                ].map((item, i) => (
                    <div key={i} className={cn("p-4 flex items-center justify-between", item.status === "Current" && "bg-blue-50/30")}>
                        <div className="flex items-center gap-4">
                            <div className={cn("w-1 h-10 rounded-full", item.status === "Current" ? "bg-blue-600" : "bg-slate-200")} />
                            <div>
                                <p className="font-bold text-slate-900">{item.subject} • {item.class}</p>
                                <p className="text-xs text-muted-foreground">{item.time} | Room {item.room}</p>
                            </div>
                        </div>
                        <Badge variant={item.status === "Current" ? "default" : "outline"}>{item.status}</Badge>
                    </div>
                ))}
             </div>
             <div className="p-4 border-t bg-slate-50/50">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold" onClick={() => navigate("/teacher/grading")}>
                    Open Grading Portal <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
             </div>
          </CardContent>
        </Card>

        {/* 4. Recent Activity */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" /> Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: "Lukas Mende", action: "Submitted Algebra HW", time: "12m ago", type: "submission" },
                { user: "System", action: "Attendance Synced", time: "1h ago", type: "system" },
                { user: "Admin", action: "Meeting at 14:00", time: "2h ago", type: "notice" }
              ].map((act, i) => (
                <div key={i} className="flex gap-3">
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", act.type === "submission" ? "bg-blue-500" : "bg-slate-300")} />
                    <div>
                        <p className="text-sm font-semibold text-slate-800">{act.user}</p>
                        <p className="text-xs text-slate-500">{act.action}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{act.time}</p>
                    </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Class Performance Overview  */}
      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" /> Class Performance (Avg)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { cls: "10A", score: 72 },
              { cls: "10B", score: 68 },
              { cls: "11B", score: 81 },
              { cls: "12A", score: 75 },
            ].map((item) => (
              <div key={item.cls} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700">Grade {item.cls}</span>
                    <span className="text-xs font-bold text-purple-600">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-2 bg-slate-200" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 6. Critical Alerts */}
      <Card className="bg-slate-900 border-none text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-full bg-red-600/10 skew-x-12 translate-x-16" />
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
                <CardTitle className="text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" /> Critical Follow-ups
                </CardTitle>
                <CardDescription className="text-slate-400 font-medium">3 learners have dropped below 40% attendance this week.</CardDescription>
            </div>
            <Button variant="secondary" size="sm" className="font-bold">Take Action</Button>
          </CardHeader>
      </Card>

      {/* 7. Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Attendance", icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Enter Grades", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Messages", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Reports", icon: FileText, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((action, i) => (
          <button key={i} className="group p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col items-center gap-2">
            <div className={cn("p-3 rounded-xl transition-colors", action.bg)}>
                <action.icon className={cn("w-6 h-6", action.color)} />
            </div>
            <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}