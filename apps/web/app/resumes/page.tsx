"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";
import { API_BASE_URL } from "@/lib/api";

export default function ResumesPage() {
  const [emailInput, setEmailInput] = useState("alex.mercer@covercraft.io");
  const [isNotified, setIsNotified] = useState(false);

  // Fetch logged in user email if available
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    fetch(`${API_BASE_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.email) {
          setEmailInput(data.email);
        }
      })
      .catch(() => {});
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNotified(true);
    setTimeout(() => setIsNotified(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      {/* Persistent Sidebar Navigation */}
      <SidebarNav />

      {/* Main Page Layout Pane */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
        {/* Sticky Top Header */}
        <TopHeader />

        {/* Main Content Section */}
        <main className="flex-1 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <RadialGlow />

          {/* Faded/Blurred background content layer embedded in main pane */}
          <div className="absolute inset-0 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full filter blur-[3px] opacity-30 select-none pointer-events-none flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span> Fine-Tuning</span>
                <span>•</span>
                <span>v2.8.0</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-3xl">
                Fine-tuning is currently under active construction.
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 flex flex-col gap-3">
                <span className="text-xs font-mono text-indigo-400 uppercase">Engine Parsing & Correlation Tree</span>
                <div className="h-24 bg-[#14141a] rounded-lg border border-white/5" />
              </div>

              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 flex flex-col gap-3">
                <span className="text-xs font-mono text-indigo-400 uppercase">Primary Vector Storage</span>
                <div className="h-24 bg-[#14141a] rounded-lg border border-white/5" />
              </div>

              <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-6 flex flex-col gap-3">
                <span className="text-xs font-mono text-indigo-400 uppercase">Pipeline Status</span>
                <div className="h-24 bg-[#14141a] rounded-lg border border-white/5" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
              <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
                Active Workspaces Available Now
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col gap-2">
                  <span className="text-sm font-semibold text-white">Matching Engine</span>
                  <span className="text-xs text-zinc-500">Vector cosine similarity & keyword matrix</span>
                </div>
                <div className="p-5 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col gap-2">
                  <span className="text-sm font-semibold text-white">Saved Jobs</span>
                  <span className="text-xs text-zinc-500">Target role tracker & ATS telemetry</span>
                </div>
                <div className="p-5 rounded-xl bg-[#0e0e11] border border-white/10 flex flex-col gap-2">
                  <span className="text-sm font-semibold text-white">Cover Studio</span>
                  <span className="text-xs text-zinc-500">AI anchored document synthesis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Central Construction Card (Centered inside main content pane) */}
          <div className="w-full max-w-lg bg-[#0d0d12] border border-white/10 rounded-2xl p-7 sm:p-9 shadow-2xl flex flex-col items-center text-center gap-6 relative z-10 my-auto">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              <span>Sprint 14 Active Build • v2.8.0</span>
            </div>

            {/* Center Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[#14141a] border border-white/10 flex items-center justify-center text-white shadow-inner">
              <span className="material-symbols-outlined text-[28px]">build</span>
            </div>

            {/* Headline & Description */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Fine-Tuning is Under Construction
              </h1>
            </div>

            {/* Progress Card */}
            <div className="w-full bg-[#121217] border border-white/5 rounded-xl p-4 flex flex-col gap-2.5 text-left">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-300 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Pipeline Deployment
                </span>
                <span className="text-white font-bold">84.2% Complete</span>
              </div>

              <div className="w-full h-2 bg-[#1c1c24] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-sky-400 rounded-full w-[84.2%] transition-all duration-1000" />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-0.5">
                <span>Target: x86_64-vllm</span>
                <span>ETA: 48 Hours</span>
              </div>
            </div>

            {/* Notification Toast Feedback */}
            {isNotified && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono w-full text-center">
                ✓ You will be notified at {emailInput} when live!
              </div>
            )}

            {/* Email Subscription Form */}
            <form onSubmit={handleNotify} className="w-full flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-zinc-500 pointer-events-none">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="alex.mercer@covercraft.io"
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#14141a] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/60 font-mono transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto h-10 px-4 rounded-xl bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-semibold text-xs transition-all shadow flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Notify When Live</span>
                <span className="material-symbols-outlined text-[16px]">notifications</span>
              </button>
            </form>

            {/* Bottom Action Navigation Links */}
            <div className="w-full flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
              <Link
                href="/matches"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[14px]">west</span>
                <span>Back to Dashboard</span>
              </Link>

              <button
                type="button"
                onClick={() => alert("Roadmap documentation is currently being compiled.")}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                <span>View Roadmap Docs</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
