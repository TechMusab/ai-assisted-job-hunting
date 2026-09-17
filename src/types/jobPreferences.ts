export type WorkArrangement = 'Remote' | 'Hybrid' | 'On-site';

export type ExperienceLevel = 'Entry Level' | 'Junior' | 'Mid Level' | 'Senior';

export interface JobPreferences {
  jobTitle: string;
  location?: string;
  workArrangement: WorkArrangement;
  minimumSalary?: number;
  experienceLevel: ExperienceLevel;
}

export interface FormErrors {
  jobTitle?: string;
  workArrangement?: string;
  experienceLevel?: string;
  minimumSalary?: string;
}
