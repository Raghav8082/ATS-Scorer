"use client";

import React, { useState } from "react";

interface HeatmapRow {
  id: string;
  category: "all" | "experience" | "skills" | "architecture";
  sectionLeft: string;
  matchScore: number;
  cosTheta: string;
  excerptLeft: string;
  vectorNoteLeft: string;
  sectionRight: string;
  matchTypeRight: string;
  excerptRight: string;
  vectorNoteRight: string;
}

const mockHeatmapRows: HeatmapRow[] = [
  {
    id: "1",
    category: "experience",
    sectionLeft: "§1.1 Experience — Stripe Billing",
    matchScore: 96,
    cosTheta: "0.962 cosθ",
    excerptLeft:
      "Led frontend architecture for Stripe Billing migration to React & Next.js, serving 4M+ daily active sessions with sub-100ms render latency.",
    vectorNoteLeft: "Dominant Vector: Latency & Framework Modernization",
    sectionRight: "Clause A • Core Stack",
    matchTypeRight: "Direct Match",
    excerptRight:
      "Mastery of modern React, WebGL visualizers, and state primitives for high-throughput interfaces.",
    vectorNoteRight: "Key Focus: React, SSR, Latency budgets",
  },
  {
    id: "2",
    category: "architecture",
    sectionLeft: "§1.2 Design Systems & Scale",
    matchScore: 93,
    cosTheta: "0.931 cosθ",
    excerptLeft:
      "Architected multi-tier token synchronization system for 40+ engineering pods, reducing design drift by 70%.",
    vectorNoteLeft: "Dominant Vector: Design Tokens & Micro-frontends",
    sectionRight: "Clause B • Systems Scale",
    matchTypeRight: "Direct Match",
    excerptRight:
      "Proven track record leading design system infrastructure across distributed engineering teams.",
    vectorNoteRight: "Key Focus: Token governance & Pod federation",
  },
  {
    id: "3",
    category: "skills",
    sectionLeft: "§2.1 Projects — AST & Compiler Tools",
    matchScore: 84,
    cosTheta: "0.841 cosθ",
    excerptLeft:
      "Built custom Babel & SWC plugins for tree-shaking dead styling variables across 250k lines of monorepo code.",
    vectorNoteLeft: "Dominant Vector: Compiler Transforms",
    sectionRight: "Clause C • Velocity & AST",
    matchTypeRight: "Moderate Match",
    excerptRight:
      "Deep understanding of web performance, AST transformations, and developer velocity optimizations.",
    vectorNoteRight: "Key Focus: SWC/Babel AST plugins",
  },
  {
    id: "4",
    category: "experience",
    sectionLeft: "§3.2 Financial Telemetry Experience",
    matchScore: 64,
    cosTheta: "0.640 cosθ",
    excerptLeft:
      "Integrated third-party payment tracking webhooks and generated visual audit receipts for end users.",
    vectorNoteLeft: "Dominant Vector: Webhooks & Client Receipts",
    sectionRight: "Clause D • Ledger & Financial Tools",
    matchTypeRight: "Potential Gap",
    excerptRight:
      "Experience shipping high-reliability financial telemetry tools and real-time ledger accounting surfaces.",
    vectorNoteRight: "Key Focus: Double-entry ledger architecture",
  },
];

interface SemanticHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SemanticHeatmapModal({ isOpen, onClose }: SemanticHeatmapModalProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "experience" | "skills" | "architecture">(
    "all"
  );

  if (!isOpen) return null;

  const filteredRows =
    activeFilter === "all"
      ? mockHeatmapRows
      : mockHeatmapRows.filter((r) => r.category === activeFilter);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0f0f13] border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto animate-appear-zoom">
        {/* Top Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

        {/* Modal Header */}
        <header className="px-6 py-5 border-b border-zinc-800/80 bg-[#121218]/90 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                <span className="material-symbols-outlined text-[22px]">grid_view</span>
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Semantic Heatmap Analysis
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium text-indigo-300 bg-indigo-500/15 border border-indigo-500/25">
                    BAAI/bge-small-en-v1.5
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Sentence-level cosine similarity alignment between resume experience and target job requirements.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700/60 text-xs font-medium text-zinc-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-zinc-400">download</span>
                <span>Export Analysis</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800 text-xs">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  activeFilter === "all" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                All Sentences <span className="ml-1 text-[10px] text-zinc-400">38</span>
              </button>
              <button
                onClick={() => setActiveFilter("experience")}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  activeFilter === "experience" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Work Experience <span className="ml-1 text-[10px] text-zinc-500">18</span>
              </button>
              <button
                onClick={() => setActiveFilter("skills")}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  activeFilter === "skills" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Technical Skills <span className="ml-1 text-[10px] text-zinc-500">12</span>
              </button>
              <button
                onClick={() => setActiveFilter("architecture")}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  activeFilter === "architecture" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Architecture <span className="ml-1 text-[10px] text-zinc-500">8</span>
              </button>
            </div>

            {/* Threshold Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-zinc-400">High (&gt;90%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span className="text-zinc-400">Moderate (75–89%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span className="text-zinc-400">Gap (&lt;75%)</span>
              </div>
            </div>
          </div>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0c0c10]">
          {/* Column Supertitles */}
          <div className="grid grid-cols-12 gap-4 pb-2 border-b border-zinc-800/60 text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold px-1">
            <div className="col-span-12 md:col-span-5 flex items-center justify-between">
              <span>Resume Excerpts (Candidate Vector)</span>
              <span className="text-zinc-500 font-normal">Parsed Source</span>
            </div>
            <div className="hidden md:flex md:col-span-2 justify-center text-center">
              <span>Similarity Vector</span>
            </div>
            <div className="col-span-12 md:col-span-5 flex items-center justify-between">
              <span>Target Job Spec (Stripe Staff Frontend)</span>
              <span className="text-zinc-500 font-normal">Requirement Clause</span>
            </div>
          </div>

          {/* Rows */}
          {filteredRows.map((row) => {
            const isHigh = row.matchScore >= 90;
            const isModerate = row.matchScore >= 75 && row.matchScore < 90;
            const borderCol = isHigh
              ? "border-emerald-500/30 hover:border-emerald-500/50"
              : isModerate
              ? "border-sky-500/30 hover:border-sky-500/50"
              : "border-rose-500/30 hover:border-rose-500/50";
            const badgeCol = isHigh
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : isModerate
              ? "bg-sky-500/15 text-sky-400 border-sky-500/30"
              : "bg-rose-500/15 text-rose-400 border-rose-500/30";
            const textCol = isHigh
              ? "text-emerald-400"
              : isModerate
              ? "text-sky-400"
              : "text-rose-400";

            return (
              <div key={row.id} className="grid grid-cols-12 gap-3 md:gap-4 items-center group">
                {/* Left Card */}
                <div
                  className={`col-span-12 md:col-span-5 p-4 rounded-xl bg-[#131318] border ${borderCol} transition-colors shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium text-zinc-400">
                      {row.sectionLeft}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${badgeCol}`}
                    >
                      {row.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                    &ldquo;{row.excerptLeft}&rdquo;
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                    <span className={`material-symbols-outlined text-[14px] ${textCol}`}>check_circle</span>
                    <span>{row.vectorNoteLeft}</span>
                  </div>
                </div>

                {/* Center Connector */}
                <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center px-1">
                  <span className={`text-[11px] font-mono font-bold ${textCol} mb-1`}>
                    {row.cosTheta}
                  </span>
                  <div className="w-full flex items-center">
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-zinc-700 via-indigo-500/60 to-zinc-700"></div>
                    <span className="text-indigo-400 text-xs px-0.5">→</span>
                  </div>
                </div>

                {/* Right Card */}
                <div
                  className={`col-span-12 md:col-span-5 p-4 rounded-xl bg-[#131318] border ${borderCol} transition-colors shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium text-zinc-400">
                      {row.sectionRight}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${badgeCol}`}
                    >
                      {row.matchTypeRight}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                    &ldquo;{row.excerptRight}&rdquo;
                  </p>
                  <div className="mt-2.5 text-[11px] text-zinc-500 font-mono">
                    {row.vectorNoteRight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
