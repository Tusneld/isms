import { 
  School, 
  Users, 
  GraduationCap, 
  MapPin
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { regions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
} from 'recharts';

const COLORS = ['hsl(172, 66%, 40%)', 'hsl(199, 89%, 48%)', 'hsl(38, 92%, 50%)', 'hsl(142, 71%, 45%)', 'hsl(280, 65%, 60%)'];

const SuperAdminDashboard = () => {
  const totalSchools = regions.reduce((acc, r) => acc + r.schools, 0);
  const totalLearners = regions.reduce((acc, r) => acc + r.learners, 0);
  const totalTeachers = regions.reduce((acc, r) => acc + r.teachers, 0);

  const regionChartData = regions.map((r) => ({
    name: r.name.substring(0, 8),
    learners: r.learners / 1000,
    schools: r.schools,
  }));

  const schoolTypeData = [
    { name: 'Secondary', value: 180 },
    { name: 'Primary', value: 85 },
    { name: 'Combined', value: 18 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ministry Dashboard</h1>
        <p className="text-muted-foreground">National education overview and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Regions"
          value={regions.length}
          subtitle="Educational regions"
          icon={MapPin}
          variant="primary"
        />
        <StatCard
          title="Total Schools"
          value={totalSchools.toLocaleString()}
          subtitle="Registered institutions"
          icon={School}
          trend={{ value: 3.2, isPositive: true }}
          variant="info"
        />
        <StatCard
          title="Total Learners"
          value={`${(totalLearners / 1000).toFixed(1)}K`}
          subtitle="Enrolled students"
          icon={GraduationCap}
          trend={{ value: 5.8, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Total Teachers"
          value={`${(totalTeachers / 1000).toFixed(1)}K`}
          subtitle="Active educators"
          icon={Users}
          trend={{ value: 2.1, isPositive: true }}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="learners" name="Learners (K)" fill="hsl(172, 66%, 40%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* School Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">School Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={schoolTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {schoolTypeData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 -mt-4">
                {schoolTypeData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Regions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Region</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Schools</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Learners</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Teachers</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => (
                  <tr key={region.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{region.name}</td>
                    <td className="py-3 px-4 text-right">{region.schools}</td>
                    <td className="py-3 px-4 text-right">{region.learners.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{region.teachers.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="secondary">
                        1:{Math.round(region.learners / region.teachers)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;