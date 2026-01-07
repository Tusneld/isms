import { useState } from "react";
import {
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  Bell,
  UserPlus,
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut  
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
import { Link } from "react-router-dom";

const children = [
  {
    id: "1",
    name: "Maria Shikongo",
    grade: "Grade 8",
    school: "Windhoek High School",
    avatar: "MS",
    attendance: 96,
    performance: 82,
  },
  {
    id: "2",
    name: "Johannes Shikongo",
    grade: "Grade 5",
    school: "Windhoek Primary",
    avatar: "JS",
    attendance: 98,
    performance: 75,
  },
];

const recentAttendance = [
  { date: "Mon, Mar 11", status: "present" },
  { date: "Tue, Mar 12", status: "present" },
  { date: "Wed, Mar 13", status: "present" },
  { date: "Thu, Mar 14", status: "late" },
  { date: "Fri, Mar 15", status: "present" },
];

const notifications = [
  {
    id: "1",
    title: "Parent Meeting",
    message: "Reminder: Parent-teacher meeting on March 20th at 2:00 PM",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Fee Payment",
    message: "Term 2 fees are due by March 31st, 2025",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    title: "Report Card",
    message: "Maria's Term 1 report card is now available",
    time: "3 days ago",
    read: true,
  },
];

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(children[0]);

  // Logout function — clears saved user and returns to login/home
  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.href = "/"; 
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome, Mrs. Shikongo
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay connected with your children's education
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              2
            </span>
          </Button>
          <Link to="/register-child">
            <Button variant="gradient">
              <UserPlus className="w-4 h-4 mr-2" />
              Register New Child
            </Button>
          </Link>
          {/* Logout Button */}
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Child Selector (Mobile-friendly) */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all shrink-0 min-w-max",
              selectedChild.id === child.id
                ? "bg-primary/5 border-primary shadow-sm"
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {child.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium text-foreground">{child.name}</p>
              <p className="text-xs text-muted-foreground">{child.grade}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {selectedChild.attendance}%
                </p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {selectedChild.performance}%
                </p>
                <p className="text-xs text-muted-foreground">Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">N$850</p>
                <p className="text-xs text-muted-foreground">Fee Balance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attendance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-accent" />
              Recent Attendance
            </CardTitle>
            <CardDescription>
              Last 5 days for {selectedChild.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-2">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex-1 text-center">
                  <div
                    className={cn(
                      "w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2",
                      record.status === "present" && "bg-accent/10",
                      record.status === "absent" && "bg-destructive/10",
                      record.status === "late" && "bg-secondary/10"
                    )}
                  >
                    {record.status === "present" && (
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                    )}
                    {record.status === "absent" && (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                    {record.status === "late" && (
                      <Clock className="w-6 h-6 text-secondary-foreground" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {record.date.split(", ")[1]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {record.date.split(", ")[0]}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View Full Attendance Record
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance
            </CardTitle>
            <CardDescription>Term 1 subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: "Mathematics", score: 78 },
              { subject: "English", score: 85 },
              { subject: "Science", score: 72 },
              { subject: "History", score: 88 },
            ].map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    {subject.subject}
                  </span>
                  <span className="font-medium text-foreground">
                    {subject.score}%
                  </span>
                </div>
                <Progress value={subject.score} className="h-2" />
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View Full Report
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-secondary-foreground" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg transition-all",
                  notification.read
                    ? "bg-muted/30"
                    : "bg-primary/5 border border-primary/20"
                )}
              >
                <div
                  className={cn(
                    "w-2 h-2 rounded-full mt-2 shrink-0",
                    notification.read ? "bg-muted-foreground/50" : "bg-primary"
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions (Mobile-friendly grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            Message Teacher
          </span>
        </button>

        <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-accent" />
          </div>
          <span className="text-sm font-medium text-foreground">
            School Calendar
          </span>
        </button>

        <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-secondary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Pay Fees</span>
        </button>

        <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-destructive" />
          </div>
          <span className="text-sm font-medium text-foreground">
            View Reports
          </span>
        </button>
      </div>
    </div>
  );
}