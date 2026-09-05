"use client";

import React from "react";
import Link from "next/link";

interface SectionAnalysisItem {
  id: string;
  title: string;
  score: number;
  description: string;
}

interface ResultsPanelProps {
  overallScore?: number;
  semanticScore?: number;
  keywordScore?: number;
  semanticDetail?: string;
  keywordDetail?: string;
  sections?: SectionAnalysisItem[];
  onOpenHeatmap?: () => void;
}

const defaultSections: SectionAnalysisItem[] = [
  {
    id: "01",
    title: "Work Experience — Staff UI Architecture at Vercel",
    score: 96,
    description:
      "Strong coverage on distributed design systems, real-time client hydration, and AST tooling.",
  },
  {
    id: "02",
    title: "Technical Expertise — React, WebGL & Next.js",
    score: 92,
    description:
      "Exceeds requirements in graphics pipelines and high-throughput dashboard state stores.",
  },
  {
    id: "03",
    title: "Core Projects — Distributed Design Systems",
    score: 88,
    description:
      "Highlights component governance models and tokens sync systems matching enterprise scale.",
  },
  {
    id: "04",
    title: "Open Source Leadership — Component Libraries",
    score: 84,
    description:
      "Demonstrates external technical influence and API ergonomics validation through public adoption.",
  },
];

export function ResultsPanel({
  overallScore = 94,
  semanticScore = 96,
  keywordScore = 89,
  semanticDetail = "Direct context & architectural alignment",
  keywordDetail = "24 of 27 core technical tokens matched",
  sections = defaultSections,
  onOpenHeatmap,
}: ResultsPanelProps) {
  return (
    <div className="bg-[#0e0e11] p-8 rounded-xl border border-white/10 shadow-xl flex flex-col gap-8">
      {/* Top Header & Big Score Hero */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex items-baseline gap-4">
          <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-white leading-none">
            {overallScore}%
          </span>
          <div className="flex flex-col">
            <span className="text-base text-zinc-100 font-medium">Overall Match</span>
            <span className="text-xs text-zinc-400">Synthesized from 4 semantic clusters</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          <span className="material-symbols-outlined text-[16px] text-indigo-400">verified</span>
          <span className="text-[11px] font-mono font-medium uppercase tracking-wider">
            Strong match
          </span>
        </div>
      </div>

      {/* Two Secondary Breakdown Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Semantic Match */}
        <div className="bg-[#14141a] p-4 rounded-xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 uppercase tracking-wider">Semantic Match</span>
            <span className="text-white font-semibold">{semanticScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#202029] rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${semanticScore}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 mt-0.5">{semanticDetail}</span>
        </div>

        {/* Keyword Match */}
        <div className="bg-[#14141a] p-4 rounded-xl border border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 uppercase tracking-wider">Keyword Match</span>
            <span className="text-white font-semibold">{keywordScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#202029] rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-300 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${keywordScore}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 mt-0.5">{keywordDetail}</span>
        </div>
      </div>

      {/* Ranked Section Analysis */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-base text-white font-medium">Ranked Section Analysis</span>
          <span className="text-xs font-mono text-zinc-400">Weighted by role relevance</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {sections.map((item) => (
            <div
              key={item.id}
              className="group bg-[#14141a] hover:bg-[#1a1a24] p-4 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-indigo-400 font-semibold">{item.id}</span>
                  <span className="text-sm text-white font-medium truncate">{item.title}</span>
                </div>
                <span className="text-xs font-mono text-indigo-400 font-semibold shrink-0 ml-3">
                  {item.score}%
                </span>
              </div>
              <div className="w-full h-1 bg-[#202029] rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-400 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400 pt-0.5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/5">
        <span className="text-xs font-mono text-zinc-400">
          Matched against 27 semantic vectors
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHeatmap}
            type="button"
            className="px-3.5 py-2 rounded-lg bg-[#14141a] hover:bg-[#1f1f28] text-zinc-200 border border-white/10 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-indigo-400">tune</span>
            <span>View Heatmap</span>
          </button>
          <Link
            href="/cover-letters"
            className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Craft Cover Letter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
