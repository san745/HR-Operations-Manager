
import { useState, useEffect } from 'react';
import { Search, Plus, Download, MoreVertical, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { toast } from '@/components/ui/sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Employee } from '@/types/employee'; // Import Employee type from correct location
import { employees as employeesData } from '@/data/employee-data';
import EmployeeModal from '@/components/employees/EmployeeModal';
import EmployeeFilters from '@/components/employees/EmployeeFilters';

interface FilterOptions {
  departments: string[];
  statuses: ('active' | 'on-leave' | 'terminated')[];
  joinDateStart?: string;
  joinDateEnd?: string;
}

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employeesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    departments: [],
    statuses: [],
  });

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, employees, activeFilters]);

  const applyFilters = () => {
    let filtered = [...employees];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(employee => 
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query)
      );
    }
    
    // Apply department filters
    if (activeFilters.departments && activeFilters.departments.length > 0) {
      filtered = filtered.filter(employee => 
        activeFilters.departments.includes(employee.department)
      );
    }
    
    // Apply status filters
    if (activeFilters.statuses && activeFilters.statuses.length > 0) {
      filtered = filtered.filter(employee => 
        activeFilters.statuses.includes(employee.status)
      );
    }
    
    // Apply date range filters
    if (activeFilters.joinDateStart || activeFilters.joinDateEnd) {
      filtered = filtered.filter(employee => {
        const employeeDate = new Date(employee.joinDate);
        
        if (activeFilters.joinDateStart && activeFilters.joinDateEnd) {
          const startDate = new Date(activeFilters.joinDateStart);
          const endDate = new Date(activeFilters.joinDateEnd);
          return employeeDate >= startDate && employeeDate <= endDate;
        } else if (activeFilters.joinDateStart) {
          const startDate = new Date(activeFilters.joinDateStart);
          return employeeDate >= startDate;
        } else if (activeFilters.joinDateEnd) {
          const endDate = new Date(activeFilters.joinDateEnd);
          return employeeDate <= endDate;
        }
        
        return true;
      });
    }
    
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddEmployee = () => {
    setIsEditing(false);
    setCurrentEmployee(undefined);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (employeeData: Partial<Employee>) => {
    if (isEditing && currentEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => 
        emp.id === currentEmployee.id 
          ? { ...emp, ...employeeData }
          : emp
      );
      setEmployees(updatedEmployees);
      toast.success("Employee updated successfully");
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        name: employeeData.name || '',
        position: employeeData.position || '',
        department: employeeData.department || '',
        email: employeeData.email || '',
        phone: employeeData.phone || '',
        joinDate: employeeData.joinDate || new Date().toISOString().split('T')[0],
        status: employeeData.status || 'active',
        initials: employeeData.name ? getInitials(employeeData.name) : '',
        performance: {
          current: 80,
          previousQuarter: 75,
          metrics: {
            productivity: 80,
            quality: 80,
            teamwork: 80,
            innovation: 80
          },
          evaluations: []
        },
        leaveBalance: {
          annual: 15,
          sick: 10,
          personal: 5
        }
      };
      setEmployees([...employees, newEmployee]);
      toast.success("Employee added successfully");
    }
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      const updatedEmployees = employees.filter(emp => emp.id !== employeeToDelete.id);
      setEmployees(updatedEmployees);
      toast.success("Employee removed successfully");
    }
    setIsDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleDeactivate = (employee: Employee) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === employee.id 
        ? { ...emp, status: 'terminated' as const }
        : emp
    );
    setEmployees(updatedEmployees);
    toast.success(`${employee.name} has been deactivated`);
  };

  const exportToCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Department',
      'Position',
      'Status',
      'Join Date',
      'Phone',
    ];
    
    const csvData = filteredEmployees.map(employee => [
      employee.id.toString(),
      employee.name,
      employee.email,
      employee.department,
      employee.position,
      employee.status,
      employee.joinDate,
      employee.phone || '',
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(',')),
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'employee_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Employee data exported successfully");
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'on-leave':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">On Leave</Badge>;
      case 'terminated':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Terminated</Badge>;
      default:
        return null;
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            // Show current page, first, last, and one page before and after current
            if (
              pageNumber === 1 || 
              pageNumber === totalPages ||
              pageNumber === currentPage ||
              pageNumber === currentPage - 1 ||
              pageNumber === currentPage + 1
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              (pageNumber === 2 && currentPage > 3) ||
              (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              // Show ellipsis
              return <PaginationItem key={pageNumber}>...</PaginationItem>;
            }
            return null;
          })}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <p className="text-muted-foreground">Manage your employee directory.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="w-full pl-8 bg-background"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <EmployeeFilters onApplyFilters={handleFilterChange} />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={exportToCSV}
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              
              <Button 
                size="sm" 
                className="gap-1"
                onClick={handleAddEmployee}
              >
                <Plus className="h-4 w-4" />
                <span>Add Employee</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>{employee.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                            Edit Employee
                          </DropdownMenuItem>
                          <DropdownMenuItem>Performance Review</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {employee.status !== 'terminated' && (
                            <DropdownMenuItem 
                              className="text-amber-500"
                              onClick={() => handleDeactivate(employee)}
                            >
                              Deactivate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => handleDeleteClick(employee)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEmployees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      No employees found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} employees
            </div>
            {renderPagination()}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Employee Modal */}
      <EmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={currentEmployee}
        isEditing={isEditing}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {employeeToDelete?.name}'s
              account and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Employees;
