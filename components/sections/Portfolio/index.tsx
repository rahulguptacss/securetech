'use client';

import Image from 'next/image';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import type { PortfolioSectionData, PortfolioItem } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface PortfolioProps {
  data: PortfolioSectionData;
}

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#040812] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow text={data.eyebrow} align="center" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            <span>{data.title_regular} </span>
            <span className="text-[#00f0ff] text-cyber-glow">
              {data.title_highlight}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item: PortfolioItem) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-cyan-500/20 bg-[#071122]/90 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071122] via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <span className="text-xs font-bold tracking-wider text-[#00f0ff] uppercase mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                  {item.title}
                </h3>
                <div className="inline-flex items-center gap-2 rounded-lg bg-cyan-950/60 border border-cyan-400/30 px-3 py-1.5 text-xs font-semibold text-slate-200">
                  <ShieldCheck className="h-4 w-4 text-[#00ffb2]" />
                  <span>{item.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
