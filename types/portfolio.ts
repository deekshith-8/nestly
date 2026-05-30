export interface Skill {
  id: string;
  name: string;
  category: string;
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
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}
export interface Language {
  id: string;
  name: string;
  proficiency: string;
}
export interface Volunteer {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}
export interface FontSettings {
  nameFont: string;
  sectionFont: string;
  bodyFont: string;
  skillsFont: string;
  nameSize: string;
  sectionSize: string;
  bodySize: string;
  skillsSize: string;
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
  certifications: Certification[];
  languages: Language[];
  volunteers: Volunteer[];
  themeId: string;
  layoutId: string;
  fonts: FontSettings;
}