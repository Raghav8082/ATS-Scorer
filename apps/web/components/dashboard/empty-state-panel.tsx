"use client";

import React, { useState } from "react";

interface EmptyStatePanelProps {
  onScoreMatch?: (resumeName: string, company: string, jobDesc: string) => void;
  isLoading?: boolean;
}

export function EmptyStatePanel({ onScoreMatch, isLoading = false }: EmptyStatePanelProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const handleUseRecent = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onScoreMatch) {
      onScoreMatch(
        selectedFile || "Sarah_Jenkins_Senior_Frontend_2025.pdf",
        company || "Stripe",
        jobDescription || "Staff Frontend Engineer"
      );
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Engine Status Bar */}
      <div className="flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1c1c24] border border-white/10 text-zinc-300 font-mono text-[11px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            Engine Ready
          </span>
          <span className="text-zinc-600 font-mono">|</span>
          <span className="text-zinc-400 font-mono text-xs">ATS V4.8</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-400 font-mono text-xs">
          <span className="material-symbols-outlined text-[14px] text-indigo-400">bolt</span>
          <span>Avg. latency &lt;1.2s</span>
        </div>
      </div>

      {/* Centered Empty State Cue */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#14141a] border border-white/10 flex items-center justify-center text-indigo-400 mb-1 shadow-lg shadow-black/40">
          <span className="material-symbols-outlined text-[24px]">filter_center_focus</span>
        </div>
        <p className="text-base text-zinc-200 font-medium">
          Upload a resume and paste a job description to see your match score.
        </p>
        <span className="text-xs font-mono text-zinc-500">
          Deterministic token weights • Zero hallucinated keywords • Private parsing
        </span>
      </div>

      {/* Input Panels: 2-Column Split */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Resume Upload Panel (Col 1-6) */}
          <div className="lg:col-span-6 bg-[#0e0e11] border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Payload 01
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-sm text-white font-medium">Candidate Profile</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {selectedFile ? "File Selected" : "Unassigned"}
                </span>
              </div>

              {/* Drop Zone */}
              <div
                onClick={() => document.getElementById("resume-upload-input")?.click()}
                className="relative border border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl p-8 flex flex-col items-center text-center transition-all bg-[#121217] hover:bg-[#16161f] cursor-pointer group"
              >
                <input
                  id="resume-upload-input"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-lg bg-[#202029] border border-white/10 flex items-center justify-center text-zinc-400 mb-3 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">upload_file</span>
                </div>
                <span className="text-sm text-white font-medium mb-1">
                  {selectedFile || "Drag and drop your resume (PDF or DOCX)"}
                </span>
                <span className="text-xs text-zinc-400 mb-4">
                  Max payload size 15MB. Encrypted in transit.
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("resume-upload-input")?.click();
                  }}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">folder_open</span>
                  Browse files
                </button>
              </div>

              {/* Quick Selector / History Stash */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
                  <span className="material-symbols-outlined text-[14px]">history</span>
                  <span>Recent:</span>
                  <button
                    type="button"
                    onClick={() => handleUseRecent("Staff_Eng_Alex_2025.pdf")}
                    className="hover:text-white transition-colors underline decoration-white/20 underline-offset-2"
                  >
                    Staff_Eng_Alex_2025.pdf
                  </button>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">VERIFIED MD5</span>
              </div>
            </div>
          </div>

          {/* Job Description Panel (Col 7-12) */}
          <div className="lg:col-span-6 bg-[#0e0e11] border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Payload 02
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-sm text-white font-medium">Target Requisition</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">Raw Text</span>
              </div>

              {/* Company Field */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label
                  htmlFor="target-company"
                  className="text-xs font-mono uppercase tracking-wide text-zinc-400"
                >
                  Target Organization
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[18px]">
                    business
                  </span>
                  <input
                    id="target-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Stripe, Figma, Apple"
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-[#14141a] border border-white/10 focus:border-indigo-500 focus:outline-none text-xs font-sans text-white placeholder:text-zinc-500 transition-colors"
                  />
                </div>
              </div>

              {/* Textarea Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="target-jd"
                    className="text-xs font-mono uppercase tracking-wide text-zinc-400"
                  >
                    Job Description / Requirements
                  </label>
                  <span className="text-xs font-mono text-zinc-500">
                    {jobDescription.length} characters
                  </span>
                </div>
                <textarea
                  id="target-jd"
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description here (responsibilities, technical constraints, team stack)..."
                  className="w-full p-3.5 rounded-lg bg-[#14141a] border border-white/10 focus:border-indigo-500 focus:outline-none text-xs font-mono text-white placeholder:text-zinc-500 resize-none leading-relaxed transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Big Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-semibold text-sm py-3.5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          {/* TODO: wire to POST /scoring/{job_id} */}
          {isLoading ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
              <span>Running Semantic Analysis...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>Score Match</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
