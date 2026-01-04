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

// Sample data
const enrollmentData = [
  { month: "Jul", enrolled: 48000, capacity: 52000 },
  { month: "Aug", enrolled: 49200, capacity: 52000 },
  { month: "Sep", enrolled: 49800, capacity: 52000 },
  { month: "Oct", enrolled: 50500, capacity: 52000 },
  { month: "Nov", enrolled: 51200, capacity: 52000 },
  { month: "Dec", enrolled: 51800, capacity: 52000 },
];

const regionData = [
  { name: "Khomas", value: 13500, color: "hsl(var(--primary))" },
  { name: "Erongo", value: 9200, color: "hsl(var(--chart-2))" },
  { name: "Oshana", value: 8800, color: "hsl(var(--chart-3))" },
  { name: "Omusati", value: 7500, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 17000, color: "hsl(var(--muted-foreground))" },
];

const attendanceData = [
  { day: "Mon", attendance: 95.2 },
  { day: "Tue", attendance: 96.8 },
  { day: "Wed", attendance: 94.1 },
  { day: "Thu", attendance: 95.9 },
  { day: "Fri", attendance: 89.3 },
];

const pendingAdmissions = [
  {
    id: "1",
    learnerName: "Maria Shikongo",
    school: "Windhoek High School",
    region: "Khomas",
    submittedDate: "2025-12-28",
    source: "online",
    status: "pending",
  },
  {
    id: "2",
    learnerName: "Johannes Amupanda",
    school: "Oshakati Secondary",
    region: "Oshana",
    submittedDate: "2025-12-29",
    source: "sms",
    status: "pending",
  },
  {
    id: "3",
    learnerName: "Anna Nghipondoka",
    school: "Swakopmund High",
    region: "Erongo",
    submittedDate: "2025-12-29",
    source: "online",
    status: "pending",
  },
  {
    id: "4",
    learnerName: "Peter Hamunyela",
    school: "Rundu Senior Secondary",
    region: "Kavango East",
    submittedDate: "2025-12-27",
    source: "online",
    status: "pending",
  },
  {
    id: "5",
    learnerName: "Sofia Nangolo",
    school: "Ondangwa Combined",
    region: "Oshana",
    submittedDate: "2025-12-26",
    source: "sms",
    status: "pending",
  },
];

// Simple StatCard fallback
const StatCard = ({ title, value, icon, trend, variant = "default" }) => {
  const variantColors = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-600 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    danger: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <Card className={`border ${variantColors[variant] || ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {trend && (
              <p
                className={`text-sm mt-2 flex items-center gap-1 ${
                  trend.value > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value > 0 ? "+ " : ""}
                {trend.value}% {trend.label}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SuperAdminDashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            National Education Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time insights across all 14 regions of Namibia • December 2025
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="lg">
            <Calendar className="w-5 h-5 mr-2" />
            Academic Year 2025
          </Button>
          <Button variant="default" size="lg">
            <TrendingUp className="w-5 h-5 mr-2" />
            Generate National Report
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Learners"
          value="51,800"
          icon={<GraduationCap className="w-6 h-6 text-primary" />}
          trend={{ value: 3.6, label: "vs last term" }}
          variant="primary"
        />
        <StatCard
          title="Active Schools"
          value="248"
          icon={<School className="w-6 h-6 text-green-600" />}
          trend={{ value: 3, label: "new schools" }}
          variant="success"
        />
        <StatCard
          title="Teachers"
          value="3,620"
          icon={<Users className="w-6 h-6 text-yellow-600" />}
          trend={{ value: 5.8, label: "growth" }}
          variant="warning"
        />
        <StatCard
          title="Pending Admissions"
          value="87"
          icon={<UserPlus className="w-6 h-6 text-red-600" />}
          trend={{ value: -29, label: "from yesterday" }}
          variant="danger"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Enrollment Trend (Term 4, 2025)
            </CardTitle>
            <CardDescription>Monthly enrollment vs capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="enrolled" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="capacity" fill="hsl(var(--muted))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Learners by Region
            </CardTitle>
            <CardDescription>Total: 51,800 learners</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => v.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {regionData.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Weekly Attendance Rate
            </CardTitle>
            <CardDescription>National average • Week of Dec 23–29</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
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
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pending Admissions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-destructive" />
              Pending Admissions
            </CardTitle>
            <CardDescription>87 new registration requests awaiting review</CardDescription>
          </div>
          <Button variant="outline">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-muted-foreground">Learner</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">School</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Region</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {pendingAdmissions.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50 transition">
                    <td className="py-4 font-medium">{item.learnerName}</td>
                    <td className="py-4 text-muted-foreground">{item.school}</td>
                    <td className="py-4 text-muted-foreground">{item.region}</td>
                    <td className="py-4 text-muted-foreground">{item.submittedDate}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.source === "online"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/10 text-secondary-foreground"
                        }`}
                      >
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
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg">Critical Alert: Resource Shortage</h4>
              <p className="text-sm text-muted-foreground mt-1">
                4 schools in Omusati region report severe textbook shortages ahead of Term 1.
              </p>
              <Button variant="link" className="h-auto p-0 mt-3 text-destructive">
                Take Action →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg">Upcoming Event</h4>
              <p className="text-sm text-muted-foreground mt-1">
                National Curriculum Review Workshop • January 15–17, 2026 • Windhoek
              </p>
              <Button variant="link" className="h-auto p-0 mt-3 text-primary">
                View Details →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}