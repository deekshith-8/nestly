'use client';

import React, { useState } from "react";
import {
  PortfolioData, Experience, Project, Education, Certification, Language, Volunteer
} from "../types/portfolio";
import {
  User, Briefcase, FolderGit2, GraduationCap, Palette, Sparkles, Plus, Trash2,
  ChevronDown, ChevronUp, Loader2, Award, Languages, Heart
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

  const toggle = (s: string) => setActiveSection(activeSection === s ? "" : s);
  const set = (field: keyof PortfolioData, value: any) => onChange({ ...data, [field]: value });

  const inp = "w-full px-3 py-2 bg-black border border-[#1a1a1a] text-white placeholder-[#333] focus:outline-none focus:border-[#c6f135] text-xs transition-colors";
  const sinp = "w-full px-2 py-1.5 bg-black border border-[#1a1a1a] text-xs text-white placeholder-[#333] focus:outline-none focus:border-[#c6f135] transition-colors";

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    onChange({ ...data, skills: [...data.skills, { id: `s_${Date.now()}`, name: newSkillName.trim(), category: newSkillCategory }] });
    setNewSkillName("");
  };
  const removeSkill = (id: string) => onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });

  const addExp = () => onChange({ ...data, experiences: [...data.experiences, { id: `e_${Date.now()}`, role: "New Role", company: "Company", period: "2024 - Present", description: "Describe your work." }] });
  const updateExp = (id: string, u: Partial<Experience>) => onChange({ ...data, experiences: data.experiences.map(e => e.id === id ? { ...e, ...u } : e) });
  const removeExp = (id: string) => onChange({ ...data, experiences: data.experiences.filter(e => e.id !== id) });

  const addProj = () => onChange({ ...data, projects: [...data.projects, { id: `p_${Date.now()}`, title: "New Project", description: "Describe your project.", techTags: ["React"], link: "", image: "https://picsum.photos/seed/proj/600/400", featured: false }] });
  const updateProj = (id: string, u: Partial<Project>) => onChange({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...u } : p) });
  const removeProj = (id: string) => onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });

  const addEdu = () => onChange({ ...data, educations: [...data.educations, { id: `edu_${Date.now()}`, degree: "Your Degree", school: "University Name", period: "2020 - 2024" }] });
  const updateEdu = (id: string, u: Partial<Education>) => onChange({ ...data, educations: data.educations.map(e => e.id === id ? { ...e, ...u } : e) });
  const removeEdu = (id: string) => onChange({ ...data, educations: data.educations.filter(e => e.id !== id) });

  const addCert = () => onChange({ ...data, certifications: [...(data.certifications || []), { id: `c_${Date.now()}`, name: "Certification", issuer: "Issuer", date: "2024", url: "" }] });
  const updateCert = (id: string, u: Partial<Certification>) => onChange({ ...data, certifications: data.certifications.map(c => c.id === id ? { ...c, ...u } : c) });
  const removeCert = (id: string) => onChange({ ...data, certifications: data.certifications.filter(c => c.id !== id) });

  const addLang = () => onChange({ ...data, languages: [...(data.languages || []), { id: `l_${Date.now()}`, name: "Language", proficiency: "Fluent" }] });
  const updateLang = (id: string, u: Partial<Language>) => onChange({ ...data, languages: data.languages.map(l => l.id === id ? { ...l, ...u } : l) });
  const removeLang = (id: string) => onChange({ ...data, languages: data.languages.filter(l => l.id !== id) });

  const addVol = () => onChange({ ...data, volunteers: [...(data.volunteers || []), { id: `v_${Date.now()}`, role: "Volunteer Role", organization: "Org Name", period: "2023 - Present", description: "Describe your contributions." }] });
  const updateVol = (id: string, u: Partial<Volunteer>) => onChange({ ...data, volunteers: data.volunteers.map(v => v.id === id ? { ...v, ...u } : v) });
  const removeVol = (id: string) => onChange({ ...data, volunteers: data.volunteers.filter(v => v.id !== id) });

  const generateAiBio = async () => {
    setIsAiGenerating(true);
    setAiFeedback(null);
    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, title: data.title, keywords: aiKeywords || "modern technologies", tone: aiTone })
      });
      const body = await res.json();
      if (body.text) {
        set("bio", body.text);
        setAiFeedback({ message: body.isOfflineDemo ? "Demo mode. Add GEMINI_API_KEY for full AI." : "Bio generated! 🚀", isDemo: !!body.isOfflineDemo });
      } else throw new Error("Empty");
    } catch {
      setAiFeedback({ message: "AI failed. Using fallback.", isDemo: true });
      set("bio", `I'm ${data.name || "a developer"}, a ${data.title || "tech expert"} specializing in ${aiKeywords || "modern software development"}.`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const Hdr = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button type="button" onClick={() => toggle(id)}
      className="w-full px-5 py-3.5 flex items-center justify-between transition-colors cursor-pointer"
      style={{ borderBottom: activeSection === id ? '1px solid #1a1a1a' : '1px solid transparent' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#0a0a0a')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
      <div className="flex items-center gap-3">
        <Icon className="h-3.5 w-3.5" style={{ color: '#c6f135' }} />
        <span style={{ color: '#555', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
      </div>
      {activeSection === id
        ? <ChevronUp className="h-3.5 w-3.5" style={{ color: '#333' }} />
        : <ChevronDown className="h-3.5 w-3.5" style={{ color: '#333' }} />}
    </button>
  );

  const AddBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <button type="button" onClick={onClick}
      className="flex items-center gap-1 px-2.5 py-1 transition-all cursor-pointer"
      style={{ border: '1px solid #1a1a1a', color: '#555', fontSize: '10px', letterSpacing: '0.05em' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#c6f135'; (e.currentTarget as HTMLElement).style.color = '#c6f135'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1a1a1a'; (e.currentTarget as HTMLElement).style.color = '#555'; }}>
      <Plus className="h-3 w-3" /><span>{label}</span>
    </button>
  );

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="p-3 space-y-2 relative" style={{ border: '1px solid #1a1a1a', background: '#050505' }}>
      {children}
    </div>
  );

  const Empty = ({ text }: { text: string }) => (
    <p style={{ color: '#222', fontSize: '11px', fontStyle: 'italic', fontFamily: 'monospace' }}>{text}</p>
  );

  const Label = ({ text }: { text: string }) => (
    <p style={{ color: '#333', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '6px' }}>{text}</p>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto select-none" style={{ background: '#000', color: '#fff' }}>

      {/* Header */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid #111' }}>
        <div className="flex items-center gap-2.5">
          <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>N.</span>
          <div style={{ width: '1px', height: '14px', background: '#1a1a1a' }} />
          <span style={{ color: '#333', fontSize: '9px', letterSpacing: '0.15em', fontFamily: 'monospace', textTransform: 'uppercase' }}>Portfolio Builder</span>
        </div>
      </div>

      {/* THEME */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="theme" icon={Palette} label="Theme & Layout" />
        {activeSection === "theme" && (
          <div className="px-5 pb-5 space-y-5">
            <div>
              <Label text="Color Palette" />
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: "slate", label: "Slate", bg: "#0f172a", accent: "#6366f1" },
                  { id: "neon", label: "Neon", bg: "#09090b", accent: "#10b981" },
                  { id: "editorial", label: "Ivory", bg: "#1c1917", accent: "#d4a574" },
                  { id: "emerald", label: "Emerald", bg: "#022c22", accent: "#059669" },
                  { id: "sunset", label: "Sunset", bg: "#09090b", accent: "#f43f5e" },
                ].map(t => (
                  <button key={t.id} type="button" onClick={() => set("themeId", t.id)}
                    className="h-10 flex items-center justify-center relative transition-all cursor-pointer"
                    style={{
                      background: t.bg,
                      border: `1px solid ${data.themeId === t.id ? '#c6f135' : '#1a1a1a'}`,
                      outline: data.themeId === t.id ? '1px solid rgba(198,241,53,0.3)' : 'none',
                      outlineOffset: '2px'
                    }}>
                    <span style={{ color: data.themeId === t.id ? '#c6f135' : '#555', fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label text="Layout" />
              <div className="grid grid-cols-3 gap-1.5">
                {[{ id: "bento", label: "Bento" }, { id: "minimal", label: "Minimal" }, { id: "split", label: "Split" }].map(l => (
                  <button key={l.id} type="button" onClick={() => set("layoutId", l.id)}
                    className="py-2 text-center transition-all cursor-pointer"
                    style={data.layoutId === l.id
                      ? { border: '1px solid #c6f135', color: '#c6f135', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }
                      : { border: '1px solid #1a1a1a', color: '#333', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PERSONAL */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="personal" icon={User} label="Personal Information" />
        {activeSection === "personal" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div><Label text="Full Name" /><input type="text" value={data.name} onChange={e => set("name", e.target.value)} placeholder="Arjun Sharma" className={inp} /></div>
              <div><Label text="Job Title" /><input type="text" value={data.title} onChange={e => set("title", e.target.value)} placeholder="Full Stack Dev" className={inp} /></div>
            </div>
            <div>
              <Label text="Profile Image URL" />
              <div className="flex gap-2 items-center">
                <input type="text" value={data.profileImage || ""} onChange={e => set("profileImage", e.target.value)} placeholder="https://..." className={inp} />
                {data.profileImage && <img src={data.profileImage} alt="" className="h-8 w-8 object-cover shrink-0" style={{ border: '1px solid #1a1a1a' }} onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name}`; }} />}
              </div>
            </div>
            <div>
              <Label text="Bio" />
              <textarea value={data.bio} rows={3} onChange={e => set("bio", e.target.value)} placeholder="I am passionate about..." className={`${inp} resize-none`} />
              <div className="mt-2 p-3 space-y-2" style={{ border: '1px solid #1a1a1a', background: '#050505' }}>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 animate-pulse" style={{ color: '#c6f135' }} />
                  <span style={{ color: '#555', fontWeight: 700, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Gemini AI Bio</span>
                </div>
                <input type="text" value={aiKeywords} onChange={e => setAiKeywords(e.target.value)} placeholder="Keywords (React, Node.js...)" className={inp} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#333', fontSize: '10px', fontFamily: 'monospace' }}>Tone:</span>
                    <select value={aiTone} onChange={(e: any) => setAiTone(e.target.value)}
                      style={{ background: '#000', border: '1px solid #1a1a1a', color: '#555', fontSize: '10px', fontFamily: 'monospace' }}
                      className="px-1.5 py-0.5 focus:outline-none">
                      <option value="professional">Professional</option>
                      <option value="creative">Creative</option>
                      <option value="minimalist">Minimalist</option>
                    </select>
                  </div>
                  <button type="button" onClick={generateAiBio} disabled={isAiGenerating}
                    className="flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer disabled:opacity-50"
                    style={{ background: '#c6f135', color: '#000', fontWeight: 700, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {isAiGenerating ? <><Loader2 className="h-3 w-3 animate-spin" /><span>Generating...</span></> : <><Sparkles className="h-3 w-3" /><span>Generate</span></>}
                  </button>
                </div>
                {aiFeedback && <p style={{ fontSize: '10px', fontFamily: 'monospace', color: aiFeedback.isDemo ? '#f59e0b' : '#c6f135' }}>{aiFeedback.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label text="Location" /><input type="text" value={data.location} onChange={e => set("location", e.target.value)} placeholder="Bengaluru, IN" className={inp} /></div>
              <div><Label text="Email" /><input type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="hello@domain.com" className={inp} /></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label text="Phone" /><input type="text" value={data.phone || ""} onChange={e => set("phone", e.target.value)} placeholder="+91 9876543210" className={inp} /></div>
              <div><Label text="GitHub" /><input type="text" value={data.github || ""} onChange={e => set("github", e.target.value)} placeholder="https://github.com/..." className={inp} /></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label text="LinkedIn" /><input type="text" value={data.linkedin || ""} onChange={e => set("linkedin", e.target.value)} placeholder="https://linkedin.com/..." className={inp} /></div>
              <div><Label text="Twitter" /><input type="text" value={data.twitter || ""} onChange={e => set("twitter", e.target.value)} placeholder="https://twitter.com/..." className={inp} /></div>
            </div>
            <div><Label text="Resume Link" /><input type="text" value={data.resumeUrl || ""} onChange={e => set("resumeUrl", e.target.value)} placeholder="https://..." className={inp} /></div>
          </div>
        )}
      </div>

      {/* SKILLS */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="skills" icon={Sparkles} label="Skills" />
        {activeSection === "skills" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex gap-1.5">
              <input type="text" value={newSkillName} onChange={e => setNewSkillName(e.target.value)} placeholder="React, Docker, Figma..." onKeyDown={e => e.key === "Enter" && addSkill()} className={sinp + " flex-1"} />
              <select value={newSkillCategory} onChange={e => setNewSkillCategory(e.target.value)}
                style={{ background: '#000', border: '1px solid #1a1a1a', color: '#555', fontSize: '10px', fontFamily: 'monospace' }}
                className="px-1.5 focus:outline-none">
                <option value="Frontend">FE</option>
                <option value="Backend">BE</option>
                <option value="Design">DS</option>
                <option value="Tools">TL</option>
              </select>
              <button type="button" onClick={addSkill}
                className="h-7 w-7 flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                style={{ background: '#c6f135', color: '#000' }}>
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            {["Frontend", "Backend", "Design", "Tools"].map(cat => {
              const cs = data.skills.filter(s => s.category === cat);
              if (cs.length === 0) return null;
              return (
                <div key={cat}>
                  <Label text={cat} />
                  <div className="flex flex-wrap gap-1.5">
                    {cs.map(s => (
                      <span key={s.id} className="inline-flex items-center gap-1 px-2 py-0.5"
                        style={{ border: '1px solid #1a1a1a', color: '#555', fontSize: '11px', fontFamily: 'monospace' }}>
                        {s.name}
                        <button type="button" onClick={() => removeSkill(s.id)} className="cursor-pointer transition-colors"
                          style={{ color: '#333' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                          <Plus className="h-2.5 w-2.5 rotate-45" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EXPERIENCE */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="experience" icon={Briefcase} label="Experience" />
        {activeSection === "experience" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex justify-between items-center">
              <Label text="Work History" />
              <AddBtn onClick={addExp} label="Add Role" />
            </div>
            {data.experiences.length === 0 ? <Empty text="No experience added yet." /> : (
              <div className="space-y-2">
                {data.experiences.map((exp, i) => (
                  <Card key={exp.id}>
                    <button type="button" onClick={() => removeExp(exp.id)} className="absolute top-2 right-2 cursor-pointer transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <Label text={`Role #${i + 1}`} />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={exp.role} onChange={e => updateExp(exp.id, { role: e.target.value })} placeholder="Job Title" className={sinp} />
                      <input type="text" value={exp.company} onChange={e => updateExp(exp.id, { company: e.target.value })} placeholder="Company" className={sinp} />
                    </div>
                    <input type="text" value={exp.period} onChange={e => updateExp(exp.id, { period: e.target.value })} placeholder="Jan 2022 - Dec 2023" className={sinp} />
                    <textarea value={exp.description} rows={2} onChange={e => updateExp(exp.id, { description: e.target.value })} placeholder="Key responsibilities..." className={`${sinp} resize-none`} />
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROJECTS */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="projects" icon={FolderGit2} label="Projects" />
        {activeSection === "projects" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex justify-between items-center">
              <Label text="Portfolio" />
              <AddBtn onClick={addProj} label="Add Project" />
            </div>
            {data.projects.length === 0 ? <Empty text="No projects added yet." /> : (
              <div className="space-y-2">
                {data.projects.map((proj, i) => (
                  <Card key={proj.id}>
                    <button type="button" onClick={() => removeProj(proj.id)} className="absolute top-2 right-2 cursor-pointer transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <div className="flex items-center gap-2">
                      <Label text={`Project #${i + 1}`} />
                      <label className="flex items-center gap-1 cursor-pointer ml-auto mr-5" style={{ color: '#333', fontSize: '10px', fontFamily: 'monospace' }}>
                        <input type="checkbox" checked={!!proj.featured} onChange={e => updateProj(proj.id, { featured: e.target.checked })} className="h-2.5 w-2.5" />
                        <span>Featured</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={proj.title} onChange={e => updateProj(proj.id, { title: e.target.value })} placeholder="Project Title" className={sinp} />
                      <input type="text" value={proj.link || ""} onChange={e => updateProj(proj.id, { link: e.target.value })} placeholder="Live / GitHub URL" className={sinp} />
                    </div>
                    <input type="text" value={proj.image || ""} onChange={e => updateProj(proj.id, { image: e.target.value })} placeholder="Cover Image URL" className={sinp} />
                    <input type="text" value={proj.techTags.join(", ")} onChange={e => updateProj(proj.id, { techTags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })} placeholder="React, Tailwind, Node.js" className={sinp} />
                    <textarea value={proj.description} rows={2} onChange={e => updateProj(proj.id, { description: e.target.value })} placeholder="What does this project do?" className={`${sinp} resize-none`} />
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* EDUCATION */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="education" icon={GraduationCap} label="Education" />
        {activeSection === "education" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex justify-between items-center">
              <Label text="Academic History" />
              <AddBtn onClick={addEdu} label="Add" />
            </div>
            {data.educations.length === 0 ? <Empty text="No education added yet." /> : (
              <div className="space-y-2">
                {data.educations.map((edu, i) => (
                  <Card key={edu.id}>
                    <button type="button" onClick={() => removeEdu(edu.id)} className="absolute top-2 right-2 cursor-pointer transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <Label text={`Degree #${i + 1}`} />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={edu.degree} onChange={e => updateEdu(edu.id, { degree: e.target.value })} placeholder="B.Tech CS" className={sinp} />
                      <input type="text" value={edu.school} onChange={e => updateEdu(edu.id, { school: e.target.value })} placeholder="University Name" className={sinp} />
                    </div>
                    <input type="text" value={edu.period} onChange={e => updateEdu(edu.id, { period: e.target.value })} placeholder="2020 - 2024" className={sinp} />
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CERTIFICATIONS */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="certifications" icon={Award} label="Certifications" />
        {activeSection === "certifications" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex justify-between items-center">
              <Label text="Credentials" />
              <AddBtn onClick={addCert} label="Add" />
            </div>
            {(data.certifications || []).length === 0 ? <Empty text="No certifications added yet." /> : (
              <div className="space-y-2">
                {(data.certifications || []).map((cert, i) => (
                  <Card key={cert.id}>
                    <button type="button" onClick={() => removeCert(cert.id)} className="absolute top-2 right-2 cursor-pointer transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <Label text={`Certificate #${i + 1}`} />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={cert.name} onChange={e => updateCert(cert.id, { name: e.target.value })} placeholder="Certification Name" className={sinp} />
                      <input type="text" value={cert.issuer} onChange={e => updateCert(cert.id, { issuer: e.target.value })} placeholder="Google, AWS..." className={sinp} />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={cert.date} onChange={e => updateCert(cert.id, { date: e.target.value })} placeholder="2024" className={sinp} />
                      <input type="text" value={cert.url || ""} onChange={e => updateCert(cert.id, { url: e.target.value })} placeholder="Certificate URL" className={sinp} />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* LANGUAGES */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="languages" icon={Languages} label="Languages" />
        {activeSection === "languages" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex justify-between items-center">
              <Label text="Languages Spoken" />
              <AddBtn onClick={addLang} label="Add" />
            </div>
            {(data.languages || []).length === 0 ? <Empty text="No languages added yet." /> : (
              <div className="space-y-2">
                {(data.languages || []).map(lang => (
                  <Card key={lang.id}>
                    <button type="button" onClick={() => removeLang(lang.id)} className="absolute top-2 right-2 cursor-pointer transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={lang.name} onChange={e => updateLang(lang.id, { name: e.target.value })} placeholder="English" className={sinp} />
                      <select value={lang.proficiency} onChange={e => updateLang(lang.id, { proficiency: e.target.value })}
                        style={{ background: '#000', border: '1px solid #1a1a1a', color: '#555', fontSize: '11px', fontFamily: 'monospace' }}
                        className="px-2 py-1.5 focus:outline-none w-full">
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                      </select>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* VOLUNTEER */}
      <div style={{ borderBottom: '1px solid #111' }}>
        <Hdr id="volunteer" icon={Heart} label="Volunteer Work" />
        {activeSection === "volunteer" && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex justify-between items-center">
              <Label text="Volunteer" />
              <AddBtn onClick={addVol} label="Add" />
            </div>
            {(data.volunteers || []).length === 0 ? <Empty text="No volunteer work added yet." /> : (
              <div className="space-y-2">
                {(data.volunteers || []).map((vol, i) => (
                  <Card key={vol.id}>
                    <button type="button" onClick={() => removeVol(vol.id)} className="absolute top-2 right-2 cursor-pointer transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <Label text={`Role #${i + 1}`} />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={vol.role} onChange={e => updateVol(vol.id, { role: e.target.value })} placeholder="Your Role" className={sinp} />
                      <input type="text" value={vol.organization} onChange={e => updateVol(vol.id, { organization: e.target.value })} placeholder="Organization" className={sinp} />
                    </div>
                    <input type="text" value={vol.period} onChange={e => updateVol(vol.id, { period: e.target.value })} placeholder="2023 - Present" className={sinp} />
                    <textarea value={vol.description} rows={2} onChange={e => updateVol(vol.id, { description: e.target.value })} placeholder="What did you contribute?" className={`${sinp} resize-none`} />
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}