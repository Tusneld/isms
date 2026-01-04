/**
 * AttendanceReports.jsx
 * 
 * A comprehensive attendance analytics dashboard for school administrators and teachers.
 * Features:
 * - Date range filtering (week, month, custom)
 * - Summary statistics cards
 * - Interactive charts (daily trend, distribution, class comparison)
 * - Export functionality (PDF & Excel)
 * - Responsive student attendance table with status indicators
 * 
 * Built with React, Recharts, shadcn/ui, and date-fns.
 */

import { useState, useMemo } from "react";
import {
  BarChart3,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  TrendingUp,
  Users,
  Check,
  X,
  Clock,
  School,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";

import { DataTable } from "@/components/dashboard/DataTable";
import { toast } from "@/hooks/use-toast";
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

// Generate mock daily attendance data for a given date range
const generateDailyData = (startDate, endDate) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days.map((date) => ({
    date: format(date, "MMM dd"),
    fullDate: format(date, "yyyy-MM-dd"),
    present: Math.floor(Math.random() * 40) + 160, // Realistic variation
    absent: Math.floor(Math.random() * 15) + 5,
    late: Math.floor(Math.random() * 12) + 3,
  }));
};

// Mock class-level attendance data
const classAttendance = [
  { class: "Grade 10A", present: 28, absent: 2, late: 1, rate: 93.5 },
  { class: "Grade 10B", present: 30, absent: 1, late: 2, rate: 96.8 },
  { class: "Grade 11A", present: 25, absent: 4, late: 3, rate: 87.5 },
  { class: "Grade 11B", present: 29, absent: 2, late: 1, rate: 93.8 },
  { class: "Grade 12A", present: 27, absent: 3, late: 2, rate: 90.6 },
  { class: "Grade 12B", present: 31, absent: 1, late: 0, rate: 96.9 },
];

// Mock individual learner attendance records
const learnerAttendanceRecords = [
  { id: "1", name: "Anna Nghipondoka", class: "Grade 10A", present: 18, absent: 2, late: 1, rate: "90.5%", status: "Good" },
  { id: "2", name: "Johannes Amupanda", class: "Grade 10A", present: 20, absent: 0, late: 1, rate: "100%", status: "Excellent" },
  { id: "3", name: "Maria Shikongo", class: "Grade 10B", present: 15, absent: 5, late: 1, rate: "76.2%", status: "At Risk" },
  { id: "4", name: "Peter Hamunyela", class: "Grade 11A", present: 19, absent: 1, late: 1, rate: "95.2%", status: "Good" },
  { id: "5", name: "Sofia Nangolo", class: "Grade 11B", present: 17, absent: 3, late: 1, rate: "85.7%", status: "Needs Attention" },
  { id: "6", name: "Thomas Shipanga", class: "Grade 12A", present: 20, absent: 0, late: 0, rate: "100%", status: "Excellent" },
  { id: "7", name: "Elizabeth Ndara", class: "Grade 12A", present: 16, absent: 4, late: 1, rate: "80.9%", status: "Needs Attention" },
  { id: "8", name: "Michael Shivute", class: "Grade 12B", present: 18, absent: 2, late: 0, rate: "90.0%", status: "Good" },
];

// Mock weekly attendance trend data
const weeklyTrends = [
  { week: "Week 1", rate: 94.2 },
  { week: "Week 2", rate: 92.8 },
  { week: "Week 3", rate: 95.1 },
  { week: "Week 4", rate: 93.5 },
];

// Chart color palette (consistent with iSMS theme)
const CHART_COLORS = {
  present: "hsl(145, 55%, 38%)", // Green
  absent: "hsl(0, 72%, 48%)",    // Red
  late: "hsl(42, 92%, 50%)",     // Yellow/Gold
  primary: "hsl(210, 80%, 42%)", // Blue
};

const PIE_COLORS = [CHART_COLORS.present, CHART_COLORS.absent, CHART_COLORS.late];

export default function AttendanceReports() {
  // State for filters
  const [dateRange, setDateRange] = useState("week");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState("all");

  // Memoized daily attendance data based on selected date range
  const dailyData = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return generateDailyData(start, end);
  }, [startDate, endDate]);

  // Calculate summary statistics (present, absent, late, rate)
  const summaryStats = useMemo(() => {
    const totals = dailyData.reduce(
      (acc, day) => ({
        present: acc.present + day.present,
        absent: acc.absent + day.absent,
        late: acc.late + day.late,
      }),
      { present: 0, absent: 0, late: 0 }
    );
    const total = totals.present + totals.absent + totals.late;
    return {
      ...totals,
      total,
      rate: total > 0 ? ((totals.present / total) * 100).toFixed(1) : "0",
    };
  }, [dailyData]);

  // Prepare data for pie chart (distribution)
  const pieData = [
    { name: "Present", value: summaryStats.present, color: CHART_COLORS.present },
    { name: "Absent", value: summaryStats.absent, color: CHART_COLORS.absent },
    { name: "Late", value: summaryStats.late, color: CHART_COLORS.late },
  ];

  // Handle date range selection changes
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    const today = new Date();
    if (range === "week") {
      setStartDate(format(startOfWeek(today), "yyyy-MM-dd"));
      setEndDate(format(endOfWeek(today), "yyyy-MM-dd"));
    } else if (range === "month") {
      setStartDate(format(startOfMonth(today), "yyyy-MM-dd"));
      setEndDate(format(endOfMonth(today), "yyyy-MM-dd"));
    }
  };

  // Export attendance report as PDF using jsPDF and jspdf-autotable
  const exportToPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();

      // Report title and metadata
      doc.setFontSize(20);
      doc.setTextColor(30, 64, 107);
      doc.text("Attendance Report", 14, 22);

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Period: ${startDate} to ${endDate}`, 14, 32);
      doc.text(`Generated: ${format(new Date(), "PPP")}`, 14, 39);

      // Summary statistics table
      doc.setFontSize(14);
      doc.setTextColor(30, 64, 107);
      doc.text("Summary Statistics", 14, 52);

      autoTable(doc, {
        startY: 56,
        head: [["Metric", "Value"]],
        body: [
          ["Total Present", summaryStats.present.toString()],
          ["Total Absent", summaryStats.absent.toString()],
          ["Total Late", summaryStats.late.toString()],
          ["Attendance Rate", `${summaryStats.rate}%`],
        ],
        theme: "striped",
        headStyles: { fillColor: [30, 99, 168] },
      });

      // Class-wise attendance table
      doc.setFontSize(14);
      doc.text("Class-wise Attendance", 14, doc.lastAutoTable.finalY + 15);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Class", "Present", "Absent", "Late", "Rate"]],
        body: classAttendance.map((c) => [
          c.class,
          c.present.toString(),
          c.absent.toString(),
          c.late.toString(),
          `${c.rate}%`,
        ]),
        theme: "striped",
        headStyles: { fillColor: [30, 99, 168] },
      });

      // Learner records (new page)
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Individual Learner Records", 14, 22);

      autoTable(doc, {
        startY: 28,
        head: [["Name", "Class", "Present", "Absent", "Late", "Rate", "Status"]],
        body: learnerAttendanceRecords.map((s) => [
          s.name,
          s.class,
          s.present.toString(),
          s.absent.toString(),
          s.late.toString(),
          s.rate,
          s.status,
        ]),
        theme: "striped",
        headStyles: { fillColor: [30, 99, 168] },
        columnStyles: {
          6: { cellWidth: 25, fontStyle: "bold" },
        },
      });

      doc.save(`attendance-report-${startDate}-to-${endDate}.pdf`);
      toast({
        title: "PDF Exported",
        description: "Attendance report has been downloaded as PDF.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export attendance report as Excel using SheetJS (xlsx)
  const exportToExcel = async () => {
    try {
      const XLSX = await import("xlsx");

      const wb = XLSX.utils.book_new();

      // Summary sheet
      const summaryData = [
        ["Attendance Report"],
        [`Period: ${startDate} to ${endDate}`],
        [],
        ["Metric", "Value"],
        ["Total Present", summaryStats.present],
        ["Total Absent", summaryStats.absent],
        ["Total Late", summaryStats.late],
        ["Attendance Rate", `${summaryStats.rate}%`],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");

      // Daily attendance sheet
      const dailyHeaders = ["Date", "Present", "Absent", "Late"];
      const dailyRows = dailyData.map((d) => [d.date, d.present, d.absent, d.late]);
      const dailySheet = XLSX.utils.aoa_to_sheet([dailyHeaders, ...dailyRows]);
      XLSX.utils.book_append_sheet(wb, dailySheet, "Daily Attendance");

      // Class-wise sheet
      const classHeaders = ["Class", "Present", "Absent", "Late", "Rate (%)"];
      const classRows = classAttendance.map((c) => [c.class, c.present, c.absent, c.late, c.rate]);
      const classSheet = XLSX.utils.aoa_to_sheet([classHeaders, ...classRows]);
      XLSX.utils.book_append_sheet(wb, classSheet, "By Class");

      // Learner records sheet
      const learnerHeaders = ["Name", "Class", "Present", "Absent", "Late", "Rate", "Status"];
      const learnerRows = learnerAttendanceRecords.map((s) => [
        s.name, s.class, s.present, s.absent, s.late, s.rate, s.status,
      ]);
      const learnerSheet = XLSX.utils.aoa_to_sheet([learnerHeaders, ...learnerRows]);
      XLSX.utils.book_append_sheet(wb, learnerSheet, "Learner Records");

      XLSX.writeFile(wb, `attendance-report-${startDate}-to-${endDate}.xlsx`);

      toast({
        title: "Excel Exported",
        description: "Attendance report has been downloaded as Excel file.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Export Failed",
        description: "Failed to generate Excel file. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Column configuration for the learner attendance DataTable
  const tableColumns = [
    { key: "name", header: "Learner Name", sortable: true },
    { key: "class", header: "Class", sortable: true },
    { key: "present", header: "Present", sortable: true },
    { key: "absent", header: "Absent", sortable: true },
    { key: "late", header: "Late", sortable: true },
    { key: "rate", header: "Rate", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "Excellent"
              ? "bg-green-500/15 text-green-700 dark:text-green-400"
              : value === "Good"
              ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
              : value === "Needs Attention"
              ? "bg-orange-500/15 text-orange-700 dark:text-orange-400"
              : "bg-red-500/15 text-red-700 dark:text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Page Header with Title and Export Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Attendance Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive attendance analytics and insights
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportToPDF}>
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToExcel}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export as Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filter Panel */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Range Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <Select value={dateRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Inputs (shown only when "Custom Range" selected) */}
              {dateRange === "custom" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </>
              )}

              {/* School Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">School</label>
                <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    <SelectItem value="windhoek-primary">Windhoek Primary</SelectItem>
                    <SelectItem value="oshakati-secondary">Oshakati Secondary</SelectItem>
                    <SelectItem value="swakopmund-high">Swakopmund High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Class Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="grade-10a">Grade 10A</SelectItem>
                    <SelectItem value="grade-10b">Grade 10B</SelectItem>
                    <SelectItem value="grade-11a">Grade 11A</SelectItem>
                    <SelectItem value="grade-11b">Grade 11B</SelectItem>
                    <SelectItem value="grade-12a">Grade 12A</SelectItem>
                    <SelectItem value="grade-12b">Grade 12B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Apply Filters Button */}
            <Button variant="outline" className="shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{summaryStats.present.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Present</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{summaryStats.absent.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Absent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{summaryStats.late.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Late</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{summaryStats.rate}%</p>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts with Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily">Daily Trend</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="class">By Class</TabsTrigger>
        </TabsList>

        {/* Daily Attendance Trend Chart */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Daily Attendance Trend
              </CardTitle>
              <CardDescription>
                Attendance breakdown for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyData}>
                    <defs>
                      <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.present} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.present} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.absent} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.absent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="present"
                      stroke={CHART_COLORS.present}
                      fill="url(#presentGradient)"
                      strokeWidth={2}
                      name="Present"
                    />
                    <Area
                      type="monotone"
                      dataKey="absent"
                      stroke={CHART_COLORS.absent}
                      fill="url(#absentGradient)"
                      strokeWidth={2}
                      name="Absent"
                    />
                    <Line
                      type="monotone"
                      dataKey="late"
                      stroke={CHART_COLORS.late}
                      strokeWidth={2}
                      dot={false}
                      name="Late"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Distribution & Weekly Trend */}
        <TabsContent value="distribution">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart: Attendance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
                <CardDescription>Overall breakdown by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Line Chart: Weekly Attendance Rate Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Trend</CardTitle>
                <CardDescription>Attendance rate by week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis domain={[85, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke={CHART_COLORS.primary}
                        strokeWidth={3}
                        dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 5 }}
                        name="Attendance Rate %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bar Chart: Class-wise Attendance Comparison */}
        <TabsContent value="class">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="w-5 h-5 text-primary" />
                Class-wise Attendance
              </CardTitle>
              <CardDescription>Comparison across all classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classAttendance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis dataKey="class" type="category" width={80} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="present" fill={CHART_COLORS.present} name="Present" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="absent" fill={CHART_COLORS.absent} name="Absent" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="late" fill={CHART_COLORS.late} name="Late" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Learner Attendance Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Learner Attendance Records
          </CardTitle>
          <CardDescription>
            Individual attendance records with status indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={learnertAttendanceRecords}
            columns={tableColumns}
            searchPlaceholder="Search learners..."
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}