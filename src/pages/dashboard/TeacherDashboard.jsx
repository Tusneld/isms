import { 
  Users, 
  ClipboardCheck,
  BookOpen,
  Calendar,
  Clock
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { timetable } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const todaySchedule = timetable.filter((t) => t.day === 'Monday');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Mr. Hamutenya</p>
        </div>
        <Button asChild>
          <Link to="/attendance">
            <ClipboardCheck className="w-4 h-4 mr-2" />
            Mark Attendance
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Classes"
          value="4"
          subtitle="Active classes"
          icon={BookOpen}
          variant="primary"
        />
        <StatCard
          title="Total Students"
          value="142"
          subtitle="Across all classes"
          icon={Users}
          variant="info"
        />
        <StatCard
          title="Today's Classes"
          value="5"
          subtitle="Scheduled lessons"
          icon={Calendar}
          variant="success"
        />
        <StatCard
          title="Attendance Rate"
          value="94%"
          subtitle="This week"
          icon={ClipboardCheck}
          trend={{ value: 1.5, isPositive: true }}
          variant="warning"
        />
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySchedule.map((lesson) => (
              <div 
                key={lesson.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-semibold text-foreground">{lesson.time.split('-')[0]}</p>
                  <p className="text-xs text-muted-foreground">{lesson.time.split('-')[1]}</p>
                </div>
                <div className="w-1 h-12 rounded-full bg-primary" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{lesson.subject}</h4>
                  <p className="text-sm text-muted-foreground">{lesson.room}</p>
                </div>
                <Badge variant="secondary">Grade 10A</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Mark Attendance</h3>
                <p className="text-sm text-muted-foreground">Record today's attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-info" />
              </div>
              <div>
                <h3 className="font-semibold">View Learners</h3>
                <p className="text-sm text-muted-foreground">Manage your students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Timetable</h3>
                <p className="text-sm text-muted-foreground">View full schedule</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
