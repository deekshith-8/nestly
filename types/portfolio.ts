export interface Skill {
  id: string;
  name: string;
  category: string; // e.g., 'Frontend', 'Backend', 'Design', 'Other'
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techTags: string[];
  link?: string;
  image?: string;
  featured?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface CustomSectionItem {
  id: string;
  label: string;
  value: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  resumeUrl?: string;
  profileImage?: string;
  
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  educations: Education[];
  
  themeId: string;   // 'slate' | 'neon' | 'editorial' | 'emerald' | 'sunset'
  layoutId: string;  // 'bento' | 'minimal' | 'split'
}
