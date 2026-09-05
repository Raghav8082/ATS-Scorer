"use client";

import React from "react";
import Link from "next/link";

export default function RootLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-indigo-500/20 selection:text-indigo-200 overflow-x-hidden">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#070709]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-[#14141a] border border-white/10 flex items-center justify-center text-white shadow-sm group-hover:border-indigo-500/40 transition-colors">
              <svg fill="none" height="18" viewBox="0 0 32 32" width="18" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#121217" height="32" rx="8" stroke="#27272a" strokeWidth="1" width="32" />
                <path
                  d="M9 11C9 9.89543 9.89543 9 11 9H17C19.2091 9 21 10.7909 21 13V13C21 15.2091 19.2091 17 17 17H11C9.89543 17 9 17.8954 9 19V21C9 22.1046 9.89543 23 11 23H21"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <circle cx="21" cy="11" fill="#6366F1" r="2" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight text-white text-[15px] group-hover:text-zinc-200 transition-colors">
              CoverCraft
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-zinc-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#product-breakdown" className="hover:text-white transition-colors">
              Product
            </a>
            <a href="#why-different" className="hover:text-white transition-colors">
              Architecture
            </a>
            <Link href="/matches" className="hover:text-white transition-colors">
              Matches
            </Link>
            <Link href="/saved-jobs" className="hover:text-white transition-colors">
              Saved Jobs
            </Link>
            <Link href="/resumes" className="hover:text-white transition-colors">
              Resumes
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-4 text-[13.5px]">
            <Link
              href="/login"
              className="text-zinc-400 hover:text-white font-medium transition-colors px-2 py-1"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white text-[#070709] font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 text-center px-6 overflow-hidden">
          {/* Ambient Hero Radial Glow */}
          <div
            className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[860px] h-[480px] blur-[55px] -z-10"
            style={{
              background:
                "radial-gradient(circle 420px at center, rgba(99, 102, 241, 0.22) 0%, rgba(79, 70, 229, 0.12) 45%, rgba(7, 7, 9, 0) 75%)",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Subheading Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Engineered for Software Engineers & Technical Leaders</span>
            </div>

            {/* Confident Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
              Know exactly how you match, before you apply.
            </h1>

            {/* Supporting Value Copy */}
            <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
              CoverCraft breaks down any engineering job description against your actual experience — revealing
              clause-level alignment, skill gaps, and generating verified cover letters.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#070709] font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all text-sm shadow-sm"
              >
                Get Started Free
              </Link>
              <a
                href="#product-breakdown"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-white/15 bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/[0.06] hover:border-white/25 font-medium px-6 py-3 rounded-lg active:scale-[0.98] transition-all text-sm"
              >
                See how it works
              </a>
            </div>

            {/* Trust Note */}
            <p className="mt-6 text-xs text-zinc-500 font-mono tracking-tight">
              No résumé data stored beyond your session • Zero hallucinated keywords • Private local vectorization
            </p>
          </div>
        </section>

        {/* PRODUCT SCREENSHOT / PROOF SECTION */}
        <section id="product-breakdown" className="relative max-w-6xl mx-auto px-6 pb-28">
          <div className="relative rounded-2xl p-2 sm:p-3 border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-transparent shadow-2xl">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0c0c10]">
              {/* Browser / Tool Window Chrome */}
              <div className="h-10 bg-[#121217] border-b border-white/[0.06] px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <span className="ml-3 text-[11px] font-mono text-zinc-500">
                    covercraft.app/matches/req-9428-stripe-infra
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span> 94% OVERALL MATCH
                  </span>
                </div>
              </div>

              {/* Realistic Mockup of the CoverCraft Scoring Dashboard */}
              <div className="p-6 md:p-8 bg-[#09090c] text-left">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Source Document & Target Role Requisition */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Source Card */}
                    <div className="p-4 rounded-xl border border-white/10 bg-[#121217]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-indigo-400">
                            description
                          </span>
                          Verified Resume Payload
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">PDF • 142 KB</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#16161d] border border-white/[0.04]">
                        <div className="font-medium text-sm text-white">
                          Alex_Chen_Staff_Backend_Engineer_2025.pdf
                        </div>
                        <div className="text-xs text-zinc-400 mt-1">
                          4 pages • 1,420 tokens parsed • 24 core vector anchors
                        </div>
                      </div>
                    </div>

                    {/* Requisition Card */}
                    <div className="p-4 rounded-xl border border-white/10 bg-[#121217]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-indigo-400">
                            business_center
                          </span>
                          Target Position Requisition
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">Stripe • REQ-9428</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Staff Infrastructure Engineer (Core Payments / Tier-0)
                      </div>
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                        &quot;Looking for staff engineers to scale our high-throughput consensus state machine, tier-0
                        ledger idempotency, and multi-datacenter partition tolerance with 99.999% availability.&quot;
                      </p>
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/5">
                          Distributed Systems
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/5">
                          Raft / Paxos
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/5">
                          Go / Rust
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quantitative Match Breakdown & Scored Sections */}
                  <div className="lg:col-span-7 p-5 rounded-xl border border-white/10 bg-[#121217] flex flex-col justify-between">
                    <div>
                      {/* Score Header */}
                      <div className="flex items-start justify-between pb-5 border-b border-white/[0.06]">
                        <div>
                          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                            Algorithmic Alignment Score
                          </div>
                          <div className="text-5xl font-extrabold text-white mt-1 tracking-tight">
                            94%
                          </div>
                          <div className="text-xs text-zinc-400 mt-1">
                            High Conviction Match across 27 clause pairs
                          </div>
                        </div>
                        <div className="text-right space-y-1.5">
                          <div className="text-xs font-mono text-zinc-400">
                            Semantic Depth: <span className="text-white font-medium">96%</span>
                          </div>
                          <div className="text-xs font-mono text-zinc-400">
                            Technical Lexicon: <span className="text-white font-medium">89%</span>
                          </div>
                          <div className="text-xs font-mono text-zinc-400">
                            Identified Gaps: <span className="text-amber-400 font-medium">1 minor</span>
                          </div>
                        </div>
                      </div>

                      {/* Ranked Section Breakdown */}
                      <div className="mt-5 space-y-3.5">
                        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          Ranked Section Breakdown
                        </div>

                        {/* Item 1 */}
                        <div className="p-3 rounded-lg bg-[#16161d] border border-white/[0.04]">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-medium text-white">
                              01. Tier-0 Settlement Migration (FinCore)
                            </span>
                            <span className="font-mono text-indigo-400">96% alignment</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full w-[96%]"></div>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1.5">
                            Matches clause: &quot;High-throughput microservices and idempotent payment ledger pipelines&quot;
                          </p>
                        </div>

                        {/* Item 2 */}
                        <div className="p-3 rounded-lg bg-[#16161d] border border-white/[0.04]">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-medium text-white">
                              02. Raft Consensus Engine Implementation
                            </span>
                            <span className="font-mono text-indigo-400">94% alignment</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full w-[94%]"></div>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1.5">
                            Matches clause: &quot;Multi-datacenter partition resilience and strict serializability&quot;
                          </p>
                        </div>

                        {/* Item 3 */}
                        <div className="p-3 rounded-lg bg-[#16161d] border border-white/[0.04]">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-medium text-white">
                              03. Black Friday 99.999% SLA High-Load Reliability
                            </span>
                            <span className="font-mono text-indigo-400">91% alignment</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full w-[91%]"></div>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1.5">
                            Matches clause: &quot;Experience handling multi-billion dollar transaction volume surges&quot;
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer in Mockup */}
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs text-zinc-400 font-mono">Semantic Heatmap Ready</span>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/matches"
                          className="px-3 py-1.5 rounded text-xs font-medium text-zinc-300 bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          View Heatmap
                        </Link>
                        <Link
                          href="/cover-letters"
                          className="px-3 py-1.5 rounded text-xs font-medium text-[#070709] bg-white hover:bg-zinc-200 transition-colors font-medium shadow-sm"
                        >
                          Craft Cover Letter
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (3 SIMPLE FLAT STEPS) */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20 border-t border-white/[0.06]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              How it works
            </h2>
            <p className="text-sm text-zinc-400 mt-3">
              A streamlined 3-step workflow built to give you total visibility into how hiring committees and screening filters evaluate your background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0c10] hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-5">
                <span className="material-symbols-outlined text-[20px] text-indigo-400">upload_file</span>
              </div>
              <h3 className="text-base font-semibold text-white">Upload your resume</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                Drop your PDF or DOCX. CoverCraft parses structural experience items, technical competencies, and impact metrics securely in your browser.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0c10] hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-5">
                <span className="material-symbols-outlined text-[20px] text-indigo-400">assignment</span>
              </div>
              <h3 className="text-base font-semibold text-white">Paste any job description</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                Provide the raw job requisition or public link. The system extracts hard requirements, core stack clauses, and leadership mandates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0c10] hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-5">
                <span className="material-symbols-outlined text-[20px] text-indigo-400">analytics</span>
              </div>
              <h3 className="text-base font-semibold text-white">See your real match score</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                Receive clause-level cosine vector scores, identify unmentioned technical areas, and generate an anchored cover letter with one click.
              </p>
            </div>
          </div>
        </section>

        {/* WHY IT'S DIFFERENT SECTION */}
        <section id="why-different" className="max-w-5xl mx-auto px-6 py-20 border-t border-white/[0.06]">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              Architectural Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why CoverCraft is different
            </h2>
            <p className="text-sm text-zinc-400 mt-3">
              Traditional tools use primitive keyword stuffing that modern applicant filters penalize. We treat resume matching as an embedding vector alignment problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prop 1 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0c10] flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-zinc-500 mb-3">01 / SEMANTIC EMBEDDINGS</div>
                <h3 className="text-base font-semibold text-white">Semantic matching, not keyword stuffing</h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  We evaluate sentences using high-dimensional cosine embeddings. If a job asks for &quot;distributed consensus,&quot; your work on Paxos or Raft is recognized even without matching the exact phrasing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-500">
                text-embedding-3-large model
              </div>
            </div>

            {/* Prop 2 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0c10] flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-zinc-500 mb-3">02 / SECTION BREAKDOWN</div>
                <h3 className="text-base font-semibold text-white">Section-by-section breakdown, not a black box</h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Never wonder why you received a specific percentage. CoverCraft breaks your evaluation into independent ranked sections so you know exactly which bullets carry the highest weight.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-500">
                Clause-level alignment metrics
              </div>
            </div>

            {/* Prop 3 */}
            <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0c10] flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-zinc-500 mb-3">03 / EVIDENCE ANCHORING</div>
                <h3 className="text-base font-semibold text-white">Verifiable cover letters without fabrication</h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Every sentence in our generated cover letters is strictly anchored to an actual achievement from your parsed resume, preventing the generic hallucinations common in general LLMs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-500">
                100% cited resume assertions
              </div>
            </div>
          </div>
        </section>

        {/* FINAL REPEAT CTA SECTION WITH INDIGO GLOW */}
        <section className="relative py-28 px-6 text-center overflow-hidden border-t border-white/[0.06]">
          {/* Subdued Radial Glow behind final CTA */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[380px] blur-[50px] -z-10"
            style={{
              background:
                "radial-gradient(circle 320px at center, rgba(99, 102, 241, 0.18) 0%, rgba(79, 70, 229, 0.08) 45%, rgba(7, 7, 9, 0) 75%)",
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Know how you match before applying.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-400">
              Upload your resume and any engineering job posting to see your clause-level match score in under five seconds.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#070709] font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all text-sm shadow-sm"
              >
                Get Started Free
              </Link>
              <Link
                href="/matches"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-white/15 bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/[0.06] font-medium px-6 py-3 rounded-lg active:scale-[0.98] transition-all text-sm"
              >
                View Live Demo
              </Link>
            </div>

            <div className="mt-6 text-xs text-zinc-500 font-mono">
              Free evaluation for up to 3 target jobs • No credit card required
            </div>
          </div>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#070709] text-xs text-zinc-400 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Info */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#14141a] border border-white/10 flex items-center justify-center text-white">
                  <svg fill="none" height="14" viewBox="0 0 32 32" width="14" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#121217" height="32" rx="8" stroke="#27272a" strokeWidth="1" width="32" />
                    <path
                      d="M9 11C9 9.89543 9.89543 9 11 9H17C19.2091 9 21 10.7909 21 13V13C21 15.2091 19.2091 17 17 17H11C9.89543 17 9 17.8954 9 19V21C9 22.1046 9.89543 23 11 23H21"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <circle cx="21" cy="11" fill="#6366F1" r="2" />
                  </svg>
                </div>
                <span className="font-semibold text-white text-sm">CoverCraft</span>
              </div>
              <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
                Algorithmic resume analysis and verifiable cover letter synthesis for software engineers and engineering leaders.
              </p>
              <div className="text-[11px] font-mono text-zinc-600">
                Built with precision dark UI standards.
              </div>
            </div>

            {/* Column 1: Product */}
            <div>
              <div className="font-medium text-white mb-3 text-xs">Product</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link href="/matches" className="hover:text-white transition-colors">
                    Resume Scorer
                  </Link>
                </li>
                <li>
                  <Link href="/matches" className="hover:text-white transition-colors">
                    Semantic Heatmap
                  </Link>
                </li>
                <li>
                  <Link href="/cover-letters" className="hover:text-white transition-colors">
                    Cover Letter Studio
                  </Link>
                </li>
                <li>
                  <Link href="/saved-jobs" className="hover:text-white transition-colors">
                    Saved Jobs Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/resumes" className="hover:text-white transition-colors">
                    Profiles & Resumes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Architecture & Resources */}
            <div>
              <div className="font-medium text-white mb-3 text-xs">Resources</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#why-different" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#why-different" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#why-different" className="hover:text-white transition-colors">
                    Embedding Model
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Trust */}
            <div>
              <div className="font-medium text-white mb-3 text-xs">Trust & Legal</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Data Retention
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
            <div>
              © 2025 CoverCraft Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Deterministic token evaluation</span>
              <span>Zero training on customer resumes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
