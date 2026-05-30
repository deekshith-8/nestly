import { PortfolioData } from "../types/portfolio";

export const defaultPortfolioData: PortfolioData = {
  name: "Alex Carter",
  title: "Senior Full Stack Engineer",
  bio: "I build responsive, high-performance web experiences with elegant micro-interactions, combining deep backend engineering with visually stunning frontend craft.",
  location: "San Francisco, CA",
  email: "alex.carter@dev.io",
  phone: "+1 (555) 019-2834",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "#",
  profileImage: "https://picsum.photos/seed/alex/400/400",
  
  skills: [
    { id: "s1", name: "React / Next.js", category: "Frontend" },
    { id: "s2", name: "TypeScript", category: "Frontend" },
    { id: "s3", name: "Tailwind CSS", category: "Frontend" },
    { id: "s4", name: "Framer Motion", category: "Frontend" },
    { id: "s5", name: "Node.js (Express)", category: "Backend" },
    { id: "s6", name: "PostgreSQL", category: "Backend" },
    { id: "s7", name: "Google Cloud", category: "Backend" },
    { id: "s8", name: "GraphQL / REST APIs", category: "Backend" },
  ],
  
  experiences: [
    {
      id: "exp1",
      role: "Lead Frontend Architect",
      company: "Aether Software",
      period: "2023 - Present",
      description: "Directed structural rewrite of their consumer web app in Next.js, increasing Core Web Vitals performance scores by 34% and heading the design system deployment."
    },
    {
      id: "exp2",
      role: "Senior Software Engineer",
      company: "Voxel Labs",
      period: "2020 - 2023",
      description: "Designed scalable search indexing services with Express and Elasticsearch. Managed the visual integration of dynamic content pipelines and vector map renderers."
    }
  ],
  
  projects: [
    {
      id: "p1",
      title: "Atmosphere Engine",
      description: "An elegant interactive weather simulation with real-time mapping, visual particle animations, and weather prediction models.",
      techTags: ["Next.js", "Three.js", "Tailwind CSS"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/atmosphere/600/400",
      featured: true
    },
    {
      id: "p2",
      title: "Chronos Scheduler",
      description: "A secure team-coordination workspace offering smart timezone calculations, real-time notification sockets, and calendar synching.",
      techTags: ["TypeScript", "Node.js", "PostgreSQL"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/chronos/600/400",
      featured: true
    },
    {
      id: "p3",
      title: "Iris Design Tokenizer",
      description: "A CLI tool that parses Figma vector shapes and automates production-ready Tailwind utility token compilation.",
      techTags: ["Rust", "Tailwind", "Node.js"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/iris/600/400",
      featured: false
    }
  ],
  
  educations: [
    {
      id: "edu1",
      degree: "B.S. in Computer Science",
      school: "Stanford University",
      period: "2016 - 2020"
    }
  ],
  
  themeId: "slate",
  layoutId: "bento"
};
