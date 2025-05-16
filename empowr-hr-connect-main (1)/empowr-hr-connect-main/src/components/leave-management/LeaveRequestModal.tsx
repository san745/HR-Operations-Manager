
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, differenceInCalendarDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Employee } from '@/types/employee';

interface LeaveRequest {
  id?: number;
  employee: {
    name: string;
    position: string;
    department: string;
    avatar?: string;
    initials: string;
  };
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reason?: string;
}

interface LeaveRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (request: LeaveRequest) => void;
  employees: Employee[];
}

export function LeaveRequestModal({ open, onClose, onSave, employees }: LeaveRequestModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [leaveType, setLeaveType] = useState<'vacation' | 'sick' | 'personal' | 'other'>('vacation');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState<string>('');
  
  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setSelectedEmployee('');
      setLeaveType('vacation');
      setStartDate(undefined);
      setEndDate(undefined);
      setReason('');
    }
  }, [open]);

  const calculateDuration = (): string => {
    if (!startDate || !endDate) return '0 days';
    
    const days = differenceInCalendarDays(endDate, startDate) + 1;
    return `${days} day${days !== 1 ? 's' : ''}`;
  };
  
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return format(date, 'MMM dd, yyyy');
  };

  const handleSubmit = () => {
    if (!selectedEmployee || !startDate || !endDate) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const employee = employees.find(emp => emp.id.toString() === selectedEmployee);
    
    if (!employee) {
      toast.error("Please select a valid employee");
      return;
    }
    
    // Validate date range
    if (endDate < startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    const request: LeaveRequest = {
      employee: {
        name: employee.name,
        position: employee.position,
        department: employee.department,
        avatar: employee.avatar,
        initials: employee.name.split(' ').map(n => n[0]).join(''),
      },
      type: leaveType,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      duration: calculateDuration(),
      status: 'pending',
      requestDate: format(new Date(), 'MMM dd, yyyy'),
      reason: reason || undefined,
    };
    
    onSave(request);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>New Leave Request</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee*</Label>
            <Select 
              value={selectedEmployee} 
              onValueChange={setSelectedEmployee}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees
                  .filter(emp => emp.status !== 'terminated')
                  .map(employee => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name} - {employee.position}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="leaveType">Leave Type*</Label>
            <Select 
              value={leaveType} 
              onValueChange={(value) => setLeaveType(value as 'vacation' | 'sick' | 'personal' | 'other')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="sick">Sick</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => startDate ? date < startDate : date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Please provide details for your leave request"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          {startDate && endDate && (
            <div className="text-sm text-muted-foreground">
              Duration: {calculateDuration()}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LeaveRequestModal;
