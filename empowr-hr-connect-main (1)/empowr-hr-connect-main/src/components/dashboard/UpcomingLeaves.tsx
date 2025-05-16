
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Leave {
  id: number;
  employee: {
    name: string;
    avatar?: string;
    initials: string;
    department: string;
  };
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const upcomingLeaves: Leave[] = [
  {
    id: 1,
    employee: {
      name: 'Sarah Johnson',
      avatar: '/assets/avatar-1.png',
      initials: 'SJ',
      department: 'Marketing'
    },
    type: 'vacation',
    startDate: 'Jun 15, 2023',
    endDate: 'Jun 22, 2023',
    status: 'approved'
  },
  {
    id: 2,
    employee: {
      name: 'Michael Chen',
      avatar: '/assets/avatar-2.png',
      initials: 'MC',
      department: 'Development'
    },
    type: 'sick',
    startDate: 'Jun 10, 2023',
    endDate: 'Jun 12, 2023',
    status: 'approved'
  },
  {
    id: 3,
    employee: {
      name: 'Jessica Williams',
      avatar: '/assets/avatar-3.png',
      initials: 'JW',
      department: 'HR'
    },
    type: 'personal',
    startDate: 'Jun 18, 2023',
    endDate: 'Jun 19, 2023',
    status: 'pending'
  }
];

export function UpcomingLeaves() {
  const getLeaveTypeStyles = (type: Leave['type']) => {
    switch (type) {
      case 'vacation':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusStyles = (status: Leave['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Leaves</CardTitle>
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingLeaves.map((leave) => (
            <div key={leave.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={leave.employee.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {leave.employee.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{leave.employee.name}</p>
                  <p className="text-xs text-muted-foreground">{leave.employee.department}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {leave.startDate} - {leave.endDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getLeaveTypeStyles(leave.type)}>
                  {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)}
                </Badge>
                <Badge className={getStatusStyles(leave.status)}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UpcomingLeaves;
