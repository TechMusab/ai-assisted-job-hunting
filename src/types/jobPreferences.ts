export interface JobPreferences {
  jobTitles: string[];
  locations: string[];
  remoteOption: RemoteOption;
  salaryRange: SalaryRange;
  jobTypes: JobType[];
  experienceLevel: ExperienceLevel;
  industries: string[];
  skills: string[];
  companySize: CompanySize;
  keywords: string;
}

export type RemoteOption = 'any' | 'remote' | 'hybrid' | 'onsite';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: SalaryPeriod;
}

export type SalaryPeriod = 'hourly' | 'monthly' | 'yearly';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export type CompanySize = 'any' | '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';

export interface FormErrors {
  jobTitles?: string;
  locations?: string;
  salaryRange?: {
    min?: string;
    max?: string;
  };
  keywords?: string;
}
