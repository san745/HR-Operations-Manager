
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CalendarDays, FileText, Building,
  Settings, LogOut, Menu, X, Bell, Briefcase,
  MessageSquare, BarChart2, Award, Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  notification?: number;
  onClick?: () => void;
};

const NavItem = ({ to, icon, label, notification, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
      {notification && notification > 0 && (
        <Badge variant="outline" className="ml-auto bg-white text-hr-primary font-medium">
          {notification}
        </Badge>
      )}
    </NavLink>
  );
};

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    closeMobileSidebar();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar - Desktop permanent, Mobile togglable */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6">
            <h2 className="text-xl font-bold text-white">HR Operations</h2>
          </div>

          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="flex flex-col gap-2">
              <NavItem 
                to="/dashboard" 
                icon={<LayoutDashboard className="h-5 w-5" />} 
                label="Dashboard" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/employees" 
                icon={<Users className="h-5 w-5" />} 
                label="Employees" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/departments" 
                icon={<Building className="h-5 w-5" />} 
                label="Departments" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/job-positions" 
                icon={<Briefcase className="h-5 w-5" />} 
                label="Job Positions" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/performances" 
                icon={<BarChart2 className="h-5 w-5" />} 
                label="Performances" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/skills" 
                icon={<Award className="h-5 w-5" />} 
                label="Skills & Talent Tools" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/leave-management" 
                icon={<CalendarDays className="h-5 w-5" />} 
                label="Leave Management" 
                notification={3}
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/policies" 
                icon={<FileText className="h-5 w-5" />} 
                label="Policies" 
                onClick={closeMobileSidebar}
              />
              <NavItem 
                to="/settings" 
                icon={<Settings className="h-5 w-5" />} 
                label="Settings" 
                onClick={closeMobileSidebar}
              />
            </nav>
          </ScrollArea>

          <div className="mt-auto border-t border-sidebar-border/50 p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/assets/avatar.png" />
                <AvatarFallback className="bg-sidebar-accent text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sidebar-foreground">John Doe</p>
                <p className="text-xs text-sidebar-foreground/70">HR Manager</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto text-sidebar-foreground/70 hover:text-sidebar-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
