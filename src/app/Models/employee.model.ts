export interface Employee {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;

  departmentId: number;
  department?: string;

  jobTitleId: number;
  jobTitle?: string;

  isActive: boolean;
}
