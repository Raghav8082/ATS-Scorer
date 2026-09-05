"use client";

import React from "react";

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {/* Progress Status Bar */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111116] border border-white/10 shadow-md">
          <div className="relative flex items-center justify-center w-3.5 h-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-30"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
          </div>
          <span className="text-xs font-mono text-zinc-300 font-medium">
            Parsing syntax and technical keywords...
          </span>
        </div>
      </div>

      {/* Main Skeleton Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Gauge Bento (Col 1-5) */}
        <div className="lg:col-span-5 bg-[#0e0e11] border border-white/10 rounded-xl p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                Overall Alignment
              </span>
              <div className="h-4 w-28 bg-[#202029] rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-16 bg-[#202029] rounded-full animate-pulse"></div>
          </div>

          {/* Pulse Ring Gauge Skeleton */}
          <div className="relative flex flex-col items-center justify-center py-6 my-auto">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                  className="text-zinc-800"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-indigo-400 animate-spin origin-center opacity-40"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="70"
                  stroke="currentColor"
                  strokeDasharray="440"
                  strokeDashoffset="300"
                  strokeLinecap="round"
                  strokeWidth="8"
                  style={{ animationDuration: "2.4s" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-9 w-20 bg-[#202029] rounded-lg animate-pulse mb-1"></div>
                <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Secondary Breakdown Skeletons */}
          <div className="flex flex-col gap-4 pt-2 border-t border-white/5">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400">Semantic Depth</span>
                <div className="h-3 w-8 bg-[#202029] rounded animate-pulse"></div>
              </div>
              <div className="h-1.5 w-full bg-[#1c1c24] rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500/40 w-3/4 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400">Keyword Coverage</span>
                <div className="h-3 w-8 bg-[#202029] rounded animate-pulse"></div>
              </div>
              <div className="h-1.5 w-full bg-[#1c1c24] rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400/30 w-1/2 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Section Fits (Col 6-12) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#202029] flex items-center justify-center text-zinc-500">
                <span className="material-symbols-outlined text-[20px]">description</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-48 bg-[#202029] rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-7 w-20 bg-[#202029] rounded-full animate-pulse"></div>
          </div>

          <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="h-4 w-40 bg-[#202029] rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse"></div>
            </div>

            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#14141a] border border-white/5 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 w-52 bg-[#202029] rounded animate-pulse"></div>
                  <div className="h-4 w-10 bg-indigo-500/30 rounded animate-pulse"></div>
                </div>
                <div className="h-1 w-full bg-[#1c1c24] rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-800 rounded-full animate-pulse"></div>
                </div>
                <div className="h-3 w-3/4 bg-zinc-800/80 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
