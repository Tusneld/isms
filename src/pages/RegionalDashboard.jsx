import { useState } from "react";
import {
  Users,
  School,
  GraduationCap,
  TrendingUp,
  LogOut,
  Filter,
  Calendar,
  Search
} from "lucide-react";

// shadcn/ui components (Installed via npx shadcn@latest add ...)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Charts
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const rawData = {
  circuits: ["All Circuits", "Khomasdal", "Windhoek Central", "Katutura East", "Katutura West", "Otjomuise"],
  grades: ["All Grades", "Grade 1-3", "Grade 4-7", "Grade 8-9", "Grade 10-12"],
  
  attendanceByWeek: [
    { day: "Mon", all: 95.2, "Khomasdal": 96, "Windhoek Central": 94 },
    { day: "Tue", all: 96.8, "Khomasdal": 97, "Windhoek Central": 95 },
    { day: "Wed", all: 94.1, "Khomasdal": 93, "Windhoek Central": 96 },
    { day: "Thu", all: 95.9, "Khomasdal": 96.5, "Windhoek Central": 94 },
    { day: "Fri", all: 89.3, "Khomasdal": 90, "Windhoek Central": 88 },
  ],

  performanceByGrade: [
    { grade: "Grade 1-3", passRate: 92 },
    { grade: "Grade 4-7", passRate: 88 },
    { grade: "Grade 8-9", passRate: 85 },
    { grade: "Grade 10-12", passRate: 78 },
  ],

  schools: [
    { school: "Windhoek High School", circuit: "Windhoek Central", learners: 1200, attendance: 96, performance: 85 },
    { school: "Khomas Secondary", circuit: "Khomasdal", learners: 950, attendance: 94, performance: 82 },
    { school: "Eros Girls School", circuit: "Windhoek Central", learners: 800, attendance: 97, performance: 88 },
    { school: "Academia Secondary", circuit: "Windhoek Central", learners: 1100, attendance: 93, performance: 80 },
    { school: "Augustineum Secondary", circuit: "Khomasdal", learners: 700, attendance: 91, performance: 76 },
  ],
};

export default function RegionalDashboard() {
  const [selectedCircuit, setSelectedCircuit] = useState("All Circuits");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");

  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.href = "/login";
  };

  // Logic: Calculate chart data based on circuit filter
  const filteredAttendance = rawData.attendanceByWeek.map(day => ({
    day: day.day,
    attendance: selectedCircuit === "All Circuits" ? day.all : (day[selectedCircuit] || day.all)
  }));

  const filteredSchools = selectedCircuit === "All Circuits"
    ? rawData.schools
    : rawData.schools.filter(s => s.circuit === selectedCircuit);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Ministry of Education</Badge>
            <Badge variant="outline">Khomas Region</Badge>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Regional Oversight Dashboard</h1>
          <p className="text-slate-500">Real-time statistics for all circuits in Khomas</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Calendar className="w-4 h-4 mr-2" /> Jan 2026
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* 2. FILTER SECTION */}
      
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Select Circuit
              </label>
              <Select value={selectedCircuit} onValueChange={setSelectedCircuit}>
                <SelectTrigger className="w-full bg-slate-50"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {rawData.circuits.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Grade Level
              </label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-full bg-slate-50"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {rawData.grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
               <Search className="w-4 h-4 mr-2" /> Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. KEY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Learners", value: "13,500", icon: Users, color: "text-blue-600" },
          { label: "Active Schools", value: "28", icon: School, color: "text-green-600" },
          { label: "Avg Attendance", value: "94.3%", icon: TrendingUp, color: "text-orange-600" },
          { label: "Regional Pass Rate", value: "83%", icon: GraduationCap, color: "text-purple-600" },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="text-3xl font-bold mt-1">{item.value}</p>
                </div>
                <item.icon className={`w-10 h-10 ${item.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 4. CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Attendance (%)</CardTitle>
            <CardDescription>Viewing data for {selectedCircuit}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredAttendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Performance by Grade</CardTitle>
            <CardDescription>Average pass rate across {selectedCircuit}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rawData.performanceByGrade}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="passRate" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 5. SCHOOLS TABLE */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg">Detailed School Analysis</CardTitle>
          <CardDescription>List of schools in the {selectedCircuit} circuit</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold">School Name</TableHead>
                  <TableHead className="font-bold">Circuit</TableHead>
                  <TableHead className="font-bold text-right">Learners</TableHead>
                  <TableHead className="font-bold text-right">Attendance</TableHead>
                  <TableHead className="font-bold text-right">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school, i) => (
                    <TableRow key={i} className="hover:bg-slate-50/80 transition-colors cursor-default">
                      <TableCell className="font-semibold text-slate-700">{school.school}</TableCell>
                      <TableCell><Badge variant="outline" className="font-normal">{school.circuit}</Badge></TableCell>
                      <TableCell className="text-right">{school.learners.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">{school.attendance}%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                           <span className="font-medium">{school.performance}%</span>
                           <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-purple-500 h-full" style={{width: `${school.performance}%`}}></div>
                           </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-400">No schools found for this selection.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}