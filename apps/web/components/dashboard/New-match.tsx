"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "@/components/dashboard/loading-skeleton";

interface EmptyStatePanelProps {
  onScoreMatch?: (resumeName: string, company: string, jobDesc: string) => void;
  uploaded?: (resultData: any) => void;
  isLoading?: boolean;
}

export function EmptyStatePanel({ onScoreMatch, uploaded, isLoading = false }: EmptyStatePanelProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription) {
      alert("Please enter a job description.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resume_data = await response.json();
      if (!response.ok) {
        alert("Profile not found. Please upload your profile first");
        return;
      }

      // Step 2: Create Job Requisition
      const job_create = await fetch("http://127.0.0.1:8000/jobs/create", {
        method: "POST",
        body: JSON.stringify({
          company: company || "Unknown Organization",
          description: jobDescription,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const job_data = await job_create.json();
      if (!job_create.ok) {
        console.error("Job creation failed:", job_data);
        alert(`Job creation failed: ${JSON.stringify(job_data.detail || job_data)}`);
        return;
      }

      // Step 3: Compute Score
      const final_response = await fetch(`http://127.0.0.1:8000/scoring/${job_data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const final_response_data = await final_response.json();
      if (!final_response.ok) {
        console.error("Scoring failed:", final_response_data);
        alert(`Scoring failed: ${JSON.stringify(final_response_data.detail || final_response_data)}`);
        return;
      }

      console.log("Scoring successful:", final_response_data);

      let fileName = "Resume.pdf";
      let fileSize = "142 KB";
      const storedResult = localStorage.getItem("ats_last_match_result");

      if (storedResult) {
        try {
          const parsed = JSON.parse(storedResult);
          if (parsed.fileName) fileName = parsed.fileName;
          if (parsed.fileSize) fileSize = parsed.fileSize;
        } catch {
          const rawName = storedResult.includes("_") ? storedResult.split("_").slice(1).join("_") : storedResult;
          const firstChunk = rawName.split("-")[0] || "Resume";
          fileName = firstChunk.charAt(0).toUpperCase() + firstChunk.slice(1);
        }
      } else if (resume_data?.resume_path) {
        const rawPath = resume_data.resume_path;
        fileName = rawPath.includes("_") ? rawPath.split("_").slice(1).join("_") : rawPath;
      }

      const matchResult = {
        fileName,
        fileSize,
        company: company || "Target Organization",
        jobTitle: job_data.title || "Job Requisition",
        jobDescription: jobDescription,
        jobId: job_data.id,
        scoring: final_response_data,
        timestamp: new Date().toISOString(),
      };

      try {
        localStorage.setItem("ats_last_match_result", JSON.stringify(matchResult));
      } catch (err) {
        console.error("Failed to save match result to localStorage:", err);
      }

      if (uploaded) {
        uploaded(matchResult);
      }
      if (onScoreMatch) {
        onScoreMatch(fileName, company, jobDescription);
      }

      router.push("/matches");
    } catch (error: any) {
      console.error("API Call error:", error);
      alert(`Network Error: ${error.message || "Failed to reach backend server"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting || isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Centered Empty State Cue */}

      {/* Input Panels: 2-Column Split */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Job Description Panel (Col 1-12) */}
          <div className="lg:col-span-12 bg-[#0e0e11] border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-2xl">
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

