/**
 * LoginPage.jsx
 * * Handles multi-role authentication for the iSMS platform.
 * Features:
 * - Role-based navigation logic
 * - Session persistence via localStorage
 * - Dynamic UI based on login status
 * - Protected route redirection
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Shield,
  MapPin,
  School,
  Users,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  LogOut,
} from "lucide-react";

// UI Components from shadcn/ui library
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** * Role Configuration
 * Defines the available user portals and their associated metadata.
 */
const roles = [
  {
    id: "super_admin",
    title: "Super Admin",
    description: "National oversight",
    icon: Shield,
    color: "bg-destructive/10 text-destructive border-destructive/30",
  },
  {
    id: "regional_admin",
    title: "Regional Admin",
    description: "Regional management",
    icon: MapPin,
    color: "bg-primary/10 text-primary border-primary/30",
  },
  {
    id: "school_admin",
    title: "School Admin",
    description: "School management",
    icon: School,
    color: "bg-accent/10 text-accent border-accent/30",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Classroom access",
    icon: GraduationCap,
    color: "bg-secondary/10 text-secondary-foreground border-secondary/30",
  },
  {
    id: "parent",
    title: "Parent",
    description: "Learner tracking",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  {
    id: "learner",
    title: "Learner",
    description: "Learner portal",
    icon: User,
    color: "bg-green-500/10 text-green-600 border-green-500/30",
  },
  {
    id: "sponsor",
    title: "Sponsor",
    description: "Support education",
    icon: GraduationCap,
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  },
];

/**
 * Route Mapping Utility
 * Maps a user's role to their specific dashboard route.
 * Crucial for preventing unauthorized access and redirect loops.
 */
const getDashboardPath = (role) => {
  const routes = {
    super_admin: "/admin",
    regional_admin: "/regional", 
    school_admin: "/school",
    teacher: "/teacher",
    parent: "/parent",
    learner: "/learner",
    sponsor: "/sponsor",
  };
  return routes[role] || "/login";
};

export default function LoginPage() {
  const navigate = useNavigate();
  
  // Component State Management
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Persistence: Retrieve existing user session from storage
  const currentUser = JSON.parse(localStorage.getItem("isms_user"));

  /**
   * Session Watcher
   * Automatically redirects users to their dashboard if a valid session exists.
   */
  useEffect(() => {
    if (currentUser) {
      const targetPath = getDashboardPath(currentUser.role);
      navigate(targetPath, { replace: true });
    }
  }, [currentUser, navigate]);

  /**
   * Authentication Handler
   * Validates user input and creates a local session.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole || !email || !password) {
      alert("Please select a role and fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate Network Latency for UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock Backend Mapping: Associating personas with roles for demonstration
    const userMap = {
      super_admin: { name: "John Nangombe", role: "super_admin" },
      regional_admin: { name: "Director: Khomas Region", role: "regional_admin" },
      school_admin: { name: "Ms. Amupadhi", role: "school_admin" },
      teacher: { name: "Mr. Shilongo", role: "teacher" },
      parent: { name: "Mrs. Shikongo", role: "parent" },
      learner: { name: "Maria Shikongo", role: "learner" },
      sponsor: { name: "NamPower Foundation", role: "sponsor" },
    };

    const user = {
      email,
      name: userMap[selectedRole]?.name || "User",
      role: selectedRole,
    };

    // Save session to LocalStorage (Production would use secure HttpOnly cookies)
    localStorage.setItem("isms_user", JSON.stringify(user));

    setIsLoading(false);

    // Final navigation based on role mapping
    navigate(getDashboardPath(selectedRole));
  };

  /**
   * Session Termination
   * Clears local storage and resets the application state.
   */
  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    setSelectedRole(null);
    setEmail("");
    setPassword("");
    window.location.reload(); 
  };

  /** * View: Authenticated User (Session Resume)
   * Prevents re-login by showing a "Welcome Back" card if a session is active.
   */
  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
        <Card className="w-full max-w-md border-none shadow-2xl bg-white">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="font-semibold text-lg text-slate-900">{currentUser.name}</p>
                <Badge variant="secondary" className="mt-1 capitalize bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {currentUser.role.replace("_", " ")}
                </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Button
              onClick={() => navigate(getDashboardPath(currentUser.role))}
              className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-all bg-blue-600 hover:bg-blue-700"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full text-slate-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out & switch account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /**
   * View: Unauthenticated User (Login Form)
   * Main portal selection and credential entry.
   */
  return (
    <div className="min-h-screen flex bg-white">
      {/* Hero Section - Desktop Only 
          Provides branding and context for the iSMS platform.
      */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-24">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tighter">iSMS <span className="text-blue-500">Namibia</span></h1>
          </div>

          <h2 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.1]">
            The heart of <br />
            <span className="text-blue-500 italic">Namibian</span> <br />
            Education.
          </h2>

          <p className="mt-8 text-xl text-slate-400 max-w-md leading-relaxed">
            A unified management system for the Ministry of Education, Arts and Culture.
          </p>
        </div>
      </div>

      {/* Authentication UI 
          Role selector followed by credential inputs.
      */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
            <p className="text-slate-500 mt-2 font-medium">Select your portal to continue</p>
          </div>

          {/* Grid Selection for Roles */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden group",
                    isSelected
                      ? "border-blue-600 bg-blue-50/50 shadow-sm"
                      : "border-slate-100 bg-white hover:border-blue-200"
                  )}
                >
                  <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm text-slate-900 leading-tight">
                    {role.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                    {role.description.split(" ")[0]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Form Credentials */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Username or Email</Label>
              <Input
                id="email"
                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                placeholder="Enter your credentials"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  className="h-12 bg-slate-50 border-slate-200 focus:bg-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
              disabled={!selectedRole || isLoading}
            >
              {isLoading ? "Validating..." : "Enter Portal"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          {/* Footer Assistance */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
             <p className="text-slate-500 text-sm">
                Need help? <a href="#" className="text-blue-600 font-bold hover:underline">iSMS Support Center</a>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}