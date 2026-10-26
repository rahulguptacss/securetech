'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PortfolioSectionData, PortfolioItem } from '../../types';

interface PortfolioProps {
  data: PortfolioSectionData;
}

export default function Portfolio({ data }: PortfolioProps) {
  const items: PortfolioItem[] = data?.items || [];

  return (
    <section
      id="portfolio-grid"
      className="relative w-full pt-8 sm:pt-10 lg:pt-14 pb-20 sm:pb-24 lg:pb-32 bg-[#000000]"
    >
      {/* Subtle ambient cyan glow in background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#00f0ff]/[0.03] blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3x3 Project Grid Matching Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-9">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-2xl bg-[#000000] border border-[#00f0ff]/40 shadow-[0_0_20px_rgba(0,240,255,0.12)] hover:border-[#00f0ff] hover:shadow-[0_0_35px_rgba(0,240,255,0.28)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Image: Aspect 1.88/1 matching screenshot with crisp zoom on hover */}
              <div className="relative w-full aspect-[1.88/1] overflow-hidden bg-black shrink-0">
                <Image
                  src={item.image}
                  alt={item.image_alt || item.title}
                  fill
                  priority={index < 3}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Card Body exactly matching close-up screenshot */}
              <div className="px-6 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-7 flex flex-col flex-1 bg-[#000000]">
                {/* Category: Bold uppercase cyan */}
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.08em] sm:tracking-[0.1em] text-[#00f0ff] uppercase mb-2 block">
                  {item.category}
                </span>

                {/* Project Title: Bold crisp white */}
                <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug mb-2.5 transition-colors group-hover:text-[#00f0ff]">
                  <Link href={item.link_href} className="hover:underline">
                    {item.title}
                  </Link>
                </h3>

                {/* Project Description: Soft light gray */}
                <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#cbd5e1] font-light mb-6 flex-1 line-clamp-2">
                  {item.description}
                </p>

                {/* View Project Action Row: Title-case text + bright cyan filled circle with black arrow */}
                <div className="mt-auto pt-1">
                  <Link
                    href={item.link_href}
                    className="inline-flex items-center gap-3.5 group/btn"
                  >
                    <span className="text-sm sm:text-[15px] font-bold text-[#00f0ff] transition-colors group-hover/btn:text-white">
                      {item.link_text || 'View Project'}
                    </span>
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#00f0ff] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-300 group-hover/btn:bg-white group-hover/btn:shadow-[0_0_20px_#00f0ff] group-hover/btn:scale-110">
                      <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5] transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
