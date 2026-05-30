'use client';

import React, { useState } from "react";
import Form from "../components/Form";
import Preview from "../components/Preview";
import { defaultPortfolioData } from "../lib/defaultPortfolioData";
import { PortfolioData } from "../types/portfolio";
import { 
  Code, 
  Terminal, 
  Download, 
  Copy, 
  X, 
  Check, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Database, 
  Sparkles,
  RefreshCcw,
  BookOpen
} from "lucide-react";

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleReset = () => {
    if (confirm("Reset layout to default sample portfolio data?")) {
      setPortfolioData(defaultPortfolioData);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateRawHtml = () => {
    // Generates a fully compiled standalone tailwind html template representing their site
    const themeName = portfolioData.themeId.toUpperCase();
    const layoutName = portfolioData.layoutId.toUpperCase();
    
    return `<!-- 
  Nestly Standalone Compiled Portfolio Website 
  Theme: ${themeName} | Layout: ${layoutName}
  Compiled on: ${new Date().toLocaleDateString()}
  Ready to deploy with Tailwind CSS CDN
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name || 'Alex Carter'} - ${portfolioData.title || 'Portfolio'}</title>
    <!-- Tailwind CSS Play CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .theme-font-mono {
            font-family: 'Fira Code', monospace;
        }
    </style>
</head>
<body class="${portfolioData.themeId === "neon" ? "bg-[#09090b]" : portfolioData.themeId === "editorial" ? "bg-[#0f0e0c]" : portfolioData.themeId === "emerald" ? "bg-[#040d0a]" : "bg-[#090d16]"} text-zinc-100 min-h-screen">
    
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <!-- HEADER / HERO -->
        <header class="flex flex-col md:flex-row items-center gap-8 border border-zinc-850 p-6 md:p-8 rounded-2xl bg-zinc-900/40">
            <img src="${portfolioData.profileImage || 'https://picsum.photos/seed/alex/400/400'}" alt="${portfolioData.name}" class="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover border-2 border-zinc-800">
            <div class="space-y-3 flex-1 text-center md:text-left">
                <div>
                    <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wider">AVAILABLE FOR PROJECTS</span>
                    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white">${portfolioData.name || 'Alex Carter'}</h1>
                    <p class="text-sm md:text-base font-semibold text-indigo-400 mt-0.5">${portfolioData.title || 'Full Stack Architect'}</p>
                </div>
                <p class="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl">${portfolioData.bio || 'Summary Statement'}</p>
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-zinc-500">
                    <span>📍 ${portfolioData.location || 'San Francisco, CA'}</span>
                    <span>✉️ ${portfolioData.email || 'alex@domain.com'}</span>
                </div>
            </div>
        </header>

        <!-- STACKS & INFORMATION -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- SKILLS -->
            <section class="border border-zinc-850 p-6 rounded-2xl bg-zinc-900/20 space-y-4">
                <h3 class="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">⚡ Technology Inventory</h3>
                <div class="flex flex-wrap gap-1.5">
                    ${portfolioData.skills.map(s => `<span class="text-xs py-1 px-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-md font-medium">${s.name}</span>`).join('\n                    ')}
                </div>
            </section>

            <!-- ACADEMICS -->
            <section class="border border-zinc-850 p-6 rounded-2xl bg-zinc-900/20 space-y-4">
                <h3 class="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">🎓 Education Chronology</h3>
                <div class="space-y-4">
                    ${portfolioData.educations.map(edu => `
                    <div class="text-xs space-y-0.5">
                        <div class="flex justify-between items-center text-zinc-400">
                            <span class="font-bold text-zinc-200">${edu.degree}</span>
                            <span>${edu.period}</span>
                        </div>
                        <p class="text-[11px] text-zinc-500">${edu.school}</p>
                    </div>`).join('') || '<p class="text-xs text-zinc-500 italic">No education provided</p>'}
                </div>
            </section>
        </div>

        <!-- EXPERIENCES -->
        <section class="border border-zinc-850 p-6 rounded-2xl bg-zinc-900/20 space-y-6">
            <h3 class="text-base font-bold text-white uppercase tracking-wider">💼 Professional Timelines</h3>
            <div class="space-y-6 border-l border-zinc-800 pl-4 ml-2">
                ${portfolioData.experiences.map(exp => `
                <div class="relative space-y-1">
                    <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-zinc-800 border-2 border-zinc-905"></span>
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-bold text-zinc-200">${exp.role}</span>
                        <span class="text-zinc-500 font-mono">${exp.period}</span>
                    </div>
                    <p class="text-xs text-indigo-400 font-medium">${exp.company}</p>
                    <p class="text-xs text-zinc-400 leading-relaxed">${exp.description}</p>
                </div>`).join('') || '<p class="text-xs text-zinc-500 italic">No experience provided</p>'}
            </div>
        </section>

        <!-- PROJECTS -->
        <section class="space-y-4">
            <h3 class="text-base font-bold text-white uppercase tracking-wider text-center">📂 Project Showcase</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${portfolioData.projects.map(proj => `
                <div class="border border-zinc-850 rounded-2xl overflow-hidden bg-zinc-900/30 flex flex-col justify-between p-5 space-y-4">
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-[9px] font-mono tracking-wider text-zinc-500">PROJECT EMBED</span>
                            ${proj.featured ? `<span class="bg-indigo-650/40 text-[9px] font-bold text-indigo-300 px-2 py-0.5 rounded font-mono uppercase">FEATURED</span>` : ''}
                        </div>
                        <h4 class="text-sm font-semibold text-white">${proj.title}</h4>
                        <p class="text-xs text-zinc-400 leading-relaxed">${proj.description}</p>
                    </div>
                    <div class="space-y-3">
                        <div class="flex flex-wrap gap-1">
                            ${proj.techTags.map(tag => `<span class="text-[9px] px-1.5 py-0.5 rounded bg-zinc-950/60 border border-zinc-900 text-zinc-500 font-mono">${tag}</span>`).join('')}
                        </div>
                        ${proj.link ? `<a href="${proj.link}" target="_blank" class="text-xs text-indigo-400 font-medium hover:underline inline-flex items-center gap-1">Launch Source ↗</a>` : ''}
                    </div>
                </div>`).join('\n                ')}
            </div>
        </section>
    </main>
</body>
</html>`;
  };

  const codeString = generateRawHtml();

  const getPreviewWidthClass = () => {
    switch (previewMode) {
      case "mobile":
        return "max-w-[395px] h-[720px] rounded-3xl border-8 border-zinc-800 shadow-2xl relative mt-4";
      case "tablet":
        return "max-w-[768px] h-[92%] border-4 border-zinc-800 rounded-2xl shadow-xl mt-2";
      case "desktop":
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden" id="applet-dashboard">
      {/* Top Banner Control Panel */}
      <header className="h-15 px-6 bg-[#0c0d12]/90 backdrop-blur-xl border-b border-zinc-850/60 flex items-center justify-between z-10 select-none relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-3 select-none group">
          <div className="relative flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all duration-300">
            <div className="absolute inset-0.5 rounded-[10px] bg-[#0c0d12]/92 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l8 4.5v9L12 21L4 16.5v-9L12 3z" />
                <path d="M12 3v18" className="opacity-40" />
                <path d="M12 12l8-4.5" className="opacity-40" />
                <path d="M12 12L4 7.5" className="opacity-40" />
                <circle cx="12" cy="12" r="2" className="fill-indigo-400 stroke-none group-hover:fill-indigo-300 transition-colors" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold tracking-tight text-white m-0 flex items-center gap-1 font-sans">
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">Nestly</span>
            </h2>
            <span className="text-[9px] font-mono font-semibold tracking-wider bg-indigo-550/10 text-indigo-300 border border-indigo-500/10 py-0.5 px-2 rounded-full">v2.0</span>
          </div>
        </div>

        {/* Center Canvas Dimension Controls */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-950 border border-zinc-850/80 p-1 rounded-xl text-zinc-400 shadow-inner">
          <button
            type="button"
            onClick={() => setPreviewMode("desktop")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              previewMode === "desktop" ? "bg-zinc-900 text-indigo-400 border border-zinc-800 shadow-sm" : "hover:text-zinc-200 border border-transparent"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("tablet")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              previewMode === "tablet" ? "bg-zinc-900 text-indigo-400 border border-zinc-800 shadow-sm" : "hover:text-zinc-200 border border-transparent"
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("mobile")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              previewMode === "mobile" ? "bg-zinc-900 text-indigo-400 border border-zinc-800 shadow-sm" : "hover:text-zinc-200 border border-transparent"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 border border-zinc-800 hover:border-zinc-750 bg-zinc-950/65 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            title="Reset to default example"
          >
            <RefreshCcw className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline text-[11px]">Clear Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-semibold text-white rounded-lg transition-all duration-250 text-xs flex items-center gap-2 shadow-lg shadow-indigo-650/20 active:scale-[0.98] cursor-pointer"
          >
            <Code className="h-4 w-4 text-indigo-100" />
            <span>Assemble Code</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Grid split */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative" id="layout-split-grid">
        {/* Left Interactive form layout */}
        <div className="w-full md:w-[385px] lg:w-[415px] xl:w-[440px] shrink-0 h-full">
          <Form data={portfolioData} onChange={(newData) => setPortfolioData(newData)} />
        </div>

        {/* Right Preview canvas stage wrapper */}
        <div className="flex-1 bg-zinc-950 flex items-center justify-center p-4 overflow-hidden relative">
          <div className="absolute top-2 left-4 text-[10px] font-mono text-zinc-600 flex items-center gap-1.5 select-none z-10 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block animate-pulse" />
            <span>ACTIVE WEB CANVAS STATE FLUID: {portfolioData.themeId.toUpperCase()} / {portfolioData.layoutId.toUpperCase()}</span>
          </div>

          <div className={`transition-all duration-300 ease-out flex items-center justify-center w-full h-full ${
            previewMode !== "desktop" ? "bg-zinc-900/40 p-12 border border-zinc-900/40 rounded-3xl" : ""
          }`}>
            <div className={`transition-all duration-300 ease-out ${getPreviewWidthClass()}`}>
              <Preview data={portfolioData} />
            </div>
          </div>
        </div>
      </main>

      {/* Assemble Standalone Code Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-55 p-4" id="export-code-overlay">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[82vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-indigo-550/15 rounded-lg text-indigo-400">
                  <Terminal className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Your Standalone Website Page</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5 leading-none">Complete standalone HTML, tailored beautifully with Tailwind CSS and premium styles.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-850 rounded-lg text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Code Panel */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px] bg-zinc-950 px-2 py-1 rounded border border-zinc-850">output.html</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCode(codeString)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-505 rounded-lg text-white font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy HTML</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-850 overflow-x-auto text-left">
                <pre className="text-xs text-zinc-300 font-mono leading-relaxed select-all">
                  <code>{codeString}</code>
                </pre>
              </div>
            </div>

            {/* Footer informational */}
            <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between select-none">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-zinc-600" />
                <span>Need a database? Set up persistent Cloud Firestore integration.</span>
              </div>
              <span className="text-zinc-600">Tailwind Engine Standalone Output</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
