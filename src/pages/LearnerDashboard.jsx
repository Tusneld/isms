import { useState } from "react";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Bell,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,  
  Star,
  Target,
  Award,
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const learnerData = {
  name: "Maria Shikongo",
  grade: "Grade 10A",
  school: "Windhoek High School",
  attendance: 96,
  overallAverage: 82,
  rank: 8,
  totalLearners: 31,
};

const recentAttendance = [
  { day: "Mon", status: "present" },
  { day: "Tue", status: "present" },
  { day: "Wed", status: "present" },
  { day: "Thu", status: "late" },
  { day: "Fri", status: "present" },
];

const subjects = [
  { name: "Mathematics", score: 78, target: 85 },
  { name: "English", score: 88, target: 80 },
  { name: "Physical Science", score: 75, target: 80 },
  { name: "Life Science", score: 85, target: 85 },
  { name: "Geography", score: 90, target: 85 },
  { name: "History", score: 82, target: 80 },
];

const achievements = [
  { title: "Top 10 Student", description: "Ranked 8th in class", icon: Trophy },
  { title: "Perfect Attendance", description: "This week", icon: CheckCircle2 },
  { title: "Star Performer", description: "English - 88%", icon: Star },
];

const todayTimetable = [
  { time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Shilongo" },
  { time: "09:00 - 10:00", subject: "English", teacher: "Ms. Amupadhi" },
  { time: "10:20 - 11:20", subject: "Physical Science", teacher: "Mrs. Nangolo" },
  { time: "11:20 - 12:20", subject: "Life Science", teacher: "Mr. Hamunyela" },
  { time: "13:00 - 14:00", subject: "Geography", teacher: "Ms. Ndara" },
];

export default function LearnerDashboard() {
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.href = "/"; // Back to login/home
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              MS
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Welcome back, {learnerData.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {learnerData.grade} • {learnerData.school}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-xs text-destructive-foreground flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-3xl font-bold mt-2">{learnerData.attendance}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={learnerData.attendance} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Average</p>
                <p className="text-3xl font-bold mt-2">{learnerData.overallAverage}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Class Rank</p>
                <p className="text-3xl font-bold mt-2">
                  #{learnerData.rank}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    / {learnerData.totalLearners}
                  </span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-3xl font-bold mt-2">{achievements.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Timetable
            </CardTitle>
            <CardDescription>Wednesday, January 7, 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayTimetable.map((lesson, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-muted-foreground w-28">
                      {lesson.time}
                    </div>
                    <div>
                      <p className="font-medium">{lesson.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.teacher}
                      </p>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {recentAttendance.map((day, i) => (
                <div key={i} className="text-center">
                  <div
                    className={cn(
                      "w-12 h-12 mx-auto rounded-full flex items-center justify-center",
                      day.status === "present" && "bg-green-500/10",
                      day.status === "absent" && "bg-destructive/10",
                      day.status === "late" && "bg-yellow-500/10"
                    )}
                  >
                    {day.status === "present" && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {day.status === "absent" && <XCircle className="w-6 h-6 text-destructive" />}
                    {day.status === "late" && <Clock className="w-6 h-6 text-yellow-600" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{day.day}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View Full Record
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Subject Performance
          </CardTitle>
          <CardDescription>Current term averages and targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {subjects.map((subject) => (
              <div key={subject.name}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{subject.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Target: {subject.target}%
                    </p>
                  </div>
                  <p className="text-2xl font-bold">{subject.score}%</p>
                </div>
                <Progress
                  value={subject.score}
                  className="h-3"
                  indicatorClassName={
                    subject.score >= subject.target ? "bg-green-600" : "bg-primary"
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            My Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <Icon className="w-12 h-12 text-primary mb-3" />
                  <p className="font-semibold">{ach.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ach.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" size="lg" className="h-24 flex flex-col gap-2">
          <MessageSquare className="w-8 h-8" />
          <span>Message Teacher</span>
        </Button>
        <Button variant="outline" size="lg" className="h-24 flex flex-col gap-2">
          <BookOpen className="w-8 h-8" />
          <span>View Assignments</span>
        </Button>
        <Button variant="outline" size="lg" className="h-24 flex flex-col gap-2">
          <Target className="w-8 h-8" />
          <span>Study Goals</span>
        </Button>
        <Button variant="outline" size="lg" className="h-24 flex flex-col gap-2">
          <Calendar className="w-8 h-8" />
          <span>School Events</span>
        </Button>
      </div>
    </div>
  );
}