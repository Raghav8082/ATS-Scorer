"use client";

import React from "react";
import Link from "next/link";

interface TopHeaderProps {
  onNewMatch?: () => void;
}

export function TopHeader({ onNewMatch }: TopHeaderProps) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 z-40 flex items-center justify-between px-8">
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          Landing
        </Link>
        <Link
          href="/matches"
          className="text-white font-medium hover:text-white transition-colors"
        >
          Matches
        </Link>
        <Link
          href="#"
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Documentation
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
        >
          Sign in
        </Link>
        <button
          onClick={onNewMatch}
          className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Match</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center font-semibold text-xs shrink-0">
          AM
        </div>
      </div>
    </header>
  );
}
