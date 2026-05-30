'use client';

import React, { useState } from "react";
import { 
  PortfolioData, 
  Skill, 
  Experience, 
  Project, 
  Education 
} from "../types/portfolio";
import { 
  User, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Palette, 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText,
  Loader2,
  Check,
  AlertCircle
} from "lucide-react";

interface FormProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function Form({ data, onChange }: FormProps) {
  // Accordion state
  const [activeSection, setActiveSection] = useState<string>("theme");
  
  // Local state for adding elements
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");
  
  // AI assist state
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiTone, setAiTone] = useState<"professional" | "creative" | "minimalist">("professional");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ message: string; isDemo: boolean } | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const handleFieldChange = (field: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // 1. Skill Management
  const addSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      id: `skill_${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
    setNewSkillName("");
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  // 2. Experience Management
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      role: "New Role",
      company: "New Company",
      period: "2024 - Present",
      description: "Describe your accomplishments and responsibilities."
    };
    onChange({
      ...data,
      experiences: [...data.experiences, newExp]
    });
  };

  const updateExperience = (id: string, updated: Partial<Experience>) => {
    onChange({
      ...data,
      experiences: data.experiences.map(exp => 
        exp.id === id ? { ...exp, ...updated } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    });
  };

  // 3. Project Management
  const addProject = () => {
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: "New Project Showcase",
      description: "A gorgeous, high-performance web experience built for users.",
      techTags: ["React", "Tailwind"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/newproj/600/400",
      featured: false
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    onChange({
      ...data,
      projects: data.projects.map(p => 
        p.id === id ? { ...p, ...updated } : p
      )
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  const handleTechTagsChange = (id: string, tagsString: string) => {
    const tags = tagsString.split(",").map(tag => tag.trim()).filter(Boolean);
    updateProject(id, { techTags: tags });
  };

  // 4. Education Management
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu_${Date.now()}`,
      degree: "Computer Science Degree",
      school: "University Name",
      period: "2018 - 2022"
    };
    onChange({
      ...data,
      educations: [...data.educations, newEdu]
    });
  };

  const updateEducation = (id: string, updated: Partial<Education>) => {
    onChange({
      ...data,
      educations: data.educations.map(edu => 
        edu.id === id ? { ...edu, ...updated } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter(edu => edu.id !== id)
    });
  };

  // AI Generation Trigger
  const generateAiBio = async () => {
    setIsAiGenerating(true);
    setAiFeedback(null);
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          title: data.title,
          keywords: aiKeywords || "modern technologies and responsive user design",
          tone: aiTone
        })
      });

      const body = await response.json();
      if (body.text) {
        handleFieldChange("bio", body.text);
        if (body.isOfflineDemo) {
          setAiFeedback({
            message: "Generated via safe Demo Mode! Ensure GEMINI_API_KEY is configured in Secrets panel for high quality AI customization.",
            isDemo: true
          });
        } else {
          setAiFeedback({
            message: "Bio formulated beautifully by Gemini AI 🚀",
            isDemo: false
          });
        }
      } else {
        throw new Error(body.error || "Generation payload is empty");
      }
    } catch (err: any) {
      console.error(err);
      setAiFeedback({
        message: "Failed to connect to AI server. Applying a fallback template...",
        isDemo: true
      });
      // Fallback
      handleFieldChange("bio", `I'm ${data.name || "a designer/developer"}, a highly skilled ${data.title || "tech expert"} specialized in ${aiKeywords || "responsive software orchestration"} with dedication to beautiful functional aesthetics.`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] border-r border-zinc-850/60 overflow-y-auto select-none" id="builder-form-layout">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-900/60 flex items-center justify-between bg-zinc-950/20 group">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25">
              <div className="absolute inset-0.5 rounded-[10px] bg-[#0c0d12]/92 flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 4.5v9L12 21L4 16.5v-9L12 3z" />
                  <path d="M12 3v18" className="opacity-40" />
                  <path d="M12 12l8-4.5" className="opacity-40" />
                  <path d="M12 12L4 7.5" className="opacity-40" />
                  <circle cx="12" cy="12" r="2" className="fill-indigo-400 stroke-none" />
                </svg>
              </div>
            </div>
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">Nestly</span>
          </h1>
          <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed font-medium">Design & deploy absolute state portfolios seamlessly</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* SECTION 1: Theme & Layout Selection */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm" id="section-theme">
          <button 
            type="button"
            onClick={() => toggleSection("theme")}
            className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-xs tracking-wide uppercase">Theme & Layout Design</span>
            </div>
            {activeSection === "theme" ? <ChevronUp className="h-4 w-4 text-zinc-550" /> : <ChevronDown className="h-4 w-4 text-zinc-550" />}
          </button>

          {activeSection === "theme" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-5 bg-[#08080c]/60">
              {/* Themes Grid */}
              <div>
                <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase block mb-3">Portfolio Color Palette</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: "slate", label: "Slate", colors: "bg-slate-900 border-slate-700", ring: "ring-slate-500" },
                    { id: "neon", label: "Neon", colors: "bg-zinc-950 border-emerald-500", ring: "ring-emerald-500" },
                    { id: "editorial", label: "Ivory", colors: "bg-stone-900 border-amber-200/50", ring: "ring-amber-300" },
                    { id: "emerald", label: "Emerald", colors: "bg-zinc-950 border-emerald-800", ring: "ring-emerald-600" },
                    { id: "sunset", label: "Sunset", colors: "bg-zinc-950 border-rose-500/60", ring: "ring-rose-400" }
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleFieldChange("themeId", theme.id)}
                      className={`h-11 rounded-md border flex flex-col items-center justify-center p-1 transition-all relative ${theme.colors} ${
                        data.themeId === theme.id ? `ring-2 ${theme.ring} scale-102` : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <span className="text-[10px] font-medium text-zinc-300 capitalize">{theme.label}</span>
                      {data.themeId === theme.id && (
                        <Check className="h-3 w-3 text-white absolute top-1 right-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Mode */}
              <div>
                <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase block mb-3">Structural Layout Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "bento", label: "Bento Grid" },
                    { id: "minimal", label: "Minimal Stack" },
                    { id: "split", label: "Split Drawer" }
                  ].map((lay) => (
                    <button
                      key={lay.id}
                      type="button"
                      onClick={() => handleFieldChange("layoutId", lay.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border transition-all text-center ${
                        data.layoutId === lay.id 
                          ? "bg-indigo-600/15 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/30" 
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {lay.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Personal Info & AI Bio Writer */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm" id="section-personal">
          <button 
            type="button"
            onClick={() => toggleSection("personal")}
            className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-xs tracking-wide uppercase">Personal Information</span>
            </div>
            {activeSection === "personal" ? <ChevronUp className="h-4 w-4 text-zinc-550" /> : <ChevronDown className="h-4 w-4 text-zinc-550" />}
          </button>

          {activeSection === "personal" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              {/* Profile Image (Link) and Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Hero / Name</label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    placeholder="E.g., Alex Carter"
                    className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Designation / Role</label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="E.g., AI Research Developer"
                    className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 font-medium">Profile Image URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.profileImage || ""}
                    onChange={(e) => handleFieldChange("profileImage", e.target.value)}
                    placeholder="https://picsum.photos/seed/alex/400/400"
                    className="flex-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                  />
                  {data.profileImage && (
                    <img 
                      src={data.profileImage} 
                      alt="Avatar Preview" 
                      className="h-8 w-8 rounded-full object-cover border border-zinc-700 bg-zinc-900"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name || "Default"}`;
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Bio Field & AI Bio Architect Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-zinc-400 font-medium">Bio Summary Statement</label>
                </div>
                <textarea
                  value={data.bio}
                  rows={3}
                  onChange={(e) => handleFieldChange("bio", e.target.value)}
                  placeholder="I am passionate about..."
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed text-xs resize-none"
                />

                {/* Smart Bio Generator Component */}
                <div className="mt-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-2.5">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-semibold text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                    <span>Gemini AI Bio Architect</span>
                  </div>
                  
                  <input
                    type="text"
                    value={aiKeywords}
                    onChange={(e) => setAiKeywords(e.target.value)}
                    placeholder="Type keywords (e.g. Next.js backend, smart visuals, Rust)"
                    className="w-full px-2.5 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />

                  <div className="flex items-center justify-between gap-1.5 pt-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-400">Tone:</span>
                      <select
                        value={aiTone}
                        onChange={(e: any) => setAiTone(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 rounded text-[10px] text-zinc-300 py-1 px-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="professional">Professional</option>
                        <option value="creative">Creative</option>
                        <option value="minimalist">Minimalist</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={generateAiBio}
                      disabled={isAiGenerating}
                      className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded text-[10px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isAiGenerating ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Architecting...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" />
                          <span>Generate Bio</span>
                        </>
                      )}
                    </button>
                  </div>

                  {aiFeedback && (
                    <div className={`p-2 rounded text-[10px] leading-snug flex items-start gap-1.5 ${
                      aiFeedback.isDemo ? "bg-amber-950/20 border border-amber-900/55 text-amber-300/90" : "bg-emerald-950/20 border border-emerald-900/55 text-emerald-300/90"
                    }`}>
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <p>{aiFeedback.message}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Geographic Coordinates and Contact URLs */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">Location</label>
                    <div className="relative">
                      <Globe className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-600" />
                      <input
                        type="text"
                        value={data.location}
                        onChange={(e) => handleFieldChange("location", e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full pl-8 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">Contact Email</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      placeholder="hello@domain.com"
                      className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">Github URL</label>
                    <div className="relative">
                      <Github className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-600" />
                      <input
                        type="text"
                        value={data.github || ""}
                        onChange={(e) => handleFieldChange("github", e.target.value)}
                        placeholder="https://github.com/alex"
                        className="w-full pl-8 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">LinkedIn URL</label>
                    <div className="relative">
                      <Linkedin className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-600" />
                      <input
                        type="text"
                        value={data.linkedin || ""}
                        onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/alex"
                        className="w-full pl-8 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">Twitter URL</label>
                    <div className="relative">
                      <Twitter className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-600" />
                      <input
                        type="text"
                        value={data.twitter || ""}
                        onChange={(e) => handleFieldChange("twitter", e.target.value)}
                        placeholder="https://twitter.com/alex"
                        className="w-full pl-8 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">Resume Link</label>
                    <div className="relative">
                      <FileText className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-600" />
                      <input
                        type="text"
                        value={data.resumeUrl || ""}
                        onChange={(e) => handleFieldChange("resumeUrl", e.target.value)}
                        placeholder="#"
                        className="w-full pl-8 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* SECTION 3: Skills Architecture */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm" id="section-skills">
          <button 
            type="button"
            onClick={() => toggleSection("skills")}
            className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-xs tracking-wide uppercase">Skills Inventory</span>
            </div>
            {activeSection === "skills" ? <ChevronUp className="h-4 w-4 text-zinc-550" /> : <ChevronDown className="h-4 w-4 text-zinc-550" />}
          </button>

          {activeSection === "skills" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              {/* Creator UI */}
              <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2.5">
                <span className="text-[11px] font-semibold text-zinc-300 block">Add New Technology</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="E.g., GraphQL, Rust, Docker"
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    className="flex-1 px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs py-1.5 px-2 rounded focus:outline-none"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                    <option value="Tools">Other</option>
                  </select>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="h-8 w-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Skills Listing by Category */}
              {["Frontend", "Backend", "Design", "Tools"].map((cat) => {
                const catSkills = data.skills.filter(s => s.category === cat);
                return (
                  <div key={cat} className="space-y-1.5">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase text-xs">{cat} Stack</span>
                    {catSkills.length === 0 ? (
                      <div className="text-[11px] text-zinc-600 py-1 italic">No technologies currently listed</div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {catSkills.map((s) => (
                          <span 
                            key={s.id} 
                            className="inline-flex items-center gap-1 py-1 px-2 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300"
                          >
                            <span>{s.name}</span>
                            <button 
                              type="button"
                              onClick={() => removeSkill(s.id)}
                              className="text-zinc-500 hover:text-rose-400 p-0.5"
                            >
                              <Plus className="h-3 w-3 rotate-45" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 4: Professional Experience */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm" id="section-experience">
          <button 
            type="button"
            onClick={() => toggleSection("experience")}
            className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-xs tracking-wide uppercase">Professional Experience</span>
            </div>
            {activeSection === "experience" ? <ChevronUp className="h-4 w-4" text-zinc-550="true" /> : <ChevronDown className="h-4 w-4" text-zinc-550="true" />}
          </button>

          {activeSection === "experience" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-zinc-400">Position Timelines</span>
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 border border-zinc-800 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Add Role</span>
                </button>
              </div>

              {data.experiences.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">
                  No professional experiences added yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.experiences.map((exp, index) => (
                    <div key={exp.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer bg-zinc-950/40 rounded hover:bg-zinc-950 transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <div className="text-[10px] font-semibold text-zinc-500 uppercase">Role #{index + 1}</div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                            placeholder="E.g., Senior Designer"
                            className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            placeholder="E.g., Tech Corp"
                            className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                          placeholder="E.g., Jan 2022 - Dec 2023"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                      </div>

                      <div>
                        <textarea
                          value={exp.description}
                          rows={2}
                          onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                          placeholder="Summarize key outputs, achievements and tech used..."
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-750 resize-none leading-normal"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 5: Projects Showcase */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm" id="section-projects">
          <button 
            type="button"
            onClick={() => toggleSection("projects")}
            className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FolderGit2 className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-xs tracking-wide uppercase">Projects Showcase</span>
            </div>
            {activeSection === "projects" ? <ChevronUp className="h-4 w-4 text-zinc-550" /> : <ChevronDown className="h-4 w-4 text-zinc-550" />}
          </button>

          {activeSection === "projects" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-zinc-400">Featured Portfolio Items</span>
                <button
                  type="button"
                  onClick={addProject}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 border border-zinc-800 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Add Project</span>
                </button>
              </div>

              {data.projects.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">
                  No design or code projects added yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.projects.map((proj, index) => (
                    <div key={proj.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2.5 relative">
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer bg-zinc-950/40 rounded hover:bg-zinc-950 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Project #{index + 1}</span>
                        <label className="flex items-center gap-1 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 select-none cursor-pointer hover:bg-zinc-950">
                          <input
                            type="checkbox"
                            checked={!!proj.featured}
                            onChange={(e) => updateProject(proj.id, { featured: e.target.checked })}
                            className="rounded border-zinc-850 bg-zinc-950 text-indigo-550 focus:ring-0 cursor-pointer h-3 w-3"
                          />
                          <span>Highlight Featured</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                          placeholder="Project Title"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                        <input
                          type="text"
                          value={proj.link || ""}
                          onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                          placeholder="Deploy / Github URL"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                      </div>

                      <div className="grid grid-cols-1">
                        <input
                          type="text"
                          value={proj.image || ""}
                          onChange={(e) => updateProject(proj.id, { image: e.target.value })}
                          placeholder="Cover Image URL (e.g. picsum / unspash link)"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={proj.techTags.join(", ")}
                          onChange={(e) => handleTechTagsChange(proj.id, e.target.value)}
                          placeholder="Tech stack tags (separated by commas)"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                        <span className="text-[9px] text-zinc-500 block mt-1 pl-1">Combine multiple words with commas (e.g., Python, Django, AWS)</span>
                      </div>

                      <div>
                        <textarea
                          value={proj.description}
                          rows={2}
                          onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                          placeholder="Explain scope, role, and interesting algorithms engineered..."
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-750 resize-none leading-normal"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 6: Scholar Education */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm" id="section-education">
          <button 
            type="button"
            onClick={() => toggleSection("education")}
            className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              <span className="font-semibold text-xs tracking-wide uppercase">Academic Studies</span>
            </div>
            {activeSection === "education" ? <ChevronUp className="h-4 w-4 text-zinc-550" /> : <ChevronDown className="h-4 w-4 text-zinc-550" />}
          </button>

          {activeSection === "education" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-zinc-400">Education Chronology</span>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 border border-zinc-800 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Add School</span>
                </button>
              </div>

              {data.educations.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">
                  No educational systems added yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.educations.map((edu, index) => (
                    <div key={edu.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer bg-zinc-950/40 rounded hover:bg-zinc-950 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <div className="text-[10px] font-semibold text-zinc-500 uppercase">Degree #{index + 1}</div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          placeholder="E.g., Bachelor of Computer Tech"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                          placeholder="E.g., Stanford University"
                          className="w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                        />
                      </div>

                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => updateEducation(edu.id, { period: e.target.value })}
                        placeholder="E.g., 2018 - 2022"
                        className="w-full px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
