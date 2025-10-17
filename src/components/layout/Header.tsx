import { Button } from "@/components/ui/enhanced-button";
import { GraduationCap, User, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  user?: {
    name: string;
    role: 'student' | 'faculty' | 'admin';
    email: string;
  };
  onLogout?: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Activity Portal</h1>
              <p className="text-xs text-muted-foreground">Student Point Management</p>
            </div>
          </div>

          {/* User Info or Auth Buttons */}
          {!isAuthPage && user ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}