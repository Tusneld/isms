import { useState } from "react";
import {
  Smartphone,
  MessageSquare,
  Check,
  X,
  Clock,
  Send,
  ChevronRight,
  Phone,
  School,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

// Mock data updated to current date context (December 2025)
const mockRegistrations = [
  {
    id: "1",
    phone: "+264 81 234 5678",
    learnerName: "Johannes Hamunyela",
    parentName: "Maria Hamunyela",
    requestedSchool: "Oshakati Secondary School",
    grade: "Grade 8",
    receivedAt: "2025-12-29 14:30",
    status: "pending",
    rawMessage: "REGISTER Johannes Hamunyela, Grade 8, Oshakati Secondary, Maria Hamunyela",
  },
  {
    id: "2",
    phone: "+264 85 987 6543",
    learnerName: "Anna Shikongo",
    parentName: "Peter Shikongo",
    requestedSchool: "Windhoek High School",
    grade: "Grade 10",
    status: "pending",
    receivedAt: "2025-12-30 09:15",
    rawMessage: "REGISTER Anna Shikongo, Grade 10, Windhoek High, Peter Shikongo",
  },
  {
    id: "3",
    phone: "+264 81 555 1234",
    learnerName: "Thomas Nghipondoka",
    parentName: "Sofia Nghipondoka",
    requestedSchool: "Rundu Senior Secondary",
    grade: "Grade 11",
    status: "processing",
    receivedAt: "2025-12-29 11:45",
    rawMessage: "REGISTER Thomas Nghipondoka, Grade 11, Rundu Senior, Sofia Nghipondoka",
  },
  {
    id: "4",
    phone: "+264 85 111 2222",
    learnerName: "Grace Iipumbu",
    parentName: "David Iipumbu",
    requestedSchool: "Ongwediva High School",
    grade: "Grade 7",
    status: "approved",
    receivedAt: "2025-12-28 16:20",
    rawMessage: "REGISTER Grace Iipumbu, Grade 7, Ongwediva High, David Iipumbu",
  },
  {
    id: "5",
    phone: "+264 81 777 8888",
    learnerName: "Lukas Amupadhi",
    parentName: "Helena Amupadhi",
    requestedSchool: "Eenhana Secondary School",
    grade: "Grade 9",
    status: "rejected",
    receivedAt: "2025-12-27 10:05",
    rawMessage: "REGISTER Lukas Amupadhi, Grade 9, Eenhana Secondary, Helena Amupadhi",
  },
];

export default function SMSRegistrations() {
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [selectedReg, setSelectedReg] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredRegistrations =
    filter === "all"
      ? registrations
      : registrations.filter((r) => r.status === filter);

  const pendingCount = registrations.filter((r) => r.status === "pending").length;

  const handleApprove = (id) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "approved" } : r
      )
    );
    toast({
      title: "Registration Approved ✅",
      description: "Confirmation SMS sent to parent.",
    });
    setSelectedReg(null);
  };

  const handleReject = (id) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "rejected" } : r
      )
    );
    toast({
      title: "Registration Rejected",
      description: "Parent notified via SMS.",
    });
    setSelectedReg(null);
  };

  const handleSendReply = () => {
    if (!selectedReg || !replyMessage.trim()) return;

    toast({
      title: "SMS Reply Sent 📱",
      description: `Message delivered to ${selectedReg.phone}`,
    });
    setReplyMessage("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "approved":
        return "bg-green-500/10 text-green-600 border-green-500/30";
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      case "processing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-primary" />
            SMS Registrations
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and process parent registration requests received via SMS
          </p>
        </div>
        <div className="flex items-center gap-3">
          {pendingCount > 0 && (
            <Badge variant="destructive" className="text-base px-4 py-2">
              {pendingCount} Pending
            </Badge>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {["all", "pending", "processing", "approved", "rejected"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize whitespace-nowrap"
          >
            {status.replace("_", " ")}
            {status === "pending" && pendingCount > 0 && (
              <span className="ml-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Registration List */}
      <div className="grid gap-4">
        {filteredRegistrations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Smartphone className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-semibold text-foreground">
                No registrations found
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {filter === "all"
                  ? "No SMS registration requests at this time."
                  : `No ${filter} registrations.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRegistrations.map((reg) => (
            <Card
              key={reg.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
                reg.status === "pending" && "border-l-4 border-l-primary",
                reg.status === "processing" && "border-l-4 border-l-blue-500"
              )}
              onClick={() => setSelectedReg(reg)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-foreground text-lg">
                          {reg.learnerName}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn("capitalize", getStatusColor(reg.status))}
                        >
                          {reg.status}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {reg.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4" />
                          {reg.requestedSchool} • {reg.grade}
                        </div>
                        <div className="text-xs">Parent: {reg.parentName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{reg.receivedAt}</div>
                    <ChevronRight className="w-5 h-5 mt-2 mx-auto text-muted-foreground/60" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Detail & Action Dialog */}
      <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">SMS Registration Request</DialogTitle>
            <DialogDescription>
              Review details and take action
            </DialogDescription>
          </DialogHeader>

          {selectedReg && (
            <>
              <div className="space-y-6 py-4">
                {/* Original Raw Message */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Original SMS Message
                  </p>
                  <div className="p-4 rounded-lg bg-muted font-mono text-sm break-words">
                    {selectedReg.rawMessage}
                  </div>
                </div>

                {/* Parsed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Learner Name</p>
                    <p className="font-semibold text-foreground">
                      {selectedReg.learnerName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-semibold text-foreground">
                      {selectedReg.grade}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Parent Name</p>
                    <p className="font-semibold text-foreground">
                      {selectedReg.parentName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-semibold text-foreground">
                      {selectedReg.phone}
                    </p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Requested School</p>
                    <p className="font-semibold text-foreground">
                      {selectedReg.requestedSchool}
                    </p>
                  </div>
                </div>

                {/* Reply SMS Section */}
                <div className="space-y-3">
                  <p className="font-medium">Send Reply via SMS</p>
                  <Textarea
                    placeholder="Type your message to the parent..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-24 resize-none"
                  />
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    variant="outline"
                    size="sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send SMS Reply
                  </Button>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3">
                {selectedReg.status === "pending" && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedReg.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Request
                    </Button>
                    <Button
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedReg.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve Registration
                    </Button>
                  </>
                )}

                {(selectedReg.status === "approved" ||
                  selectedReg.status === "rejected" ||
                  selectedReg.status === "processing") && (
                  <Button variant="outline" onClick={() => setSelectedReg(null)}>
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}