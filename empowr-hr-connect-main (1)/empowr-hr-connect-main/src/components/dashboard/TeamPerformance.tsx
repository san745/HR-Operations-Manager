import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { calculateDepartmentPerformance } from '@/data/employee-data';
import { Employee } from '@/types/employee';

interface DepartmentPerformance {
  department: string;
  performance: number;
}

const departmentPerformances: DepartmentPerformance[] = [
  { department: 'Marketing', performance: calculateDepartmentPerformance('Marketing') },
  { department: 'Engineering', performance: calculateDepartmentPerformance('Engineering') },
  { department: 'Human Resources', performance: calculateDepartmentPerformance('Human Resources') },
  { department: 'Operations', performance: calculateDepartmentPerformance('Operations') },
  { department: 'Analytics', performance: calculateDepartmentPerformance('Analytics') },
];

export function TeamPerformance() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Performance</CardTitle>
         
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departmentPerformances.map((dept) => (
            <div key={dept.department} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/avatars/${dept.department.toLowerCase()}.png`} />
                  <AvatarFallback>{dept.department.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-medium">{dept.department}</h3>
                  <p className="text-xs text-muted-foreground">Department Performance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{dept.performance}%</span>
                <Progress value={dept.performance} className="w-[80px]" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TeamPerformance;
