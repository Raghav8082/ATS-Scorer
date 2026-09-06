"use client";

import React from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { RadialGlow } from "@/components/ui/radial-glow";
import { EmptyStatePanel as NewMatchPanel } from "@/components/dashboard/New-match";

export default function NewMatchPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Left Persistent Navigation Sidebar */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <TopHeader />

        <main className="flex-1 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
          <RadialGlow />

          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Create New Match
            </h1>
          </div>

          <NewMatchPanel />
        </main>
      </div>
    </div>
  );
}
