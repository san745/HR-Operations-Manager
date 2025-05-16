
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, getDay, isToday, addMonths, subMonths, isSameDay, isWeekend } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, FilePlus, FileEdit, Trash2, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface LeaveEvent {
  id: number;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface CalendarViewProps {
  events: LeaveEvent[];
  onEventUpdate?: (event: LeaveEvent) => void;
  onEventDelete?: (eventId: number) => void;
}

export function LeaveCalendarView({ events, onEventUpdate, onEventDelete }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<LeaveEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [viewType, setViewType] = useState<'month' | 'week'>('month');
  const [filterType, setFilterType] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = monthStart;
  const endDate = monthEnd;

  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Filter events based on type
  const filteredEvents = filterType 
    ? events.filter(event => event.type === filterType)
    : events;

  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDate = new Date(date);
      
      currentDate.setHours(0, 0, 0, 0);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(0, 0, 0, 0);
      
      return currentDate >= eventStart && currentDate <= eventEnd;
    });
  };

  const getDayClassName = (day: Date) => {
    const baseClasses = "h-12 sm:h-20 border border-border p-1 relative";
    
    if (!isSameMonth(day, monthStart)) {
      return cn(baseClasses, "bg-muted/40 text-muted-foreground");
    }
    
    if (isWeekend(day)) {
      return cn(baseClasses, "bg-gray-50");
    }
    
    if (isToday(day)) {
      return cn(baseClasses, "bg-primary/10 font-bold");
    }
    
    return baseClasses;
  };

  const handleEventClick = (event: LeaveEvent) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = () => {
    if (selectedEvent && onEventDelete) {
      onEventDelete(selectedEvent.id);
      setIsDeleteConfirmOpen(false);
      setIsDetailsOpen(false);
      toast({
        title: "Leave request deleted",
        description: `${selectedEvent.employeeName}'s leave request has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = (status: 'pending' | 'approved' | 'rejected') => {
    if (selectedEvent && onEventUpdate) {
      const updatedEvent = { ...selectedEvent, status };
      onEventUpdate(updatedEvent);
      setSelectedEvent(updatedEvent);
      
      toast({
        title: "Status updated",
        description: `Leave request status changed to ${status}.`,
      });
    }
  };

  const getEventBadgeClass = (type: LeaveEvent['type']) => {
    switch (type) {
      case 'vacation': return "bg-blue-100 text-blue-800";
      case 'sick': return "bg-red-100 text-red-800";
      case 'personal': return "bg-purple-100 text-purple-800";
      case 'other': return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: LeaveEvent['status']) => {
    switch (status) {
      case 'approved': return "bg-green-100 text-green-800";
      case 'rejected': return "bg-red-100 text-red-800";
      case 'pending': return "bg-amber-100 text-amber-800";
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const leaveTypes = [
    { value: null, label: "All Types" },
    { value: 'vacation', label: "Vacation" },
    { value: 'sick', label: "Sick" },
    { value: 'personal', label: "Personal" },
    { value: 'other', label: "Other" }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          
          <h2 className="text-lg font-semibold px-2 min-w-[150px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
          
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType || ""} onValueChange={(value) => setFilterType(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {leaveTypes.map(type => (
                <SelectItem key={type.label} value={type.value || ""}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {daysOfWeek.map((day) => (
          <div 
            key={day} 
            className="text-center py-2 font-medium text-sm border-b border-border bg-muted/20"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: getDay(monthStart) }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-muted/20 border border-border" />
        ))}
        
        {dateRange.map((day, i) => {
          const formattedDate = format(day, "d");
          const dayEvents = getEventsForDate(day);
          const isCurrentDay = isToday(day);
          
          return (
            <div
              key={i}
              className={getDayClassName(day)}
            >
              <div className={cn(
                "text-right text-sm p-1",
                isCurrentDay && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center ml-auto"
              )}>
                {formattedDate}
              </div>
              
              <div className="overflow-y-auto max-h-16">
                {dayEvents.length > 0 && (
                  <TooltipProvider>
                    {dayEvents.slice(0, 3).map((event, eventIdx) => (
                      <Tooltip key={event.id + "-" + eventIdx}>
                        <TooltipTrigger asChild>
                          <div
                            className={`text-xs rounded px-1 py-0.5 mb-1 truncate cursor-pointer ${getEventBadgeClass(event.type)}`}
                            onClick={() => handleEventClick(event)}
                          >
                            {event.employeeName}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <div className="text-xs">
                            <div className="font-medium">{event.employeeName}</div>
                            <div>Type: {event.type}</div>
                            <div>Status: {event.status}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    {dayEvents.length > 3 && (
                      <div 
                        className="text-xs text-muted-foreground bg-muted/50 rounded px-1 py-0.5 text-center cursor-pointer"
                        onClick={() => {
                          // Show all events for this day in a dialog
                          const firstEvent = dayEvents[0];
                          setSelectedEvent(firstEvent);
                          setIsDetailsOpen(true);
                        }}
                      >
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </TooltipProvider>
                )}
              </div>
              
              {isSameMonth(day, monthStart) && isWeekend(day) && (
                <div className="absolute bottom-0 right-0 left-0 h-1 bg-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Event Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Leave Details
              {selectedEvent && (
                <Badge className={getStatusColor(selectedEvent.status)}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Employee</h4>
                <p>{selectedEvent.employeeName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Leave Type</h4>
                  <Badge className={getEventBadgeClass(selectedEvent.type)}>
                    {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium">Duration</h4>
                  <p>{format(selectedEvent.startDate, 'MMM dd')} - {format(selectedEvent.endDate, 'MMM dd, yyyy')}</p>
                </div>
              </div>
              
              {selectedEvent.status === 'pending' && onEventUpdate && (
                <div className="flex gap-2 mt-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => handleStatusChange('rejected')}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-500 hover:bg-green-50"
                    onClick={() => handleStatusChange('approved')}
                  >
                    Approve
                  </Button>
                </div>
              )}
              
              <DialogFooter>
                {onEventDelete && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="mr-auto"
                    onClick={() => setIsDeleteConfirmOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this leave request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteClick}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeaveCalendarView;
