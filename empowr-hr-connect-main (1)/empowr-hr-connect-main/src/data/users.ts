
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "hr" | "manager" | "employee";
  avatar?: string;
  department: string;
  position: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "admin",
    avatar: "/assets/avatar.png",
    department: "Human Resources",
    position: "HR Manager"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    role: "hr",
    avatar: "/assets/avatar-1.png",
    department: "Marketing",
    position: "Marketing Director"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    password: "password123",
    role: "manager",
    avatar: "/assets/avatar-2.png",
    department: "Engineering",
    position: "Senior Developer"
  }
];
