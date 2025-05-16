
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  change,
  className 
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            
            {change && (
              <div className="flex items-center mt-1 gap-1">
                <span 
                  className={cn(
                    "text-xs font-medium",
                    change.positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {change.positive ? "+" : ""}{change.value}%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "p-2 rounded-md", 
            iconColor || "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-5 w-5", 
              iconColor ? "text-white" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
