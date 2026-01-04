import {
  DollarSign,
  Users,
  TrendingUp,
  HandHeart,
  Calendar,
  MessageSquare,
  FileText,
  Award,
  Bell,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Mock sponsor data - December 30, 2025
const sponsor = {
  name: "NamPower Foundation",
  totalSponsored: 48,
  totalAmount: "N$ 285,000",
  activeScholarships: 32,
  completed: 16,
  impactSchools: 18,
};

const sponsoredLearners = [
  { name: "Anna Shikongo", grade: "Grade 12", school: "Windhoek High School", amount: "N$ 6,500", status: "active" },
  { name: "Johannes Hamunyela", grade: "Grade 11", school: "Oshakati Secondary", amount: "N$ 5,800", status: "active" },
  { name: "Maria Nghipondoka", grade: "Grade 10", school: "Swakopmund High", amount: "N$ 6,200", status: "completed" },
  { name: "Peter Amupanda", grade: "Grade 12", school: "Rundu Senior Secondary", amount: "N$ 7,000", status: "active" },
];

const upcomingPayments = [
  { learner: "Anna Shikongo", due: "Jan 15, 2026", amount: "N$ 3,250", type: "Term 1 Fees" },
  { learner: "Johannes Hamunyela", due: "Jan 15, 2026", amount: "N$ 2,900", type: "Term 1 Fees" },
  { learner: "Peter Amupanda", due: "Jan 20, 2026", amount: "N$ 3,500", type: "Term 1 + Books" },
];

const recentMessages = [
  { from: "Windhoek High School", subject: "Thank you for continued support", time: "2 days ago" },
  { from: "Anna Shikongo", subject: "End-of-year update & gratitude", time: "1 week ago" },
  { from: "Ministry of Education", subject: "2025 Sponsorship Impact Report", time: "Dec 20" },
];

export default function SponsorDashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Welcome back, {sponsor.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Empowering education across Namibia
          </p>
          <p className="text-muted-foreground mt-1">
            Tuesday, December 30, 2025
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <Bell className="w-5 h-5" />
            <Badge variant="secondary" className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
          <Button>
            <HandHeart className="w-5 h-5 mr-2" />
            Make New Donation
          </Button>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sponsored</p>
                <p className="text-4xl font-bold mt-2">{sponsor.totalSponsored}</p>
                <p className="text-sm text-green-600 mt-2">Learners</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contribution</p>
                <p className="text-4xl font-bold mt-2">{sponsor.totalAmount}</p>
                <p className="text-sm text-green-600 mt-2">Since 2022</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Scholarships</p>
                <p className="text-4xl font-bold mt-2">{sponsor.activeScholarships}</p>
                <Progress value={(sponsor.activeScholarships / sponsor.totalSponsored) * 100} className="mt-3 h-3" />
              </div>
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Schools Impacted</p>
                <p className="text-4xl font-bold mt-2">{sponsor.impactSchools}</p>
                <p className="text-sm text-muted-foreground mt-2">Across 7 regions</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <HandHeart className="w-7 h-7 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sponsored Students */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              Your Sponsored Learners
            </CardTitle>
            <CardDescription>Currently supported learners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sponsoredLearners.map((learner, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 rounded-xl border bg-card hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {learner.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{learner.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {learner.grade} • {learner.school}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{learner.amount}/year</p>
                    <Badge variant={learner.status === "active" ? "default" : "secondary"}>
                      {learner.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View All Learners <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Upcoming Payments
            </CardTitle>
            <CardDescription>Term 1 2026 contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment, i) => (
                <div key={i} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{payment.learner}</p>
                      <p className="text-sm text-muted-foreground">{payment.type}</p>
                    </div>
                    <p className="font-semibold">{payment.amount}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-muted-foreground">Due: {payment.due}</p>
                    <Button size="sm">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages & Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              Recent Messages & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((msg, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{msg.from}</p>
                    <p className="text-sm text-muted-foreground mt-1">{msg.subject}</p>
                    <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground mt-2" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              View All Messages
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              Your Impact Summary
            </CardTitle>
            <CardDescription>2025 highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center py-8">
                <p className="text-5xl font-bold text-primary">48</p>
                <p className="text-lg text-muted-foreground mt-2">Learners supported in 2025</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-semibold">89%</p>
                  <p className="text-sm text-muted-foreground">Average pass rate</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">14</p>
                  <p className="text-sm text-muted-foreground">Completed Grade 12</p>
                </div>
              </div>
              <Button className="w-full">
                Download Impact Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Button variant="outline" className="h-28 flex flex-col gap-3">
          <DollarSign className="w-8 h-8" />
          <span className="font-medium">Make Payment</span>
        </Button>
        <Button variant="outline" className="h-28 flex flex-col gap-3">
          <Users className="w-8 h-8" />
          <span className="font-medium">Sponsor New Learner</span>
        </Button>
        <Button variant="outline" className="h-28 flex flex-col gap-3">
          <FileText className="w-8 h-8" />
          <span className="font-medium">View Reports</span>
        </Button>
        <Button variant="outline" className="h-28 flex flex-col gap-3">
          <MessageSquare className="w-8 h-8" />
          <span className="font-medium">Contact Schools</span>
        </Button>
      </div>
    </div>
  );
}