"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";

interface ResumeProfile {
  id: string;
  category: "master" | "tailored" | "draft";
  badgeLabel: string;
  isMaster?: boolean;
  fileFormat: string;
  fileSize: string;
  fileName: string;
  updatedTime: string;
  pagesCount: number;
  tokensCount: number;
  matchesSummary: string;
  skills: string[];
}

const mockResumes: ResumeProfile[] = [
  {
    id: "res-01",
    category: "master",
    badgeLabel: "Master Resume",
    isMaster: true,
    fileFormat: "PDF",
    fileSize: "142 KB",
    fileName: "Alex_Chen_Staff_Backend_Engineer_2025.pdf",
    updatedTime: "Updated 2 days ago",
    pagesCount: 4,
    tokensCount: 1420,
    matchesSummary: "12 Active Matches (Stripe, Datadog +10)",
    skills: [
      "Distributed Systems",
      "Go",
      "Raft Consensus",
      "High-Throughput Microservices",
      "Kafka",
    ],
  },
  {
    id: "res-02",
    category: "tailored",
    badgeLabel: "Role-Tailored",
    fileFormat: "PDF",
    fileSize: "118 KB",
    fileName: "Alex_Chen_Staff_Frontend_UI_Architecture.pdf",
    updatedTime: "Updated Oct 24, 2024",
    pagesCount: 3,
    tokensCount: 1180,
    matchesSummary: "8 Matches (Vercel, Stripe Billing +6)",
    skills: ["React", "WebGL", "Design Systems", "Next.js", "Performance CI"],
  },
  {
    id: "res-03",
    category: "tailored",
    badgeLabel: "Role-Tailored",
    fileFormat: "PDF",
    fileSize: "135 KB",
    fileName: "Alex_Chen_Engineering_Management_Director.pdf",
    updatedTime: "Updated 3 weeks ago",
    pagesCount: 3,
    tokensCount: 1310,
    matchesSummary: "5 Active Matches",
    skills: ["Org Scaling", "Engineering Leadership", "Budgeting", "Cross-functional Strategy"],
  },
  {
    id: "res-04",
    category: "draft",
    badgeLabel: "Draft Variant",
    fileFormat: "DOCX",
    fileSize: "86 KB",
    fileName: "Alex_Chen_Systems_Rust_Storage_Focus.docx",
    updatedTime: "Updated Yesterday",
    pagesCount: 2,
    tokensCount: 890,
    matchesSummary: "2 Matches (Anthropic, Cloudflare)",
    skills: ["Rust", "Storage Engines", "LSM Trees", "eBPF", "Linux Kernel"],
  },
];

export default function ResumesPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "master" | "tailored" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered profiles
  const filteredResumes = useMemo(() => {
    return mockResumes.filter((res) => {
      const matchesFilter = activeFilter === "all" || res.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        res.fileName.toLowerCase().includes(q) ||
        res.skills.some((s) => s.toLowerCase().includes(q)) ||
        res.matchesSummary.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Handle scroll to dropzone
  const handleScrollToDropzone = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      dropZoneRef.current.classList.add("border-indigo-400");
      setTimeout(() => {
        dropZoneRef.current?.classList.remove("border-indigo-400");
      }, 1500);
    }
  };

  // Keyboard shortcut (⌘U / Ctrl+U)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        fileInputRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      setUploadedFiles((prev) => [name, ...prev]);
      // TODO: wire to POST /resumes/upload
      // const formData = new FormData();
      // formData.append("file", e.target.files[0]);
      // await fetch('/api/resumes/upload', { method: 'POST', body: formData });
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
          <RadialGlow />

          <div className="flex flex-col gap-8">
            {/* Top Hero Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
              <div className="flex flex-col gap-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>PROFILES & PARSED SCHEMAS</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Resumes
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Manage parsed profiles, master resumes, and role-specific variations tailored across active job matches and telemetry.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleScrollToDropzone}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-white hover:bg-zinc-200 active:scale-[0.98] text-zinc-950 text-xs font-semibold shadow transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">upload_file</span>
                  <span>Upload Resume</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Telemetry Bar */}
            <section aria-label="Storage and Parsing Telemetry" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col justify-between shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>ACTIVE PROFILES</span>
                  <span className="material-symbols-outlined text-[16px] text-zinc-500">folder_special</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">4</span>
                  <span className="text-xs font-mono text-indigo-400 font-medium">1 master</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col justify-between shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>AVG MATCH RATING</span>
                  <span className="material-symbols-outlined text-[16px] text-indigo-400">verified</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">91.4%</span>
                  <span className="text-xs font-mono text-emerald-400">+4.2% ATS</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col justify-between shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>SKILLS INDEXED</span>
                  <span className="material-symbols-outlined text-[16px] text-zinc-500">schema</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">142</span>
                  <span className="text-xs font-mono text-zinc-500">tokens</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col justify-between shadow-md">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <span>STORAGE USED</span>
                  <span className="text-xs font-mono text-zinc-500">9.6%</span>
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-baseline justify-between text-xs font-mono">
                    <span className="text-white font-medium">4.8 MB</span>
                    <span className="text-zinc-500">50 MB MAX</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[9.6%]" />
                  </div>
                </div>
              </div>
            </section>

            {/* Filter & Search Toolbar */}
            <section aria-label="Resume Filter Controls" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-xl bg-[#0e0e11] border border-white/10">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "all"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  All ({mockResumes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("master")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "master"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  Master Profiles (1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("tailored")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "tailored"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  Role-Tailored (2)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("draft")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === "draft"
                      ? "bg-[#202029] text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#14141a]"
                  }`}
                >
                  Drafts (1)
                </button>
              </div>

              <div className="relative w-full sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-zinc-500 pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by role, skill, or keyword..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#14141a] border border-white/5 text-white placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:border-indigo-500/40"
                />
              </div>
            </section>

            {/* Upload Feedback Banner if user selected a file */}
            {uploadedFiles.length > 0 && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>
                    Uploaded <strong>{uploadedFiles[0]}</strong> successfully. Vector parsing queued.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedFiles([])}
                  className="text-emerald-400 hover:text-white text-xs underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Resumes List / Grid */}
            <div className="flex flex-col gap-4">
              {filteredResumes.map((resume) => (
                <article
                  key={resume.id}
                  className="group relative p-6 rounded-xl bg-[#0e0e11] border border-white/10 hover:border-white/20 transition-all duration-200 shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-3 min-w-0 max-w-3xl">
                      {/* Header Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono border ${
                            resume.isMaster
                              ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                              : "bg-[#14141a] text-zinc-300 border-white/10"
                          }`}
                        >
                          {resume.isMaster && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          )}
                          {resume.badgeLabel}
                        </span>

                        {resume.isMaster && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono">
                            Active ATS Target
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-zinc-500">
                          • {resume.fileFormat} ({resume.fileSize})
                        </span>
                      </div>

                      {/* Title & Metadata */}
                      <div>
                        <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2 truncate">
                          <span className="material-symbols-outlined text-[20px] text-indigo-400 shrink-0">
                            {resume.fileFormat === "PDF" ? "picture_as_pdf" : "article"}
                          </span>
                          <span className="truncate">{resume.fileName}</span>
                        </h2>

                        <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-zinc-400 text-xs font-mono">
                          <span>{resume.updatedTime}</span>
                          <span>•</span>
                          <span>{resume.pagesCount} pages</span>
                          <span>•</span>
                          <span className="text-zinc-200">{resume.tokensCount.toLocaleString()} parsed tokens</span>
                          <span>•</span>
                          <span className="text-indigo-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">link</span>
                            {resume.matchesSummary}
                          </span>
                        </div>
                      </div>

                      {/* Parsed Skills Tags */}
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {resume.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-[#14141a] border border-white/5 text-zinc-300 text-xs font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center lg:items-end flex-wrap gap-2 shrink-0 pt-2 lg:pt-0">
                      {/* Match Against Job */}
                      {/* TODO: wire to pre-fill dashboard match engine */}
                      <Link
                        href="/matches"
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-medium transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">target</span>
                        <span>Match Against Job</span>
                      </Link>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#14141a] hover:bg-[#1e1e28] text-zinc-300 border border-white/5 text-xs font-medium transition-colors"
                      >
                        <span>View Details</span>
                      </button>

                      {/* Download file */}
                      {/* TODO: wire to GET /resumes/{id}/download */}
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg bg-[#14141a] hover:bg-[#1e1e28] text-zinc-400 hover:text-white border border-white/5 flex items-center justify-center transition-colors"
                        title={`Download ${resume.fileFormat}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>

                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg bg-[#14141a] hover:bg-[#1e1e28] text-zinc-400 hover:text-white border border-white/5 flex items-center justify-center transition-colors"
                        title="More actions"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filteredResumes.length === 0 && (
                <div className="p-12 text-center rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[32px] text-zinc-500">search_off</span>
                  <p className="text-zinc-300 text-sm">No resumes found matching your search query.</p>
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

            {/* Quick Upload Drop Zone */}
            <section aria-label="Upload Drop Zone" className="pt-2">
              <div
                ref={dropZoneRef}
                onClick={() => fileInputRef.current?.click()}
                className="relative border border-dashed border-white/15 hover:border-indigo-400/60 bg-[#0e0e11]/60 hover:bg-[#0e0e11] transition-all duration-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-2 cursor-pointer group shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#14141a] group-hover:bg-indigo-500/20 group-hover:text-indigo-300 text-zinc-400 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-white tracking-tight">
                    Drop a new resume to parse and index instantly
                  </p>
                  <p className="text-xs text-zinc-400">
                    Accepts PDF or DOCX format (up to 15MB). Automatic ATS token extraction and entity tagging.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    type="file"
                    onChange={handleFileSelect}
                  />
                  <button
                    type="button"
                    className="h-8 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-medium transition-colors"
                  >
                    Browse Files
                  </button>
                  <span className="text-zinc-500 font-mono text-xs">or press ⌘U</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
