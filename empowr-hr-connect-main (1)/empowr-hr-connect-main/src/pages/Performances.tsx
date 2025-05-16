
import { useState } from "react";
import { BarChart2, Users, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PerformanceMetric {
  name: string;
  score: number;
}

interface Performance {
  id: string;
  employeeName: string;
  avatarUrl: string;
  department: string;
  jobTitle: string;
  overallScore: number;
  metrics: PerformanceMetric[];
  lastUpdated: string;
}

const initialPerformances: Performance[] = [
  {
    id: "1",
    employeeName: "Sarah Johnson",
    avatarUrl: "/assets/avatar-1.png",
    department: "Engineering",
    jobTitle: "Senior Frontend Developer",
    overallScore: 92,
    metrics: [
      { name: "Quality of Work", score: 95 },
      { name: "Productivity", score: 88 },
      { name: "Communication", score: 90 },
      { name: "Teamwork", score: 96 }
    ],
    lastUpdated: "2025-05-01"
  },
  {
    id: "2",
    employeeName: "Michael Chen",
    avatarUrl: "/assets/avatar-2.png",
    department: "Marketing",
    jobTitle: "Marketing Specialist",
    overallScore: 78,
    metrics: [
      { name: "Quality of Work", score: 82 },
      { name: "Productivity", score: 75 },
      { name: "Communication", score: 85 },
      { name: "Teamwork", score: 70 }
    ],
    lastUpdated: "2025-05-02"
  },
  {
    id: "3",
    employeeName: "Jessica Williams",
    avatarUrl: "/assets/avatar-3.png",
    department: "Human Resources",
    jobTitle: "HR Coordinator",
    overallScore: 85,
    metrics: [
      { name: "Quality of Work", score: 88 },
      { name: "Productivity", score: 82 },
      { name: "Communication", score: 92 },
      { name: "Teamwork", score: 80 }
    ],
    lastUpdated: "2025-05-05"
  },
  {
    id: "4",
    employeeName: "David Rodriguez",
    avatarUrl: "/assets/avatar-4.png",
    department: "Finance",
    jobTitle: "Financial Analyst",
    overallScore: 90,
    metrics: [
      { name: "Quality of Work", score: 94 },
      { name: "Productivity", score: 87 },
      { name: "Communication", score: 85 },
      { name: "Teamwork", score: 88 }
    ],
    lastUpdated: "2025-05-07"
  },
  {
    id: "5",
    employeeName: "Emma Thompson",
    avatarUrl: "/assets/avatar-5.png",
    department: "Customer Support",
    jobTitle: "Support Team Lead",
    overallScore: 82,
    metrics: [
      { name: "Quality of Work", score: 80 },
      { name: "Productivity", score: 78 },
      { name: "Communication", score: 95 },
      { name: "Teamwork", score: 84 }
    ],
    lastUpdated: "2025-05-08"
  }
];

const Performances = () => {
  const [performances, setPerformances] = useState<Performance[]>(initialPerformances);
  const [editingPerformance, setEditingPerformance] = useState<Performance | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [tempMetricsValues, setTempMetricsValues] = useState<Record<string, number>>({});

  const handleEditPerformance = () => {
    if (!editingPerformance) return;

    // Calculate new overall score based on metrics average
    const updatedMetrics = editingPerformance.metrics.map(metric => ({
      ...metric,
      score: tempMetricsValues[metric.name] !== undefined ? tempMetricsValues[metric.name] : metric.score
    }));
    
    const overallScore = Math.round(
      updatedMetrics.reduce((sum, metric) => sum + metric.score, 0) / updatedMetrics.length
    );

    const updatedPerformance = {
      ...editingPerformance,
      metrics: updatedMetrics,
      overallScore,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setPerformances(performances.map(perf => 
      perf.id === updatedPerformance.id ? updatedPerformance : perf
    ));
    
    setEditingPerformance(null);
    setTempMetricsValues({});
    setIsEditDialogOpen(false);
    
    toast({
      title: "Performance Updated",
      description: `${updatedPerformance.employeeName}'s performance has been updated successfully.`
    });
  };

  const handleDeletePerformance = (id: string) => {
    const performanceToDelete = performances.find(perf => perf.id === id);
    setPerformances(performances.filter(perf => perf.id !== id));
    
    toast({
      title: "Performance Record Deleted",
      description: `${performanceToDelete?.employeeName}'s performance record has been deleted.`
    });
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "bg-green-500 text-white";
    if (score >= 80) return "bg-blue-500 text-white";
    if (score >= 70) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setTempMetricsValues({
      ...tempMetricsValues,
      [name]: value[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Employee Performances</h1>
        <Button>Export Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performances.map((performance) => (
          <Card key={performance.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={performance.avatarUrl} alt={performance.employeeName} />
                    <AvatarFallback>{performance.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{performance.employeeName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{performance.jobTitle}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPerformanceColor(performance.overallScore)}`}>
                  {performance.overallScore}%
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground flex justify-between">
                <span>Department:</span>
                <span className="font-medium text-foreground">{performance.department}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Performance Metrics</h4>
                {performance.metrics.map(metric => (
                  <div key={metric.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between">
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(performance.lastUpdated).toLocaleDateString()}
              </div>
              <div className="flex gap-1">
                <Dialog open={isEditDialogOpen && editingPerformance?.id === performance.id} 
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) {
                            setEditingPerformance(performance);
                            // Reset temp values
                            setTempMetricsValues({});
                          }
                        }}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Performance</DialogTitle>
                      <DialogDescription>
                        Update performance metrics for {performance.employeeName}
                      </DialogDescription>
                    </DialogHeader>
                    {editingPerformance && (
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4 mb-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={editingPerformance.avatarUrl} alt={editingPerformance.employeeName} />
                            <AvatarFallback>{editingPerformance.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{editingPerformance.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{editingPerformance.jobTitle}</p>
                          </div>
                        </div>
                        
                        {editingPerformance.metrics.map((metric, index) => (
                          <div key={metric.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor={`metric-${index}`}>{metric.name}</Label>
                              <span className="text-sm font-medium">
                                {tempMetricsValues[metric.name] !== undefined 
                                  ? tempMetricsValues[metric.name] 
                                  : metric.score}%
                              </span>
                            </div>
                            <Slider
                              id={`metric-${index}`}
                              defaultValue={[metric.score]}
                              max={100}
                              step={1}
                              onValueChange={(value) => handleSliderChange(metric.name, value)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleEditPerformance}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Performance Record</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {performance.employeeName}'s performance record? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeletePerformance(performance.id)} className="bg-red-500 hover:bg-red-600">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Performances;
