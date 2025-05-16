import { Bell, MessageSquare, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Example data for notifications and messages
  const notifications = [
    {
      title: "New leave request",
      desc: "Sarah Johnson submitted a leave request",
      time: "2 minutes ago"
    },
    {
      title: "Performance review due",
      desc: "Complete Michael Chen's quarterly review",
      time: "1 hour ago"
    },
    {
      title: "New application",
      desc: "New application for Senior Developer position",
      time: "5 hours ago"
    },
    // More notifications for demonstration
    {
      title: "Policy update",
      desc: "Company leave policy updated",
      time: "Today"
    },
    {
      title: "Payroll processed",
      desc: "April payroll has been processed",
      time: "Yesterday"
    }
  ];

  const messages = [
    {
      name: "Emily Martinez",
      avatar: "/assets/avatar-1.png",
      fallback: "EM",
      text: "Hi, I have a question about my health benefits. Can we schedule a meeting?",
      time: "10 minutes ago"
    },
    {
      name: "James Wilson",
      avatar: "/assets/avatar-2.png",
      fallback: "JW",
      text: "Thank you for processing my reimbursement request.",
      time: "Yesterday"
    },
    // More messages for demonstration
    {
      name: "Priya Singh",
      avatar: "/assets/avatar-3.png",
      fallback: "PS",
      text: "Can you approve my remote work request?",
      time: "2 days ago"
    },
    {
      name: "Alex Kim",
      avatar: "/assets/avatar-4.png",
      fallback: "AK",
      text: "Please review my timesheet.",
      time: "3 days ago"
    }
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <div className="container h-16 flex items-center justify-between py-4 lg:px-8">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <h1 className="text-xl font-bold text-primary">HR Operations Manager</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2">
            {!isMobile && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute top-0 right-0 h-2 w-2 p-0 bg-red-500 border border-background rounded-full">
                        <span className="sr-only">New notifications</span>
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={`transition-all duration-300 overflow-auto ${
                      showAllNotifications
                        ? "w-[90vw] max-w-2xl max-h-[80vh] md:w-[32rem] md:max-h-[32rem]"
                        : "w-80 max-h-96"
                    }`}
                    style={showAllNotifications ? { zIndex: 50 } : {}}
                  >
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(showAllNotifications ? notifications : notifications.slice(0, 3)).map((n, idx) => (
                      <DropdownMenuItem className="cursor-pointer" key={idx}>
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">{n.title}</p>
                          <p className="text-xs text-muted-foreground">{n.desc}</p>
                          <p className="text-xs text-muted-foreground">{n.time}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-center text-primary"
                      onClick={() => setShowAllNotifications(s => !s)}
                    >
                      {showAllNotifications ? "Show less" : "View all notifications"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <MessageSquare className="h-5 w-5" />
                      <Badge className="absolute top-0 right-0 h-2 w-2 p-0 bg-red-500 border border-background rounded-full">
                        <span className="sr-only">New messages</span>
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={`transition-all duration-300 overflow-auto ${
                      showAllMessages
                        ? "w-[90vw] max-w-2xl max-h-[80vh] md:w-[32rem] md:max-h-[32rem]"
                        : "w-80 max-h-96"
                    }`}
                    style={showAllMessages ? { zIndex: 50 } : {}}
                  >
                    <DropdownMenuLabel>Messages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(showAllMessages ? messages : messages.slice(0, 2)).map((m, idx) => (
                      <DropdownMenuItem className="cursor-pointer" key={idx}>
                        <div className="flex gap-3 items-start">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={m.avatar} />
                            <AvatarFallback>{m.fallback}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <p className="font-medium">{m.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{m.text}</p>
                            <p className="text-xs text-muted-foreground">{m.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-center text-primary"
                      onClick={() => setShowAllMessages(s => !s)}
                    >
                      {showAllMessages ? "Show less" : "View all messages"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                    <AvatarImage src={user?.avatar || "/assets/avatar.png"} alt="Avatar" />
                    <AvatarFallback className="bg-primary text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name || 'User'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/settings">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                {isMobile && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">Notifications</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Messages</DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
