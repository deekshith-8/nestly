import { PortfolioData } from "../types/portfolio";

export const defaultPortfolioData: PortfolioData = {
  name: "Arjun Sharma",
  title: "Full Stack Developer",
  bio: "I build scalable web applications and love solving real-world problems through clean code. Passionate about open source, developer tooling, and crafting seamless user experiences.",
  location: "Bengaluru, Karnataka",
  email: "arjun.sharma@gmail.com",
  phone: "+91 98765 43210",
  github: "https://github.com/arjunsharma",
  linkedin: "https://linkedin.com/in/arjunsharma",
  twitter: "https://twitter.com/arjunsharma",
  resumeUrl: "https://drive.google.com/file/d/yourresume",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
  themeId: "slate",
  layoutId: "bento",
  fonts: {
    nameFont: "Inter",
    sectionFont: "Inter",
    bodyFont: "Inter",
    skillsFont: "monospace",
    nameSize: "3rem",
    sectionSize: "0.875rem",
    bodySize: "0.75rem",
    skillsSize: "0.7rem",
  },
  skills: [
    { id: "s1", name: "React.js", category: "Frontend" },
    { id: "s2", name: "Next.js", category: "Frontend" },
    { id: "s3", name: "Tailwind CSS", category: "Frontend" },
    { id: "s4", name: "TypeScript", category: "Frontend" },
    { id: "s5", name: "Node.js", category: "Backend" },
    { id: "s6", name: "Express.js", category: "Backend" },
    { id: "s7", name: "MongoDB", category: "Backend" },
    { id: "s8", name: "PostgreSQL", category: "Backend" },
    { id: "s9", name: "Figma", category: "Design" },
    { id: "s10", name: "Git & GitHub", category: "Tools" },
    { id: "s11", name: "Docker", category: "Tools" },
    { id: "s12", name: "AWS", category: "Tools" },
  ],
  experiences: [
    {
      id: "e1",
      role: "SDE Intern",
      company: "Razorpay",
      period: "Jan 2024 - Jun 2024",
      description: "Built internal dashboard features using React and Node.js. Reduced API response time by 30% through query optimization and Redis caching."
    },
    {
      id: "e2",
      role: "Frontend Developer",
      company: "Zoho Corporation",
      period: "Jul 2023 - Dec 2023",
      description: "Developed reusable UI components for Zoho CRM. Collaborated with design team to implement pixel-perfect interfaces."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Campus Connect",
      description: "A platform for college students to find study partners, share notes, and collaborate on projects. Built with Next.js and Firebase.",
      techTags: ["Next.js", "Firebase", "Tailwind CSS"],
      link: "https://github.com/arjunsharma/campus-connect",
      image: "https://picsum.photos/seed/campus/600/400",
      featured: true
    },
    {
      id: "p2",
      title: "Kharcha Tracker",
      description: "A personal finance tracker built for Indian users — supports UPI, cash, and bank transfers with monthly budget alerts.",
      techTags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/arjunsharma/kharcha-tracker",
      image: "https://picsum.photos/seed/kharcha/600/400",
      featured: true
    }
  ],
  educations: [
    {
      id: "edu1",
      degree: "B.E. Computer Science & Engineering",
      school: "RV College of Engineering, Bengaluru",
      period: "2020 - 2024"
    },
    {
      id: "edu2",
      degree: "PUC (Science) — 94.6%",
      school: "Narayana PU College, Bengaluru",
      period: "2018 - 2020"
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      url: "https://aws.amazon.com/certification"
    },
    {
      id: "cert2",
      name: "Google UX Design Certificate",
      issuer: "Google via Coursera",
      date: "2023",
      url: "https://coursera.org"
    }
  ],
  languages: [
    { id: "l1", name: "Kannada", proficiency: "Native" },
    { id: "l2", name: "English", proficiency: "Fluent" },
    { id: "l3", name: "Hindi", proficiency: "Fluent" },
  ],
  volunteers: [
    {
      id: "v1",
      role: "Technical Lead",
      organization: "GDG Bengaluru",
      period: "2023 - Present",
      description: "Organize monthly developer meetups and workshops on web technologies for 200+ attendees."
    }
  ]
};