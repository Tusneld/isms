import { 
  Users, 
  GraduationCap, 
  ClipboardCheck,
  TrendingUp,
  Bell
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { announcements, attendanceData, performanceData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const SchoolAdminDashboard = () => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">School Dashboard</h1>
        <p className="text-muted-foreground">Windhoek High School Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Learners"
          value="1,250"
          subtitle="Enrolled students"
          icon={GraduationCap}
          variant="primary"
        />
        <StatCard
          title="Teachers Present"
          value="45/48"
          subtitle="94% attendance"
          icon={Users}
          variant="success"
        />
        <StatCard
          title="Today's Attendance"
          value="96%"
          subtitle="1,200 present"
          icon={ClipboardCheck}
          trend={{ value: 2.3, isPositive: true }}
          variant="info"
        />
        <StatCard
          title="Avg Performance"
          value="72%"
          subtitle="This term"
          icon={TrendingUp}
          trend={{ value: 4.1, isPositive: true }}
          variant="warning"
        />
      </div>

      {/* Charts and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} domain={[80, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="present" 
                    stroke="hsl(142, 71%, 45%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(142, 71%, 45%)', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {announcement.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                <YAxis dataKey="subject" type="category" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="average" 
                  fill="hsl(172, 66%, 40%)" 
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolAdminDashboard;