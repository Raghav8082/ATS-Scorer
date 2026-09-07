"use client";

import React, { useState, useEffect } from "react";
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
  const [matchData, setMatchData] = useState<any | null>(null);
  const [viewState, setViewState] = useState<"populated" | "empty" | "loading">("loading");
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);

  // Load previous match data on mount if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ats_last_match_result");
      if (stored) {
        const parsed = JSON.parse(stored);
        setMatchData(parsed);
        if (parsed?.scoring && parsed?.jobId) {
          setMatchData(parsed);
          setViewState("populated");
        } else {
          setViewState("empty");
        }
      } else {
        setViewState("empty");
      }
    } catch (e) {
      console.error("Error reading stored match result:", e);
      setViewState("empty");
    }
  }, []);

  const handleScoreMatchSuccess = (resultData: any) => {
    setMatchData(resultData);
    setViewState("populated");
  };

  const scoring = matchData?.scoring || {};
  const rawOverall = scoring.overall_score ?? scoring.embedding_score ?? 0;
  const rawSemantic = scoring.embedding_score ?? 0;
  const rawKeyword = scoring.keyword_score ?? 0;

  const overallScore = Math.round(rawOverall <= 1 ? rawOverall * 100 : rawOverall);
  const semanticScore = Math.round(rawSemantic <= 1 ? rawSemantic * 100 : rawSemantic);
  const keywordScore = Math.round(rawKeyword <= 1 ? rawKeyword * 100 : rawKeyword);

  const sections = scoring.top_matches && scoring.top_matches.length > 0
    ? scoring.top_matches.map((item: any, idx: number) => {
        const rawScore = item.score ?? 0;
        const itemScore = Math.round(rawScore <= 1 ? rawScore * 100 : rawScore);
        return {
          id: `0${idx + 1}`,
          title: `Match: ${item.resume_section || 'Resume'} → ${item.job_section || 'Job Requirement'}`,
          score: itemScore,
          description: `Semantic vector similarity: ${itemScore}% for ${item.resume_section || 'resume section'}.`,
        };
      })
    : [];

  const targetTitle = matchData?.company
    ? `${matchData.company}${matchData.jobTitle ? ' — ' + matchData.jobTitle : ''}`
    : "Target Requisition";
  const targetDesc = matchData?.jobDescription || "Job description submitted for scoring.";

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

          {/* Page Headline & Context */}
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Candidate Match Engine
            </h1>
          </div>

          {/* Dynamic Content Views based on local state */}
          {viewState === "loading" && <LoadingSkeleton />}

          {viewState === "empty" && (
            <EmptyStatePanel
              isLoading={false}
              uploaded={(resultData) => {
                handleScoreMatchSuccess(resultData);
              }}
            />
          )}

          {viewState === "populated" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Source Document + Target Role Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <SourceDocumentCard
                  fileName={matchData?.fileName || "Resume file"}
                  fileSize={matchData?.fileSize}
                  parsedTime={matchData?.timestamp ? `Parsed ${new Date(matchData.timestamp).toLocaleTimeString()}` : "Parsed recently"}
                  pagesCount={undefined}
                  onReplaceFile={() => setViewState("empty")}
                />
                <TargetRoleCard
                  initialTitle={targetTitle}
                  initialDescription={targetDesc}
                  onScoreMatch={() => setViewState("empty")}
                />
              </div>

              {/* Right Column: Comprehensive Results Panel */}
              <div className="lg:col-span-7">
                <ResultsPanel
                  jobId={matchData?.jobId}
                  overallScore={overallScore}
                  semanticScore={semanticScore}
                  keywordScore={keywordScore}
                  sections={sections}
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
