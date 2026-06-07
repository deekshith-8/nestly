'use client';

import React, { useState } from "react";
import Form from "../components/Form";
import Preview from "../components/Preview";
import { defaultPortfolioData } from "../lib/defaultPortfolioData";
import { PortfolioData, FontSettings } from "../types/portfolio";
import { Code, Terminal, Copy, X, Check, Monitor, Tablet, Smartphone, RefreshCcw, BookOpen, Type, ChevronDown } from "lucide-react";

const FONTS = ["Inter", "Roboto", "Poppins", "Playfair Display", "Space Grotesk", "Fira Code", "Merriweather", "Montserrat", "Raleway", "monospace"];
const SIZES = {
  name: ["2rem", "2.5rem", "3rem", "3.5rem", "4rem"],
  section: ["0.7rem", "0.8rem", "0.875rem", "1rem", "1.125rem"],
  body: ["0.65rem", "0.7rem", "0.75rem", "0.8rem", "0.875rem"],
  skills: ["0.6rem", "0.65rem", "0.7rem", "0.75rem", "0.8rem"]
};

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFontToolbarOpen, setIsFontToolbarOpen] = useState(false);

  const handleReset = () => {
    if (confirm("Reset to default?")) setPortfolioData(defaultPortfolioData);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const updateFont = (key: keyof FontSettings, value: string) => {
    setPortfolioData(prev => ({ ...prev, fonts: { ...prev.fonts, [key]: value } }));
  };

  const generateRawHtml = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioData.name || 'Portfolio'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; color: #fff; font-family: 'Inter', sans-serif; }
    .accent { color: #c6f135; }
    .fn { font-size: ${portfolioData.fonts.nameSize}; font-weight: 900; line-height: 0.9; letter-spacing: -0.03em; text-transform: uppercase; }
    .fs { font-size: ${portfolioData.fonts.sectionSize}; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
    .fb { font-size: ${portfolioData.fonts.bodySize}; color: #666; line-height: 1.7; }
    .fsk { font-family: 'Fira Code', monospace; font-size: ${portfolioData.fonts.skillsSize}; }
    .tag { border: 1px solid #222; color: #555; padding: 4px 10px; border-radius: 999px; font-size: 11px; }
    .tag:hover { border-color: #c6f135; color: #c6f135; transition: all 0.2s; }
    .dot { width: 6px; height: 6px; background: #c6f135; border-radius: 50%; display: inline-block; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; border-bottom: 1px solid #111; }
    .nav-logo { font-size: 18px; font-weight: 900; letter-spacing: -0.03em; }
    .nav-links { display: flex; gap: 32px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; }
    .nav-links a:hover { color: #fff; }
    .btn-primary { background: #c6f135; color: #000; font-weight: 700; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; padding: 10px 20px; border: none; cursor: pointer; }
    .btn-outline { border: 1px solid #333; color: #fff; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; padding: 10px 20px; background: transparent; cursor: pointer; }
    main { max-width: 1100px; margin: 0 auto; padding: 80px 48px; }
    .hero { margin-bottom: 80px; }
    .hero-badge { display: flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #c6f135; margin-bottom: 24px; }
    .hero-name { font-size: clamp(72px, 12vw, 140px); font-weight: 900; line-height: 0.88; letter-spacing: -0.04em; text-transform: uppercase; margin-bottom: 24px; }
    .hero-name .line2 { color: #c6f135; }
    .section-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #333; margin-bottom: 32px; border-bottom: 1px solid #111; padding-bottom: 12px; }
    section { margin-bottom: 72px; }
  </style>
</head>
<body>
  <nav>
    <div class="nav-logo">N.</div>
    <div class="nav-links">
      <a href="#skills">Skills</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#education">Education</a>
    </div>
    <div style="display:flex;gap:8px;">
      <a href="mailto:${portfolioData.email}" class="btn-primary">Hire Me</a>
      ${portfolioData.resumeUrl ? `<a href="${portfolioData.resumeUrl}" class="btn-outline">Resume ↗</a>` : ''}
    </div>
  </nav>
  <main>
    <div class="hero">
      <div class="hero-badge"><span class="dot"></span> Available · ${portfolioData.title} · ${portfolioData.location}</div>
      <div class="hero-name">
        <div>${portfolioData.name?.split(' ')[0] || 'YOUR'}</div>
        <div class="line2">${portfolioData.name?.split(' ').slice(1).join(' ') || 'NAME'}</div>
      </div>
      <p class="fb" style="max-width:480px;margin-bottom:32px;">${portfolioData.bio}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="#projects" class="btn-primary">View Projects</a>
        <a href="mailto:${portfolioData.email}" class="btn-outline">Get in touch →</a>
        ${portfolioData.github ? `<a href="${portfolioData.github}" class="btn-outline">GitHub ↗</a>` : ''}
      </div>
    </div>

    <section id="skills">
      <div class="section-label">Skills</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${portfolioData.skills.map(s => `<span class="tag fsk">${s.name}</span>`).join('')}</div>
    </section>

    <section id="experience">
      <div class="section-label">Experience</div>
      <div style="display:flex;flex-direction:column;gap:40px;">${portfolioData.experiences.map((exp, i) => `
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:11px;color:#333;font-family:'Fira Code',monospace;">${String(i+1).padStart(2,'0')}</span>
              <span style="font-weight:700;font-size:16px;">${exp.role}</span>
            </div>
            <span style="font-size:11px;color:#333;font-family:'Fira Code',monospace;">${exp.period}</span>
          </div>
          <p style="font-size:12px;color:#c6f135;margin-bottom:8px;margin-left:28px;">${exp.company}</p>
          <p class="fb" style="margin-left:28px;">${exp.description}</p>
        </div>`).join('<div style="border-top:1px solid #111;"></div>')}</div>
    </section>

    <section id="projects">
      <div class="section-label">Projects</div>
      <div style="display:flex;flex-direction:column;gap:0;">${portfolioData.projects.map((proj, i) => `
        <div style="padding:32px 0;border-bottom:1px solid #111;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:16px;">
              <span style="font-size:11px;color:#222;font-family:'Fira Code',monospace;">${String(i+1).padStart(2,'0')}</span>
              <div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <h3 style="font-size:20px;font-weight:800;letter-spacing:-0.02em;">${proj.title}</h3>
                  ${proj.featured ? '<span style="font-size:9px;border:1px solid #333;color:#666;padding:2px 8px;font-family:monospace;text-transform:uppercase;">Featured</span>' : ''}
                </div>
                <p class="fb" style="margin-top:4px;">${proj.description}</p>
              </div>
            </div>
            ${proj.link ? `<a href="${proj.link}" style="font-size:11px;color:#333;font-family:'Fira Code',monospace;white-space:nowrap;margin-left:24px;" onmouseover="this.style.color='#c6f135'" onmouseout="this.style.color='#333'">↗ Launch</a>` : ''}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-left:36px;">${proj.techTags.map(t => `<span class="tag fsk">${t}</span>`).join('')}</div>
        </div>`).join('')}</div>
    </section>

    <section id="education">
      <div class="section-label">Education</div>
      <div style="display:flex;flex-direction:column;gap:24px;">${portfolioData.educations.map(edu => `
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <div>
            <p style="font-weight:700;font-size:15px;">${edu.degree}</p>
            <p style="font-size:12px;color:#444;margin-top:2px;">${edu.school}</p>
          </div>
          <span style="font-size:11px;color:#333;font-family:'Fira Code',monospace;">${edu.period}</span>
        </div>`).join('<div style="border-top:1px solid #111;"></div>')}</div>
    </section>

    ${portfolioData.certifications?.length ? `<section><div class="section-label">Certifications</div><div style="display:flex;flex-direction:column;gap:16px;">${portfolioData.certifications.map(c => `<div style="display:flex;justify-content:space-between;align-items:baseline;"><div><p style="font-weight:600;font-size:14px;">${c.name}</p><p style="font-size:12px;color:#444;">${c.issuer}</p></div><span style="font-size:11px;color:#333;font-family:'Fira Code',monospace;">${c.date}</span></div>`).join('<div style="border-top:1px solid #111;"></div>')}</div></section>` : ''}

    ${portfolioData.languages?.length ? `<section><div class="section-label">Languages</div><div style="display:flex;flex-wrap:wrap;gap:8px;">${portfolioData.languages.map(l => `<span class="tag">${l.name} · ${l.proficiency}</span>`).join('')}</div></section>` : ''}
  </main>
</body>
</html>`;

  const codeString = generateRawHtml();

  const getPreviewWidthClass = () => {
    switch (previewMode) {
      case "mobile": return "max-w-[390px] h-[720px] rounded-[36px] border-4 border-zinc-900 shadow-2xl overflow-hidden mt-6";
      case "tablet": return "max-w-[768px] h-[90%] border border-zinc-900 rounded-xl shadow-xl overflow-hidden mt-2";
      default: return "w-full h-full";
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: '#000', color: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #111', background: '#000', height: '48px' }} className="px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>N.</span>
          <span style={{ fontSize: '9px', color: '#333', letterSpacing: '0.15em', fontFamily: 'monospace' }}>PORTFOLIO BUILDER</span>
        </div>

        {/* Preview toggle */}
        <div style={{ background: '#0a0a0a', border: '1px solid #111' }} className="flex items-center rounded-lg p-0.5 gap-0.5">
          {[{ mode: "desktop", Icon: Monitor }, { mode: "tablet", Icon: Tablet }, { mode: "mobile", Icon: Smartphone }].map(({ mode, Icon }) => (
            <button key={mode} type="button" onClick={() => setPreviewMode(mode as any)}
              style={previewMode === mode
                ? { background: '#c6f135', color: '#000' }
                : { color: '#333' }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer capitalize hover:text-white">
              <Icon className="h-3 w-3" />
              <span>{mode}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={handleReset}
            style={{ color: '#333', fontSize: '11px', letterSpacing: '0.08em' }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer hover:text-white">
            <RefreshCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
          <button type="button" onClick={() => setIsExportModalOpen(true)}
            style={{ background: '#c6f135', color: '#000', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase transition-all cursor-pointer hover:opacity-90">
            <Code className="h-3 w-3" />
            <span>Export</span>
          </button>
        </div>
      </nav>

      {/* SPLIT */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT — Form */}
        <div style={{ width: '340px', borderRight: '1px solid #111', background: '#000', overflowY: 'auto' }} className="shrink-0 h-full">
          <Form data={portfolioData} onChange={setPortfolioData} />
        </div>

        {/* RIGHT — Preview */}
        <div style={{ background: '#050505' }} className="flex-1 flex flex-col overflow-hidden">

          {/* Preview bar */}
          <div style={{ borderBottom: '1px solid #111', background: '#000', height: '36px' }} className="px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span style={{ background: '#c6f135', width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block' }} className="animate-pulse" />
              <span style={{ color: '#222', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em' }}>
                {portfolioData.themeId.toUpperCase()} · {portfolioData.layoutId.toUpperCase()}
              </span>
            </div>

            {/* Font toolbar */}
            <div className="relative">
              <button type="button" onClick={() => setIsFontToolbarOpen(!isFontToolbarOpen)}
                style={isFontToolbarOpen
                  ? { background: '#c6f135', color: '#000' }
                  : { color: '#333', border: '1px solid #111' }}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase transition-all cursor-pointer hover:text-white">
                <Type className="h-3 w-3" />
                <span>Type</span>
                <ChevronDown className={`h-2.5 w-2.5 transition-transform ${isFontToolbarOpen ? "rotate-180" : ""}`} />
              </button>

              {isFontToolbarOpen && (
                <div style={{ background: '#000', border: '1px solid #1a1a1a', boxShadow: '0 25px 60px rgba(0,0,0,0.9)' }}
                  className="absolute right-0 top-8 w-72 p-4 space-y-4 z-30">
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Typography</span>
                    <button type="button" onClick={() => setIsFontToolbarOpen(false)} style={{ color: '#333' }} className="hover:text-white transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {([
                    { label: "Name", fontKey: "nameFont", sizeKey: "nameSize", sizes: SIZES.name },
                    { label: "Sections", fontKey: "sectionFont", sizeKey: "sectionSize", sizes: SIZES.section },
                    { label: "Body", fontKey: "bodyFont", sizeKey: "bodySize", sizes: SIZES.body },
                    { label: "Skills", fontKey: "skillsFont", sizeKey: "skillsSize", sizes: SIZES.skills },
                  ] as { label: string; fontKey: keyof FontSettings; sizeKey: keyof FontSettings; sizes: string[] }[]).map(({ label, fontKey, sizeKey, sizes }) => (
                    <div key={fontKey} className="space-y-1.5">
                      <span style={{ color: '#333', fontSize: '9px', letterSpacing: '0.15em', fontFamily: 'monospace', textTransform: 'uppercase' }} className="block">{label}</span>
                      <div className="flex gap-1.5">
                        <select value={portfolioData.fonts[fontKey]} onChange={(e) => updateFont(fontKey, e.target.value)}
                          style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', color: '#888', fontSize: '11px' }}
                          className="flex-1 rounded px-2 py-1.5 focus:outline-none focus:border-yellow-400">
                          {FONTS.map(f => <option key={f} value={f} style={{ background: '#000' }}>{f}</option>)}
                        </select>
                        <select value={portfolioData.fonts[sizeKey]} onChange={(e) => updateFont(sizeKey, e.target.value)}
                          style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', color: '#888', fontSize: '11px' }}
                          className="w-16 rounded px-2 py-1.5 focus:outline-none focus:border-yellow-400">
                          {sizes.map(s => <option key={s} value={s} style={{ background: '#000' }}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className={`flex-1 flex items-center justify-center overflow-hidden ${previewMode !== "desktop" ? "p-8" : ""}`}
            style={{ background: previewMode !== "desktop" ? '#000' : '#050505' }}>
            <div className={`transition-all duration-300 ease-out ${getPreviewWidthClass()}`}>
              <Preview data={portfolioData} />
            </div>
          </div>
        </div>
      </div>

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(4px)' }} className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div style={{ background: '#000', border: '1px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,0.9)' }} className="rounded w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div style={{ borderBottom: '1px solid #111' }} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal style={{ color: '#c6f135' }} className="h-4 w-4" />
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '13px', letterSpacing: '-0.01em' }}>Export Portfolio</h3>
                  <p style={{ color: '#333', fontSize: '11px', fontFamily: 'monospace' }}>Standalone HTML · Deploy anywhere</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsExportModalOpen(false)} style={{ color: '#333' }} className="hover:text-white transition-colors cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ color: '#333', fontFamily: 'monospace', fontSize: '11px' }}>output.html</span>
                <button type="button" onClick={() => handleCopyCode(codeString)}
                  style={{ background: '#c6f135', color: '#000', fontWeight: 700, fontSize: '11px' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase cursor-pointer hover:opacity-90 transition-all">
                  {isCopied ? <><Check className="h-3 w-3" /><span>Copied!</span></> : <><Copy className="h-3 w-3" /><span>Copy HTML</span></>}
                </button>
              </div>
              <div style={{ background: '#050505', border: '1px solid #111' }} className="rounded p-4 overflow-x-auto">
                <pre style={{ color: '#333', fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.6' }} className="select-all"><code>{codeString}</code></pre>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #111' }} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5" style={{ color: '#222', fontSize: '11px', fontFamily: 'monospace' }}>
                <BookOpen className="h-3 w-3" />
                <span>Fonts via Google Fonts CDN</span>
              </div>
              <span style={{ color: '#1a1a1a', fontFamily: 'monospace', fontSize: '10px' }}>NESTLY ENGINE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}