"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";
import { API_BASE_URL } from "@/lib/api";

interface SavedJob {
  id: string;
  company: string;
  companyInitials: string;
  reqCode: string;
  statusBadge: {
    label: string;
    variant: "ready" | "draft" | "needs_resume" | "applied" | "review";
  };
  title: string;
  location: string;
  salary: string;
  linkedResume?: string;
  matchScore: number;
  matchTier: string;
  filterCategory: "high" | "review" | "applied" | "interviewing" | "other";
  fitVectors: {
    label: string;
    percent: number;
  }[];
}

const mockSavedJobs: SavedJob[] = [
  {
    id: "stripe-01",
    company: "Stripe",
    companyInitials: "S",
    reqCode: "REQ-9428-CORE",
    statusBadge: {
      label: "COVER LETTER READY",
      variant: "ready",
    },
    title: "Staff Infrastructure Engineer (Core Payments / Tier-0 Ledger)",
    location: "San Francisco, CA (Hybrid)",
    salary: "$260k - $320k + Equity",
    linkedResume: "Alex_Chen_Staff_Backend_Engineer_2025.pdf",
    matchScore: 94,
    matchTier: "High Match",
    filterCategory: "high",
    fitVectors: [
      { label: "Distributed Systems", percent: 96 },
      { label: "Microservices", percent: 94 },
      { label: "Consensus", percent: 91 },
    ],
  },
  {
    id: "vercel-02",
    company: "Vercel",
    companyInitials: "▲",
    reqCode: "REQ-EDGE-4011",
    statusBadge: {
      label: "DRAFT EXISTS",
      variant: "draft",
    },
    title: "Staff Frontend Infrastructure Architect (Frameworks & Edge)",
    location: "Remote (US)",
    salary: "$240k - $290k + Equity",
    matchScore: 92,
    matchTier: "High Match",
    filterCategory: "high",
    fitVectors: [
      { label: "Next.js / React", percent: 96 },
      { label: "Design Systems", percent: 93 },
      { label: "WebGL", percent: 91 },
    ],
  },
  {
    id: "datadog-03",
    company: "Datadog",
    companyInitials: "DD",
    reqCode: "REQ-DD-8812",
    statusBadge: {
      label: "NEEDS TAILORED RESUME",
      variant: "needs_resume",
    },
    title: "Principal Distributed Systems Engineer (Platform Storage)",
    location: "New York, NY (Hybrid)",
    salary: "$270k - $340k",
    matchScore: 89,
    matchTier: "Aligned",
    filterCategory: "other",
    fitVectors: [
      { label: "Go / Rust", percent: 92 },
      { label: "Storage Engines", percent: 88 },
      { label: "Observability", percent: 87 },
    ],
  },
  {
    id: "figma-04",
    company: "Figma",
    companyInitials: "FIG",
    reqCode: "REQ-MP-909",
    statusBadge: {
      label: "APPLIED • FOLLOW-UP NOV 2",
      variant: "applied",
    },
    title: "Staff Systems Software Engineer (Multiplayer Infrastructure)",
    location: "San Francisco, CA (Hybrid)",
    salary: "$250k - $310k",
    matchScore: 91,
    matchTier: "High Match",
    filterCategory: "applied",
    fitVectors: [
      { label: "Real-time Concurrency", percent: 94 },
      { label: "WebAssembly", percent: 89 },
      { label: "Raft", percent: 91 },
    ],
  },
  {
    id: "openai-05",
    company: "OpenAI",
    companyInitials: "AI",
    reqCode: "REQ-CLUSTER-002",
    statusBadge: {
      label: "IN REVIEW",
      variant: "review",
    },
    title: "Senior Distributed Training Infrastructure Engineer",
    location: "San Francisco, CA",
    salary: "$280k - $360k",
    matchScore: 86,
    matchTier: "Solid Fit",
    filterCategory: "review",
    fitVectors: [
      { label: "GPU Clusters", percent: 84 },
      { label: "High-Throughput Net", percent: 88 },
      { label: "Linux", percent: 90 },
    ],
  },
];

export default function SavedJobsPage() {
  // Local UI state
  const [userJobs, setUserJobs] = useState<SavedJob[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "high" | "review" | "applied" | "interviewing">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rawJobText, setRawJobText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");

  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const fetchJobs = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsFetching(false);
      return;
    }
    try {
      setIsFetching(true);
      const res = await fetch(`${API_BASE_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const mapped: SavedJob[] = data.map((j: any) => {
          const comp = j.company || "Target Organization";
          const initials = comp.split(" ").map((w: string) => w[0]).join("").substring(0, 3).toUpperCase() || "JOB";
          const title = j.title || j.job_title || "Job Requisition";
          return {
            id: j.id,
            company: comp,
            companyInitials: initials,
            reqCode: `REQ-${(j.id || "").substring(0, 6).toUpperCase()}`,
            statusBadge: {
              label: (j.status || "ACTIVE REQUISITION").toUpperCase(),
              variant: "ready" as const,
            },
            title: title,
            location: j.location || "Remote / Unspecified",
            salary: j.salary_min && j.salary_max ? `$${Math.round(j.salary_min/1000)}k - $${Math.round(j.salary_max/1000)}k` : "Compensation Unspecified",
            linkedResume: j.resume_path || undefined,
            matchScore: 90,
            matchTier: "High Match",
            filterCategory: "high" as const,
            fitVectors: [
              { label: (j.platform || "CUSTOM").toUpperCase(), percent: 95 },
              { label: "VECTOR RELEVANCE", percent: 90 },
            ],
          };
        });
        setUserJobs(mapped);
        setHasFetched(true);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    if (!confirm("Are you sure you want to remove this job requisition?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        fetchJobs();
      } else {
        const errData = await res.json();
        alert(`Failed to delete job: ${errData.detail || "Error"}`);
      }
    } catch (e: any) {
      alert(`Error deleting job: ${e.message}`);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const displayJobs = hasFetched ? userJobs : mockSavedJobs;

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return displayJobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.fitVectors.some((v) => v.label.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesFilter = true;
      if (activeFilter === "high") {
        matchesFilter = job.matchScore >= 90;
      } else if (activeFilter === "review") {
        matchesFilter = job.filterCategory === "review";
      } else if (activeFilter === "applied") {
        matchesFilter = job.filterCategory === "applied";
      } else if (activeFilter === "interviewing") {
        matchesFilter = job.filterCategory === "interviewing";
      }

      return matchesSearch && matchesFilter;
    });
  }, [displayJobs, activeFilter, searchQuery]);

  const handleQuickIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawJobText.trim()) {
      alert("Please enter a job description.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/jobs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: companyName || "Target Organization",
          description: rawJobText,
          job_title: jobTitleInput || "Software Engineer",
        }),
      });

      if (res.ok) {
        setRawJobText("");
        setCompanyName("");
        setJobTitleInput("");
        setIsDrawerOpen(false);
        fetchJobs();
      } else {
        const data = await res.json();
        alert(`Failed to add job: ${JSON.stringify(data.detail || data)}`);
      }
    } catch (err: any) {
      alert(`Error creating job: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Persistent Navigation Sidebar */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <TopHeader />

        <main className="flex-1 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
          {/* Ambient Glow */}
          <RadialGlow />

          <div className="flex flex-col gap-8">
            {/* Top Header & Global Actions */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#1c1c24] text-indigo-300 border border-white/10">
                    PIPELINE MONITOR
                  </span>
                  <span className="text-zinc-500 font-mono text-xs">• SYNCED JUST NOW</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Saved Jobs
                </h1>
                <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  Track target roles, analyze match scores, and synthesize tailored cover letters with surgical precision.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-all text-xs font-semibold shadow-md active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>+ Add Job Requisition</span>
                </button>
              </div>
            </div>

            {/* Quick Telemetry Pipeline Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Stat 1 */}
              <div className="flex flex-col p-4 rounded-xl bg-[#0e0e11] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>Target Roles</span>
                  <span className="material-symbols-outlined text-[16px] text-zinc-500">bookmark</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{displayJobs.length}</span>
                  <span className="text-xs font-mono text-zinc-500">active tracks</span>
                </div>
                <div className="mt-3 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full w-full"></div>
                </div>
              </div>

              {/* Stat 2
              <div className="flex flex-col p-4 rounded-xl bg-[#0e0e11] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-indigo-400 text-xs font-mono uppercase tracking-wider">
                  <span>High Conviction</span>
                  <span className="material-symbols-outlined text-[16px] text-indigo-400">verified</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-indigo-400">{displayJobs.filter(j => j.matchScore >= 90).length}</span>
                  <span className="text-xs font-mono text-zinc-500">≥ 90% alignment</span>
                </div>
                <div className="mt-3 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full w-1/2"></div>
                </div>
              </div> */}

              {/* Stat 3
              <div className="flex flex-col p-4 rounded-xl bg-[#0e0e11] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>Synthesized Letters</span>
                  <span className="material-symbols-outlined text-[16px] text-zinc-500">edit_note</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{displayJobs.filter(j => j.statusBadge.variant === "ready" || j.statusBadge.variant === "draft").length}</span>
                  <span className="text-xs font-mono text-zinc-500">tailored drafts</span>
                </div>
                <div className="mt-3 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full w-1/3"></div>
                </div>
              </div> */}

              {/* Stat 4
              <div className="flex flex-col p-4 rounded-xl bg-[#0e0e11] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>Applications Sent</span>
                  <span className="material-symbols-outlined text-[16px] text-zinc-500">send</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{displayJobs.filter(j => j.statusBadge.variant === "applied" || j.filterCategory === "applied").length}</span>
                  <span className="text-xs font-mono text-zinc-500">in review status</span>
                </div>
                <div className="mt-3 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full w-1/6"></div>
                </div>
              </div> */}
            </div>

            {/* Ingestion Drawer (Toggleable) */}
            {isDrawerOpen && (
              <div className="p-6 rounded-xl bg-[#111116] border border-white/10 flex flex-col gap-4 shadow-2xl transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider">
                      Add Job Requisition
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <form onSubmit={handleQuickIngest} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 block mb-1">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Stripe"
                        className="w-full p-2.5 rounded-lg bg-[#14141a] border border-white/5 text-white placeholder:text-zinc-600 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-zinc-400 block mb-1">Job Title</label>
                      <input
                        type="text"
                        value={jobTitleInput}
                        onChange={(e) => setJobTitleInput(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full p-2.5 rounded-lg bg-[#14141a] border border-white/5 text-white placeholder:text-zinc-600 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Job Description
                    </label>
                    <textarea
                      rows={4}
                      value={rawJobText}
                      onChange={(e) => setRawJobText(e.target.value)}
                      placeholder="Paste complete Job Description..."
                      className="w-full p-3.5 rounded-lg bg-[#14141a] border border-white/5 text-white placeholder:text-zinc-600 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-zinc-500">
                      Saves requisition specifically to your user account.
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold shadow transition-colors"
                    >
                      Save Job Requisition
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Controls & Filter Toolbar */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between p-2 rounded-xl bg-[#0e0e11] border border-white/10">
              <div className="relative flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-zinc-500">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter saved roles by company, title, or stack..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#14141a] border border-white/5 text-white placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:border-indigo-500/40"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "all"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  All Saved ({displayJobs.length})
                </button>
                {/* <button
                  type="button"
                  onClick={() => setActiveFilter("high")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "high"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  High Match (&gt;90%)
                </button> */}
                {/* <button
                  type="button"
                  onClick={() => setActiveFilter("review")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "review"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  In Review
                </button> */}
                {/* <button
                  type="button"
                  onClick={() => setActiveFilter("applied")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "applied"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  Applied
                </button> */}
                {/* <button
                  type="button"
                  onClick={() => setActiveFilter("interviewing")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "interviewing"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  Interviewing
                </button> */}
              </div>
            </div>

            {/* Feed / Cards Stack */}
            <div className="flex flex-col gap-4">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="group flex flex-col p-6 rounded-xl bg-[#0e0e11] border border-white/10 hover:border-white/20 transition-all duration-200 shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Company Avatar / Glyph */}
                      <div className="w-12 h-12 rounded-xl bg-[#14141a] border border-white/10 flex items-center justify-center font-bold text-white shrink-0 shadow-inner">
                        {job.companyInitials}
                      </div>

                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-white">{job.company}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-xs font-mono text-zinc-500">{job.reqCode}</span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                              job.statusBadge.variant === "ready"
                                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                : job.statusBadge.variant === "applied"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-white/5 text-zinc-400 border-white/10"
                            }`}
                          >
                            {job.statusBadge.label}
                          </span>
                        </div>

                        <h2 className="text-base font-semibold text-white tracking-tight">
                          {job.title}
                        </h2>

                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-0.5 flex-wrap">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">location_on</span>
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">payments</span>
                            {job.salary}
                          </span>
                          {job.linkedResume && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-zinc-300">
                                <span className="material-symbols-outlined text-[15px]">attachment</span>
                                {job.linkedResume}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Score Pill & Actions */}
                    <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                      <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#14141a] border border-white/5">
                        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-zinc-800"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                          />
                          <path
                            className={job.matchScore >= 90 ? "text-indigo-400" : "text-zinc-400"}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray={`${job.matchScore}, 100`}
                            strokeLinecap="round"
                            strokeWidth="3.5"
                          />
                        </svg>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-white leading-none">
                            {job.matchScore}%
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase mt-0.5 ${
                              job.matchScore >= 90 ? "text-indigo-400" : "text-zinc-400"
                            }`}
                          >
                            {job.matchTier}
                          </span>
                        </div>
                      </div>

                      {hasFetched && (
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          aria-label="Delete job"
                          title="Remove requisition"
                          className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Semantic Alignment Breakdown Strip */}
                  <div className="mt-4 pt-3 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#09090b]/60 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase">Fit Vector:</span>
                      {job.fitVectors.map((v, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-[#14141a] text-zinc-200 border border-white/5"
                        >
                          {v.label} <strong className="text-white">{v.percent}%</strong>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href="/matches"
                        className="px-3 py-1.5 rounded-lg bg-[#14141a] hover:bg-[#1e1e28] text-indigo-300 text-xs font-medium border border-indigo-500/20 transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">analytics</span>
                        <span>Score Breakdown</span>
                      </Link>

                      <Link
                        href={`/cover-letters?jobId=${job.id}`}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold shadow transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit_note</span>
                        <span>Craft Cover Letter</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {filteredJobs.length === 0 && (
                <div className="p-12 text-center rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[32px] text-zinc-500">search_off</span>
                  <p className="text-zinc-300 text-sm">No saved jobs match your current filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchQuery("");
                    }}
                    className="text-xs text-indigo-400 hover:underline mt-1"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>

            {/* Quick Paste Requisition Prompt Banner */}
            <section className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl bg-[#0e0e11] border border-white/10 shadow-sm gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14141a] border border-white/10 flex items-center justify-center shrink-0 text-indigo-400">
                  <span className="material-symbols-outlined text-[20px]">content_paste_go</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-white">Have a new job description?</h3>
                  <p className="text-xs text-zinc-400">
                    Paste raw requisition text, markdown, or a public posting link to analyze semantic alignment in under 5 seconds.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-[#14141a] hover:bg-[#1e1e28] text-white border border-white/10 text-xs font-medium transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">terminal</span>
                <span>Paste JD or Link</span>
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
