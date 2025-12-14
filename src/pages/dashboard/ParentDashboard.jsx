import { 
  GraduationCap, 
  ClipboardCheck,
  Calendar,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { attendanceData } from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ParentDashboard = () => {
  // Mock child data
  const children = [
    { id: 1, name: 'Ndapandula Shikongo', grade: '10A', attendance: 96, avgGrade: 78 },
  ];

  const selectedChild = children[0];

  const childGrades = [
    { subject: 'Mathematics', grade: 72, trend: 'up' },
    { subject: 'English', grade: 85, trend: 'up' },
    { subject: 'Physical Science', grade: 68, trend: 'down' },
    { subject: 'History', grade: 82, trend: 'stable' },
    { subject: 'Geography', grade: 75, trend: 'up' },
  ];

  const getGradeColor = (grade) => {
    if (grade >= 80) return 'text-success';
    if (grade >= 60) return 'text-info';
    if (grade >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Parent Dashboard</h1>
        <p className="text-muted-foreground">Monitor your child's academic progress</p>
      </div>

      {/* Child Selector */}
      <Card className="bg-gradient-to-r from-primary/5 to-info/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{selectedChild.name}</h2>
              <p className="text-muted-foreground">Grade {selectedChild.grade} • Windhoek High School</p>
            </div>
            <Badge variant="secondary" className="text-lg py-1 px-3">
              Avg: {selectedChild.avgGrade}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <ClipboardCheck className="w-10 h-10 mx-auto mb-3 text-success" />
            <p className="text-3xl font-bold text-foreground">{selectedChild.attendance}%</p>
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-10 h-10 mx-auto mb-3 text-warning" />
            <p className="text-3xl font-bold text-foreground">{selectedChild.avgGrade}%</p>
            <p className="text-sm text-muted-foreground">Average Grade</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-10 h-10 mx-auto mb-3 text-info" />
            <p className="text-3xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Days Present This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} domain={[0, 100]} />
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

      {/* Subject Grades */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Subject Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {childGrades.map((subject) => (
              <div 
                key={subject.subject}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{subject.subject}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-bold ${getGradeColor(subject.grade)}`}>
                    {subject.grade}%
                  </span>
                  <span className={
                    subject.trend === 'up' ? 'text-success' : 
                    subject.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                  }>
                    {getTrendIcon(subject.trend)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;
