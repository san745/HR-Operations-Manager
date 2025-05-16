
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type EmployeeStatus = 'active' | 'on-leave' | 'terminated';

interface FilterOptions {
  departments: string[];
  statuses: EmployeeStatus[];
  joinDateStart?: string;
  joinDateEnd?: string;
}

interface EmployeeFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

export function EmployeeFilters({ onApplyFilters }: EmployeeFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<EmployeeStatus[]>([]);
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({});

  const departments = [
    "Marketing",
    "Engineering",
    "Human Resources",
    "Operations",
    "Analytics",
    "Sales",
    "Finance",
  ];
  
  const statuses: { value: EmployeeStatus; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'terminated', label: 'Terminated' },
  ];

  const handleDepartmentChange = (department: string, checked: boolean) => {
    setSelectedDepartments(prev => 
      checked ? [...prev, department] : prev.filter(d => d !== department)
    );
  };

  const handleStatusChange = (status: EmployeeStatus, checked: boolean) => {
    setSelectedStatuses(prev => 
      checked ? [...prev, status] : prev.filter(s => s !== status)
    );
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    const filters: FilterOptions = {
      departments: selectedDepartments,
      statuses: selectedStatuses,
      joinDateStart: dateRange.start,
      joinDateEnd: dateRange.end,
    };
    
    let count = 0;
    if (selectedDepartments.length) count += 1;
    if (selectedStatuses.length) count += 1;
    if (dateRange.start || dateRange.end) count += 1;
    
    setActiveFiltersCount(count);
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedStatuses([]);
    setDateRange({});
    setActiveFiltersCount(0);
    onApplyFilters({
      departments: [],
      statuses: [],
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 relative">
          <Filter className="h-4 w-4 mr-1" />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <Badge className="h-5 w-5 p-0 text-xs rounded-full flex items-center justify-center absolute -top-2 -right-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex justify-between">
            Filters
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground text-sm"
            >
              Clear all
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Department</h4>
            <div className="grid grid-cols-2 gap-3">
              {departments.map((dept) => (
                <div className="flex items-center gap-2" key={dept}>
                  <Checkbox 
                    id={`dept-${dept}`} 
                    checked={selectedDepartments.includes(dept)}
                    onCheckedChange={(checked) => handleDepartmentChange(dept, checked === true)}
                  />
                  <Label htmlFor={`dept-${dept}`} className="text-sm cursor-pointer">
                    {dept}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Status</h4>
            <div className="flex flex-wrap gap-4">
              {statuses.map((status) => (
                <div className="flex items-center gap-2" key={status.value}>
                  <Checkbox 
                    id={`status-${status.value}`} 
                    checked={selectedStatuses.includes(status.value)}
                    onCheckedChange={(checked) => 
                      handleStatusChange(status.value, checked === true)
                    }
                  />
                  <Label htmlFor={`status-${status.value}`} className="text-sm cursor-pointer">
                    {status.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Join Date Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-xs">From</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={dateRange.start || ''}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-xs">To</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={dateRange.end || ''}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EmployeeFilters;
