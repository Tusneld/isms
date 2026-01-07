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
} from "lucide-react";
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


// Mock data - Updated for December 30, 2025 (Tuesday)
const todaySchedule = [
  {
    id: "1",
    subject: "Mathematics",
    class: "Grade 10A",
    time: "08:00 - 09:00",
    room: "Room 204",
    status: "completed",
  },
  {
    id: "2",
    subject: "Mathematics",
    class: "Grade 11B",
    time: "09:15 - 10:15",
    room: "Room 204",
    status: "completed",
  },
  {
    id: "3",
    subject: "Mathematics",
    class: "Grade 12A",
    time: "10:30 - 11:30",
    room: "Room 204",
    status: "current",
  },
  {
    id: "4",
    subject: "Mathematics",
    class: "Grade 10B",
    time: "12:30 - 13:30",
    room: "Room 204",
    status: "upcoming",
  },
  {
    id: "5",
    subject: "Extra Tuition",
    class: "Grade 12A",
    time: "14:00 - 15:00",
    room: "Room 204",
    status: "upcoming",
  },
];

const learnerAlerts = [
  {
    id: "1",
    name: "Johannes H.",
    issue: "Absent 3 consecutive days",
    type: "attendance",
  },
  {
    id: "2",
    name: "Maria S.",
    issue: "Test average dropped below 50%",
    type: "performance",
  },
  {
    id: "3",
    name: "Anna K.",
    issue: "Frequently late to morning classes",
    type: "attendance",
  },
];

const classPerformance = [
  { class: "Grade 10A", avgScore: 74, attendance: 95 },
  { class: "Grade 10B", avgScore: 69, attendance: 92 },
  { class: "Grade 11B", avgScore: 77, attendance: 96 },
  { class: "Grade 12A", avgScore: 81, attendance: 93 },
];

// Simple fallback StatCard if not available
const StatCard = ({ title, value, icon, trend, variant = "default" }) => {
  const variants = {
    primary: "border-primary/30 bg-primary/5",
    success: "border-green-500/30 bg-green-500/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
  };

  return (
    <Card className={`p-6 ${variants[variant] || ""}`}>
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
  // Simulated current time (10:45 AM on Dec 30, 2025)
  const currentTime = "10:45 AM";

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Good Morning, Mr. Shilongo
          </h1>
          <p className="text-lg text-muted-foreground mt-2 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {currentTime} • Tuesday, December 30, 2025
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium">Messages</span>
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
          <Button>
            <ClipboardCheck className="w-5 h-5 mr-2" />
            Take Attendance
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Classes Today"
          value="5"
          icon={<BookOpen className="w-6 h-6 text-primary" />}
          variant="primary"
        />
        <StatCard
          title="Total Learners"
          value="156"
          icon={<Users className="w-6 h-6 text-green-600" />}
          variant="success"
        />
        <StatCard
          title="Today's Attendance"
          value="95%"
          icon={<ClipboardCheck className="w-6 h-6 text-yellow-600" />}
          trend={{ value: 1.2, label: "vs yesterday" }}
          variant="warning"
        />
        <StatCard
          title="Term Average"
          value="75%"
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          trend={{ value: 4, label: "improvement" }}
          variant="primary"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Mathematics Department • Room 204</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-xl border transition-all",
                    item.status === "current" &&
                      "bg-primary/5 border-primary shadow-md ring-2 ring-primary/20",
                    item.status === "completed" && "bg-muted/30 opacity-75",
                    item.status === "upcoming" && "hover:border-primary/50 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-5 flex-1">
                    <div
                      className={cn(
                        "w-3 h-16 rounded-full shrink-0",
                        item.status === "current" && "bg-primary",
                        item.status === "completed" && "bg-green-500",
                        item.status === "upcoming" && "bg-muted-foreground/40"
                      )}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{item.subject}</h4>
                        <p className="text-muted-foreground">{item.class}</p>
                        {item.status === "current" && (
                          <Badge className="bg-primary text-primary-foreground">LIVE NOW</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.room} • {item.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {item.status === "completed" && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                    {item.status === "current" && (
                      <Button size="lg">
                        Enter Classroom
                      </Button>
                    )}
                    {item.status === "upcoming" && (
                      <span className="text-sm text-muted-foreground">Upcoming</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learner Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
              Learner Alerts
            </CardTitle>
            <CardDescription>Learners needing follow-up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learnerAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback
                      className={cn(
                        "font-semibold",
                        alert.type === "attendance"
                          ? "bg-orange-500/15 text-orange-600"
                          : "bg-destructive/15 text-destructive"
                      )}
                    >
                      {alert.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{alert.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.issue}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            Class Performance Overview
          </CardTitle>
          <CardDescription>Term 4 averages • Mathematics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classPerformance.map((cls) => (
              <div
                key={cls.class}
                className="p-6 rounded-xl border bg-card shadow-sm"
              >
                <h4 className="font-bold text-lg mb-5">{cls.class}</h4>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Average Score</span>
                      <span className="font-semibold">{cls.avgScore}%</span>
                    </div>
                    <Progress value={cls.avgScore} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Attendance Rate</span>
                      <span className="font-semibold">{cls.attendance}%</span>
                    </div>
                    <Progress value={cls.attendance} className="h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <button className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardCheck className="w-7 h-7 text-primary" />
          </div>
          <span className="font-medium">Take Attendance</span>
        </button>

        <button className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-accent" />
          </div>
          <span className="font-medium">Enter Grades</span>
        </button>

        <button className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-secondary-foreground" />
          </div>
          <span className="font-medium">Message Parents</span>
        </button>

        <button className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-destructive" />
          </div>
          <span className="font-medium">Lesson Plans</span>
        </button>
      </div>
    </div>
  );
}