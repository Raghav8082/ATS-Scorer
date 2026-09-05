"use client";

import React from "react";

interface SourceDocumentCardProps {
  fileName?: string;
  fileSize?: string;
  parsedTime?: string;
  pagesCount?: number;
  onReplaceFile?: () => void;
}

export function SourceDocumentCard({
  fileName = "Sarah_Jenkins_Senior_Frontend_2025.pdf",
  fileSize = "142 KB",
  parsedTime = "Parsed 4m ago",
  pagesCount = 3,
  onReplaceFile,
}: SourceDocumentCardProps) {
  return (
    <div className="bg-[#0e0e11] p-6 rounded-xl border border-white/10 shadow-xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-[20px] text-indigo-400">description</span>
          <span className="text-base font-medium">Source Document</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          PDF Linked
        </span>
      </div>

      <div className="group relative flex items-center justify-between p-4 rounded-lg bg-[#14141a] hover:bg-[#1a1a23] transition-colors border border-white/5">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#202029] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-[20px]">picture_as_pdf</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm text-white font-medium truncate">{fileName}</span>
            <span className="text-xs font-mono text-zinc-400">
              {fileSize} • {parsedTime}
            </span>
          </div>
        </div>
        <button
          onClick={onReplaceFile}
          type="button"
          className="shrink-0 ml-3 px-3 py-1.5 rounded-lg bg-[#202029] hover:bg-[#2c2c38] text-zinc-200 text-xs font-medium transition-colors border border-white/5"
        >
          {/* TODO: wire to POST /profile/upload */}
          Replace file
        </button>
      </div>

      <div className="flex items-center justify-between px-1 text-xs font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-indigo-400">check_circle</span>
          {pagesCount} pages indexed
        </span>
        <span>UTF-8 encoded</span>
      </div>
    </div>
  );
}
