
import { useState } from "react";
import { Award, Star, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  employeesWithSkill: number;
  importance: 1 | 2 | 3 | 4 | 5;
}

interface TalentProgram {
  id: string;
  name: string;
  description: string;
  participants: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned';
}

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "React Development",
    category: "Technical",
    description: "Advanced knowledge of React.js including Redux, Hooks, and Context API",
    employeesWithSkill: 18,
    importance: 5,
  },
  {
    id: "2",
    name: "Project Management",
    category: "Management",
    description: "Ability to plan, execute, and close projects according to specifications",
    employeesWithSkill: 12,
    importance: 4,
  },
  {
    id: "3",
    name: "Data Analysis",
    category: "Technical",
    description: "Proficiency in analyzing complex datasets and extracting insights",
    employeesWithSkill: 8,
    importance: 4,
  },
  {
    id: "4",
    name: "Leadership",
    category: "Soft Skills",
    description: "Ability to motivate and guide teams toward achieving objectives",
    employeesWithSkill: 15,
    importance: 5,
  },
  {
    id: "5",
    name: "UX Design",
    category: "Design",
    description: "Knowledge of user experience principles and design thinking",
    employeesWithSkill: 7,
    importance: 3,
  }
];

const initialTalentPrograms: TalentProgram[] = [
  {
    id: "1",
    name: "Leadership Development Program",
    description: "A 6-month program designed to develop leadership skills among potential managers",
    participants: 12,
    startDate: "2025-06-01",
    endDate: "2025-12-01",
    status: 'active',
  },
  {
    id: "2",
    name: "Technical Excellence",
    description: "Advanced training program for senior developers to master cutting-edge technologies",
    participants: 8,
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    status: 'planned',
  },
  {
    id: "3",
    name: "Customer Service Excellence",
    description: "Program to enhance customer service skills for support team members",
    participants: 15,
    startDate: "2025-03-01",
    endDate: "2025-04-30",
    status: 'completed',
  },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [talentPrograms, setTalentPrograms] = useState<TalentProgram[]>(initialTalentPrograms);
  
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({});
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  
  const [newProgram, setNewProgram] = useState<Partial<TalentProgram>>({});
  const [editingProgram, setEditingProgram] = useState<TalentProgram | null>(null);
  
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [isEditProgramOpen, setIsEditProgramOpen] = useState(false);

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category,
      description: newSkill.description || "",
      employeesWithSkill: newSkill.employeesWithSkill || 0,
      importance: newSkill.importance || 3,
    };

    setSkills([...skills, skill]);
    setNewSkill({});
    setIsAddSkillOpen(false);
    toast({
      title: "Skill Added",
      description: `${skill.name} skill has been added successfully.`
    });
  };

  const handleEditSkill = () => {
    if (!editingSkill) return;

    setSkills(skills.map(skill => 
      skill.id === editingSkill.id ? editingSkill : skill
    ));
    setEditingSkill(null);
    setIsEditSkillOpen(false);
    toast({
      title: "Skill Updated",
      description: `${editingSkill.name} skill has been updated successfully.`
    });
  };

  const handleDeleteSkill = (id: string) => {
    const skillToDelete = skills.find(skill => skill.id === id);
    setSkills(skills.filter(skill => skill.id !== id));
    toast({
      title: "Skill Deleted",
      description: `${skillToDelete?.name} skill has been deleted.`
    });
  };

  const handleAddProgram = () => {
    if (!newProgram.name || !newProgram.startDate || !newProgram.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const program: TalentProgram = {
      id: Date.now().toString(),
      name: newProgram.name,
      description: newProgram.description || "",
      participants: newProgram.participants || 0,
      startDate: newProgram.startDate,
      endDate: newProgram.endDate,
      status: newProgram.status || 'planned',
    };

    setTalentPrograms([...talentPrograms, program]);
    setNewProgram({});
    setIsAddProgramOpen(false);
    toast({
      title: "Program Added",
      description: `${program.name} program has been added successfully.`
    });
  };

  const handleEditProgram = () => {
    if (!editingProgram) return;

    setTalentPrograms(talentPrograms.map(program => 
      program.id === editingProgram.id ? editingProgram : program
    ));
    setEditingProgram(null);
    setIsEditProgramOpen(false);
    toast({
      title: "Program Updated",
      description: `${editingProgram.name} program has been updated successfully.`
    });
  };

  const handleDeleteProgram = (id: string) => {
    const programToDelete = talentPrograms.find(program => program.id === id);
    setTalentPrograms(talentPrograms.filter(program => program.id !== id));
    toast({
      title: "Program Deleted",
      description: `${programToDelete?.name} program has been deleted.`
    });
  };

  const renderStarRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star 
          key={index} 
          className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Completed</span>;
      case 'planned':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Planned</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Skills & Talent Tools</h1>
      </div>

      <Tabs defaultValue="skills" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Skills
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <Star className="h-4 w-4" /> Talent Programs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Skill</DialogTitle>
                  <DialogDescription>
                    Register a new skill in your organization's skill matrix
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skill-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="skill-name"
                      value={newSkill.name || ""}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skill-category" className="text-right">
                      Category
                    </Label>
                    <Input
                      id="skill-category"
                      value={newSkill.category || ""}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="col-span-3"
                      placeholder="Technical, Soft Skills, Management, etc."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skill-importance" className="text-right">
                      Importance
                    </Label>
                    <Input
                      id="skill-importance"
                      type="number"
                      min="1"
                      max="5"
                      value={newSkill.importance || ""}
                      onChange={(e) => setNewSkill({ ...newSkill, importance: Number(e.target.value) as 1|2|3|4|5 })}
                      className="col-span-3"
                      placeholder="Rate from 1-5"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skill-employees" className="text-right">
                      Employees
                    </Label>
                    <Input
                      id="skill-employees"
                      type="number"
                      value={newSkill.employeesWithSkill || ""}
                      onChange={(e) => setNewSkill({ ...newSkill, employeesWithSkill: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-top gap-4">
                    <Label htmlFor="skill-description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="skill-description"
                      value={newSkill.description || ""}
                      onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddSkillOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSkill}>Add Skill</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                    <div className="flex gap-1">
                      <Dialog open={isEditSkillOpen && editingSkill?.id === skill.id} 
                              onOpenChange={(open) => {
                                setIsEditSkillOpen(open);
                                if (open) setEditingSkill(skill);
                              }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Skill</DialogTitle>
                            <DialogDescription>
                              Update skill information
                            </DialogDescription>
                          </DialogHeader>
                          {editingSkill && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-skill-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-skill-name"
                                  value={editingSkill.name}
                                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-skill-category" className="text-right">
                                  Category
                                </Label>
                                <Input
                                  id="edit-skill-category"
                                  value={editingSkill.category}
                                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-skill-importance" className="text-right">
                                  Importance
                                </Label>
                                <Input
                                  id="edit-skill-importance"
                                  type="number"
                                  min="1"
                                  max="5"
                                  value={editingSkill.importance}
                                  onChange={(e) => setEditingSkill({ 
                                    ...editingSkill, 
                                    importance: Number(e.target.value) as 1|2|3|4|5 
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-skill-employees" className="text-right">
                                  Employees
                                </Label>
                                <Input
                                  id="edit-skill-employees"
                                  type="number"
                                  value={editingSkill.employeesWithSkill}
                                  onChange={(e) => setEditingSkill({ 
                                    ...editingSkill, 
                                    employeesWithSkill: parseInt(e.target.value) 
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-top gap-4">
                                <Label htmlFor="edit-skill-description" className="text-right pt-2">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-skill-description"
                                  value={editingSkill.description}
                                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                                  className="col-span-3"
                                  rows={3}
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditSkillOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditSkill}>Save Changes</Button>
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
                            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the {skill.name} skill? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteSkill(skill.id)} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Employees with skill:</span>
                    <span className="font-medium">{skill.employeesWithSkill}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Importance:</span>
                      <div className="flex">
                        {renderStarRating(skill.importance)}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddProgramOpen} onOpenChange={setIsAddProgramOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Talent Program
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Talent Program</DialogTitle>
                  <DialogDescription>
                    Create a new talent development program
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="program-name"
                      value={newProgram.name || ""}
                      onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program-start" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="program-start"
                      type="date"
                      value={newProgram.startDate || ""}
                      onChange={(e) => setNewProgram({ ...newProgram, startDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program-end" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="program-end"
                      type="date"
                      value={newProgram.endDate || ""}
                      onChange={(e) => setNewProgram({ ...newProgram, endDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program-participants" className="text-right">
                      Participants
                    </Label>
                    <Input
                      id="program-participants"
                      type="number"
                      value={newProgram.participants || ""}
                      onChange={(e) => setNewProgram({ ...newProgram, participants: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="program-status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="program-status"
                      value={newProgram.status || "planned"}
                      onChange={(e) => setNewProgram({ 
                        ...newProgram, 
                        status: e.target.value as 'active' | 'completed' | 'planned' 
                      })}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-top gap-4">
                    <Label htmlFor="program-description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="program-description"
                      value={newProgram.description || ""}
                      onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddProgramOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProgram}>Add Program</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {talentPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        {getStatusBadge(program.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Dialog open={isEditProgramOpen && editingProgram?.id === program.id} 
                              onOpenChange={(open) => {
                                setIsEditProgramOpen(open);
                                if (open) setEditingProgram(program);
                              }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Talent Program</DialogTitle>
                            <DialogDescription>
                              Update talent program details
                            </DialogDescription>
                          </DialogHeader>
                          {editingProgram && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-program-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-program-name"
                                  value={editingProgram.name}
                                  onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-program-start" className="text-right">
                                  Start Date
                                </Label>
                                <Input
                                  id="edit-program-start"
                                  type="date"
                                  value={editingProgram.startDate}
                                  onChange={(e) => setEditingProgram({ ...editingProgram, startDate: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-program-end" className="text-right">
                                  End Date
                                </Label>
                                <Input
                                  id="edit-program-end"
                                  type="date"
                                  value={editingProgram.endDate}
                                  onChange={(e) => setEditingProgram({ ...editingProgram, endDate: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-program-participants" className="text-right">
                                  Participants
                                </Label>
                                <Input
                                  id="edit-program-participants"
                                  type="number"
                                  value={editingProgram.participants}
                                  onChange={(e) => setEditingProgram({ 
                                    ...editingProgram, 
                                    participants: parseInt(e.target.value) 
                                  })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-program-status" className="text-right">
                                  Status
                                </Label>
                                <select
                                  id="edit-program-status"
                                  value={editingProgram.status}
                                  onChange={(e) => setEditingProgram({ 
                                    ...editingProgram, 
                                    status: e.target.value as 'active' | 'completed' | 'planned' 
                                  })}
                                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                >
                                  <option value="planned">Planned</option>
                                  <option value="active">Active</option>
                                  <option value="completed">Completed</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-4 items-top gap-4">
                                <Label htmlFor="edit-program-description" className="text-right pt-2">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-program-description"
                                  value={editingProgram.description}
                                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                                  className="col-span-3"
                                  rows={3}
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditProgramOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditProgram}>Save Changes</Button>
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
                            <AlertDialogTitle>Delete Program</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the {program.name} program? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteProgram(program.id)} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-3">{program.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium">{program.participants}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Skills;
