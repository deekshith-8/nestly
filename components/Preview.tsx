'use client';

import React, { useState } from "react";
import { PortfolioData } from "../types/portfolio";
import {
  Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink,
  Briefcase, GraduationCap, Code, ArrowRight, Sparkles, Award, BookOpen, Heart, Languages
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PreviewProps {
  data: PortfolioData;
}

export default function Preview({ data }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "experience">("all");

  const f = data.fonts;

  const nameStyle = { fontFamily: f.nameFont, fontSize: f.nameSize };
  const sectionStyle = { fontFamily: f.sectionFont, fontSize: f.sectionSize };
  const bodyStyle = { fontFamily: f.bodyFont, fontSize: f.bodySize };
  const skillsStyle = { fontFamily: f.skillsFont, fontSize: f.skillsSize };

  const getThemeStyles = () => {
    switch (data.themeId) {
      case "neon": return {
        wrapper: "bg-[#09090b] text-zinc-100 selection:bg-[#10b981]/30",
        card: "bg-[#0f1013] border border-[#10b981]/20 hover:border-[#10b981]/50",
        badge: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/35",
        accentText: "text-[#10b981]", accentBtn: "bg-emerald-500 text-black hover:bg-emerald-400",
        heading: "font-bold tracking-tight text-[#10b981] uppercase",
        circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-[#10b981]/5 blur-3xl"
      };
      case "editorial": return {
        wrapper: "bg-[#0f0e0c] text-stone-100 selection:bg-amber-100/10",
        card: "bg-[#181614] border border-stone-800 hover:border-stone-700/80",
        badge: "bg-stone-800 text-amber-200/90 border border-amber-200/20",
        accentText: "text-amber-200", accentBtn: "bg-stone-900 hover:bg-stone-800 border border-stone-700 text-amber-100",
        heading: "text-amber-100/90 italic tracking-wide",
        circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-amber-500/5 blur-3xl"
      };
      case "emerald": return {
        wrapper: "bg-[#040d0a] text-zinc-200 selection:bg-emerald-500/20",
        card: "bg-[#071611] border border-emerald-900/30 hover:border-emerald-400/30",
        badge: "bg-emerald-950/65 text-emerald-300 border border-emerald-900/40",
        accentText: "text-emerald-400 font-semibold", accentBtn: "bg-emerald-600 hover:bg-emerald-500 text-white",
        heading: "font-semibold text-emerald-50",
        circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-emerald-500/5 blur-3xl"
      };
      case "sunset": return {
        wrapper: "bg-zinc-950 text-zinc-100 selection:bg-rose-500/20",
        card: "bg-zinc-900/90 border border-zinc-800 hover:border-rose-500/30",
        badge: "bg-rose-950/20 text-rose-300 border border-rose-900/30",
        accentText: "text-rose-400", accentBtn: "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:opacity-90",
        heading: "font-bold tracking-tight text-white",
        circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-rose-500/5 blur-3xl"
      };
      default: return {
        wrapper: "bg-[#090d16] text-slate-200 selection:bg-indigo-500/20",
        card: "bg-[#0f1424]/90 border border-slate-800/80 hover:border-indigo-500/30",
        badge: "bg-slate-800/60 text-indigo-300 border border-indigo-500/20",
        accentText: "text-indigo-400", accentBtn: "bg-indigo-600 hover:bg-indigo-500 text-white",
        heading: "font-bold tracking-tight text-white",
        circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-indigo-500/5 blur-3xl"
      };
    }
  };

  const t = getThemeStyles();
  const getAvatarUrl = () => data.profileImage || `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name || "Default"}`;

  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-hidden shadow-2xl border border-zinc-850/40 rounded-t-xl">
      {/* Browser Bar */}
      <div className="px-5 py-3 bg-[#0a0a0f] border-b border-zinc-900 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 max-w-[420px] mx-4 bg-[#111118]/90 border border-zinc-850/60 rounded-lg px-4 py-1 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-mono">
          <span className="text-emerald-500">🔒</span>
          <span className="text-zinc-600">https://</span>
          <span className="text-zinc-300 font-medium">{data.name ? `${data.name.toLowerCase().replace(/\s+/g, "")}.dev` : "yourportfolio.dev"}</span>
        </div>
        <span className="text-[9px] text-indigo-400/90 bg-indigo-500/10 border border-indigo-500/20 rounded-md py-0.5 px-2 font-mono font-bold uppercase">STAGE VIEW</span>
      </div>

      {/* Preview Body */}
      <div className={`flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 ${t.wrapper} relative`} style={bodyStyle}>
        <div className={t.circleGlow} />
        <div className="max-w-5xl mx-auto space-y-12">

          {/* BENTO LAYOUT */}
          {data.layoutId === "bento" && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Hero */}
              <motion.div layout className={`col-span-1 md:col-span-4 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 transition-all ${t.card}`}>
                <div className="relative shrink-0">
                  <img src={getAvatarUrl()} alt={data.name} className="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover border-2 shadow-lg bg-zinc-900"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name}`; }} />
                  <span className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-zinc-950 rounded-full h-4 w-4 block" />
                </div>
                <div className="space-y-3 flex-1 select-text">
                  <div className="space-y-1">
                    <span className={`text-xs font-semibold tracking-wider uppercase ${t.accentText}`}>Available for Projects</span>
                    <h2 className={t.heading} style={nameStyle}>{data.name || "Your Name"}</h2>
                    <p className={`font-medium opacity-80 ${t.accentText}`} style={sectionStyle}>{data.title || "Your Role"}</p>
                  </div>
                  <p className="leading-relaxed opacity-75" style={bodyStyle}>{data.bio || "Add your bio on the left panel!"}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs text-zinc-400 font-mono">
                    {data.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{data.location}</span>}
                    {data.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{data.email}</span>}
                    {data.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{data.phone}</span>}
                  </div>
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div layout className={`col-span-1 md:col-span-2 rounded-2xl p-6 flex flex-col justify-between items-center text-center gap-4 ${t.card}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">CONNECTIVITY PATHS</span>
                <div className="flex flex-col gap-2.5 w-full">
                  {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/45 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono"><span className="flex items-center gap-2"><Github className="h-4 w-4" />Github</span><ExternalLink className="h-3 w-3 opacity-60" /></a>}
                  {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/45 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono"><span className="flex items-center gap-2"><Linkedin className="h-4 w-4" />LinkedIn</span><ExternalLink className="h-3 w-3 opacity-60" /></a>}
                  {data.twitter && <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/45 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono"><span className="flex items-center gap-2"><Twitter className="h-4 w-4" />Twitter / X</span><ExternalLink className="h-3 w-3 opacity-60" /></a>}
                </div>
                <a href={`mailto:${data.email}`} className={`w-full py-2.5 rounded-lg text-xs font-medium text-center transition-all ${t.accentBtn} inline-flex items-center justify-center gap-2`}>
                  <Mail className="h-3.5 w-3.5" />Request Meeting
                </a>
              </motion.div>

              {/* Skills */}
              <motion.div layout className={`col-span-1 md:col-span-3 rounded-2xl p-6 flex flex-col justify-between space-y-4 ${t.card}`}>
                <div className="space-y-1">
                  <h3 className={`font-semibold ${t.accentText} flex items-center gap-2`} style={sectionStyle}><Code className="h-4 w-4" />Skills Framework</h3>
                  <p className="text-[11px] text-zinc-500 font-mono">Stack categories currently deployed</p>
                </div>
                {data.skills.length === 0 ? <p className="text-xs text-zinc-500 italic">No skills added yet</p> : (
                  <div className="flex flex-wrap gap-1.5 py-2">
                    {data.skills.map(s => <span key={s.id} className={`font-medium py-1 px-2.5 rounded-md ${t.badge}`} style={skillsStyle}>{s.name}</span>)}
                  </div>
                )}
                <div className="text-[10px] text-zinc-500 font-mono">TOTAL: {data.skills.length} MODULES</div>
              </motion.div>

              {/* Experience */}
              <motion.div layout className={`col-span-1 md:col-span-3 rounded-2xl p-6 flex flex-col justify-between space-y-4 ${t.card}`}>
                <div className="space-y-1">
                  <h3 className={`font-semibold ${t.accentText} flex items-center gap-2`} style={sectionStyle}><Briefcase className="h-4 w-4" />Core Experience</h3>
                  <p className="text-[11px] text-zinc-500 font-mono">Professional timeline summary</p>
                </div>
                <div className="space-y-3.5 py-1">
                  {data.experiences.slice(0, 2).map(exp => (
                    <div key={exp.id} className="border-l-2 pl-3.5 space-y-0.5" style={{ borderColor: data.themeId === "neon" ? "#10b981" : "#4f46e5" }}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-200" style={bodyStyle}>{exp.role}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{exp.period}</span>
                      </div>
                      <p className="text-[11px] opacity-75">{exp.company}</p>
                    </div>
                  ))}
                  {data.experiences.length === 0 && <p className="text-xs text-zinc-500 italic">Add experience on the left</p>}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase">Full timeline shown below</div>
              </motion.div>

              {/* Projects divider */}
              <div className="col-span-1 md:col-span-6 pt-4 flex items-center justify-between">
                <div className="h-[1px] flex-1 bg-zinc-800" />
                <span className="px-4 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">PROJECT REPOSITORY</span>
                <div className="h-[1px] flex-1 bg-zinc-800" />
              </div>

              {/* Projects */}
              <AnimatePresence mode="popLayout">
                {data.projects.map(proj => (
                  <motion.div key={proj.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className={`col-span-1 md:col-span-3 rounded-2xl overflow-hidden flex flex-col h-full ${t.card}`}>
                    {proj.image && (
                      <div className="h-40 w-full relative bg-zinc-900 group overflow-hidden">
                        <img src={proj.image} alt={proj.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${proj.title}/600/400`; }} />
                        {proj.featured && <span className="absolute top-2 right-2 bg-indigo-600/90 text-[9px] font-bold text-white px-2 py-0.5 rounded-full uppercase flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" />Featured</span>}
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 select-text">
                      <div className="space-y-1.5">
                        <h4 className="font-semibold text-zinc-100" style={sectionStyle}>{proj.title}</h4>
                        <p className="opacity-75 leading-relaxed" style={bodyStyle}>{proj.description}</p>
                      </div>
                      <div className="space-y-3 pt-1">
                        {proj.techTags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {proj.techTags.map((t2, idx) => <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-950/70 text-zinc-400 border border-zinc-900 font-mono" style={skillsStyle}>{t2}</span>)}
                          </div>
                        )}
                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 font-medium cursor-pointer ${t.accentText} hover:opacity-80`} style={bodyStyle}>Launch Project<ArrowRight className="h-3 w-3" /></a>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Education */}
              <motion.div layout className={`col-span-1 md:col-span-6 rounded-2xl p-6 ${t.card}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-text">
                  <div className="space-y-1">
                    <h3 className={`font-semibold ${t.accentText} flex items-center gap-2`} style={sectionStyle}><BookOpen className="h-4 w-4" />Academic & Certifications</h3>
                    <p className="text-[11px] text-zinc-500 font-mono">Degrees and credentials</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 max-w-xl">
                    {data.educations.map(edu => (
                      <div key={edu.id} className="p-3 bg-zinc-950/40 rounded-lg border border-zinc-800 space-y-0.5" style={bodyStyle}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-200">{edu.degree}</span>
                          <span className="text-[10px] text-zinc-500 font-mono ml-2 shrink-0">{edu.period}</span>
                        </div>
                        <p className="opacity-75">{edu.school}</p>
                      </div>
                    ))}
                    {data.educations.length === 0 && <p className="text-xs text-zinc-500 italic">No education added yet</p>}
                  </div>
                </div>
              </motion.div>

              {/* Certifications */}
              {data.certifications?.length > 0 && (
                <motion.div layout className={`col-span-1 md:col-span-3 rounded-2xl p-6 space-y-4 ${t.card}`}>
                  <h3 className={`font-semibold ${t.accentText} flex items-center gap-2`} style={sectionStyle}><Award className="h-4 w-4" />Certifications</h3>
                  <div className="space-y-3">
                    {data.certifications.map(cert => (
                      <div key={cert.id} className="flex justify-between items-center" style={bodyStyle}>
                        <div>
                          <p className="font-semibold text-zinc-200">{cert.name}</p>
                          <p className="text-zinc-500">{cert.issuer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-zinc-500 font-mono text-[10px]">{cert.date}</p>
                          {cert.url && <a href={cert.url} target="_blank" className={`text-[10px] ${t.accentText} hover:opacity-80`}>View ↗</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Languages */}
              {data.languages?.length > 0 && (
                <motion.div layout className={`col-span-1 md:col-span-${data.certifications?.length > 0 ? "3" : "6"} rounded-2xl p-6 space-y-4 ${t.card}`}>
                  <h3 className={`font-semibold ${t.accentText} flex items-center gap-2`} style={sectionStyle}><Languages className="h-4 w-4" />Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map(lang => (
                      <span key={lang.id} className={`py-1 px-3 rounded-full ${t.badge}`} style={skillsStyle}>
                        {lang.name} <span className="opacity-60">· {lang.proficiency}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Volunteer */}
              {data.volunteers?.length > 0 && (
                <motion.div layout className={`col-span-1 md:col-span-6 rounded-2xl p-6 space-y-4 ${t.card}`}>
                  <h3 className={`font-semibold ${t.accentText} flex items-center gap-2`} style={sectionStyle}><Heart className="h-4 w-4" />Volunteer Work</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.volunteers.map(vol => (
                      <div key={vol.id} className="p-3 bg-zinc-950/40 rounded-lg border border-zinc-800 space-y-1" style={bodyStyle}>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-zinc-200">{vol.role}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{vol.period}</span>
                        </div>
                        <p className={t.accentText}>{vol.organization}</p>
                        <p className="opacity-75 leading-relaxed">{vol.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* MINIMAL LAYOUT */}
          {data.layoutId === "minimal" && (
            <div className="space-y-10 max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-center py-6 border-b border-zinc-800/60 pb-10">
                <div className="relative inline-block">
                  <img src={getAvatarUrl()} alt={data.name} className="h-28 w-28 rounded-full mx-auto object-cover border border-zinc-800 shadow"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name}`; }} />
                  <div className="absolute bottom-0 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                </div>
                <div className="space-y-1.5 select-text">
                  <span className={`text-[10px] tracking-widest font-bold uppercase ${t.accentText}`}>AVAILABLE FOR ENGAGEMENTS</span>
                  <h1 className={t.heading} style={nameStyle}>{data.name || "Your Name"}</h1>
                  <p className={`font-medium opacity-85 ${t.accentText}`} style={sectionStyle}>{data.title || "Your Role"}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-zinc-400 font-mono">
                    <MapPin className="h-3 w-3 text-zinc-500" /><span>{data.location}</span>
                  </div>
                </div>
                <p className="max-w-xl mx-auto leading-relaxed opacity-75 select-text" style={bodyStyle}>{data.bio}</p>
                <div className="flex justify-center items-center gap-3 pt-2">
                  {data.github && <a href={data.github} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:text-white"><Github className="h-4 w-4" /></a>}
                  {data.linkedin && <a href={data.linkedin} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:text-white"><Linkedin className="h-4 w-4" /></a>}
                  {data.twitter && <a href={data.twitter} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:text-white"><Twitter className="h-4 w-4" /></a>}
                  {data.email && <a href={`mailto:${data.email}`} className="p-2 bg-indigo-600 rounded-full text-white"><Mail className="h-4 w-4" /></a>}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-8 space-y-10">
                  <div className="flex border-b border-zinc-800 text-xs">
                    {["all", "projects", "experience"].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab as any)}
                        className={`pb-2.5 px-3 font-medium transition-colors border-b-2 hover:text-white capitalize ${activeTab === tab ? "border-indigo-500 text-white" : "border-transparent text-zinc-400"}`}>
                        {tab}
                      </button>
                    ))}
                  </div>
                  {(activeTab === "all" || activeTab === "projects") && (
                    <div className="space-y-6 select-text">
                      <h3 className={`font-bold tracking-wider uppercase font-mono ${t.accentText}`} style={sectionStyle}>PROJECTS</h3>
                      <div className="space-y-4">
                        {data.projects.map(proj => (
                          <motion.div key={proj.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-xl ${t.card}`}>
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="font-semibold text-zinc-100 flex items-center gap-1.5" style={sectionStyle}>
                                  {proj.title}
                                  {proj.featured && <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/10 px-1.5 py-0.5 rounded font-mono uppercase">Featured</span>}
                                </h4>
                                <p className="opacity-75 mt-1 leading-relaxed" style={bodyStyle}>{proj.description}</p>
                              </div>
                              {proj.link && <a href={proj.link} className="p-2 border border-zinc-800 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"><ExternalLink className="h-3.5 w-3.5" /></a>}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {proj.techTags.map((tech, i) => <span key={i} className="font-mono py-0.5 px-1.5 rounded bg-zinc-950/70 border border-zinc-800 text-zinc-400" style={skillsStyle}>{tech}</span>)}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(activeTab === "all" || activeTab === "experience") && (
                    <div className="space-y-6 pt-2 select-text">
                      <h3 className={`font-bold tracking-wider uppercase font-mono ${t.accentText}`} style={sectionStyle}>EXPERIENCE</h3>
                      <div className="relative border-l border-zinc-800 pl-4 ml-2 space-y-6">
                        {data.experiences.map(exp => (
                          <div key={exp.id} className="relative space-y-1">
                            <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-500/90 border-2 border-zinc-950 inline-block" />
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-zinc-200" style={bodyStyle}>{exp.role}</h4>
                              <span className="text-[10px] text-zinc-500 font-mono">{exp.period}</span>
                            </div>
                            <p className={`text-xs ${t.accentText}`}>{exp.company}</p>
                            <p className="opacity-75 leading-relaxed" style={bodyStyle}>{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:col-span-4 space-y-8 select-text">
                  <div className="space-y-4">
                    <span className="text-xs font-bold font-mono text-zinc-500 uppercase">SKILLS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.skills.map(skill => <span key={skill.id} className={`font-mono py-1 px-2 rounded-full font-medium ${t.badge}`} style={skillsStyle}>{skill.name}</span>)}
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-zinc-900">
                    <span className="text-xs font-bold font-mono text-zinc-500 uppercase">EDUCATION</span>
                    <div className="space-y-4">
                      {data.educations.map(edu => (
                        <div key={edu.id} className="space-y-0.5">
                          <span className="text-[10px] font-mono text-zinc-500 block">{edu.period}</span>
                          <h4 className="font-bold text-zinc-200" style={bodyStyle}>{edu.degree}</h4>
                          <p className="opacity-75" style={bodyStyle}>{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {data.languages?.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-zinc-900">
                      <span className="text-xs font-bold font-mono text-zinc-500 uppercase">LANGUAGES</span>
                      <div className="space-y-2">
                        {data.languages.map(lang => <div key={lang.id} className="flex justify-between" style={bodyStyle}><span className="text-zinc-300">{lang.name}</span><span className="text-zinc-500">{lang.proficiency}</span></div>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SPLIT LAYOUT */}
          {data.layoutId === "split" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 h-auto md:sticky md:top-6 space-y-6">
                <div className={`p-6 rounded-2xl ${t.card}`}>
                  <div className="space-y-5 text-center md:text-left select-text">
                    <img src={getAvatarUrl()} alt={data.name} className="h-24 w-24 rounded-2xl mx-auto md:mx-0 object-cover border border-zinc-800 bg-zinc-900 shadow-md"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name}`; }} />
                    <div className="space-y-1">
                      <h2 className={t.heading} style={nameStyle}>{data.name || "Your Name"}</h2>
                      <p className={`font-semibold uppercase tracking-wider ${t.accentText}`} style={sectionStyle}>{data.title}</p>
                    </div>
                    <p className="opacity-75 leading-relaxed" style={bodyStyle}>{data.bio}</p>
                    <div className="h-[1px] bg-zinc-800" />
                    <div className="space-y-2.5 font-mono text-[11px] text-zinc-400">
                      {data.location && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-zinc-500" /><span>{data.location}</span></div>}
                      {data.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-zinc-500" /><span className="truncate">{data.email}</span></div>}
                      {data.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-zinc-500" /><span>{data.phone}</span></div>}
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                      {data.github && <a href={data.github} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300"><Github className="h-3.5 w-3.5" /></a>}
                      {data.linkedin && <a href={data.linkedin} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300"><Linkedin className="h-3.5 w-3.5" /></a>}
                      {data.twitter && <a href={data.twitter} target="_blank" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300"><Twitter className="h-3.5 w-3.5" /></a>}
                    </div>
                    {data.languages?.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-zinc-800">
                        <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase block">Languages</span>
                        {data.languages.map(lang => <div key={lang.id} className="flex justify-between" style={bodyStyle}><span className="text-zinc-300">{lang.name}</span><span className="text-zinc-500">{lang.proficiency}</span></div>)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-8 select-text">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                    <Award className={`h-4 w-4 ${t.accentText}`} />
                    <h3 className="font-bold uppercase font-mono text-zinc-100" style={sectionStyle}>PROJECTS</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.projects.map(proj => (
                      <div key={proj.id} className={`p-4 rounded-xl flex flex-col justify-between ${t.card}`}>
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-zinc-200" style={sectionStyle}>{proj.title}</h4>
                          <p className="opacity-75 leading-relaxed" style={bodyStyle}>{proj.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.techTags.slice(0, 3).map((tag, i) => <span key={i} className="font-mono bg-zinc-950/40 text-zinc-400 py-0.5 px-1 border border-zinc-800 rounded" style={skillsStyle}>{tag}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                    <Code className={`h-4 w-4 ${t.accentText}`} />
                    <h3 className="font-bold uppercase font-mono text-zinc-100" style={sectionStyle}>SKILLS</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map(s => <span key={s.id} className={`py-1 px-2 rounded-lg font-medium font-mono ${t.badge}`} style={skillsStyle}>{s.name}</span>)}
                  </div>
                </div>
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                    <Briefcase className={`h-4 w-4 ${t.accentText}`} />
                    <h3 className="font-bold uppercase font-mono text-zinc-100" style={sectionStyle}>EXPERIENCE</h3>
                  </div>
                  <div className="space-y-4">
                    {data.experiences.map(exp => (
                      <div key={exp.id} className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-200" style={bodyStyle}>{exp.role}</span>
                          <span className="text-[10px] font-mono text-zinc-500">{exp.period}</span>
                        </div>
                        <p className={`font-mono text-[11px] ${t.accentText}`}>{exp.company}</p>
                        <p className="opacity-75 leading-relaxed" style={bodyStyle}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                    <GraduationCap className={`h-4 w-4 ${t.accentText}`} />
                    <h3 className="font-bold uppercase font-mono text-zinc-100" style={sectionStyle}>EDUCATION</h3>
                  </div>
                  <div className="space-y-3">
                    {data.educations.map(edu => (
                      <div key={edu.id} className="flex justify-between items-center p-2 rounded hover:bg-zinc-900 font-mono" style={bodyStyle}>
                        <div><span className="text-zinc-400 font-bold">{edu.degree}</span><span className="text-zinc-600 px-1">at</span><span className="text-zinc-300">{edu.school}</span></div>
                        <span className="text-[10px] text-zinc-500">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {data.certifications?.length > 0 && (
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                      <Award className={`h-4 w-4 ${t.accentText}`} />
                      <h3 className="font-bold uppercase font-mono text-zinc-100" style={sectionStyle}>CERTIFICATIONS</h3>
                    </div>
                    <div className="space-y-3">
                      {data.certifications.map(cert => (
                        <div key={cert.id} className="flex justify-between items-center p-2 rounded hover:bg-zinc-900" style={bodyStyle}>
                          <div><p className="font-bold text-zinc-200">{cert.name}</p><p className="text-zinc-500">{cert.issuer}</p></div>
                          <div className="text-right"><p className="text-zinc-500 font-mono text-[10px]">{cert.date}</p>{cert.url && <a href={cert.url} target="_blank" className={`text-[10px] ${t.accentText}`}>View ↗</a>}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.volunteers?.length > 0 && (
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                      <Heart className={`h-4 w-4 ${t.accentText}`} />
                      <h3 className="font-bold uppercase font-mono text-zinc-100" style={sectionStyle}>VOLUNTEER</h3>
                    </div>
                    <div className="space-y-3">
                      {data.volunteers.map(vol => (
                        <div key={vol.id} className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl space-y-1" style={bodyStyle}>
                          <div className="flex justify-between"><span className="font-bold text-zinc-200">{vol.role}</span><span className="text-[10px] font-mono text-zinc-500">{vol.period}</span></div>
                          <p className={`font-mono text-[11px] ${t.accentText}`}>{vol.organization}</p>
                          <p className="opacity-75">{vol.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}