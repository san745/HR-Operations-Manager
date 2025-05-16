
import { Search, Clock, Book, FileText, File, CheckSquare, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface Policy {
  id: number;
  title: string;
  description: string;
  category: 'general' | 'leave' | 'benefits' | 'conduct' | 'security';
  lastUpdated: string;
  content: string;
}

const policies: Policy[] = [
  {
    id: 1,
    title: "Employee Code of Conduct",
    description: "Guidelines for professional behavior and ethical standards",
    category: "conduct",
    lastUpdated: "May 15, 2023",
    content: `
# Employee Code of Conduct

## Introduction
This Code of Conduct outlines the expectations for employee behavior and the ethical standards that all employees are expected to uphold.

## Professional Conduct
- Treat all colleagues, customers, and partners with respect and dignity
- Maintain a positive and collaborative work environment
- Communicate professionally in all forms of communication
- Report any concerns or violations to management or HR

## Ethical Standards
- Act with integrity and honesty in all business dealings
- Avoid conflicts of interest
- Protect confidential information
- Comply with all applicable laws and regulations

## Workplace Behavior
- Maintain a safe and healthy work environment
- Respect diversity and inclusion
- Refrain from harassment or discrimination of any kind
- Dress appropriately for your role and responsibilities

## Disciplinary Actions
Violations of this Code of Conduct may result in disciplinary action, up to and including termination of employment.
    `
  },
  {
    id: 2,
    title: "Annual Leave Policy",
    description: "Procedures and guidelines for requesting and taking annual leave",
    category: "leave",
    lastUpdated: "Apr 10, 2023",
    content: `
# Annual Leave Policy

## Eligibility
All full-time employees are eligible for paid annual leave as specified in their employment contract.

## Leave Entitlement
- New employees: X days per year, prorated based on start date
- After 3 years of service: X+2 days per year
- After 5 years of service: X+5 days per year

## Requesting Leave
- All leave requests must be submitted through the HR system at least two weeks in advance
- Approval is subject to business needs and staffing requirements
- During peak periods, leave requests will be considered on a first-come, first-served basis

## Carrying Over Leave
Employees may carry over up to 5 days of unused leave to the next calendar year, with manager approval.

## Payment in Lieu of Leave
Payment in lieu of taking leave is not permitted except in cases of employment termination.
    `
  },
  {
    id: 3,
    title: "Health and Safety Policy",
    description: "Guidelines to ensure a safe and healthy workplace",
    category: "general",
    lastUpdated: "Jun 5, 2023",
    content: `
# Health and Safety Policy

## Purpose
Our company is committed to providing a safe and healthy working environment for all employees and visitors.

## Responsibilities
### Management Will:
- Provide a safe workplace
- Conduct regular risk assessments
- Provide appropriate training and equipment
- Investigate incidents and implement preventive measures

### Employees Must:
- Follow all safety procedures
- Report hazards and incidents immediately
- Use protective equipment as required
- Participate in safety training

## Emergency Procedures
Detailed emergency evacuation procedures are posted throughout the building.

## Reporting
All accidents, incidents, and near-misses must be reported to management within 24 hours.
    `
  },
  {
    id: 4,
    title: "Remote Work Policy",
    description: "Guidelines for working remotely or from home",
    category: "general",
    lastUpdated: "Mar 20, 2023",
    content: `
# Remote Work Policy

## Eligibility
Remote work arrangements may be approved for roles where physical presence is not required for all work duties.

## Equipment and Resources
- The company will provide necessary equipment for remote work
- Employees are responsible for ensuring they have adequate internet connectivity
- IT support will be available during normal business hours

## Work Hours and Availability
- Remote employees must maintain their regular work schedule
- Employees must be available for meetings, calls, and collaboration during core hours
- Time tracking may be required for certain roles

## Security Requirements
- Company equipment and data must be secured at all times
- VPN must be used when accessing company systems
- Report any security incidents immediately

## Performance Expectations
Remote work arrangements will be reviewed periodically to ensure productivity and collaboration standards are maintained.
    `
  },
  {
    id: 5,
    title: "Employee Benefits Overview",
    description: "Summary of health, retirement, and other benefits",
    category: "benefits",
    lastUpdated: "Jan 12, 2023",
    content: `
# Employee Benefits Overview

## Health Benefits
- Medical insurance coverage for employees and dependents
- Dental and vision plans
- Mental health resources and employee assistance program

## Retirement Benefits
- 401(k) retirement plan with employer matching
- Vesting schedule and investment options
- Financial planning resources

## Additional Benefits
- Life insurance
- Disability insurance
- Paid parental leave
- Professional development allowance
- Wellness program

## Eligibility
Benefits eligibility typically begins after 90 days of employment for full-time employees.

## Enrollment
Open enrollment occurs annually in November, with coverage effective January 1st of the following year.
    `
  },
  {
    id: 6,
    title: "Data Protection Policy",
    description: "Guidelines for handling sensitive company and customer data",
    category: "security",
    lastUpdated: "Feb 28, 2023",
    content: `
# Data Protection Policy

## Purpose
This policy establishes guidelines for handling sensitive company and customer data to protect privacy and comply with regulations.

## Data Classification
- Public: Information that can be freely disclosed
- Internal: Information for employee use only
- Confidential: Sensitive information with restricted access
- Restricted: Highly sensitive information with strict access controls

## Employee Responsibilities
- Only access data necessary for your job functions
- Never share passwords or access credentials
- Report any data breaches immediately
- Secure physical documents containing sensitive information

## Technical Safeguards
- Encryption of sensitive data
- Regular security updates and patches
- Multi-factor authentication for system access
- Regular security audits and testing

## Compliance
Failure to comply with this policy may result in disciplinary action and potential legal consequences.
    `
  }
];

const Policies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const filteredPolicies = policies.filter(policy => 
    policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePolicyClick = (policy: Policy) => {
    setSelectedPolicy(policy);
  };

  const getCategoryIcon = (category: Policy['category']) => {
    switch(category) {
      case 'general':
        return <File className="h-5 w-5" />;
      case 'leave':
        return <Clock className="h-5 w-5" />;
      case 'benefits':
        return <CheckSquare className="h-5 w-5" />;
      case 'conduct':
        return <Users className="h-5 w-5" />;
      case 'security':
        return <FileText className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  const getCategoryBadge = (category: Policy['category']) => {
    switch(category) {
      case 'general':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">General</Badge>;
      case 'leave':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Leave</Badge>;
      case 'benefits':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Benefits</Badge>;
      case 'conduct':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Conduct</Badge>;
      case 'security':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Security</Badge>;
      default:
        return null;
    }
  };

  const renderPolicyContent = (content: string) => {
    // Very basic Markdown-like rendering
    const lines = content.split('\n');
    return (
      <div className="policy-content space-y-4">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h2>;
          } else if (line.startsWith('## ')) {
            return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.slice(3)}</h3>;
          } else if (line.startsWith('### ')) {
            return <h4 key={index} className="text-lg font-medium mt-3 mb-1">{line.slice(4)}</h4>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="ml-6">{line.slice(2)}</li>;
          } else if (line.trim() === '') {
            return null;
          } else {
            return <p key={index} className="my-2">{line}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Policies</h1>
        <p className="text-muted-foreground">Access and review current HR policies and procedures.</p>
      </div>

      <div className="relative w-full max-w-sm mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search policies..."
          className="w-full pl-8 bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Policy Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="general">
                <AccordionTrigger>General Policies</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {policies
                      .filter(policy => policy.category === 'general')
                      .map(policy => (
                        <li key={policy.id}>
                          <button 
                            onClick={() => handlePolicyClick(policy)}
                            className="text-left w-full hover:text-primary hover:underline"
                          >
                            {policy.title}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="leave">
                <AccordionTrigger>Leave Policies</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {policies
                      .filter(policy => policy.category === 'leave')
                      .map(policy => (
                        <li key={policy.id}>
                          <button 
                            onClick={() => handlePolicyClick(policy)}
                            className="text-left w-full hover:text-primary hover:underline"
                          >
                            {policy.title}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="benefits">
                <AccordionTrigger>Benefits Policies</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {policies
                      .filter(policy => policy.category === 'benefits')
                      .map(policy => (
                        <li key={policy.id}>
                          <button 
                            onClick={() => handlePolicyClick(policy)}
                            className="text-left w-full hover:text-primary hover:underline"
                          >
                            {policy.title}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="conduct">
                <AccordionTrigger>Conduct Policies</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {policies
                      .filter(policy => policy.category === 'conduct')
                      .map(policy => (
                        <li key={policy.id}>
                          <button 
                            onClick={() => handlePolicyClick(policy)}
                            className="text-left w-full hover:text-primary hover:underline"
                          >
                            {policy.title}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="security">
                <AccordionTrigger>Security Policies</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {policies
                      .filter(policy => policy.category === 'security')
                      .map(policy => (
                        <li key={policy.id}>
                          <button 
                            onClick={() => handlePolicyClick(policy)}
                            className="text-left w-full hover:text-primary hover:underline"
                          >
                            {policy.title}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            {selectedPolicy ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPolicy.title}</h2>
                    <p className="text-muted-foreground">{selectedPolicy.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getCategoryBadge(selectedPolicy.category)}
                    <p className="text-xs text-muted-foreground">
                      Last updated: {selectedPolicy.lastUpdated}
                    </p>
                  </div>
                </div>
                <ScrollArea className="h-[500px] pr-4">
                  {renderPolicyContent(selectedPolicy.content)}
                </ScrollArea>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPolicies.map(policy => (
                  <Card 
                    key={policy.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onClick={() => handlePolicyClick(policy)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          {getCategoryIcon(policy.category)}
                        </div>
                        <div>
                          <h3 className="font-medium">{policy.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {policy.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            {getCategoryBadge(policy.category)}
                            <p className="text-xs text-muted-foreground">
                              {policy.lastUpdated}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredPolicies.length === 0 && (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">No policies found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Policies;
