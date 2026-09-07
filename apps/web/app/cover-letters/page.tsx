"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";
import { API_BASE_URL } from "@/lib/api";

interface SavedJobOption {
  id: string;
  company: string;
  title: string;
  location?: string;
  description?: string;
}

function CoverLetterStudioContent() {
  const searchParams = useSearchParams();
  const queryJobId = searchParams.get("jobId");

  const [savedJobs, setSavedJobs] = useState<SavedJobOption[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [activeJob, setActiveJob] = useState<SavedJobOption | null>(null);

  const [tone, setTone] = useState<"engineering" | "executive" | "concise">("engineering");
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    "Distributed Systems",
    "AST / Compilers",
    "Design Token Governance",
  ]);
  const [lengthMode, setLengthMode] = useState<"compact" | "standard">("standard");

  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState<string | null>(null);
  const [basedOnScore, setBasedOnScore] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load saved jobs & recent match details
  useEffect(() => {
    let lastMatchJob: SavedJobOption | null = null;
    try {
      const lastMatch = localStorage.getItem("ats_last_match_result");
      if (lastMatch) {
        const parsed = JSON.parse(lastMatch);
        if (parsed.jobId) {
          lastMatchJob = {
            id: parsed.jobId,
            company: parsed.company || "Target Organization",
            title: parsed.jobTitle || "Requisition Role",
            location: "Active Requisition",
            description: parsed.jobDescription || "",
          };
        }
      }
    } catch (e) {
      console.error("Error reading last match result:", e);
    }

    const fetchJobs = async () => {
      const token = localStorage.getItem("access_token");
      let allJobs: SavedJobOption[] = lastMatchJob ? [lastMatchJob] : [];

      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/jobs`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            const mapped: SavedJobOption[] = data.map((j: any) => ({
              id: j.id,
              company: j.company || "Target Organization",
              title: j.title || j.job_title || "Requisition Role",
              location: j.location || "Remote / Hybrid",
              description: j.description || "",
            }));

            mapped.forEach((mj) => {
              if (!allJobs.some((j) => j.id === mj.id)) {
                allJobs.push(mj);
              }
            });
          }
        } catch (err) {
          console.error("Failed to load saved jobs:", err);
        }
      }

      setSavedJobs(allJobs);

      const targetId = queryJobId || lastMatchJob?.id || (allJobs[0] ? allJobs[0].id : "");
      if (targetId) {
        setSelectedJobId(targetId);
        const found = allJobs.find((j) => j.id === targetId);
        if (found) {
          setActiveJob(found);
        }
      }
    };

    fetchJobs();
  }, [queryJobId]);

  // Update activeJob when selectedJobId changes
  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId);
    setGeneratedLetter(null); // Clear previous letter when switching jobs
    const found = savedJobs.find((j) => j.id === jobId);
    if (found) {
      setActiveJob(found);
    }
  };

  const toggleFocus = (item: string) => {
    if (selectedFocus.includes(item)) {
      setSelectedFocus(selectedFocus.filter((i) => i !== item));
    } else {
      setSelectedFocus([...selectedFocus, item]);
    }
  };

  const handleCopy = () => {
    const textToCopy = generatedLetter || defaultFallbackLetter;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCoverLetter = async () => {
    const targetId = selectedJobId;
    if (!targetId) {
      setErrorMsg("Please select a target job requisition first.");
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      setErrorMsg("Authentication token missing. Please log in to synthesize cover letters.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/scoring/${targetId}/cover-letter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to synthesize cover letter");
      }

      setGeneratedLetter(data.cover_letter);
      if (data.candidate_name) {
        setCandidateName(data.candidate_name);
      }
      if (typeof data.based_on_score === "number") {
        setBasedOnScore(Math.round(data.based_on_score * 100));
      }
    } catch (err: any) {
      console.error("Cover letter synthesis error:", err);
      setErrorMsg(err.message || "An unexpected error occurred during synthesis.");
    } finally {
      setIsGenerating(false);
    }
  };

  const companyName = activeJob?.company || "Target Company";
  const jobTitle = activeJob?.title || "Requisition Role";
  const reqCode = selectedJobId ? `REQ-${selectedJobId.substring(0, 6).toUpperCase()}` : "REQ-STANDARD";
  const displayScore = basedOnScore !== null ? `${basedOnScore}% Match Fit` : "94% Match Fit";

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-indigo-500/30 selection:text-indigo-200">
      <SidebarNav />

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <TopHeader />

        <main className="flex-1 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
          <RadialGlow />

          {/* Headline & Context */}
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
                  Synthesizing candidate resume highlights for {companyName}'s {jobTitle} requisition.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#14141a] border border-white/10 text-zinc-300">
                  Target: {companyName}
                </span>
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                  {displayScore}
                </span>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="text-rose-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {/* Dual-Pane Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Requisition Parameters & Tuning */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 1: Role Spec Anchor */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">target</span>
                    Target Requisition
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">{reqCode}</span>
                </div>

                {savedJobs.length > 1 && (
                  <div className="flex flex-col gap-1.5 mb-1">
                    <label className="text-[11px] font-mono text-zinc-400 uppercase">
                      Select Target Requisition:
                    </label>
                    <select
                      value={selectedJobId}
                      onChange={(e) => handleJobSelect(e.target.value)}
                      className="w-full bg-[#14141a] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      {savedJobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.company} — {job.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="p-3.5 rounded-lg bg-[#14141a] border border-white/5 flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">{jobTitle}</span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {companyName} • {activeJob?.location || "Remote / Hybrid"}
                  </span>
                </div>
              </div>

              {/* Card 2: Persona Tone & Voice */}
              {/* <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
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
              </div> */}

              {/* Card 3: Focus Vector Anchors */}
              {/* <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
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
              </div> */}

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
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating || !selectedJobId}
                  className="w-full bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-semibold py-3 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">
                        refresh
                      </span>
                      <span>Synthesizing Document with Claude AI...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      <span>Synthesize Cover Letter</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Live Letter Preview Canvas */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Document Toolbar */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl px-5 py-3 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-white font-medium">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">
                      article
                    </span>
                    Draft_Cover_Letter_{companyName.replaceAll(" ", "_")}.md
                  </span>
                  <span>•</span>
                  <span>{generatedLetter ? `${generatedLetter.split(/\s+/).length} words` : "240 words"}</span>
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

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-[#14141a] hover:bg-[#1c1c24] border border-white/10 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">download</span>
                    <span>Export Text</span>
                  </button>
                </div>
              </div>

              {/* Rendered Letter Canvas Card */}
              <div className="bg-[#0e0e11] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden min-h-[500px]">
                <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 text-zinc-300 text-sm leading-relaxed font-sans">
                  {/* Sender Header */}
                  <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-bold text-white tracking-tight">{candidateName || "Candidate Profile"}</h2>
                      <p className="text-xs font-mono text-indigo-400">{jobTitle} Applicant</p>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 sm:text-right">
                      <p>Verified Candidate Resume</p>
                      <p>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                    </div>
                  </div>

                  {/* Recipient Header */}
                  <div className="flex flex-col gap-1 text-xs font-mono text-zinc-400 pt-2">
                    <p className="text-white font-medium">Hiring Team, Engineering Leadership</p>
                    <p className="text-indigo-300 font-semibold">{companyName}</p>
                  </div>

                  {isGenerating ? (
                    <div className="py-16 flex flex-col items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-[36px] text-indigo-400 animate-spin">
                        auto_awesome
                      </span>
                      <p className="text-sm font-mono text-zinc-300">
                        Synthesizing tailored cover letter with Claude AI...
                      </p>
                      <p className="text-xs text-zinc-500">
                        Extracting vector matches & mapping background achievements for {companyName}
                      </p>
                    </div>
                  ) : generatedLetter ? (
                    <div className="flex flex-col gap-4 text-zinc-200 whitespace-pre-wrap leading-relaxed bg-[#14141a]/40 p-6 rounded-xl border border-white/5 shadow-inner">
                      {generatedLetter}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 text-zinc-300">
                      <p className="text-white font-medium">
                        Dear {companyName} Engineering Leadership Team,
                      </p>
                      <p>
                        Target Requisition: <strong className="text-white font-semibold">{jobTitle}</strong> at <strong className="text-white font-semibold">{companyName}</strong>.
                      </p>
                      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-200 text-xs flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] text-indigo-400">auto_awesome</span>
                        <span>
                          Click <strong>"Synthesize Cover Letter"</strong> on the left panel to trigger our Anthropic AI RAG engine, which synthesizes your top matching resume vectors into a tailored cover letter.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const defaultFallbackLetter = `Dear Hiring Team,\n\nI am writing to express my strong interest in the software engineering role at your organization.`;

export default function CoverLettersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center font-mono text-sm">
          Loading AI Cover Letter Studio...
        </div>
      }
    >
      <CoverLetterStudioContent />
    </Suspense>
  );
}
