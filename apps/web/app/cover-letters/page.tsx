"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";

export default function CoverLettersPage() {
  // Local state only — no backend calls
  const [tone, setTone] = useState<"engineering" | "executive" | "concise">("engineering");
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    "Distributed Systems",
    "AST / Compilers",
    "Design Token Governance",
  ]);
  const [lengthMode, setLengthMode] = useState<"compact" | "standard">("standard");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleFocus = (item: string) => {
    if (selectedFocus.includes(item)) {
      setSelectedFocus(selectedFocus.filter((i) => i !== item));
    } else {
      setSelectedFocus([...selectedFocus, item]);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    // TODO: wire to POST /cover-letter/generate
    // e.g. const res = await fetch('/api/cover-letter/generate', { method: 'POST', body: JSON.stringify({ tone, selectedFocus, lengthMode }) });
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar navigation with active link */}
      <SidebarNav />

      {/* Main Content Pane */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <TopHeader />

        <main className="flex-1 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
          <RadialGlow />

          {/* Headline & Breadcrumb */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                STUDIO V2.4
              </span>
              <span className="text-zinc-500 text-xs font-mono">•</span>
              <span className="text-zinc-400 text-xs font-mono">Semantic Document Synthesis</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  AI Cover Letter Studio
                </h1>
                <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                  Synthesizing candidate resume highlights with Stripe's Staff Frontend Engineer specification.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#14141a] border border-white/10 text-zinc-300">
                  Target: Stripe
                </span>
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                  94% Match Fit
                </span>
              </div>
            </div>
          </div>

          {/* Dual-Pane Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Requisition Parameters & Tuning (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 1: Role Spec Anchor */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">target</span>
                    Target Requisition
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">REQ-84920</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#14141a] border border-white/5 flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">Staff Frontend Engineer</span>
                  <span className="text-xs text-zinc-400 font-mono">Stripe Inc. • San Francisco, CA (Remote)</span>
                </div>
              </div>

              {/* Card 2: Persona Tone & Voice */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-indigo-400">tune</span>
                  Tone & Narrative Voice
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTone("engineering")}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                      tone === "engineering"
                        ? "bg-indigo-950/40 border-indigo-500/60 text-white"
                        : "bg-[#14141a] border-white/5 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">Technical</span>
                    <span className="text-[10px] text-zinc-400 leading-tight">Engineering depth & architecture</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTone("executive")}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                      tone === "executive"
                        ? "bg-indigo-950/40 border-indigo-500/60 text-white"
                        : "bg-[#14141a] border-white/5 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">Strategic</span>
                    <span className="text-[10px] text-zinc-400 leading-tight">Leadership & business impact</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTone("concise")}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                      tone === "concise"
                        ? "bg-indigo-950/40 border-indigo-500/60 text-white"
                        : "bg-[#14141a] border-white/5 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">Direct</span>
                    <span className="text-[10px] text-zinc-400 leading-tight">High density, no boilerplate</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Focus Vector Anchors */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">hub</span>
                    Prioritized Vector Anchors
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {selectedFocus.length} selected
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Distributed Systems",
                    "AST / Compilers",
                    "Design Token Governance",
                    "WebGL & Telemetry",
                    "Sub-100ms Latency Budgets",
                    "Cross-functional Team Lead",
                  ].map((chip) => {
                    const isSelected = selectedFocus.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleFocus(chip)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200 font-medium"
                            : "bg-[#14141a] border-white/5 text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {isSelected ? "check" : "add"}
                        </span>
                        <span>{chip}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card 4: Length Selection & Action Button */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Target Length</span>
                  <div className="flex items-center gap-1 bg-[#14141a] p-1 rounded-lg border border-white/5">
                    <button
                      type="button"
                      onClick={() => setLengthMode("compact")}
                      className={`text-xs px-3 py-1 rounded transition-colors ${
                        lengthMode === "compact"
                          ? "bg-white/10 text-white font-medium"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Compact (~300w)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLengthMode("standard")}
                      className={`text-xs px-3 py-1 rounded transition-colors ${
                        lengthMode === "standard"
                          ? "bg-white/10 text-white font-medium"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Standard (~450w)
                    </button>
                  </div>
                </div>

                {/* Submit / Regenerate */}
                {/* TODO: wire to POST /cover-letter/generate */}
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="w-full bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-semibold py-3 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">
                        refresh
                      </span>
                      <span>Synthesizing Document...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      <span>Regenerate Cover Letter</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Live Letter Preview Canvas (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Document Toolbar */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl px-5 py-3 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-white font-medium">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">
                      article
                    </span>
                    Draft_Cover_Letter_v1.3.md
                  </span>
                  <span>•</span>
                  <span>412 words</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-[#14141a] hover:bg-[#1c1c24] border border-white/10 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copied ? "check" : "content_copy"}
                    </span>
                    <span>{copied ? "Copied" : "Copy Text"}</span>
                  </button>

                  {/* TODO: wire to PDF export */}
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-[#14141a] hover:bg-[#1c1c24] border border-white/10 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">download</span>
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Rendered Letter Canvas Card */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                {/* Visual subtle watermark grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 text-zinc-300 text-sm leading-relaxed font-sans">
                  {/* Sender Header */}
                  <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-bold text-white tracking-tight">Alex Mercer</h2>
                      <p className="text-xs font-mono text-indigo-400">Staff UI Architect & Design Systems Engineer</p>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 sm:text-right">
                      <p>alex.mercer@dev.io</p>
                      <p>+1 (415) 890-3491</p>
                    </div>
                  </div>

                  {/* Metadata / Recipient */}
                  <div className="flex flex-col gap-1 text-xs font-mono text-zinc-400 pt-2">
                    <p>September 6, 2026</p>
                    <p className="text-white font-medium mt-2">Hiring Team, Engineering Leadership</p>
                    <p>Stripe Inc.</p>
                    <p>510 Townsend Street, San Francisco, CA 94103</p>
                  </div>

                  {/* Salutation */}
                  <p className="text-white font-medium pt-2">
                    Dear Stripe Engineering Leadership Team,
                  </p>

                  {/* Paragraph 1: Hook & Core Alignment */}
                  <p>
                    I am writing to express my strong interest in the{" "}
                    <strong className="text-white font-semibold">Staff Frontend Engineer</strong> role
                    at Stripe. Having architected high-throughput financial surfaces and led multi-tenant
                    design system ecosystems, I have spent the last seven years optimizing real-time ledger
                    hydration, sub-100ms render budgets, and compiler-level UI performance at scale.
                  </p>

                  {/* Paragraph 2: Technical Substantiation */}
                  <p>
                    In my recent work scaling core billing infrastructure, I engineered a distributed token
                    synchronization pipeline serving over 40 cross-functional squads. By introducing AST-driven
                    codemods and custom SWC transforms, our team reduced design drift by 70% and eradicated
                    runtime CSS bundle bloat. This mirrors Stripe's mission to furnish rock-solid developer ergonomics
                    alongside uncompromised reliability for mission-critical payment workflows.
                  </p>

                  {/* Paragraph 3: Telemetry and Visual Systems */}
                  <p>
                    Moreover, my experience building WebGL-accelerated analytics canvases and telemetry state stores
                    directly answers your requisition clause for rich, low-latency financial visualizations.
                    I focus deeply on predictable state machines, zero-drift component contracts, and robust fault
                    boundaries that ensure users never experience broken payment frames during network blips.
                  </p>

                  {/* Paragraph 4: Closing */}
                  <p>
                    Stripe continues to define the benchmark for developer velocity and interface elegance.
                    I welcome the opportunity to discuss how my expertise in distributed frontend architectures
                    can advance your next generation of dashboard and ledger tooling.
                  </p>

                  {/* Sign-off */}
                  <div className="pt-4 flex flex-col gap-1">
                    <p className="text-zinc-400">Sincerely,</p>
                    <p className="text-white font-semibold mt-2">Alex Mercer</p>
                    <p className="text-xs font-mono text-zinc-500">github.com/alexmercer • linkedin.com/in/alexmercer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
