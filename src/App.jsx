import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import LearnersPage from "./pages/learners/LearnersPage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected routes with layout */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learners" element={<LearnersPage />} />
            {/* Placeholder routes */}
            <Route path="/regions" element={<Dashboard />} />
            <Route path="/schools" element={<Dashboard />} />
            <Route path="/teachers" element={<Dashboard />} />
            <Route path="/attendance" element={<Dashboard />} />
            <Route path="/timetable" element={<Dashboard />} />
            <Route path="/library" element={<Dashboard />} />
            <Route path="/accounts" element={<Dashboard />} />
            <Route path="/visitors" element={<Dashboard />} />
            <Route path="/my-children" element={<Dashboard />} />
            <Route path="/my-classes" element={<Dashboard />} />
          </Route>
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

