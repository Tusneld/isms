import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  Phone
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const roles = [
  { id: "super_admin", title: "Super Admin", description: "National oversight", icon: Shield },
  { id: "regional_admin", title: "Regional Admin", description: "Regional management", icon: MapPin },
  { id: "school_admin", title: "School Admin", description: "School management", icon: School },
  { id: "teacher", title: "Teacher", description: "Classroom access", icon: GraduationCap },
  { id: "parent", title: "Parent", description: "Learner tracking", icon: Users },
  { id: "learner", title: "Learner", description: "Learner portal", icon: User },
  { id: "sponsor", title: "Sponsor", description: "Support education", icon: GraduationCap },
];

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
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("isms_user"));

  useEffect(() => {
    if (currentUser) {
      navigate(getDashboardPath(currentUser.role), { replace: true });
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole || !email || !password) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const user = { email, name: "Authorized User", role: selectedRole };
    localStorage.setItem("isms_user", JSON.stringify(user));
    setIsLoading(false);
    navigate(getDashboardPath(selectedRole));
  };

  const handleLogout = () => {
    localStorage.removeItem("isms_user");
    window.location.reload(); 
  };

  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
        <Card className="w-full max-w-md shadow-xl border-slate-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Button onClick={() => navigate(getDashboardPath(currentUser.role))} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
              Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="w-full text-slate-500 hover:text-red-600">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out & Switch Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 font-sans">
      <div className="flex flex-1">
        {/* LEFT PANEL: HERO SECTION */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-blue-900 to-accent relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-secondary blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shadow-lg shadow-blue-900/40">
                <GraduationCap className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground tracking-tight">iSMS</h1>
                <p className="text-primary-foreground/80 text-sm">Namibia School Management</p>
              </div>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight">
              Empowering
              <span className="block text-secondary">Education</span>
              Across Namibia
            </h2>
            
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-md leading-relaxed">
              A unified platform connecting the Ministry of Education, schools, teachers, parents, and learners for seamless educational management.
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-secondary">245+</p>
                <p className="text-sm text-primary-foreground/70">Schools Connected</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">50K+</p>
                <p className="text-sm text-primary-foreground/70">Active Learners</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">14</p>
                <p className="text-sm text-primary-foreground/70">Regions Covered</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AUTH UI */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Select your role and sign in to continue</p>
          </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-left group",
                    selectedRole === role.id ? "border-blue-600 bg-blue-50/50" : "border-slate-100 bg-white hover:border-blue-200"
                  )}
                >
                  <role.icon className={cn("w-5 h-5 mb-3", selectedRole === role.id ? "text-blue-600" : "text-slate-400")} />
                  <p className="font-bold text-sm text-slate-900 leading-tight">{role.title}</p>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Username or Email</Label>
                <Input 
                  className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="e.g. tusnelde@isms.com.na"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Password</Label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                    placeholder="Enter your secure password"
                    required 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>

              <Button type="submit" disabled={!selectedRole || isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98]">
               {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              New parent? <Link to="/register-child" className="text-blue-600 hover:underline font-bold">Register your child</Link>
            </p>
            
            <div className="mt-8 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-center text-slate-500">
                Having trouble? Contact your admin or helpdesk at <strong>+264 61 270 6000</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ULTRA-COMPACT FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Left: Branding & Tagline */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pr-4 border-r border-slate-800">
                <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">iSMS</span>
              </div>
              <p className="text-[11px] max-w-[200px] leading-tight opacity-70">
                Ministry of Education, Arts & Culture. Unified National Management.
              </p>
            </div>

            {/* Middle: Fast Links */}
            <div className="flex gap-8 text-[11px] font-medium uppercase tracking-wider">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Guides</a>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={12} className="text-blue-500" />
                <span className="lowercase">support@isms.moe.gov.na</span>
              </div>
            </div>

            {/* Right: Social & System Status */}
            <div className="flex items-center gap-5">
              <div className="flex gap-3 pr-5 border-r border-slate-800">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="hover:text-white transition-colors">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-emerald-500 uppercase">System Online</span>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-900/50 flex justify-between items-center text-[10px] opacity-50">
            <p>© 2026 iSMS Namibia. All rights reserved.</p>
            <span className="flex items-center gap-1"><Globe size={10}/> Windhoek, Namibia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}