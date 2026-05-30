'use client';

import React, { useState } from "react";
import Form from "../components/Form";
import Preview from "../components/Preview";
import { defaultPortfolioData } from "../lib/defaultPortfolioData";
import { PortfolioData, FontSettings } from "../types/portfolio";
import {
  Code, Terminal, Copy, X, Check, Monitor, Tablet, Smartphone,
  RefreshCcw, BookOpen, Type, ChevronDown
} from "lucide-react";

const FONTS = ["Inter", "Roboto", "Poppins", "Playfair Display", "Space Grotesk", "Fira Code", "Merriweather", "Montserrat", "Raleway", "monospace"];
const SIZES = { name: ["2rem", "2.5rem", "3rem", "3.5rem", "4rem"], section: ["0.7rem", "0.8rem", "0.875rem", "1rem", "1.125rem"], body: ["0.65rem", "0.7rem", "0.75rem", "0.8rem", "0.875rem"], skills: ["0.6rem", "0.65rem", "0.7rem", "0.75rem", "0.8rem"] };

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFontToolbarOpen, setIsFontToolbarOpen] = useState(false);

  const handleReset = () => {
    if (confirm("Reset to default sample portfolio data?")) setPortfolioData(defaultPortfolioData);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const updateFont = (key: keyof FontSettings, value: string) => {
    setPortfolioData(prev => ({ ...prev, fonts: { ...prev.fonts, [key]: value } }));
  };

  const generateRawHtml = () => {
    const themeName = portfolioData.themeId.toUpperCase();
    const layoutName = portfolioData.layoutId.toUpperCase();
    return `<!-- Nestly Portfolio | Theme: ${themeName} | Layout: ${layoutName} | ${new Date().toLocaleDateString()} -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name || 'Portfolio'} - ${portfolioData.title || ''}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <style>
      .font-name { font-family: '${portfolioData.fonts.nameFont}', sans-serif; font-size: ${portfolioData.fonts.nameSize}; }
      .font-section { font-family: '${portfolioData.fonts.sectionFont}', sans-serif; font-size: ${portfolioData.fonts.sectionSize}; }
      .font-body { font-family: '${portfolioData.fonts.bodyFont}', sans-serif; font-size: ${portfolioData.fonts.bodySize}; }
      .font-skills { font-family: '${portfolioData.fonts.skillsFont}', monospace; font-size: ${portfolioData.fonts.skillsSize}; }
      body { font-family: '${portfolioData.fonts.bodyFont}', sans-serif; }
    </style>
</head>
<body class="${portfolioData.themeId === "neon" ? "bg-[#09090b]" : portfolioData.themeId === "editorial" ? "bg-[#0f0e0c]" : portfolioData.themeId === "emerald" ? "bg-[#040d0a]" : "bg-[#090d16]"} text-zinc-100 min-h-screen">
  <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
    <header class="flex flex-col md:flex-row items-center gap-8 border border-zinc-800 p-6 md:p-8 rounded-2xl bg-zinc-900/40">
      <img src="${portfolioData.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun'}" alt="${portfolioData.name}" class="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover border-2 border-zinc-800">
      <div class="space-y-3 flex-1 text-center md:text-left">
        <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Available for Projects</span>
        <h1 class="font-name font-extrabold tracking-tight text-white">${portfolioData.name || 'Your Name'}</h1>
        <p class="font-section font-semibold text-indigo-400">${portfolioData.title || 'Your Title'}</p>
        <p class="font-body text-zinc-400 leading-relaxed max-w-2xl">${portfolioData.bio || ''}</p>
        <div class="flex flex-wrap gap-4 text-xs text-zinc-500 justify-center md:justify-start">
          <span>📍 ${portfolioData.location || ''}</span>
          <span>✉️ ${portfolioData.email || ''}</span>
          ${portfolioData.phone ? `<span>📱 ${portfolioData.phone}</span>` : ''}
        </div>
      </div>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section class="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/20 space-y-4">
        <h3 class="font-section font-bold text-white uppercase tracking-wider">⚡ Skills</h3>
        <div class="flex flex-wrap gap-1.5">${portfolioData.skills.map(s => `<span class="font-skills py-1 px-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-md">${s.name}</span>`).join('')}</div>
      </section>
      <section class="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/20 space-y-4">
        <h3 class="font-section font-bold text-white uppercase tracking-wider">🎓 Education</h3>
        <div class="space-y-3">${portfolioData.educations.map(edu => `<div class="font-body"><div class="flex justify-between text-zinc-400"><span class="font-bold text-zinc-200">${edu.degree}</span><span>${edu.period}</span></div><p class="text-zinc-500">${edu.school}</p></div>`).join('')}</div>
      </section>
    </div>
    <section class="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/20 space-y-6">
      <h3 class="font-section font-bold text-white uppercase tracking-wider">💼 Experience</h3>
      <div class="space-y-6 border-l border-zinc-800 pl-4 ml-2">${portfolioData.experiences.map(exp => `<div class="font-body relative space-y-1"><span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-zinc-800 border-2 border-zinc-900"></span><div class="flex justify-between text-xs"><span class="font-bold text-zinc-200">${exp.role}</span><span class="text-zinc-500">${exp.period}</span></div><p class="text-indigo-400">${exp.company}</p><p class="text-zinc-400">${exp.description}</p></div>`).join('')}</div>
    </section>
    <section class="space-y-4">
      <h3 class="font-section font-bold text-white uppercase tracking-wider text-center">📂 Projects</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">${portfolioData.projects.map(proj => `<div class="border border-zinc-800 rounded-2xl bg-zinc-900/30 p-5 space-y-3"><div class="flex justify-between"><span class="text-[9px] font-mono text-zinc-500">PROJECT</span>${proj.featured ? '<span class="text-[9px] font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-900/40">FEATURED</span>' : ''}</div><h4 class="font-section font-semibold text-white">${proj.title}</h4><p class="font-body text-zinc-400">${proj.description}</p><div class="flex flex-wrap gap-1">${proj.techTags.map(tag => `<span class="font-skills px-1.5 py-0.5 rounded bg-zinc-950/60 border border-zinc-900 text-zinc-500">${tag}</span>`).join('')}</div>${proj.link ? `<a href="${proj.link}" target="_blank" class="text-xs text-indigo-400 font-medium hover:underline">Launch ↗</a>` : ''}</div>`).join('')}</div>
    </section>
    ${portfolioData.certifications?.length ? `<section class="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/20 space-y-4"><h3 class="font-section font-bold text-white uppercase tracking-wider">🏆 Certifications</h3><div class="space-y-3">${portfolioData.certifications.map(c => `<div class="font-body flex justify-between items-center"><div><span class="font-bold text-zinc-200">${c.name}</span><p class="text-zinc-500">${c.issuer}</p></div><span class="text-zinc-500">${c.date}</span></div>`).join('')}</div></section>` : ''}
    ${portfolioData.languages?.length ? `<section class="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/20 space-y-4"><h3 class="font-section font-bold text-white uppercase tracking-wider">🌐 Languages</h3><div class="flex flex-wrap gap-2">${portfolioData.languages.map(l => `<span class="font-body px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">${l.name} <span class="text-zinc-500">· ${l.proficiency}</span></span>`).join('')}</div></section>` : ''}
    ${portfolioData.volunteers?.length ? `<section class="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/20 space-y-4"><h3 class="font-section font-bold text-white uppercase tracking-wider">❤️ Volunteer</h3><div class="space-y-4">${portfolioData.volunteers.map(v => `<div class="font-body space-y-1"><div class="flex justify-between"><span class="font-bold text-zinc-200">${v.role}</span><span class="text-zinc-500">${v.period}</span></div><p class="text-indigo-400">${v.organization}</p><p class="text-zinc-400">${v.description}</p></div>`).join('')}</div></section>` : ''}
  </main>
</body>
</html>`;
  };

  const codeString = generateRawHtml();

  const getPreviewWidthClass = () => {
    switch (previewMode) {
      case "mobile": return "max-w-[395px] h-[720px] rounded-3xl border-8 border-zinc-800 shadow-2xl relative mt-4";
      case "tablet": return "max-w-[768px] h-[92%] border-4 border-zinc-800 rounded-2xl shadow-xl mt-2";
      default: return "w-full h-full";
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Top Header */}
      <header className="h-14 px-6 bg-[#0c0d12]/90 backdrop-blur-xl border-b border-zinc-850/60 flex items-center justify-between z-10 select-none relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="absolute inset-0.5 rounded-[10px] bg-[#0c0d12]/92 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l8 4.5v9L12 21L4 16.5v-9L12 3z" />
                <circle cx="12" cy="12" r="2" className="fill-indigo-400 stroke-none" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold tracking-tight text-white">
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">Nestly</span>
            </h2>
            <span className="text-[9px] font-mono font-semibold tracking-wider bg-indigo-550/10 text-indigo-300 border border-indigo-500/10 py-0.5 px-2 rounded-full">v2.0</span>
          </div>
        </div>

        {/* Center preview mode */}
        <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-850/80 p-1 rounded-xl text-zinc-400 shadow-inner">
          {[{ mode: "desktop", Icon: Monitor }, { mode: "tablet", Icon: Tablet }, { mode: "mobile", Icon: Smartphone }].map(({ mode, Icon }) => (
            <button key={mode} type="button" onClick={() => setPreviewMode(mode as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${previewMode === mode ? "bg-zinc-900 text-indigo-400 border border-zinc-800 shadow-sm" : "hover:text-zinc-200 border border-transparent"}`}>
              <Icon className="h-3.5 w-3.5" />
              <span className="capitalize">{mode}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={handleReset}
            className="px-2.5 py-1.5 border border-zinc-800 bg-zinc-950/65 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer">
            <RefreshCcw className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline text-[11px]">Clear Canvas</span>
          </button>
          <button type="button" onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-semibold text-white rounded-lg transition-all text-xs flex items-center gap-2 shadow-lg cursor-pointer">
            <Code className="h-4 w-4 text-indigo-100" />
            <span>Assemble Code</span>
          </button>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <div className="w-full md:w-[385px] lg:w-[415px] xl:w-[440px] shrink-0 h-full">
          <Form data={portfolioData} onChange={setPortfolioData} />
        </div>

        <div className="flex-1 bg-zinc-950 flex items-center justify-center p-4 overflow-hidden relative">
          {/* Status label */}
          <div className="absolute top-2 left-4 text-[10px] font-mono text-zinc-600 flex items-center gap-1.5 select-none z-10 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block animate-pulse" />
            <span>CANVAS: {portfolioData.themeId.toUpperCase()} / {portfolioData.layoutId.toUpperCase()}</span>
          </div>

          {/* Font Toolbar */}
          <div className="absolute top-2 right-4 z-20">
            <button type="button" onClick={() => setIsFontToolbarOpen(!isFontToolbarOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-lg text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer">
              <Type className="h-3.5 w-3.5 text-indigo-400" />
              <span>Fonts</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isFontToolbarOpen ? "rotate-180" : ""}`} />
            </button>

            {isFontToolbarOpen && (
              <div className="absolute right-0 top-10 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">Typography Settings</span>
                  <button type="button" onClick={() => setIsFontToolbarOpen(false)} className="text-zinc-500 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {([
                  { label: "Name Font", fontKey: "nameFont", sizeKey: "nameSize", sizes: SIZES.name },
                  { label: "Section Titles", fontKey: "sectionFont", sizeKey: "sectionSize", sizes: SIZES.section },
                  { label: "Body Text", fontKey: "bodyFont", sizeKey: "bodySize", sizes: SIZES.body },
                  { label: "Skills Tags", fontKey: "skillsFont", sizeKey: "skillsSize", sizes: SIZES.skills },
                ] as { label: string; fontKey: keyof FontSettings; sizeKey: keyof FontSettings; sizes: string[] }[]).map(({ label, fontKey, sizeKey, sizes }) => (
                  <div key={fontKey} className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">{label}</label>
                    <div className="flex gap-2">
                      <select value={portfolioData.fonts[fontKey]} onChange={(e) => updateFont(fontKey, e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <select value={portfolioData.fonts[sizeKey]} onChange={(e) => updateFont(sizeKey, e.target.value)}
                        className="w-24 bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <p className="text-[11px] text-zinc-500 truncate" style={{ fontFamily: portfolioData.fonts[fontKey], fontSize: "12px" }}>
                      Preview: {label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`transition-all duration-300 ease-out flex items-center justify-center w-full h-full ${previewMode !== "desktop" ? "bg-zinc-900/40 p-12 border border-zinc-900/40 rounded-3xl" : ""}`}>
            <div className={`transition-all duration-300 ease-out ${getPreviewWidthClass()}`}>
              <Preview data={portfolioData} />
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[82vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-indigo-500/15 rounded-lg text-indigo-400"><Terminal className="h-4 w-4" /></span>
                <div>
                  <h3 className="text-sm font-bold text-white">Your Standalone Portfolio</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Complete HTML with your fonts, theme and content.</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsExportModalOpen(false)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px] bg-zinc-950 px-2 py-1 rounded border border-zinc-800">output.html</span>
                <button type="button" onClick={() => handleCopyCode(codeString)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold flex items-center gap-1.5 cursor-pointer">
                  {isCopied ? <><Check className="h-3.5 w-3.5" /><span>Copied!</span></> : <><Copy className="h-3.5 w-3.5" /><span>Copy HTML</span></>}
                </button>
              </div>
              <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 overflow-x-auto">
                <pre className="text-xs text-zinc-300 font-mono leading-relaxed select-all"><code>{codeString}</code></pre>
              </div>
            </div>
            <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
              <div className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-zinc-600" /><span>Fonts loaded via Google Fonts CDN</span></div>
              <span className="text-zinc-600">Nestly Engine Output</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}