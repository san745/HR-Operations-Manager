
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  time: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: '/assets/avatar-1.png',
      initials: 'SJ',
    },
    action: 'submitted a leave request for vacation',
    time: '10 minutes ago'
  },
  {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: '/assets/avatar-2.png',
      initials: 'MC',
    },
    action: 'completed quarterly performance goals',
    time: '1 hour ago'
  },
  {
    id: 3,
    user: {
      name: 'Jessica Williams',
      avatar: '/assets/avatar-3.png',
      initials: 'JW',
    },
    action: 'updated her profile information',
    time: '3 hours ago'
  },
  {
    id: 4,
    user: {
      name: 'Robert Garcia',
      avatar: '/assets/avatar-4.png',
      initials: 'RG',
    },
    action: 'requested equipment repair',
    time: '5 hours ago'
  },
  {
    id: 5,
    user: {
      name: 'Amanda Lee',
      avatar: '/assets/avatar-5.png',
      initials: 'AL',
    },
    action: 'submitted timesheet for approval',
    time: 'Yesterday'
  }
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="px-6 py-3 flex items-start gap-4">
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
