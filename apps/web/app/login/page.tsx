"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthRadialGlow } from "@/components/ui/radial-glow";

export default function LoginPage() {
  // Local state only — no backend or auth logic
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: wire to POST /auth/login or OAuth provider
    // e.g. const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient background glow */}
      <AuthRadialGlow />

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#14141a] border border-white/10 flex items-center justify-center text-white shadow-lg shadow-indigo-500/10 group-hover:border-indigo-500/40 transition-colors">
              <svg fill="none" height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-xl font-bold text-white tracking-tight">
              CoverCraft
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-white tracking-tight text-center">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5 text-center">
            Enter your credentials to access your scoring dashboard
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-[#0e0e11] border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-mono uppercase tracking-wider text-zinc-400"
              >
                Work Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.mercer@company.com"
                  className="w-full bg-[#14141a] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-400"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#14141a] border border-white/10 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#14141a] border-white/20 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                />
                <span className="text-xs text-zinc-400">Remember for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            {/* TODO: wire to POST /auth/login */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-semibold py-2.5 rounded-lg text-sm transition-all shadow-md shadow-white/5 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    refresh
                  </span>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Social Sign-in Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[11px] font-mono uppercase tracking-wider">
              <span className="bg-[#0e0e11] px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          {/* OAuth Mock Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#14141a] hover:bg-[#1c1c24] border border-white/10 text-xs text-zinc-300 font-medium transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#14141a] hover:bg-[#1c1c24] border border-white/10 text-xs text-zinc-300 font-medium transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>

        {/* Footer Redirect Link */}
        <p className="text-center text-xs text-zinc-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-white hover:text-indigo-300 font-semibold transition-colors underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
