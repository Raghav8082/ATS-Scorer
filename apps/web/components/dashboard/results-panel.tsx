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
  jobId?: string;
  overallScore?: number;
  semanticScore?: number;
  keywordScore?: number;
  semanticDetail?: string;
  keywordDetail?: string;
  sections?: SectionAnalysisItem[];
  onOpenHeatmap?: () => void;
}

export function ResultsPanel({
  jobId,
  overallScore = 0,
  semanticScore = 0,
  keywordScore = 0,
  semanticDetail = "Returned by the semantic matching service",
  keywordDetail = "Keyword score was not returned by the matching service",
  sections = [],
  onOpenHeatmap,
}: ResultsPanelProps) {
  const getMatchBadge = (score: number) => {
    if (score >= 80) return { label: "Strong match", color: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300", icon: "verified" };
    if (score >= 60) return { label: "Moderate match", color: "bg-sky-500/15 border-sky-500/30 text-sky-300", icon: "check_circle" };
    return { label: "Needs alignment", color: "bg-amber-500/15 border-amber-500/30 text-amber-300", icon: "warning" };
  };
  const badge = getMatchBadge(overallScore);

  return (
    <div className="bg-[#0e0e11] p-8 rounded-xl border border-white/10 shadow-xl flex flex-col gap-8">
      {/* Top Header & Big Score Hero */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex items-baseline gap-4">
          <span className="text-6xl sm:text-7xl font-bold tracking-tighter text-white leading-none">
            {overallScore}%
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white">Overall Match Score</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${badge.color}`}>
                <span className="material-symbols-outlined text-[14px]">{badge.icon}</span>
                {badge.label}
              </span>
            </div>
            <span className="text-xs text-zinc-400 mt-1">
              Synthesized from semantic vectors & keyword density metrics
            </span>
          </div>
        </div>

        {/* <button
          onClick={onOpenHeatmap}
          type="button"
          className="px-4 py-2.5 rounded-lg bg-[#14141a] hover:bg-[#1f1f28] text-white border border-white/10 text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px] text-indigo-400">grid_on</span>
          <span>Open Heatmap</span>
        </button> */}
      </div>

      {/* Primary Sub-Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Metric 1: Semantic Fit */}
        <div className="bg-[#14141a] p-5 rounded-xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-indigo-400">psychology</span>
              Semantic Vector Fit
            </span>
            <span className="text-xs font-mono font-bold text-indigo-300">{semanticScore}%</span>
          </div>
          <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${semanticScore}%` }}
            />
          </div>
          <span className="text-[11px] text-zinc-400">{semanticDetail}</span>
        </div>

        {/* Metric 2: Keyword Coverage */}
        <div className="bg-[#14141a] p-5 rounded-xl border border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">tag</span>
              Keyword Coverage
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300">{keywordScore}%</span>
          </div>
          <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${keywordScore}%` }}
            />
          </div>
          <span className="text-[11px] text-zinc-400">{keywordDetail}</span>
        </div>
      </div>

      {/* Section Alignment Breakdown List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-indigo-400">reorder</span>
            Section Strength Analysis
          </h3>
          <span className="text-[11px] font-mono text-zinc-500">
            {sections.length} core domains evaluated
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {sections.map((item) => (
            <div
              key={item.id}
              className="bg-[#14141a] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="text-xs font-mono text-zinc-500 shrink-0">[{item.id}]</span>
                  <span className="text-xs font-semibold text-zinc-200 truncate">{item.title}</span>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-300 shrink-0">
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-zinc-800/60 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-indigo-500/80 h-1 rounded-full"
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
          Based on returned match sections
        </span>
        <div className="flex items-center gap-3">
          {/* <button
            onClick={onOpenHeatmap}
            type="button"
            className="px-3.5 py-2 rounded-lg bg-[#14141a] hover:bg-[#1f1f28] text-zinc-200 border border-white/10 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-indigo-400">tune</span>
            <span>View Heatmap</span>
          </button> */}
          <Link
            href={jobId ? `/cover-letters?jobId=${jobId}` : "/cover-letters"}
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
