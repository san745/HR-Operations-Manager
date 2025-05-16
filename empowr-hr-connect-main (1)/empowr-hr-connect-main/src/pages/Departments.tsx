
import { useState } from "react";
import { Plus, Trash2, Edit, Building, AlertCircle } from "lucide-react";
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

interface Department {
  id: string;
  name: string;
  employeeCount: number;
  floor: string;
  performance: number;
  issues: number;
}

const initialDepartments: Department[] = [
  { 
    id: "1", 
    name: "Human Resources", 
    employeeCount: 15, 
    floor: "3rd Floor", 
    performance: 92, 
    issues: 2 
  },
  { 
    id: "2", 
    name: "Engineering", 
    employeeCount: 45, 
    floor: "5th Floor", 
    performance: 87, 
    issues: 4 
  },
  { 
    id: "3", 
    name: "Marketing", 
    employeeCount: 22, 
    floor: "2nd Floor", 
    performance: 78, 
    issues: 6 
  },
  { 
    id: "4", 
    name: "Finance", 
    employeeCount: 18, 
    floor: "4th Floor", 
    performance: 90, 
    issues: 1 
  },
  { 
    id: "5", 
    name: "Customer Support", 
    employeeCount: 30, 
    floor: "1st Floor", 
    performance: 83, 
    issues: 8 
  },
];

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({});
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.floor) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const department: Department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      employeeCount: newDepartment.employeeCount || 0,
      floor: newDepartment.floor,
      performance: newDepartment.performance || 75,
      issues: newDepartment.issues || 0
    };

    setDepartments([...departments, department]);
    setNewDepartment({});
    setIsAddDialogOpen(false);
    toast({
      title: "Department Added",
      description: `${department.name} department has been added successfully.`
    });
  };

  const handleEditDepartment = () => {
    if (!editingDepartment) return;

    setDepartments(departments.map(dep => 
      dep.id === editingDepartment.id ? editingDepartment : dep
    ));
    setEditingDepartment(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Department Updated",
      description: `${editingDepartment.name} department has been updated successfully.`
    });
  };

  const handleDeleteDepartment = (id: string) => {
    const departmentToDelete = departments.find(dep => dep.id === id);
    setDepartments(departments.filter(dep => dep.id !== id));
    toast({
      title: "Department Deleted",
      description: `${departmentToDelete?.name} department has been deleted.`
    });
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "bg-green-500";
    if (performance >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Create a new department in your organization
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDepartment.name || ""}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employees" className="text-right">
                  Employees
                </Label>
                <Input
                  id="employees"
                  type="number"
                  value={newDepartment.employeeCount || ""}
                  onChange={(e) => setNewDepartment({ ...newDepartment, employeeCount: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="floor" className="text-right">
                  Floor
                </Label>
                <Input
                  id="floor"
                  value={newDepartment.floor || ""}
                  onChange={(e) => setNewDepartment({ ...newDepartment, floor: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="performance" className="text-right">
                  Performance %
                </Label>
                <Input
                  id="performance"
                  type="number"
                  min="0"
                  max="100"
                  value={newDepartment.performance || ""}
                  onChange={(e) => setNewDepartment({ ...newDepartment, performance: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issues" className="text-right">
                  Issues
                </Label>
                <Input
                  id="issues"
                  type="number"
                  min="0"
                  value={newDepartment.issues || ""}
                  onChange={(e) => setNewDepartment({ ...newDepartment, issues: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDepartment}>Create Department</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <CardTitle>{department.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Dialog open={isEditDialogOpen && editingDepartment?.id === department.id} 
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (open) setEditingDepartment(department);
                          }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Department</DialogTitle>
                        <DialogDescription>
                          Update department information
                        </DialogDescription>
                      </DialogHeader>
                      {editingDepartment && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={editingDepartment.name}
                              onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-employees" className="text-right">
                              Employees
                            </Label>
                            <Input
                              id="edit-employees"
                              type="number"
                              value={editingDepartment.employeeCount}
                              onChange={(e) => setEditingDepartment({ ...editingDepartment, employeeCount: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-floor" className="text-right">
                              Floor
                            </Label>
                            <Input
                              id="edit-floor"
                              value={editingDepartment.floor}
                              onChange={(e) => setEditingDepartment({ ...editingDepartment, floor: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-performance" className="text-right">
                              Performance %
                            </Label>
                            <Input
                              id="edit-performance"
                              type="number"
                              min="0"
                              max="100"
                              value={editingDepartment.performance}
                              onChange={(e) => setEditingDepartment({ ...editingDepartment, performance: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-issues" className="text-right">
                              Issues
                            </Label>
                            <Input
                              id="edit-issues"
                              type="number"
                              min="0"
                              value={editingDepartment.issues}
                              onChange={(e) => setEditingDepartment({ ...editingDepartment, issues: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleEditDepartment}>Save Changes</Button>
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
                        <AlertDialogTitle>Delete Department</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the {department.name} department? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteDepartment(department.id)} className="bg-red-500 hover:bg-red-600">
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
                  <span className="text-muted-foreground">Employees:</span>
                  <span className="font-medium">{department.employeeCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Floor:</span>
                  <span className="font-medium">{department.floor}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Performance:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 w-24">
                      <div 
                        className={`h-2 rounded-full ${getPerformanceColor(department.performance)}`}
                        style={{ width: `${department.performance}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{department.performance}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">
                  {department.issues} Issues
                </span>
              </div>
              <Badge variant={department.issues > 5 ? "destructive" : "outline"}>
                {department.issues > 5 ? "Critical" : "Stable"}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
