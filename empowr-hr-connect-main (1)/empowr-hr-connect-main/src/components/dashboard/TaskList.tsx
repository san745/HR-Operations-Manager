
import { CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Review and approve leave requests", 
      completed: false, 
      priority: "high",
      dueDate: "Today"
    },
    { 
      id: 2, 
      title: "Complete Q2 performance reviews", 
      completed: false, 
      priority: "high",
      dueDate: "Tomorrow"
    },
    { 
      id: 3, 
      title: "Update employee handbook", 
      completed: false, 
      priority: "medium",
      dueDate: "Jun 15"
    },
    { 
      id: 4, 
      title: "Prepare quarterly HR report", 
      completed: true, 
      priority: "medium",
      dueDate: "Jun 10"
    },
    { 
      id: 5, 
      title: "Schedule team building event", 
      completed: false, 
      priority: "low",
      dueDate: "Jun 20"
    }
  ]);

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>My Tasks</CardTitle>
         
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tasks.map(task => (
            <li 
              key={task.id} 
              className={cn(
                "flex items-center justify-between p-3 rounded-lg",
                task.completed ? "bg-muted/40" : "bg-card"
              )}
            >
              <div className="flex items-start gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 text-primary" 
                  onClick={() => toggleTaskStatus(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </Button>
                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {task.dueDate}
                    </p>
                  )}
                </div>
              </div>
              <div className={cn(
                "text-xs px-2 py-1 rounded-full font-medium capitalize",
                getPriorityStyles(task.priority)
              )}>
                {task.priority}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default TaskList;
