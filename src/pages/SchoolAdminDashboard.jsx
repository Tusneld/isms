import { useState } from "react";
import {
  Users,
  GraduationCap,
  School,
  Calendar,
  BookOpen,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data - updated for December 30, 2025
const schoolStats = {
  totalLearners: 1240,
  totalTeachers: 68,
  attendanceToday: 94.8,
  feeBalance: "N$ 48,200",
  pendingAdmissions: 12,
};

const recentAttendance = [
  { day: "Mon", rate: 95 },
  { day: "Tue", rate: 96 },
  { day: "Wed", rate: 93 },
  { day: "Thu", rate: 97 },
  { day: "Fri", rate: 91 },
];

const upcomingEvents = [
  { date: "Jan 10", title: "Term 1 Begins", type: "academic" },
  { date: "Jan 15", title: "Parent Orientation", type: "meeting" },
  { date: "Jan 20", title: "Sports Day", type: "event" },
];

const recentMessages = [
  { from: "Maria Hamunyela", subject: "Inquiry about Grade 8 admission", time: "2 hours ago", unread: true },
  { from: "Mr. Nghipondoka", subject: "Request for meeting", time: "5 hours ago", unread: true },
  { from: "Finance Office", subject: "Fee reminder sent to 42 parents", time: "1 day ago", unread: false },
];

export default function SchoolAdminDashboard() {
  const [selectedGrade, setSelectedGrade] = useState("All Grades");

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Windhoek High School
          </h1>
          <p className="text-muted-foreground mt-2">
            School Administration Dashboard • December 30, 2025
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-xs text-destructive-foreground flex items-center justify-center">
              5
            </span>
          </Button>
          <Button>
            <Calendar className="w-5 h-5 mr-2" />
            Academic Calendar
          </Button>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Learners</p>
                <p className="text-3xl font-bold mt-2">{schoolStats.totalLearners.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-2">+48 this term</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Teachers</p>
                <p className="text-3xl font-bold mt-2">{schoolStats.totalTeachers}</p>
                <p className="text-sm text-muted-foreground mt-2">All active</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Attendance</p>
                <p className="text-3xl font-bold mt-2">{schoolStats.attendanceToday}%</p>
                <Progress value={schoolStats.attendanceToday} className="mt-3 h-2" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Fees</p>
                <p className="text-3xl font-bold mt-2">{schoolStats.feeBalance}</p>
                <p className="text-sm text-red-600 mt-2">From 87 parents</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attendance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Attendance This Week
            </CardTitle>
            <CardDescription>Average daily attendance rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-4">
              {recentAttendance.map((day) => (
                <div key={day.day} className="flex-1 text-center">
                  <div className="relative h-32">
                    <div
                      className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all"
                      style={{ height: `${day.rate}%` }}
                    />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-primary-foreground">
                      {day.rate}%
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{day.day}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View Full Report <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date} • 2026</p>
                </div>
                <Badge variant={event.type === "academic" ? "default" : "secondary"}>
                  {event.type}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Messages
            </CardTitle>
            <Badge variant="destructive">5 New</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                    msg.unread && "bg-primary/5 border-primary/30"
                  )}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{msg.from}</p>
                      {msg.unread && <Badge variant="secondary" className="text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{msg.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View Inbox
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <UserPlus className="w-8 h-8" />
                <span>Admit New Learner</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <DollarSign className="w-8 h-8" />
                <span>Record Payment</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <BookOpen className="w-8 h-8" />
                <span>Upload Results</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <AlertCircle className="w-8 h-8" />
                <span>Report Incident</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Admissions Alert */}
      {schoolStats.pendingAdmissions > 0 && (
        <Card className="border-l-4 border-l-primary bg-primary/5">
          <CardContent className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {schoolStats.pendingAdmissions} Pending Admissions
                </h3>
                <p className="text-sm text-muted-foreground">
                  New registration requests awaiting your review
                </p>
              </div>
            </div>
            <Button>
              Review Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}