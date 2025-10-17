import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { StudentDashboard } from "./components/dashboard/StudentDashboard";
import { FacultyDashboard } from "./components/dashboard/FacultyDashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (email: string, password: string, role: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      name: role === "student" ? "John Doe" : role === "faculty" ? "Dr. Jane Smith" : "Admin User",
      email,
      role,
      ...(role === "student" && { studentId: "M251001CS", department: "Computer Science" }),
      ...(role === "faculty" && { department: "Computer Science" })
    };
    setUser(mockUser);
  };

  const handleRegister = (userData: any) => {
    // Mock registration
    const mockUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      ...(userData.role === "student" && { studentId: userData.studentId, department: userData.department }),
      ...(userData.role === "faculty" && { department: userData.department })
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  user.role === "student" ? (
                    <Navigate to="/student" replace />
                  ) : user.role === "faculty" ? (
                    <Navigate to="/faculty" replace />
                  ) : (
                    <Navigate to="/admin" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" replace /> : <LoginForm onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/" replace /> : <RegisterForm onRegister={handleRegister} />} 
            />
            <Route 
              path="/student" 
              element={
                user?.role === "student" ? 
                <StudentDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/faculty" 
              element={
                user?.role === "faculty" ? 
                <FacultyDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/admin" 
              element={
                user?.role === "admin" ? 
                <AdminDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
