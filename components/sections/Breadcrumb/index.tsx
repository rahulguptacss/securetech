'use client';

import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';
import type { BreadcrumbSectionData } from '../../types';

interface BreadcrumbProps {
  data: BreadcrumbSectionData;
  currentPage: string;
  watermark?: string;
}

export default function Breadcrumb({ data, currentPage, watermark }: BreadcrumbProps) {
  return (
    <section className="relative w-full pt-36 pb-16 bg-[#040812] border-b border-cyan-900/30 overflow-hidden cyber-grid">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Watermark text */}
      {watermark && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="text-7xl sm:text-9xl font-black uppercase text-cyan-400/[0.03] tracking-widest">
            {watermark}
          </span>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          <span className="text-cyan-gradient">{currentPage}</span>
        </h1>

        {/* Breadcrumb nav links */}
        <nav className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-[#081224]/80 px-4 py-1.5 text-xs sm:text-sm text-slate-400">
          <Link href="/" className="hover:text-[#00f0ff] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-cyan-500/60" />
          <span className="text-[#00f0ff] font-semibold">{currentPage}</span>
        </nav>
      </div>
    </section>
  );
}
