
import { useState } from "react";
import { Briefcase, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  openPositions: number;
  applicants: number;
  minSalary: number;
  maxSalary: number;
  status: 'open' | 'closed' | 'draft';
}

const initialPositions: JobPosition[] = [
  { 
    id: "1", 
    title: "Senior Frontend Developer", 
    department: "Engineering", 
    openPositions: 2, 
    applicants: 48, 
    minSalary: 85000, 
    maxSalary: 120000, 
    status: 'open' 
  },
  { 
    id: "2", 
    title: "HR Specialist", 
    department: "Human Resources", 
    openPositions: 1, 
    applicants: 23, 
    minSalary: 55000, 
    maxSalary: 75000, 
    status: 'open' 
  },
  { 
    id: "3", 
    title: "Marketing Manager", 
    department: "Marketing", 
    openPositions: 1, 
    applicants: 32, 
    minSalary: 70000, 
    maxSalary: 90000, 
    status: 'closed' 
  },
  { 
    id: "4", 
    title: "Financial Analyst", 
    department: "Finance", 
    openPositions: 3, 
    applicants: 12, 
    minSalary: 60000, 
    maxSalary: 85000, 
    status: 'open' 
  },
  { 
    id: "5", 
    title: "Customer Support Representative", 
    department: "Customer Support", 
    openPositions: 5, 
    applicants: 67, 
    minSalary: 40000, 
    maxSalary: 55000, 
    status: 'draft' 
  },
];

const departments = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Finance",
  "Customer Support",
  "Product",
  "Operations",
  "Legal",
  "Sales"
];

const JobPositions = () => {
  const [positions, setPositions] = useState<JobPosition[]>(initialPositions);
  const [newPosition, setNewPosition] = useState<Partial<JobPosition>>({});
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddPosition = () => {
    if (!newPosition.title || !newPosition.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const position: JobPosition = {
      id: Date.now().toString(),
      title: newPosition.title,
      department: newPosition.department,
      openPositions: newPosition.openPositions || 1,
      applicants: newPosition.applicants || 0,
      minSalary: newPosition.minSalary || 40000,
      maxSalary: newPosition.maxSalary || 80000,
      status: newPosition.status || 'draft'
    };

    setPositions([...positions, position]);
    setNewPosition({});
    setIsAddDialogOpen(false);
    toast({
      title: "Position Added",
      description: `${position.title} position has been added successfully.`
    });
  };

  const handleEditPosition = () => {
    if (!editingPosition) return;

    setPositions(positions.map(pos => 
      pos.id === editingPosition.id ? editingPosition : pos
    ));
    setEditingPosition(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Position Updated",
      description: `${editingPosition.title} position has been updated successfully.`
    });
  };

  const handleDeletePosition = (id: string) => {
    const positionToDelete = positions.find(pos => pos.id === id);
    setPositions(positions.filter(pos => pos.id !== id));
    toast({
      title: "Position Deleted",
      description: `${positionToDelete?.title} position has been deleted.`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500">Open</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Job Positions</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Position
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Job Position</DialogTitle>
              <DialogDescription>
                Create a new job position in your organization
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newPosition.title || ""}
                  onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select 
                  onValueChange={(value) => setNewPosition({ ...newPosition, department: value })}
                  value={newPosition.department}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="open-positions" className="text-right">
                  Open Positions
                </Label>
                <Input
                  id="open-positions"
                  type="number"
                  value={newPosition.openPositions || ""}
                  onChange={(e) => setNewPosition({ ...newPosition, openPositions: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="min-salary" className="text-right">
                  Min Salary
                </Label>
                <Input
                  id="min-salary"
                  type="number"
                  value={newPosition.minSalary || ""}
                  onChange={(e) => setNewPosition({ ...newPosition, minSalary: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max-salary" className="text-right">
                  Max Salary
                </Label>
                <Input
                  id="max-salary"
                  type="number"
                  value={newPosition.maxSalary || ""}
                  onChange={(e) => setNewPosition({ ...newPosition, maxSalary: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  onValueChange={(value: 'open' | 'closed' | 'draft') => 
                    setNewPosition({ ...newPosition, status: value })}
                  value={newPosition.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPosition}>Create Position</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position) => (
          <Card key={position.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{position.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Dialog open={isEditDialogOpen && editingPosition?.id === position.id} 
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (open) setEditingPosition(position);
                          }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Job Position</DialogTitle>
                        <DialogDescription>
                          Update job position information
                        </DialogDescription>
                      </DialogHeader>
                      {editingPosition && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-title" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="edit-title"
                              value={editingPosition.title}
                              onChange={(e) => setEditingPosition({ ...editingPosition, title: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-department" className="text-right">
                              Department
                            </Label>
                            <Select 
                              onValueChange={(value) => setEditingPosition({ ...editingPosition, department: value })}
                              value={editingPosition.department}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map(dept => (
                                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-open-positions" className="text-right">
                              Open Positions
                            </Label>
                            <Input
                              id="edit-open-positions"
                              type="number"
                              value={editingPosition.openPositions}
                              onChange={(e) => setEditingPosition({ ...editingPosition, openPositions: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-min-salary" className="text-right">
                              Min Salary
                            </Label>
                            <Input
                              id="edit-min-salary"
                              type="number"
                              value={editingPosition.minSalary}
                              onChange={(e) => setEditingPosition({ ...editingPosition, minSalary: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-max-salary" className="text-right">
                              Max Salary
                            </Label>
                            <Input
                              id="edit-max-salary"
                              type="number"
                              value={editingPosition.maxSalary}
                              onChange={(e) => setEditingPosition({ ...editingPosition, maxSalary: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-status" className="text-right">
                              Status
                            </Label>
                            <Select 
                              onValueChange={(value: 'open' | 'closed' | 'draft') => 
                                setEditingPosition({ ...editingPosition, status: value })}
                              value={editingPosition.status}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleEditPosition}>Save Changes</Button>
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
                        <AlertDialogTitle>Delete Position</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the {position.title} position? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePosition(position.id)} className="bg-red-500 hover:bg-red-600">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{position.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Open Positions:</span>
                  <span className="font-medium">{position.openPositions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Applicants:</span>
                  <span className="font-medium">{position.applicants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Salary Range:</span>
                  <span className="font-medium">
                    {formatSalary(position.minSalary)} - {formatSalary(position.maxSalary)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                {getStatusBadge(position.status)}
              </div>
              <Badge variant="outline" className="text-primary">
                {position.applicants} Applicants
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobPositions;
