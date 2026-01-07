/**
 * SuperAdminDashboard.jsx
 * 
 * Final version with perfect text readability.
 * - Solid green (white text) when at top
 * - Glassmorphism (dark text) when scrolled — readable on light content
 * - Draggable with grip handle
 * - Full mobile support
 */

import { useState, useRef, useEffect } from "react";
import {
  Users,
  School,
  GraduationCap,
  TrendingUp,
  MapPin,
  UserPlus,
  AlertTriangle,
  BookOpen,
  Calendar,
  ArrowRight,
  LogOut,
  FileText,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample data - January 07, 2026
const enrollmentData = [
  { month: "Jul", enrolled: 48000, capacity: 52000 },
  { month: "Aug", enrolled: 49200, capacity: 52000 },
  { month: "Sep", enrolled: 49800, capacity: 52000 },
  { month: "Oct", enrolled: 50500, capacity: 52000 },
  { month: "Nov", enrolled: 51200, capacity: 52000 },
  { month: "Dec", enrolled: 51800, capacity: 52000 },
];

const regionData = [
  { name: "Khomas", value: 13500, color: "#0ea5e9" },
  { name: "Erongo", value: 9200, color: "#10b981" },
  { name: "Oshana", value: 8800, color: "#06b6d4" },
  { name: "Omusati", value: 7500, color: "#6366f1" },
  { name: "Others", value: 17000, color: "#64748b" },
];

const attendanceData = [
  { day: "Mon", attendance: 95.2 },
  { day: "Tue", attendance: 96.8 },
  { day: "Wed", attendance: 94.1 },
  { day: "Thu", attendance: 95.9 },
  { day: "Fri", attendance: 89.3 },
];

const pendingAdmissions = [
  { id: "1", learnerName: "Maria Shikongo", school: "Windhoek High School", region: "Khomas", submittedDate: "2025-12-28", source: "online" },
  { id: "2", learnerName: "Johannes Amupanda", school: "Oshakati Secondary", region: "Oshana", submittedDate: "2025-12-29", source: "sms" },
  { id: "3", learnerName: "Anna Nghipondoka", school: "Swakopmund High", region: "Erongo", submittedDate: "2025-12-29", source: "online" },
  { id: "4", learnerName: "Peter Hamunyela", school: "Rundu Senior Secondary", region: "Kavango East", submittedDate: "2025-12-27", source: "online" },
  { id: "5", learnerName: "Sofia Nangolo", school: "Ondangwa Combined", region: "Oshana", submittedDate: "2025-12-26", source: "sms" },
];

// Reusable StatCard
const StatCard = ({ title, value, icon, trend, variant = "default" }) => {
  const variantColors = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-600 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    danger: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <Card className={`border ${variantColors[variant]} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{value}</p>
            {trend && (
              <p className={`text-xs sm:text-sm mt-1 sm:mt-2 flex items-center gap-1 ${trend.value > 0 ? "text-green-600" : "text-red-600"}`}>
                {trend.value > 0 ? "+ " : ""}
                {trend.value}% {trend.label}
              </p>
            )}
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background/80 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Intelligent Draggable FAB - Text readable in both modes
const DraggableFAB = () => {
  const [position, setPosition] = useState({ x: 24, y: window.innerHeight - 140 });
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;
      setPosition({
        x: clientX - 100,
        y: clientY - 30,
      });
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging]);

  const textColorClass = isScrolled ? "text-foreground" : "text-white";
  const gripColorClass = isScrolled ? "text-foreground/70" : "text-white/70";

  return (
    <div
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <div
        className={`
          px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 cursor-grab active:cursor-grabbing
          transition-all duration-500 hover:shadow-2xl hover:scale-105
          ${isScrolled
            ? "bg-white/10 backdrop-blur-md border border-white/20"
            : "bg-green-600 hover:bg-green-700 border border-green-700/50"
          }
        `}
      >
        <GripVertical className={`w-5 h-5 ${gripColorClass}`} />
        <FileText className={`w-6 h-6 ${textColorClass}`} />
        <span className={`font-semibold text-base ${textColorClass}`}>
          Generate National Report
        </span>
      </div>
    </div>
  );
};

export default function SuperAdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.href = "/";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 pb-40">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            National Education Overview
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Real-time insights across all 14 regions of Namibia
          </p>
          <p className="text-sm text-muted-foreground">
            Tuesday, January 07, 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="w-full sm:w-auto transition-all hover:shadow-md hover:scale-105">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Academic Year 2025
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto transition-all hover:shadow-lg hover:scale-105" onClick={handleLogout}>
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total Learners" value="51,800" icon={<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />} trend={{ value: 3.6, label: "vs last term" }} variant="primary" />
        <StatCard title="Active Schools" value="248" icon={<School className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />} trend={{ value: 3, label: "new schools" }} variant="success" />
        <StatCard title="Teachers" value="3,620" icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />} trend={{ value: 5.8, label: "growth" }} variant="warning" />
        <StatCard title="Pending Admissions" value="87" icon={<UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />} trend={{ value: -29, label: "from yesterday" }} variant="danger" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <TrendingUp className="w-5 h-5" />
              Enrollment Trend (Term 4, 2025)
            </CardTitle>
            <CardDescription className="text-sm">Monthly enrollment vs capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Bar dataKey="enrolled" fill="#10b981" radius={4} />
                <Bar dataKey="capacity" fill="#94a3b8" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MapPin className="w-5 h-5" />
              Learners by Region
            </CardTitle>
            <CardDescription className="text-sm">Total: 51,800 learners</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={regionData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={3} dataKey="value">
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => v.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {regionData.map((r) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="text-muted-foreground">{r.name}</span>
                  </div>
                  <span className="font-medium">{r.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Attendance */}
      <Card className="transition-all duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <BookOpen className="w-5 h-5" />
              Weekly Attendance Rate
            </CardTitle>
            <CardDescription className="text-sm">National average • Week of Dec 23–29</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="transition-transform hover:scale-105">
            View Report <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" />
              <YAxis domain={[80, 100]} ticks={[80, 85, 90, 95, 100]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="attendance" stroke="#059669" strokeWidth={3} dot={{ fill: "#059669", r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pending Admissions */}
      <Card className="transition-all duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <UserPlus className="w-5 h-5 text-destructive" />
              Pending Admissions
            </CardTitle>
            <CardDescription className="text-sm">87 new registration requests awaiting review</CardDescription>
          </div>
          <Button variant="outline" className="transition-transform hover:scale-105">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Learner</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">School</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {pendingAdmissions.map((item) => (
                  <tr key={item.id} className="border-b transition-all duration-300 hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">
                      <div>
                        {item.learnerName}
                        <div className="text-xs text-muted-foreground sm:hidden">
                          {item.school} • {item.region}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground hidden sm:table-cell">{item.school}</td>
                    <td className="py-4 px-4 text-muted-foreground hidden md:table-cell">{item.region}</td>
                    <td className="py-4 px-4 text-muted-foreground hidden lg:table-cell">{item.submittedDate}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.source === "online" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary-foreground"}`}>
                        {item.source.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-destructive transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardContent className="flex flex-col sm:flex-row items-start gap-4 pt-6">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg">Critical Alert: Resource Shortage</h4>
              <p className="text-sm text-muted-foreground mt-1">
                4 schools in Omusati region report severe lack of Mathematics textbook shortages ahead of Term 1.
              </p>
              <Button variant="link" className="h-auto p-0 mt-3 text-destructive transition-transform hover:scale-105">
                Take Action →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardContent className="flex flex-col sm:flex-row items-start gap-4 pt-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg">Upcoming Event</h4>
              <p className="text-sm text-muted-foreground mt-1">
                National Curriculum Review Workshop • January 15–17, 2026 • Windhoek
              </p>
              <Button variant="link" className="h-auto p-0 mt-3 text-primary transition-transform hover:scale-105">
                View Details →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PERFECTLY READABLE DRAGGABLE FAB */}
      <DraggableFAB />
    </div>
  );
}
