
import { Users, Calendar, UserCheck, Clock, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import TaskList from '@/components/dashboard/TaskList';
import UpcomingLeaves from '@/components/dashboard/UpcomingLeaves';
import TeamPerformance from '@/components/dashboard/TeamPerformance';
import { ChartContainer } from '@/components/ui/chart';
import { calculateDepartmentPerformance } from '@/data/employee-data';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome back, John",
      description: "You have 3 pending leave requests to review.",
    });
  }, [toast]);

  // Department data for pie chart
  const departments = [
    { name: 'Marketing', value: 25, color: '#8B5CF6' },
    { name: 'Engineering', value: 35, color: '#0EA5E9' },
    { name: 'Human Resources', value: 15, color: '#F97316' },
    { name: 'Operations', value: 15, color: '#10B981' },
    { name: 'Analytics', value: 10, color: '#D946EF' },
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's an overview of your HR operations.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees" 
          value="125" 
          icon={Users} 
          change={{ value: 2.5, positive: true }}
        />
        <StatCard 
          title="Today's Attendance" 
          value="92%" 
          icon={UserCheck} 
          iconColor="bg-green-500" 
          change={{ value: 1.2, positive: true }}
        />
        <StatCard 
          title="Upcoming Leaves" 
          value="7" 
          icon={Calendar} 
          iconColor="bg-blue-500" 
          change={{ value: 12, positive: false }}
        />
        <StatCard 
          title="Overtime Hours" 
          value="43" 
          icon={Clock} 
          iconColor="bg-amber-500" 
          change={{ value: 8, positive: false }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Main Content */}
        <div className="col-span-2 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <RecentActivity />
          </div>
          
          <div>
            <TaskList />
          </div>
          
          <div>
            <UpcomingLeaves />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          <TeamPerformance />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={departments}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} employees`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Import Card components for the department distribution chart
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default Dashboard;
