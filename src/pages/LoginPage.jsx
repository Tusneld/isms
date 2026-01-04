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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  const currentUser = JSON.parse(localStorage.getItem("isms_user"));

  useEffect(() => {
    if (currentUser) {
      // Auto-redirect if already logged in and not on login page
      const roleRoutes = {
        super_admin: "/admin",
        regional_admin: "/admin", // Share super admin dashboard for now
        school_admin: "/school",
        teacher: "/teacher",
        parent: "/parent",
        learner: "/learner",
        sponsor: "/sponsor",
       
      };
      navigate(roleRoutes[currentUser.role] || "/admin", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole || !email || !password) {
      alert("Please select a role and fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user data based on role
    const userMap = {
      super_admin: { name: "John Nangombe", role: "super_admin" },
      regional_admin: { name: "Regional Director", role: "regional_admin" },
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

    // Save to localStorage
    localStorage.setItem("isms_user", JSON.stringify(user));

    setIsLoading(false);

    // Navigate to correct dashboard
    const routes = {
      super_admin: "/admin",
      regional_admin: "/admin",
      school_admin: "/school",
      teacher: "/teacher",
      parent: "/parent",
      learner: "/learner",
      sponsor: "/sponsor", 
    };

    navigate(routes[selectedRole] || "/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    setSelectedRole(null);
    setEmail("");
    setPassword("");
    window.location.reload(); // Simple refresh
  };

  // If already logged in, show simple session screen
  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
            <p className="text-muted-foreground mt-2">
              You are logged in as <strong>{currentUser.name}</strong>
            </p>
            <p className="text-sm text-muted-foreground capitalize">
              Role: {currentUser.role.replace("_", " ")}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate("/")}
              className="w-full"
              size="lg"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout & Switch User
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">iSMS</h1>
              <p className="text-primary-foreground/80 text-sm">
                Namibia School Management
              </p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight">
            Empowering
            <span className="block text-secondary">Education</span>
            Across Namibia
          </h2>

          <p className="mt-6 text-lg text-primary-foreground/80 max-w-md">
            A unified platform connecting the Ministry of Education, schools,
            teachers, parents, learners, and sponsors for seamless educational
            management.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-secondary">248+</p>
              <p className="text-sm text-primary-foreground/70">
                Schools Connected
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">51K+</p>
              <p className="text-sm text-primary-foreground/70">
                Active Learners
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">14</p>
              <p className="text-sm text-primary-foreground/70">
                Regions Covered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">iSMS</h1>
              <p className="text-muted-foreground text-sm">School Management</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">
              Select your role and sign in to continue
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-left hover:shadow-md",
                    selectedRole === role.id
                      ? `${role.color} shadow-lg ring-2 ring-primary/50`
                      : "border-border bg-card hover:border-primary/40"
                  )}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <p className="font-semibold text-sm text-foreground">
                    {role.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email or ID Number</Label>
              <Input
                id="email"
                type="text"
                placeholder="e.g. john@example.com or 123456"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!selectedRole || isLoading || !email || !password}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New parent?{" "}
            <a href="/register-child" className="text-primary hover:underline">
              Register your child
            </a>
          </p>

          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-xs text-muted-foreground">
              Having trouble logging in? Contact your school administrator or call the helpdesk at{" "}
              <strong>+264 61 270 6000</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}