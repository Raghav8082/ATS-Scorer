"use client";

import React, { useState } from "react";

interface TargetRoleCardProps {
  initialTitle?: string;
  initialDescription?: string;
  onScoreMatch?: () => void;
  isLoading?: boolean;
}

export function TargetRoleCard({
  initialTitle = "Stripe — Staff Frontend Engineer",
  initialDescription = `We are looking for a Staff Frontend Engineer to scale our global billing dashboards and real-time ledger surfaces. 
Requirements:
- Mastery of modern React, WebGL visualizers, and state primitives
- Proven track record leading design system infrastructure across distributed teams
- Deep understanding of web performance, AST transformations, and developer velocity
- Experience shipping high-reliability financial telemetry tools`,
  onScoreMatch,
  isLoading = false,
}: TargetRoleCardProps) {
  const [targetRole, setTargetRole] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-[#0e0e11] p-6 rounded-xl border border-white/10 shadow-xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-[20px] text-indigo-400">business_center</span>
          <span className="text-base font-medium">Target Role</span>
        </div>
        <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          Active Comparison
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono uppercase tracking-wide text-zinc-400">
          Target Role & Entity
        </label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="w-full bg-[#14141a] px-3.5 py-2 rounded-lg text-white text-sm border border-white/5 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="e.g. Stripe — Staff Frontend Engineer"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wide text-zinc-400">
            Job Description Scope
          </label>
          <span className="text-xs font-mono text-zinc-400">{wordCount} words</span>
        </div>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-[#14141a] p-3.5 rounded-lg text-zinc-200 text-xs font-mono leading-relaxed resize-none border border-white/5 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="Paste job description requirements..."
        />
      </div>

      <button
        onClick={onScoreMatch}
        disabled={isLoading}
        type="button"
        className="w-full mt-1 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 py-2.5 rounded-lg text-sm font-semibold tracking-tight flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-md"
      >
        {/* TODO: wire to POST /scoring/{job_id} */}
        {isLoading ? (
          <>
            <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
            <span>Analyzing Vectors...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[18px] text-zinc-950">bolt</span>
            <span>Re-score Match</span>
          </>
        )}
      </button>
    </div>
  );
}
