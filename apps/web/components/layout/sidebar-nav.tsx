"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Matches", href: "/matches", icon: "grid_view" },
  { name: "Resumes", href: "/resumes", icon: "description" },
  { name: "Saved Jobs", href: "/saved-jobs", icon: "bookmark" },
  { name: "Cover Letters", href: "/cover-letters", icon: "edit_note" },
  { name: "Preferences", href: "#", icon: "tune" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0a0d] border-r border-white/10 z-50 flex flex-col justify-between pt-4 pb-6 select-none">
      <div className="flex flex-col gap-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="px-6 flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#14141a] border border-white/10 flex items-center justify-center text-white shadow-md">
            <svg fill="none" height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-lg font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
            CoverCraft
          </span>
        </Link>

        {/* Primary Navigation Menu */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-[#202029] text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:bg-[#1a1a24] hover:text-zinc-200"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Utilities */}
      <div className="px-3 flex flex-col gap-3">
        <Link
          href="#"
          className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm text-zinc-400 hover:bg-[#1a1a24] hover:text-zinc-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
          <span>Docs & Help</span>
        </Link>

        {/* User Card */}
        {/* TODO: Wire to real user profile data from /user/me or auth session */}
        <div className="p-3 rounded-xl bg-[#111116] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0 font-semibold text-xs">
              AM
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-white font-medium truncate">
                Alex Mercer
              </span>
              <span className="text-[10px] font-mono font-semibold tracking-wider text-indigo-400 uppercase">
                PRO PLAN
              </span>
            </div>
          </div>
          <button
            aria-label="User menu"
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
