import { Employee } from '@/types/employee';

export const employees: Employee[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Marketing Director',
    department: 'Marketing',
    email: 'sarah@example.com',
    phone: '(555) 123-4567',
    joinDate: '2019-06-15',
    status: 'active',
    avatar: '/assets/avatar-1.png',
    performance: {
      current: 92,
      previousQuarter: 88,
      metrics: {
        productivity: 90,
        quality: 95,
        teamwork: 92,
        innovation: 89
      },
      evaluations: [
        {
          date: '2023-03-15',
          score: 92,
          feedback: 'Sarah consistently delivers high-quality marketing campaigns and has greatly improved team collaboration.'
        },
        {
          date: '2022-12-15',
          score: 88,
          feedback: 'Great leadership in the marketing department. Need to improve on meeting deadlines.'
        }
      ]
    },
    leaveBalance: {
      annual: 12,
      sick: 5,
      personal: 3
    },
    initials: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'michael@example.com',
    phone: '(555) 234-5678',
    joinDate: '2020-03-10',
    status: 'active',
    avatar: '/assets/avatar-2.png',
    performance: {
      current: 87,
      previousQuarter: 82,
      metrics: {
        productivity: 85,
        quality: 90,
        teamwork: 82,
        innovation: 88
      },
      evaluations: [
        {
          date: '2023-03-15',
          score: 87,
          feedback: 'Michael produces clean, well-documented code. Could take more initiative on new projects.'
        },
        {
          date: '2022-12-15',
          score: 82,
          feedback: 'Good technical skills but needs to improve communication with non-technical team members.'
        }
      ]
    },
    leaveBalance: {
      annual: 8,
      sick: 4,
      personal: 2
    },
    initials: 'MC'
  },
  {
    id: 3,
    name: 'Jessica Williams',
    position: 'HR Specialist',
    department: 'Human Resources',
    email: 'jessica@example.com',
    phone: '(555) 345-6789',
    joinDate: '2021-01-05',
    status: 'on-leave',
    avatar: '/assets/avatar-3.png',
    performance: {
      current: 78,
      previousQuarter: 75,
      metrics: {
        productivity: 75,
        quality: 80,
        teamwork: 85,
        innovation: 72
      },
      evaluations: [
        {
          date: '2023-03-15',
          score: 78,
          feedback: 'Jessica has improved employee onboarding processes. Need to work on follow-through with initiatives.'
        },
        {
          date: '2022-12-15',
          score: 75,
          feedback: 'Good at resolving conflicts. Should focus on more proactive HR strategies.'
        }
      ]
    },
    leaveBalance: {
      annual: 5,
      sick: 2,
      personal: 1
    },
    initials: 'JW'
  },
  {
    id: 4,
    name: 'Robert Garcia',
    position: 'Project Manager',
    department: 'Operations',
    email: 'robert@example.com',
    phone: '(555) 456-7890',
    joinDate: '2018-11-12',
    status: 'active',
    avatar: '/assets/avatar-4.png',
    performance: {
      current: 95,
      previousQuarter: 93,
      metrics: {
        productivity: 95,
        quality: 92,
        teamwork: 96,
        innovation: 90
      },
      evaluations: [
        {
          date: '2023-03-15',
          score: 95,
          feedback: 'Robert consistently delivers projects on time and under budget. Excellent team leadership.'
        },
        {
          date: '2022-12-15',
          score: 93,
          feedback: 'Exceptional at managing resources and planning. Could improve risk management.'
        }
      ]
    },
    leaveBalance: {
      annual: 15,
      sick: 7,
      personal: 3
    },
    initials: 'RG'
  },
  {
    id: 5,
    name: 'Amanda Lee',
    position: 'Data Analyst',
    department: 'Analytics',
    email: 'amanda@example.com',
    phone: '(555) 567-8901',
    joinDate: '2021-06-20',
    status: 'active',
    avatar: '/assets/avatar-5.png',
    performance: {
      current: 68,
      previousQuarter: 65,
      metrics: {
        productivity: 70,
        quality: 75,
        teamwork: 65,
        innovation: 60
      },
      evaluations: [
        {
          date: '2023-03-15',
          score: 68,
          feedback: 'Amanda is learning quickly but needs more guidance on complex analyses. Good attention to detail.'
        },
        {
          date: '2022-12-15',
          score: 65,
          feedback: 'Shows potential but needs to improve technical skills and confidence in presentations.'
        }
      ]
    },
    leaveBalance: {
      annual: 7,
      sick: 5,
      personal: 2
    },
    initials: 'AL'
  }
];

// Helper to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchEmployees = async () => {
  await delay(800); // Simulate network delay
  return employees;
};

export const fetchEmployee = async (id: number) => {
  await delay(600);
  const employee = employees.find(emp => emp.id === id);
  if (!employee) throw new Error('Employee not found');
  return employee;
};

export const calculateDepartmentPerformance = (departmentName: string) => {
  const departmentEmployees = employees.filter(emp => 
    emp.department === departmentName && emp.status === 'active'
  );
  
  if (departmentEmployees.length === 0) return 0;
  
  const totalPerformance = departmentEmployees.reduce(
    (sum, emp) => sum + emp.performance.current, 0
  );
  
  return Math.round(totalPerformance / departmentEmployees.length);
};

export const calculateOverallPerformance = () => {
  const activeEmployees = employees.filter(emp => emp.status === 'active');
  if (activeEmployees.length === 0) return 0;
  
  const totalPerformance = activeEmployees.reduce(
    (sum, emp) => sum + emp.performance.current, 0
  );
  
  return Math.round(totalPerformance / activeEmployees.length);
};
