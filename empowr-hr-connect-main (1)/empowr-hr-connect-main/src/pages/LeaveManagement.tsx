import { useState, useEffect } from 'react';
import { Search, Plus, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { toast } from '@/components/ui/sonner';
import { employees as employeesData } from '@/data/employee-data';
import LeaveRequestModal from '@/components/leave-management/LeaveRequestModal';
import LeaveCalendarView from '@/components/leave-management/LeaveCalendarView';

interface LeaveRequest {
  id: number;
  employee: {
    name: string;
    position: string;
    department: string;
    avatar?: string;
    initials: string;
  };
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reason?: string;
}

// Initial leave requests data
const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employee: {
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      department: 'Marketing',
      avatar: '/assets/avatar-1.png',
      initials: 'SJ'
    },
    type: 'vacation',
    startDate: 'Jun 15, 2023',
    endDate: 'Jun 22, 2023',
    duration: '8 days',
    status: 'pending',
    requestDate: 'Jun 1, 2023',
    reason: 'Annual family vacation'
  },
  {
    id: 2,
    employee: {
      name: 'Michael Chen',
      position: 'Senior Developer',
      department: 'Development',
      avatar: '/assets/avatar-2.png',
      initials: 'MC'
    },
    type: 'sick',
    startDate: 'Jun 10, 2023',
    endDate: 'Jun 12, 2023',
    duration: '3 days',
    status: 'approved',
    requestDate: 'Jun 9, 2023',
    reason: 'Coming down with the flu'
  },
  {
    id: 3,
    employee: {
      name: 'Jessica Williams',
      position: 'HR Specialist',
      department: 'HR',
      avatar: '/assets/avatar-3.png',
      initials: 'JW'
    },
    type: 'personal',
    startDate: 'Jun 18, 2023',
    endDate: 'Jun 19, 2023',
    duration: '2 days',
    status: 'pending',
    requestDate: 'Jun 5, 2023',
    reason: 'Family emergency'
  },
  {
    id: 4,
    employee: {
      name: 'Robert Garcia',
      position: 'Project Manager',
      department: 'Operations',
      avatar: '/assets/avatar-4.png',
      initials: 'RG'
    },
    type: 'vacation',
    startDate: 'Jul 1, 2023',
    endDate: 'Jul 7, 2023',
    duration: '7 days',
    status: 'pending',
    requestDate: 'Jun 10, 2023',
    reason: 'Summer vacation'
  },
  {
    id: 5,
    employee: {
      name: 'Amanda Lee',
      position: 'Data Analyst',
      department: 'Analytics',
      avatar: '/assets/avatar-5.png',
      initials: 'AL'
    },
    type: 'other',
    startDate: 'Jun 25, 2023',
    endDate: 'Jun 25, 2023',
    duration: '1 day',
    status: 'rejected',
    requestDate: 'Jun 8, 2023',
    reason: 'Professional development course'
  }
];

// Convert dates to Date objects for the calendar view
const getLeaveEvents = (requests: LeaveRequest[]) => {
  return requests.map(req => ({
    id: req.id,
    employeeName: req.employee.name,
    type: req.type,
    startDate: new Date(req.startDate),
    endDate: new Date(req.endDate),
    status: req.status
  }));
};

const LeaveManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const { toast: hookToast } = useToast();

  const filteredLeaves = leaveRequests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleApprove = (id: number) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'approved' as const }
          : request
      )
    );
    
    toast.success("Leave request approved successfully");
  };

  const handleReject = (id: number) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'rejected' as const }
          : request
      )
    );
    
    toast.error("Leave request rejected");
  };

  const handleNewRequest = (request: LeaveRequest) => {
    const newId = Math.max(...leaveRequests.map(r => r.id)) + 1;
    const newRequest = {
      ...request,
      id: newId,
      requestDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
      })
    };
    
    setLeaveRequests(prev => [newRequest, ...prev]);
    toast.success("Leave request submitted successfully");
  };

  const handleEventUpdate = (updatedEvent: any) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === updatedEvent.id 
          ? { 
              ...request, 
              status: updatedEvent.status 
            }
          : request
      )
    );
  };

  const handleEventDelete = (eventId: number) => {
    setLeaveRequests(prev => prev.filter(request => request.id !== eventId));
  };

  const exportToCSV = () => {
    // Create CSV content
    let csvContent = "Employee,Position,Department,Leave Type,Start Date,End Date,Duration,Status,Request Date,Reason\n";
    
    filteredLeaves.forEach(leave => {
      const row = [
        leave.employee.name,
        leave.employee.position,
        leave.employee.department,
        leave.type,
        leave.startDate,
        leave.endDate,
        leave.duration,
        leave.status,
        leave.requestDate,
        leave.reason || ''
      ].map(cell => `"${cell}"`).join(',');
      
      csvContent += row + '\n';
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leave-requests-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Leave requests exported successfully");
  };

  const getLeaveStatusIcon = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const getLeaveTypeBadge = (type: LeaveRequest['type']) => {
    switch (type) {
      case 'vacation':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Vacation</Badge>;
      case 'sick':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Sick</Badge>;
      case 'personal':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Personal</Badge>;
      case 'other':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Other</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <p className="text-muted-foreground">Review and manage employee leave requests.</p>
      </div>
      
      <Card className="bg-white shadow-md border-0">
        <div className="p-6 pb-0 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leave requests..."
                  className="w-full pl-8 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setIsNewRequestModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>New Request</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={exportToCSV}
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <TabsList className="mb-4 bg-muted/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Requests</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Pending</TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Approved</TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Rejected</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {viewMode === 'list' ? (
                <div className="space-y-4">
                  {filteredLeaves.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="border-2 border-primary/10">
                            <AvatarImage src={request.employee.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {request.employee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{request.employee.name}</h3>
                              {getLeaveStatusIcon(request.status)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {request.employee.position} • {request.employee.department}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          {getLeaveTypeBadge(request.type)}
                          <div className="text-xs text-muted-foreground">
                            {request.startDate} to {request.endDate} • {request.duration}
                          </div>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-2 ml-auto">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-200 text-red-500 hover:bg-red-50"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-green-200 text-green-500 hover:bg-green-50"
                              onClick={() => handleApprove(request.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {request.reason && (
                        <div className="mt-3 pl-12 md:pl-16">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Reason:</span> {request.reason}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {filteredLeaves.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No leave requests found.</p>
                    </div>
                  )}
                </div>
              ) : (
                <Card className="border-0 shadow-sm overflow-hidden">
                  <CardHeader className="bg-muted/20">
                    <CardTitle className="text-lg">Leave Calendar</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <LeaveCalendarView 
                      events={getLeaveEvents(filteredLeaves)} 
                      onEventUpdate={handleEventUpdate}
                      onEventDelete={handleEventDelete}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <CardContent>
          {/* Content is rendered by tabs */}
        </CardContent>
      </Card>

      <LeaveRequestModal
        open={isNewRequestModalOpen}
        onClose={() => setIsNewRequestModalOpen(false)}
        onSave={handleNewRequest}
        employees={employeesData}
      />
    </div>
  );
};

export default LeaveManagement;
