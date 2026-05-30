'use client';

import React, { useState } from "react";
import { 
  PortfolioData, Skill, Experience, Project, Education, Certification, Language, Volunteer
} from "../types/portfolio";
import { 
  User, Briefcase, FolderGit2, GraduationCap, Palette, Sparkles, Plus, Trash2, 
  ChevronDown, ChevronUp, Globe, Github, Linkedin, Twitter, FileText,
  Loader2, Check, AlertCircle, Award, Languages, Heart
} from "lucide-react";

interface FormProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function Form({ data, onChange }: FormProps) {
  const [activeSection, setActiveSection] = useState<string>("theme");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiTone, setAiTone] = useState<"professional" | "creative" | "minimalist">("professional");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ message: string; isDemo: boolean } | null>(null);

  const toggleSection = (section: string) => setActiveSection(activeSection === section ? "" : section);
  const handleFieldChange = (field: keyof PortfolioData, value: any) => onChange({ ...data, [field]: value });

  const inputClass = "w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs";
  const smallInputClass = "w-full px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  // Skills
  const addSkill = () => {
    if (!newSkillName.trim()) return;
    onChange({ ...data, skills: [...data.skills, { id: `skill_${Date.now()}`, name: newSkillName.trim(), category: newSkillCategory }] });
    setNewSkillName("");
  };
  const removeSkill = (id: string) => onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });

  // Experience
  const addExperience = () => onChange({ ...data, experiences: [...data.experiences, { id: `exp_${Date.now()}`, role: "New Role", company: "Company Name", period: "2024 - Present", description: "Describe your responsibilities and achievements." }] });
  const updateExperience = (id: string, updated: Partial<Experience>) => onChange({ ...data, experiences: data.experiences.map(e => e.id === id ? { ...e, ...updated } : e) });
  const removeExperience = (id: string) => onChange({ ...data, experiences: data.experiences.filter(e => e.id !== id) });

  // Projects
  const addProject = () => onChange({ ...data, projects: [...data.projects, { id: `proj_${Date.now()}`, title: "New Project", description: "Describe your project.", techTags: ["React", "Tailwind"], link: "", image: "https://picsum.photos/seed/newproj/600/400", featured: false }] });
  const updateProject = (id: string, updated: Partial<Project>) => onChange({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...updated } : p) });
  const removeProject = (id: string) => onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  const handleTechTagsChange = (id: string, tagsString: string) => updateProject(id, { techTags: tagsString.split(",").map(t => t.trim()).filter(Boolean) });

  // Education
  const addEducation = () => onChange({ ...data, educations: [...data.educations, { id: `edu_${Date.now()}`, degree: "Your Degree", school: "University Name", period: "2018 - 2022" }] });
  const updateEducation = (id: string, updated: Partial<Education>) => onChange({ ...data, educations: data.educations.map(e => e.id === id ? { ...e, ...updated } : e) });
  const removeEducation = (id: string) => onChange({ ...data, educations: data.educations.filter(e => e.id !== id) });

  // Certifications
  const addCertification = () => onChange({ ...data, certifications: [...(data.certifications || []), { id: `cert_${Date.now()}`, name: "Certification Name", issuer: "Issuing Organization", date: "2024", url: "" }] });
  const updateCertification = (id: string, updated: Partial<Certification>) => onChange({ ...data, certifications: data.certifications.map(c => c.id === id ? { ...c, ...updated } : c) });
  const removeCertification = (id: string) => onChange({ ...data, certifications: data.certifications.filter(c => c.id !== id) });

  // Languages
  const addLanguage = () => onChange({ ...data, languages: [...(data.languages || []), { id: `lang_${Date.now()}`, name: "Language", proficiency: "Fluent" }] });
  const updateLanguage = (id: string, updated: Partial<Language>) => onChange({ ...data, languages: data.languages.map(l => l.id === id ? { ...l, ...updated } : l) });
  const removeLanguage = (id: string) => onChange({ ...data, languages: data.languages.filter(l => l.id !== id) });

  // Volunteer
  const addVolunteer = () => onChange({ ...data, volunteers: [...(data.volunteers || []), { id: `vol_${Date.now()}`, role: "Volunteer Role", organization: "Organization Name", period: "2023 - Present", description: "Describe your contributions." }] });
  const updateVolunteer = (id: string, updated: Partial<Volunteer>) => onChange({ ...data, volunteers: data.volunteers.map(v => v.id === id ? { ...v, ...updated } : v) });
  const removeVolunteer = (id: string) => onChange({ ...data, volunteers: data.volunteers.filter(v => v.id !== id) });

  // AI Bio
  const generateAiBio = async () => {
    setIsAiGenerating(true);
    setAiFeedback(null);
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, title: data.title, keywords: aiKeywords || "modern technologies", tone: aiTone })
      });
      const body = await response.json();
      if (body.text) {
        handleFieldChange("bio", body.text);
        setAiFeedback({ message: body.isOfflineDemo ? "Demo mode active. Add GEMINI_API_KEY for full AI." : "Bio generated by Gemini AI 🚀", isDemo: !!body.isOfflineDemo });
      } else throw new Error(body.error || "Empty response");
    } catch (err: any) {
      setAiFeedback({ message: "AI failed. Using fallback template.", isDemo: true });
      handleFieldChange("bio", `I'm ${data.name || "a developer"}, a ${data.title || "tech expert"} specializing in ${aiKeywords || "modern software development"}.`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const SectionHeader = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button type="button" onClick={() => toggleSection(id)}
      className="w-full px-4 py-3.5 flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-indigo-400" />
        <span className="font-semibold text-xs tracking-wide uppercase">{label}</span>
      </div>
      {activeSection === id ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
    </button>
  );

  const SectionWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all duration-300 overflow-hidden shadow-sm">
      {children}
      {activeSection === id && <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">{/* content injected below */}</div>}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] border-r border-zinc-850/60 overflow-y-auto select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-900/60 flex items-center justify-between bg-zinc-950/20">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25">
              <div className="absolute inset-0.5 rounded-[10px] bg-[#0c0d12]/92 flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 4.5v9L12 21L4 16.5v-9L12 3z" />
                  <circle cx="12" cy="12" r="2" className="fill-indigo-400 stroke-none" />
                </svg>
              </div>
            </div>
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">Nestly</span>
          </h1>
          <p className="text-[11px] text-zinc-400 mt-2 font-medium">Design & deploy absolute state portfolios seamlessly</p>
        </div>
      </div>

      <div className="p-4 space-y-3">

        {/* THEME */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="theme" icon={Palette} label="Theme & Layout Design" />
          {activeSection === "theme" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-5 bg-[#08080c]/60 text-xs">
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
                    <button key={theme.id} type="button" onClick={() => handleFieldChange("themeId", theme.id)}
                      className={`h-11 rounded-md border flex flex-col items-center justify-center p-1 transition-all relative ${theme.colors} ${data.themeId === theme.id ? `ring-2 ${theme.ring}` : "opacity-80 hover:opacity-100"}`}>
                      <span className="text-[10px] font-medium text-zinc-300">{theme.label}</span>
                      {data.themeId === theme.id && <Check className="h-3 w-3 text-white absolute top-1 right-1" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase block mb-3">Structural Layout Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[{ id: "bento", label: "Bento Grid" }, { id: "minimal", label: "Minimal Stack" }, { id: "split", label: "Split Drawer" }].map((lay) => (
                    <button key={lay.id} type="button" onClick={() => handleFieldChange("layoutId", lay.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border transition-all text-center ${data.layoutId === lay.id ? "bg-indigo-600/15 border-indigo-500 text-indigo-200" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>
                      {lay.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PERSONAL INFO */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="personal" icon={User} label="Personal Information" />
          {activeSection === "personal" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Full Name</label>
                  <input type="text" value={data.name} onChange={(e) => handleFieldChange("name", e.target.value)} placeholder="Alex Carter" className={inputClass} />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-medium">Job Title</label>
                  <input type="text" value={data.title} onChange={(e) => handleFieldChange("title", e.target.value)} placeholder="Frontend Developer" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1.5 font-medium">Profile Image URL</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={data.profileImage || ""} onChange={(e) => handleFieldChange("profileImage", e.target.value)} placeholder="https://..." className={inputClass} />
                  {data.profileImage && <img src={data.profileImage} alt="Preview" className="h-8 w-8 rounded-full object-cover border border-zinc-700" onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name}`; }} />}
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1.5 font-medium">Bio</label>
                <textarea value={data.bio} rows={3} onChange={(e) => handleFieldChange("bio", e.target.value)} placeholder="I am passionate about..." className={`${inputClass} resize-none`} />
                <div className="mt-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-2.5">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-semibold text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                    <span>Gemini AI Bio Generator</span>
                  </div>
                  <input type="text" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} placeholder="Keywords (e.g. React, Node.js, design)" className={`${inputClass} text-[11px]`} />
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-400">Tone:</span>
                      <select value={aiTone} onChange={(e: any) => setAiTone(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded text-[10px] text-zinc-300 py-1 px-1 focus:outline-none">
                        <option value="professional">Professional</option>
                        <option value="creative">Creative</option>
                        <option value="minimalist">Minimalist</option>
                      </select>
                    </div>
                    <button type="button" onClick={generateAiBio} disabled={isAiGenerating} className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded text-[10px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer">
                      {isAiGenerating ? <><Loader2 className="h-3 w-3 animate-spin" /><span>Generating...</span></> : <><Sparkles className="h-3 w-3" /><span>Generate Bio</span></>}
                    </button>
                  </div>
                  {aiFeedback && (
                    <div className={`p-2 rounded text-[10px] flex items-start gap-1.5 ${aiFeedback.isDemo ? "bg-amber-950/20 border border-amber-900/55 text-amber-300/90" : "bg-emerald-950/20 border border-emerald-900/55 text-emerald-300/90"}`}>
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /><p>{aiFeedback.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-zinc-400 mb-1 font-medium">Location</label><input type="text" value={data.location} onChange={(e) => handleFieldChange("location", e.target.value)} placeholder="Bengaluru, IN" className={inputClass} /></div>
                <div><label className="block text-zinc-400 mb-1 font-medium">Email</label><input type="email" value={data.email} onChange={(e) => handleFieldChange("email", e.target.value)} placeholder="hello@domain.com" className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-zinc-400 mb-1 font-medium">Phone</label><input type="text" value={data.phone || ""} onChange={(e) => handleFieldChange("phone", e.target.value)} placeholder="+91 9876543210" className={inputClass} /></div>
                <div><label className="block text-zinc-400 mb-1 font-medium">GitHub URL</label><input type="text" value={data.github || ""} onChange={(e) => handleFieldChange("github", e.target.value)} placeholder="https://github.com/..." className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-zinc-400 mb-1 font-medium">LinkedIn URL</label><input type="text" value={data.linkedin || ""} onChange={(e) => handleFieldChange("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." className={inputClass} /></div>
                <div><label className="block text-zinc-400 mb-1 font-medium">Twitter URL</label><input type="text" value={data.twitter || ""} onChange={(e) => handleFieldChange("twitter", e.target.value)} placeholder="https://twitter.com/..." className={inputClass} /></div>
              </div>
              <div><label className="block text-zinc-400 mb-1 font-medium">Resume Link</label><input type="text" value={data.resumeUrl || ""} onChange={(e) => handleFieldChange("resumeUrl", e.target.value)} placeholder="https://..." className={inputClass} /></div>
            </div>
          )}
        </div>

        {/* SKILLS */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="skills" icon={Sparkles} label="Skills Inventory" />
          {activeSection === "skills" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2.5">
                <span className="text-[11px] font-semibold text-zinc-300 block">Add New Skill</span>
                <div className="flex items-center gap-1.5">
                  <input type="text" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} placeholder="E.g., React, Docker, Figma" onKeyDown={(e) => e.key === "Enter" && addSkill()} className={smallInputClass + " flex-1"} />
                  <select value={newSkillCategory} onChange={(e) => setNewSkillCategory(e.target.value)} className="bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs py-1.5 px-2 rounded focus:outline-none">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                    <option value="Tools">Tools</option>
                  </select>
                  <button type="button" onClick={addSkill} className="h-8 w-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center justify-center cursor-pointer">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {["Frontend", "Backend", "Design", "Tools"].map((cat) => {
                const catSkills = data.skills.filter(s => s.category === cat);
                return (
                  <div key={cat} className="space-y-1.5">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">{cat}</span>
                    {catSkills.length === 0 ? <div className="text-[11px] text-zinc-600 italic">None added</div> : (
                      <div className="flex flex-wrap gap-1.5">
                        {catSkills.map(s => (
                          <span key={s.id} className="inline-flex items-center gap-1 py-1 px-2 rounded-full text-xs bg-zinc-900 border border-zinc-800 text-zinc-300">
                            {s.name}
                            <button type="button" onClick={() => removeSkill(s.id)} className="text-zinc-500 hover:text-rose-400 p-0.5"><Plus className="h-3 w-3 rotate-45" /></button>
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

        {/* EXPERIENCE */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="experience" icon={Briefcase} label="Professional Experience" />
          {activeSection === "experience" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Work History</span>
                <button type="button" onClick={addExperience} className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /><span>Add Role</span>
                </button>
              </div>
              {data.experiences.length === 0 ? <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">No experience added yet.</div> : (
                <div className="space-y-3">
                  {data.experiences.map((exp, i) => (
                    <div key={exp.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2 relative">
                      <button type="button" onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      <div className="text-[10px] font-semibold text-zinc-500 uppercase">Role #{i + 1}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} placeholder="Job Title" className={smallInputClass} />
                        <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Company Name" className={smallInputClass} />
                      </div>
                      <input type="text" value={exp.period} onChange={(e) => updateExperience(exp.id, { period: e.target.value })} placeholder="Jan 2022 - Dec 2023" className={smallInputClass} />
                      <textarea value={exp.description} rows={2} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} placeholder="Key responsibilities and achievements..." className={`${smallInputClass} resize-none`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* PROJECTS */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="projects" icon={FolderGit2} label="Projects Showcase" />
          {activeSection === "projects" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Portfolio Projects</span>
                <button type="button" onClick={addProject} className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /><span>Add Project</span>
                </button>
              </div>
              {data.projects.length === 0 ? <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">No projects added yet.</div> : (
                <div className="space-y-4">
                  {data.projects.map((proj, i) => (
                    <div key={proj.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2.5 relative">
                      <button type="button" onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Project #{i + 1}</span>
                        <label className="flex items-center gap-1 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 cursor-pointer">
                          <input type="checkbox" checked={!!proj.featured} onChange={(e) => updateProject(proj.id, { featured: e.target.checked })} className="h-3 w-3" />
                          <span>Featured</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={proj.title} onChange={(e) => updateProject(proj.id, { title: e.target.value })} placeholder="Project Title" className={smallInputClass} />
                        <input type="text" value={proj.link || ""} onChange={(e) => updateProject(proj.id, { link: e.target.value })} placeholder="Live / GitHub URL" className={smallInputClass} />
                      </div>
                      <input type="text" value={proj.image || ""} onChange={(e) => updateProject(proj.id, { image: e.target.value })} placeholder="Cover Image URL" className={smallInputClass} />
                      <input type="text" value={proj.techTags.join(", ")} onChange={(e) => handleTechTagsChange(proj.id, e.target.value)} placeholder="React, Tailwind, Node.js" className={smallInputClass} />
                      <textarea value={proj.description} rows={2} onChange={(e) => updateProject(proj.id, { description: e.target.value })} placeholder="What does this project do?" className={`${smallInputClass} resize-none`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* EDUCATION */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="education" icon={GraduationCap} label="Academic Studies" />
          {activeSection === "education" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Education History</span>
                <button type="button" onClick={addEducation} className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /><span>Add Education</span>
                </button>
              </div>
              {data.educations.length === 0 ? <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">No education added yet.</div> : (
                <div className="space-y-3">
                  {data.educations.map((edu, i) => (
                    <div key={edu.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2 relative">
                      <button type="button" onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      <div className="text-[10px] font-semibold text-zinc-500 uppercase">Degree #{i + 1}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="B.Tech Computer Science" className={smallInputClass} />
                        <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, { school: e.target.value })} placeholder="University Name" className={smallInputClass} />
                      </div>
                      <input type="text" value={edu.period} onChange={(e) => updateEducation(edu.id, { period: e.target.value })} placeholder="2020 - 2024" className={smallInputClass} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CERTIFICATIONS */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="certifications" icon={Award} label="Certifications" />
          {activeSection === "certifications" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Certificates & Credentials</span>
                <button type="button" onClick={addCertification} className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /><span>Add Certificate</span>
                </button>
              </div>
              {(data.certifications || []).length === 0 ? <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">No certifications added yet.</div> : (
                <div className="space-y-3">
                  {(data.certifications || []).map((cert, i) => (
                    <div key={cert.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2 relative">
                      <button type="button" onClick={() => removeCertification(cert.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      <div className="text-[10px] font-semibold text-zinc-500 uppercase">Certificate #{i + 1}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, { name: e.target.value })} placeholder="Certification Name" className={smallInputClass} />
                        <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })} placeholder="Issued by (e.g. Google)" className={smallInputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cert.date} onChange={(e) => updateCertification(cert.id, { date: e.target.value })} placeholder="Year (e.g. 2024)" className={smallInputClass} />
                        <input type="text" value={cert.url || ""} onChange={(e) => updateCertification(cert.id, { url: e.target.value })} placeholder="Certificate URL" className={smallInputClass} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* LANGUAGES */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="languages" icon={Languages} label="Languages" />
          {activeSection === "languages" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Languages Spoken</span>
                <button type="button" onClick={addLanguage} className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /><span>Add Language</span>
                </button>
              </div>
              {(data.languages || []).length === 0 ? <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">No languages added yet.</div> : (
                <div className="space-y-2">
                  {(data.languages || []).map((lang, i) => (
                    <div key={lang.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 relative">
                      <button type="button" onClick={() => removeLanguage(lang.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} placeholder="Language (e.g. English)" className={smallInputClass} />
                        <select value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value })} className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs py-1.5 px-2 rounded focus:outline-none w-full">
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Basic">Basic</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* VOLUNTEER */}
        <div className="border border-zinc-850/60 rounded-xl bg-[#0d0d12]/50 hover:border-zinc-800 transition-all overflow-hidden shadow-sm">
          <SectionHeader id="volunteer" icon={Heart} label="Volunteer Work" />
          {activeSection === "volunteer" && (
            <div className="p-4 border-t border-zinc-850/60 space-y-4 bg-[#08080c]/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Volunteer Experience</span>
                <button type="button" onClick={addVolunteer} className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded text-[11px] flex items-center gap-1 cursor-pointer">
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /><span>Add Role</span>
                </button>
              </div>
              {(data.volunteers || []).length === 0 ? <div className="text-center py-6 border border-dashed border-zinc-850 rounded-lg text-zinc-500 italic text-[11px]">No volunteer work added yet.</div> : (
                <div className="space-y-3">
                  {(data.volunteers || []).map((vol, i) => (
                    <div key={vol.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-850 space-y-2 relative">
                      <button type="button" onClick={() => removeVolunteer(vol.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1.5 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      <div className="text-[10px] font-semibold text-zinc-500 uppercase">Role #{i + 1}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={vol.role} onChange={(e) => updateVolunteer(vol.id, { role: e.target.value })} placeholder="Your Role" className={smallInputClass} />
                        <input type="text" value={vol.organization} onChange={(e) => updateVolunteer(vol.id, { organization: e.target.value })} placeholder="Organization Name" className={smallInputClass} />
                      </div>
                      <input type="text" value={vol.period} onChange={(e) => updateVolunteer(vol.id, { period: e.target.value })} placeholder="2023 - Present" className={smallInputClass} />
                      <textarea value={vol.description} rows={2} onChange={(e) => updateVolunteer(vol.id, { description: e.target.value })} placeholder="What did you contribute?" className={`${smallInputClass} resize-none`} />
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