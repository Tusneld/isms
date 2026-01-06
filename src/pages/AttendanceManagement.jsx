import { useState } from "react";
import { 
  ClipboardCheck, 
  Users,
  Check,
  X,
  Clock,
  Save,
  Filter,
  Download
} from "lucide-react";

// Shadcn/UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Utility for conditional class names
import { toast } from "@/hooks/use-toast"; // Toast notification hook

// Mock learner data - in real app, this would come from an API
const mockLearners = [
  { id: "1", name: "Anna Nghipondoka", rollNo: "001", status: null },
  { id: "2", name: "Johannes Amupanda", rollNo: "002", status: null },
  { id: "3", name: "Maria Shikongo", rollNo: "003", status: null },
  { id: "4", name: "Peter Hamunyela", rollNo: "004", status: null },
  { id: "5", name: "Sofia Nangolo", rollNo: "005", status: null },
  { id: "6", name: "Thomas Shipanga", rollNo: "006", status: null },
  { id: "7", name: "Elizabeth Ndara", rollNo: "007", status: null },
  { id: "8", name: "Michael Shivute", rollNo: "008", status: null },
  { id: "9", name: "Grace Nashandi", rollNo: "009", status: null },
  { id: "10", name: "David Iipumbu", rollNo: "010", status: null },
];

export default function AttendanceManagement() {
  // State for selected class (could be loaded from user context or API)
  const [selectedClass, setSelectedClass] = useState("grade-10a");

  // State for selected date - defaults to today in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // State for list of learners and their attendance status
  const [learners, setLearners] = useState(mockLearners);

  // State to track saving process (for loading feedback)
  const [isSaving, setIsSaving] = useState(false);

  // Function to update a single learner's attendance status
  const updateStatus = (learnerId, status) => {
    setLearners(prev => 
      prev.map(s => s.id === leanerId ? { ...s, status } : s)
    );
  };

  // Quickly mark all Learners as present
  const markAllPresent = () => {
    setLearners(prev => prev.map(s => ({ ...s, status: "present" })));
  };

  // Handle saving attendance - simulates API call with delay
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    
    // Show success toast notification
    toast({
      title: "Attendance Saved",
      description: "Attendance has been recorded successfully.",
    });
  };

  // Calculate attendance statistics for display
  const stats = {
    present: learners.filter(s => s.status === "present").length,
    absent: learners.filter(s => s.status === "absent").length,
    late: learners.filter(s => s.status === "late").length,
    unmarked: learners.filter(s => s.status === null).length,
  };

  // Calculate overall attendance percentage (present + late count as attending)
  const attendanceRate = learners.length > 0 
    ? Math.round(((stats.present + stats.late) / learners.length) * 100) 
    : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            Take Attendance
          </h1>
          <p className="text-muted-foreground mt-1">
            Record daily attendance for your class
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={markAllPresent}>
            <Check className="w-4 h-4 mr-2" />
            Mark All Present
          </Button>
          
          {/* Save button with gradient style and disabled when saving or incomplete */}
          <Button 
            onClick={handleSave}
            disabled={isSaving || stats.unmarked > 0}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Attendance"}
          </Button>
        </div>
      </div>

      {/* Class and Date Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 sm:max-w-xs">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grade-10a">Grade 10A - Mathematics</SelectItem>
              <SelectItem value="grade-10b">Grade 10B - Mathematics</SelectItem>
              <SelectItem value="grade-11b">Grade 11B - Mathematics</SelectItem>
              <SelectItem value="grade-12a">Grade 12A - Mathematics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Native date input styled to match Shadcn/UI */}
        <div className="sm:w-48">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
          />
        </div>
      </div>

      {/* Attendance Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Present Card */}
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.present}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </div>
          </CardContent>
        </Card>

        {/* Absent Card */}
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <X className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.absent}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </div>
          </CardContent>
        </Card>

        {/* Late Card */}
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.late}</p>
              <p className="text-xs text-muted-foreground">Late</p>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Rate Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{attendanceRate}%</p>
              <p className="text-xs text-muted-foreground">Attendance Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learner List Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Learner List</CardTitle>
            <CardDescription>
              {stats.unmarked > 0 
                ? `${stats.unmarked} students remaining to mark` 
                : "All students marked"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {learners.map((learner) => (
              <div
                key={learner.id}
                // Conditional background/border based on attendance status
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all",
                  learner.status === "present" && "bg-accent/5 border-accent/30",
                  learner.status === "absent" && "bg-destructive/5 border-destructive/30",
                  learner.status === "late" && "bg-yellow-500/10 border-yellow-500/30",
                  learner.status === null && "bg-card border-border hover:border-primary/50"
                )}
              >
                {/* Learner Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {/* Initials from name */}
                      {leaner.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{learner.name}</p>
                    <p className="text-sm text-muted-foreground">Roll No: {learner.rollNo}</p>
                  </div>
                </div>
                
                {/* Attendance Status Buttons */}
                <div className="flex items-center gap-2">
                  {/* Present Button */}
                  <button
                    onClick={() => updateStatus(learner.id, "present")}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      learner.status === "present" 
                        ? "bg-accent text-accent-foreground shadow-md" 
                        : "bg-muted hover:bg-accent/20 text-muted-foreground"
                    )}
                    title="Present"
                  >
                    <Check className="w-5 h-5" />
                  </button>

                  {/* Late Button */}
                  <button
                    onClick={() => updateStatus(learner.id, "late")}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      student.status === "late" 
                        ? "bg-yellow-500 text-white shadow-md" 
                        : "bg-muted hover:bg-yellow-500/20 text-muted-foreground"
                    )}
                    title="Late"
                  >
                    <Clock className="w-5 h-5" />
                  </button>

                  {/* Absent Button */}
                  <button
                    onClick={() => updateStatus(learner.id, "absent")}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      student.status === "absent" 
                        ? "bg-destructive text-destructive-foreground shadow-md" 
                        : "bg-muted hover:bg-destructive/20 text-muted-foreground"
                    )}
                    title="Absent"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
