'use client';

import React, { useState } from "react";
import { PortfolioData, Skill, Experience, Project, Education } from "../types/portfolio";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Code, 
  ArrowRight,
  Sparkles,
  Award,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PreviewProps {
  data: PortfolioData;
}

export default function Preview({ data }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "experience">("all");

  // Get current theme details
  const getThemeStyles = () => {
    switch (data.themeId) {
      case "neon":
        return {
          wrapper: "bg-[#09090b] text-zinc-100 font-mono selection:bg-[#10b981]/30",
          card: "bg-[#0f1013] border border-[#10b981]/20 hover:border-[#10b981]/50 shadow-[0_0_15px_rgba(16,185,129,0.03)]",
          badge: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/35",
          accentText: "text-[#10b981]",
          accentBtn: "bg-emerald-500 text-black hover:bg-emerald-400 border border-emerald-600",
          accentLine: "border-emerald-500/20",
          heading: "font-mono font-bold tracking-tight text-[#10b981] uppercase",
          circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-[#10b981]/5 blur-3xl"
        };
      case "editorial":
        return {
          wrapper: "bg-[#0f0e0c] text-stone-100 font-serif selection:bg-amber-100/10",
          card: "bg-[#181614] border border-stone-800 hover:border-stone-700/80 shadow-sm",
          badge: "bg-stone-800 text-amber-200/90 border border-amber-200/20 font-sans",
          accentText: "text-amber-200",
          accentBtn: "bg-stone-1050 hover:bg-stone-800 border border-stone-750 text-amber-150 font-sans",
          accentLine: "border-stone-800",
          heading: "font-serif text-amber-100/90 italic tracking-wide",
          circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-amber-500/5 blur-3xl font-sans"
        };
      case "emerald":
        return {
          wrapper: "bg-[#040d0a] text-zinc-200 font-sans selection:bg-emerald-500/20",
          card: "bg-[#071611] border border-emerald-900/30 hover:border-emerald-400/30 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.1)]",
          badge: "bg-emerald-950/65 text-emerald-300 border border-emerald-900/40",
          accentText: "text-emerald-400 font-semibold",
          accentBtn: "bg-emerald-650 hover:bg-emerald-500 border border-emerald-600 text-white",
          accentLine: "border-emerald-950",
          heading: "font-sans font-semibold text-emerald-50",
          circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-emerald-500/5 blur-3xl"
        };
      case "sunset":
        return {
          wrapper: "bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500/20",
          card: "bg-zinc-900/90 border border-zinc-800 hover:border-rose-500/30",
          badge: "bg-rose-950/20 text-rose-300 border border-rose-900/30",
          accentText: "text-rose-400 bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent",
          accentBtn: "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:opacity-90 border-none",
          accentLine: "border-zinc-800/80",
          heading: "font-sans font-bold tracking-tight text-white",
          circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-rose-500/5 blur-3xl"
        };
      case "slate":
      default:
        return {
          wrapper: "bg-[#090d16] text-slate-200 font-sans selection:bg-indigo-500/20",
          card: "bg-[#0f1424]/90 border border-slate-800/80 hover:border-indigo-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.2)]",
          badge: "bg-slate-800/60 text-indigo-300 border border-indigo-550/20",
          accentText: "text-indigo-400",
          accentBtn: "bg-indigo-600 hover:bg-indigo-500 text-white",
          accentLine: "border-slate-800/70",
          heading: "font-sans font-bold tracking-tight text-white",
          circleGlow: "absolute -top-12 -left-12 h-44 w-44 rounded-full bg-indigo-500/5 blur-3xl"
        };
    }
  };

  const themeValues = getThemeStyles();

  // Profile Image safe fallback logic
  const getAvatarUrl = () => {
    return data.profileImage || `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name || "Default"}`;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-hidden shadow-2xl border border-zinc-850/40 rounded-t-xl" id="editor-preview-frame">
      {/* Mock Browser Title Bar */}
      <div className="px-5 py-3 bg-[#0a0a0f] border-b border-zinc-900 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 transition-opacity hover:opacity-100" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 transition-opacity hover:opacity-100" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 transition-opacity hover:opacity-100" />
        </div>
        <div className="flex-1 max-w-[420px] mx-4 bg-[#111118]/90 border border-zinc-850/60 rounded-lg px-4 py-1 flex items-center justify-center gap-1.5 shadow-sm text-[11px] text-zinc-400 font-mono tracking-wide relative group transition-all duration-300 hover:border-zinc-700/60">
          <span className="text-emerald-500">🔒</span>
          <span className="text-zinc-600">https://</span>
          <span className="text-zinc-300 font-medium select-all">{data.name ? `${data.name.toLowerCase().replace(/\s+/g, "")}.dev` : "architect.portfolio"}</span>
        </div>
        <div className="shrink-0 flex items-center">
          <span className="text-[9px] text-indigo-400/90 bg-indigo-505/10 border border-indigo-550/20 rounded-md py-0.5 px-2 font-mono font-bold tracking-widest uppercase">STAGE VIEW</span>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className={`flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 ${themeValues.wrapper} relative`}>
        {/* Glow Element */}
        <div className={themeValues.circleGlow} />

        <div className="max-w-5xl mx-auto space-y-12">
          {/* -------------------------------------------------------------
              LAYOUT 1: BENTO GRID 
              ------------------------------------------------------------- */}
          {data.layoutId === "bento" && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6" id="bento-canvas">
              {/* Header Box (Span 4) */}
              <motion.div 
                layout
                className={`col-span-1 md:col-span-4 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 transition-all ${themeValues.card}`}
              >
                <div className="relative shrink-0">
                  <img 
                    src={getAvatarUrl()} 
                    alt={data.name || "Alex"} 
                    className="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover border-2 shadow-lg bg-zinc-900"
                    style={{ borderColor: data.themeId === "neon" ? "#10b981" : "transparent" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name || "Default"}`;
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 bg-green-500 border-2 border-zinc-950 rounded-full h-4 w-4 block" />
                </div>
                <div className="space-y-3.5 flex-1 select-text">
                  <div className="space-y-1">
                    <span className={`text-xs font-semibold tracking-wider uppercase ${themeValues.accentText}`}>Available for Projects</span>
                    <h2 className={`text-3xl md:text-4xl ${themeValues.heading}`}>{data.name || "Your Name"}</h2>
                    <p className={`text-sm md:text-base font-medium opacity-80 ${themeValues.accentText}`}>{data.title || "Your Professional Role"}</p>
                  </div>
                  
                  <p className="text-xs md:text-sm leading-relaxed opacity-75">{data.bio || "No summary provided. Generate one on the left panel!"}</p>
                  
                  {/* Info details */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs text-zinc-400 font-mono">
                    {data.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {data.location}
                      </span>
                    )}
                    {data.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {data.email}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Social Channels / Actions Box (Span 2) */}
              <motion.div 
                layout
                className={`col-span-1 md:col-span-2 rounded-2xl p-6 flex flex-col justify-between items-center text-center gap-4 ${themeValues.card}`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">CONNECTIVITY PATHS</span>
                <div className="flex flex-col gap-2.5 w-full">
                  {data.github && (
                    <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/45 border border-zinc-805 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono">
                      <span className="flex items-center gap-2">
                        <Github className="h-4 w-4" /> Github
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}
                  {data.linkedin && (
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/45 border border-zinc-805 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono">
                      <span className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}
                  {data.twitter && (
                    <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/45 border border-zinc-805 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono">
                      <span className="flex items-center gap-2">
                        <Twitter className="h-4 w-4" /> Twitter / X
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}
                </div>
                
                <a 
                  href={`mailto:${data.email || "hello@domain.com"}`} 
                  className={`w-full py-2.5 rounded-lg text-xs font-medium text-center transition-all ${themeValues.accentBtn} inline-flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Request Meeting
                </a>
              </motion.div>

              {/* Skills (Span 3) */}
              <motion.div 
                layout
                className={`col-span-1 md:col-span-3 rounded-2xl p-6 flex flex-col justify-between space-y-4 ${themeValues.card}`}
              >
                <div className="space-y-1">
                  <h3 className={`text-base font-semibold ${themeValues.accentText} flex items-center gap-2`}>
                    <Code className="h-4 w-4" />
                    Skills Framework
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-mono">Stack categories currently deployed</p>
                </div>

                {data.skills.length === 0 ? (
                  <p className="text-xs text-zinc-550 italic">Define technologies in control panel</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 py-2">
                    {data.skills.map((s) => (
                      <span key={s.id} className={`text-[11px] font-medium py-1 px-2.5 rounded-md ${themeValues.badge}`}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-[10px] text-zinc-500 font-mono tracking-tighter">TOTAL COMPILATION: {data.skills.length} MODULES</div>
              </motion.div>

              {/* Experience Highlights (Span 3) */}
              <motion.div 
                layout
                className={`col-span-1 md:col-span-3 rounded-2xl p-6 flex flex-col justify-between space-y-4 ${themeValues.card}`}
              >
                <div className="space-y-1">
                  <h3 className={`text-base font-semibold ${themeValues.accentText} flex items-center gap-2`}>
                    <Briefcase className="h-4 w-4" />
                    Core Experience
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-mono">Professional timeline summary</p>
                </div>

                <div className="space-y-3.5 py-1">
                  {data.experiences.slice(0, 2).map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-3.5 space-y-0.5" style={{ borderColor: data.themeId === "neon" ? "#10b981" : "#4f46e5" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-200">{exp.role}</span>
                        <span className="text-[10px] text-zinc-550 font-mono">{exp.period}</span>
                      </div>
                      <p className="text-[11px] opacity-75">{exp.company}</p>
                    </div>
                  ))}
                  {data.experiences.length === 0 && (
                    <p className="text-xs text-zinc-550 italic">Add employment timeline</p>
                  )}
                </div>
                <div className="pt-2 text-[10px] text-zinc-500 font-mono uppercase">Full deployment stack shown below</div>
              </motion.div>

              {/* Projects Showcase Title (Span 6 for banner divider) */}
              <div className="col-span-1 md:col-span-6 pt-4 flex items-center justify-between">
                <div className="h-[1px] flex-1 bg-zinc-800" />
                <span className={`px-4 text-[11px] font-mono tracking-widest text-zinc-500 uppercase`}>PROJECT REPOSITORY</span>
                <div className="h-[1px] flex-1 bg-zinc-800" />
              </div>

              {/* Projects Loop (Span 3 each) */}
              <AnimatePresence mode="popLayout">
                {data.projects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`col-span-1 md:col-span-3 rounded-2xl overflow-hidden flex flex-col h-full ${themeValues.card}`}
                  >
                    {proj.image && (
                      <div className="h-40 w-full relative bg-zinc-900 group overflow-hidden">
                        <img 
                          src={proj.image} 
                          alt={proj.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${proj.title}/600/400`;
                          }}
                        />
                        {proj.featured && (
                          <span className="absolute top-2 right-2 bg-indigo-600/90 text-[9px] font-bold text-white px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5" /> Featured
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 select-text">
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-semibold text-zinc-100">{proj.title}</h4>
                        <p className="text-xs opacity-75 leading-relaxed">{proj.description}</p>
                      </div>

                      <div className="space-y-3 pt-1">
                        {/* Tech tags */}
                        {proj.techTags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {proj.techTags.map((t, idx) => (
                              <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-950/70 text-zinc-400 border border-zinc-900 font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Link */}
                        {proj.link && (
                          <a 
                            href={proj.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer ${themeValues.accentText} hover:opacity-80 transition-opacity`}
                          >
                            <span>Launch Project Source</span>
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Education and Studies (Span 6) */}
              <motion.div 
                layout
                className={`col-span-1 md:col-span-6 rounded-2xl p-6 ${themeValues.card}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-text">
                  <div className="space-y-1">
                    <h3 className={`text-base font-semibold ${themeValues.accentText} flex items-center gap-2`}>
                      <BookOpen className="h-4.5 w-4.5" />
                      Academic & Certifications
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-mono">Degrees or formal study timelines</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 max-w-xl">
                    {data.educations.map((edu) => (
                      <div key={edu.id} className="p-3 bg-zinc-950/40 rounded-lg border border-zinc-850 space-y-0.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-200">{edu.degree}</span>
                          <span className="text-[10px] text-zinc-550 font-mono ml-2 shrink-0">{edu.period}</span>
                        </div>
                        <p className="text-[11px] opacity-75">{edu.school}</p>
                      </div>
                    ))}
                    {data.educations.length === 0 && (
                      <p className="text-xs text-zinc-550 italic">Add education background</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* -------------------------------------------------------------
              LAYOUT 2: MINIMALSTACK
              ------------------------------------------------------------- */}
          {data.layoutId === "minimal" && (
            <div className="space-y-10 max-w-3xl mx-auto" id="minimal-canvas">
              {/* Top Hero Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 text-center py-6 border-b border-zinc-850/60 pb-10"
              >
                <div className="relative inline-block">
                  <img 
                    src={getAvatarUrl()} 
                    alt={data.name} 
                    className="h-28 w-28 rounded-full mx-auto object-cover border border-zinc-800 shadow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name || "Default"}`;
                    }}
                  />
                  <div className="absolute bottom-0 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                </div>

                <div className="space-y-1.5 select-text">
                  <span className={`text-[10px] tracking-widest font-bold uppercase ${themeValues.accentText}`}>AVAILABLE FOR DIRECT ENGAGEMENTS</span>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">{data.name || "Alex Carter"}</h1>
                  <p className={`text-base md:text-lg font-medium opacity-85 ${themeValues.accentText}`}>{data.title || "Developer Engineer"}</p>
                  <div className="flex items-center justify-center gap-1 p-1 inline-flex text-xs text-zinc-400 font-mono mt-1">
                    <MapPin className="h-3 w-3 text-zinc-500" />
                    <span>{data.location || "San Francisco"}</span>
                  </div>
                </div>

                <p className="max-w-xl mx-auto text-sm leading-relaxed opacity-75 font-sans select-text">
                  {data.bio || "Crafting performant state systems with highly designed user aesthetics."}
                </p>

                {/* Social icons */}
                <div className="flex justify-center items-center gap-3 pt-2">
                  {data.github && (
                    <a href={data.github} target="_blank" className="p-2 bg-zinc-900 border border-zinc-805 hover:bg-zinc-850 rounded-full transition-colors text-zinc-300 hover:text-white">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {data.linkedin && (
                    <a href={data.linkedin} target="_blank" className="p-2 bg-zinc-900 border border-zinc-805 hover:bg-zinc-850 rounded-full transition-colors text-zinc-300 hover:text-white">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {data.twitter && (
                    <a href={data.twitter} target="_blank" className="p-2 bg-zinc-900 border border-zinc-805 hover:bg-zinc-850 rounded-full transition-colors text-zinc-300 hover:text-white">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {data.email && (
                    <a href={`mailto:${data.email}`} className="p-2 bg-indigo-600 rounded-full transition-colors text-white hover:bg-indigo-505">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Grid: Resume and Projects list split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Left side: Bio tags & Timeline (8 Columns) */}
                <div className="md:col-span-8 space-y-10">
                  {/* Category Filter for list */}
                  <div className="flex border-b border-zinc-850 text-xs">
                    <button 
                      onClick={() => setActiveTab("all")}
                      className={`pb-2.5 px-3 font-medium transition-colors border-b-2 hover:text-white ${activeTab === "all" ? "border-indigo-500 text-white" : "border-transparent text-zinc-450"}`}
                    >
                      Summary Stream
                    </button>
                    <button 
                      onClick={() => setActiveTab("projects")}
                      className={`pb-2.5 px-3 font-medium transition-colors border-b-2 hover:text-white ${activeTab === "projects" ? "border-indigo-500 text-white" : "border-transparent text-zinc-450"}`}
                    >
                      Projects
                    </button>
                    <button 
                      onClick={() => setActiveTab("experience")}
                      className={`pb-2.5 px-3 font-medium transition-colors border-b-2 hover:text-white ${activeTab === "experience" ? "border-indigo-500 text-white" : "border-transparent text-zinc-450"}`}
                    >
                      Employment Trace
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* All Summary View */}
                    {(activeTab === "all" || activeTab === "projects") && (
                      <div className="space-y-6 select-text">
                        <h3 className={`text-sm font-bold tracking-wider uppercase font-mono ${themeValues.accentText}`}>SYSTEM PORTFOLIO ITEMS</h3>
                        <div className="space-y-4">
                          {data.projects.map((proj) => (
                            <motion.div 
                              key={proj.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`p-4 rounded-xl transition-all ${themeValues.card}`}
                            >
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
                                    {proj.title}
                                    {proj.featured && <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/10 px-1.5 py-0.5 rounded font-mono uppercase">Featured</span>}
                                  </h4>
                                  <p className="text-xs opacity-75 mt-1 leading-relaxed">{proj.description}</p>
                                </div>
                                {proj.link && (
                                  <a href={proj.link} className="p-2 border border-zinc-805 hover:bg-zinc-850 rounded text-zinc-450 hover:text-white">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {proj.techTags.map((tech, i) => (
                                  <span key={i} className="text-[10px] font-mono py-0.5 px-1.5 rounded bg-zinc-950/70 border border-zinc-850 text-zinc-400">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                          {data.projects.length === 0 && <p className="text-xs text-zinc-550 italic">No project listings available.</p>}
                        </div>
                      </div>
                    )}

                    {(activeTab === "all" || activeTab === "experience") && (
                      <div className="space-y-6 pt-2 select-text">
                        <h3 className={`text-sm font-bold tracking-wider uppercase font-mono ${themeValues.accentText}`}>WORK RECORD TIMELINE</h3>
                        <div className="relative border-l border-zinc-800 pl-4 ml-2 space-y-6">
                          {data.experiences.map((exp) => (
                            <div key={exp.id} className="relative space-y-1">
                              {/* Bullets */}
                              <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-500/90 border-2 border-zinc-950 inline-block" />
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-zinc-200">{exp.role}</h4>
                                <span className="text-[10px] text-zinc-500 font-mono">{exp.period}</span>
                              </div>
                              <p className="text-xs text-indigo-400">{exp.company}</p>
                              <p className="text-xs opacity-75 mt-1 leading-relaxed">{exp.description}</p>
                            </div>
                          ))}
                          {data.experiences.length === 0 && <p className="text-xs text-zinc-550 italic">No experience traces available.</p>}
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right side: Skills & Education summary (4 Columns) */}
                <div className="md:col-span-4 space-y-8 select-text">
                  {/* Skills Grid */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold font-mono text-zinc-500 uppercase">CORE STACK INVENTORY</span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.skills.map((skill) => (
                        <span key={skill.id} className={`text-[10px] font-mono py-1 px-2 rounded-full font-medium ${themeValues.badge}`}>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education Grid */}
                  <div className="space-y-4 pt-4 border-t border-zinc-900">
                    <span className="text-xs font-bold font-mono text-zinc-500 uppercase">STUDIES & DEGREES</span>
                    <div className="space-y-4">
                      {data.educations.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <span className="text-[10px] font-mono text-zinc-500 block">{edu.period}</span>
                          <h4 className="text-xs font-bold text-zinc-200">{edu.degree}</h4>
                          <p className="text-xs opacity-75">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              LAYOUT 3: SPLIT DRAWER
              ------------------------------------------------------------- */}
          {data.layoutId === "split" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" id="split-canvas">
              {/* Sticky Info Panel (Left 4 columns) */}
              <div className="md:col-span-4 h-auto md:sticky md:top-6 space-y-6">
                <div className={`p-6 rounded-2xl ${themeValues.card}`}>
                  <div className="space-y-5 text-center md:text-left select-text">
                    <img 
                      src={getAvatarUrl()} 
                      alt={data.name} 
                      className="h-24 w-24 rounded-2xl mx-auto md:mx-0 object-cover border border-zinc-800 bg-zinc-900 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.name || "Default"}`;
                      }}
                    />
                    <div className="space-y-1">
                      <h2 className={`text-2xl font-bold ${themeValues.heading}`}>{data.name || "Alex Carter"}</h2>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${themeValues.accentText}`}>{data.title || "Core Developer"}</p>
                    </div>

                    <p className="text-xs opacity-75 leading-relaxed">{data.bio}</p>

                    <div className="h-[1px] bg-zinc-800" />

                    <div className="space-y-2.5 font-mono text-[11px] text-zinc-400">
                      {data.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                          <span>{data.location}</span>
                        </div>
                      )}
                      {data.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                          <span className="truncate">{data.email}</span>
                        </div>
                      )}
                      {data.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                          <span>{data.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Social networks split */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                      {data.github && (
                        <a href={data.github} target="_blank" className="p-2 bg-zinc-900 border border-zinc-805 hover:bg-zinc-850 rounded-lg text-zinc-300">
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {data.linkedin && (
                        <a href={data.linkedin} target="_blank" className="p-2 bg-zinc-900 border border-zinc-805 hover:bg-zinc-850 rounded-lg text-zinc-300">
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {data.twitter && (
                        <a href={data.twitter} target="_blank" className="p-2 bg-zinc-900 border border-zinc-805 hover:bg-zinc-850 rounded-lg text-zinc-300">
                          <Twitter className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contents Area (Right 8 columns) */}
              <div className="md:col-span-8 space-y-8 select-text">
                {/* Showcase List of Projects */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-850 pb-2">
                    <Award className={`h-4.5 w-4.5 ${themeValues.accentText}`} />
                    <h3 className="text-sm font-bold uppercase font-mono text-zinc-150">ENGINEERED DEPLOYMENTS</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.projects.map((proj) => (
                      <div key={proj.id} className={`p-4 rounded-xl flex flex-col justify-between ${themeValues.card}`}>
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-zinc-500">PROJECT REGISTRY</span>
                          <h4 className="text-xs font-bold text-zinc-200">{proj.title}</h4>
                          <p className="text-[11px] opacity-75 leading-relaxed">{proj.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.techTags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[9px] font-mono bg-zinc-950/40 text-zinc-400 py-0.5 px-1 border border-zinc-850 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {data.projects.length === 0 && <p className="text-xs text-zinc-550 italic">No projects showcase added.</p>}
                  </div>
                </div>

                {/* Technology Stack Grid */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-zinc-850 pb-2">
                    <Code className={`h-4.5 w-4.5 ${themeValues.accentText}`} />
                    <h3 className="text-sm font-bold uppercase font-mono text-zinc-150">ARCHITECTURAL SKILLS</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((s) => (
                      <span key={s.id} className={`text-[10px] py-1 px-2 rounded-lg font-medium font-mono ${themeValues.badge}`}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industrial Trace */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-zinc-850 pb-2">
                    <Briefcase className={`h-4.5 w-4.5 ${themeValues.accentText}`} />
                    <h3 className="text-sm font-bold uppercase font-mono text-zinc-150">WORK EXPERIENCES</h3>
                  </div>

                  <div className="space-y-4">
                    {data.experiences.map((exp) => (
                      <div key={exp.id} className="p-3 bg-zinc-900/40 border border-zinc-855 rounded-xl space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-zinc-250">{exp.role}</span>
                          <span className="text-[10px] font-mono text-zinc-500">{exp.period}</span>
                        </div>
                        <p className="text-[11px] text-indigo-400 font-mono">{exp.company}</p>
                        <p className="text-xs opacity-75 mt-1 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                    {data.experiences.length === 0 && <p className="text-xs text-zinc-550 italic">Employment trace is currently empty.</p>}
                  </div>
                </div>

                {/* Degrees Formal studies */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center gap-2 border-b border-zinc-850 pb-2">
                    <GraduationCap className={`h-4.5 w-4.5 ${themeValues.accentText}`} />
                    <h3 className="text-sm font-bold uppercase font-mono text-zinc-150">ACADEMIC CREDENTIALS</h3>
                  </div>

                  <div className="space-y-3">
                    {data.educations.map((edu) => (
                      <div key={edu.id} className="text-xs flex justify-between items-center p-2 rounded hover:bg-zinc-900 font-mono">
                        <div>
                          <span className="text-zinc-400 font-bold">{edu.degree}</span>
                          <span className="text-zinc-650 px-1">at</span>
                          <span className="text-zinc-300">{edu.school}</span>
                        </div>
                        <span className="text-[10px] text-zinc-550">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
