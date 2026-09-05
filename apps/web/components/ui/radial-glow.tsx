import React from "react";

interface RadialGlowProps {
  className?: string;
}

export function RadialGlow({ className = "" }: RadialGlowProps) {
  return (
    <div className={`pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[700px] h-[340px] overflow-hidden flex items-center justify-center -z-10 ${className}`}>
      <div
        className="w-[520px] h-[220px] rounded-full blur-[110px] opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(79, 70, 229, 0.12) 40%, rgba(0, 0, 0, 0) 70%)",
        }}
      />
    </div>
  );
}

export function AuthRadialGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[450px]"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.22) 0%, rgba(79, 70, 229, 0.08) 35%, rgba(0, 0, 0, 0) 70%)",
        }}
      />
    </div>
  );
}
