"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";
import { SourceDocumentCard } from "@/components/dashboard/source-document-card";
import { TargetRoleCard } from "@/components/dashboard/target-role-card";
import { ResultsPanel } from "@/components/dashboard/results-panel";
import { EmptyStatePanel } from "@/components/dashboard/empty-state-panel";
import { LoadingSkeleton } from "@/components/dashboard/loading-skeleton";
import { SemanticHeatmapModal } from "@/components/dashboard/semantic-heatmap-modal";

export default function MatchesPage() {
  // Local component state to switch between views: "populated" | "empty" | "loading"
  const [viewState, setViewState] = useState<"populated" | "empty" | "loading">("populated");
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);

  // Simulated scoring trigger that demonstrates the loading skeleton then populates results
  const handleScoreMatch = () => {
    setViewState("loading");
    // TODO: wire to POST /scoring/{job_id}
    // const response = await fetch('/api/scoring/...');
    setTimeout(() => {
      setViewState("populated");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Left Persistent Navigation Sidebar */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <TopHeader onNewMatch={() => setViewState("empty")} />

        <main className="flex-1 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
          {/* Ambient Radial Glow behind headline */}
          <RadialGlow />

          {/* Dev State Switcher Pill Bar (Reachable loading & empty states to inspect markup) */}
          <div className="mb-8 p-1.5 rounded-xl bg-[#111116] border border-white/10 w-fit flex items-center gap-1 shadow-lg shadow-black/40">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider px-3 py-1">
              Dev Mode View:
            </span>
            <button
              type="button"
              onClick={() => setViewState("populated")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewState === "populated"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              Populated Results
            </button>
            <button
              type="button"
              onClick={() => setViewState("empty")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewState === "empty"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              Empty State
            </button>
            <button
              type="button"
              onClick={() => setViewState("loading")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewState === "loading"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              Loading Skeleton
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-1" />
            <button
              type="button"
              onClick={() => setIsHeatmapOpen(true)}
              className="px-3 py-1 rounded-lg text-xs font-medium text-indigo-300 hover:bg-indigo-500/10 transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px]">view_timeline</span>
              Heatmap Modal
            </button>
          </div>

          {/* Page Headline & Context */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI MATCH EVALUATOR
              </span>
              <span className="text-zinc-500 text-xs font-mono">•</span>
              <span className="text-zinc-400 text-xs font-mono">Real-time Semantic Vector Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Candidate Match Engine
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Synthesizing resume vector spaces against targeted position specs to highlight semantic
              overlap, qualification depth, and tailored positioning.
            </p>
          </div>

          {/* Dynamic Content Views based on local state */}
          {viewState === "loading" && <LoadingSkeleton />}

          {viewState === "empty" && (
            <EmptyStatePanel
              isLoading={false}
              onScoreMatch={(_resume, _company, _desc) => {
                handleScoreMatch();
              }}
            />
          )}

          {viewState === "populated" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Source Document + Target Role Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <SourceDocumentCard
                  fileName="Sarah_Jenkins_Senior_Frontend_2025.pdf"
                  fileSize="142 KB"
                  parsedTime="Parsed 4m ago"
                  pagesCount={3}
                  onReplaceFile={() => setViewState("empty")}
                />
                <TargetRoleCard
                  initialTitle="Stripe — Staff Frontend Engineer"
                  onScoreMatch={handleScoreMatch}
                />
              </div>

              {/* Right Column: Comprehensive Results Panel */}
              <div className="lg:col-span-7">
                <ResultsPanel
                  overallScore={94}
                  semanticScore={96}
                  keywordScore={89}
                  onOpenHeatmap={() => setIsHeatmapOpen(true)}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Semantic Heatmap Comparative Modal */}
      <SemanticHeatmapModal
        isOpen={isHeatmapOpen}
        onClose={() => setIsHeatmapOpen(false)}
      />
    </div>
  );
}
