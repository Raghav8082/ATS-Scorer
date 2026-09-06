"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface TopHeaderProps {
  onNewMatch?: () => void;
}

export function TopHeader({ onNewMatch }: TopHeaderProps) {
   const pathname = usePathname();
   const router = useRouter();
   const [currentUser, setcurrentuser] = useState<{ username: string } | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem("access_token");

        if (!token) return;
        try {
          const response = await fetch("http://127.0.0.1:8000/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setcurrentuser(data);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
       window.addEventListener("user-login", fetchUser);
    return () => window.removeEventListener("user-login", fetchUser)
    }, [pathname]);

    const username  = currentUser?.username || "Guest"
    const avatar_initial = username.charAt(0).toUpperCase()+username.charAt(1).toUpperCase() || "G"
  return (

    <header className="fixed top-0 left-64 right-0 h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 z-40 flex items-center justify-between px-8">
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/matches"
          className="text-white font-medium hover:text-white transition-colors"
        >
          Matches
        </Link>
        <button
          type="button"
          onClick={() => alert("Feature in progress")}
          className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          Documentation
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/new-match"
          onClick={() => {
            if (onNewMatch) onNewMatch();
          }}
          className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Match</span>
        </Link>
        {
          (!currentUser)?(
            <Link
          href="/login"
          className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
        >
          Sign in
        </Link>
          )
          : (
        <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center font-semibold text-xs shrink-0">
          {avatar_initial}
        </div>
          )
        }
      
      </div>
    </header>
  );
}
