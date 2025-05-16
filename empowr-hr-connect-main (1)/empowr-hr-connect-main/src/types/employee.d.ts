
export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'on-leave' | 'terminated';
  joinDate: string; 
  avatar?: string;
  initials: string;
  managerName?: string;
  performanceScore?: number;
  skillset?: string[];
  salary?: number;
  location?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract';
  performance?: {
    current: number;
    previousQuarter: number;
    metrics: {
      productivity: number;
      quality: number;
      teamwork: number;
      innovation: number;
    };
    evaluations: {
      date: string;
      score: number;
      feedback: string;
    }[];
  };
  leaveBalance?: {
    annual: number;
    sick: number;
    personal: number;
  };
}
