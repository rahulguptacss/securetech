'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqSectionData, FaqItem } from '../../types';

interface FaqProps {
  data: FaqSectionData;
  showHeading?: boolean;
}

export default function Faq({ data, showHeading = false }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full pt-1 sm:pt-2 pb-16 sm:pb-24 lg:pb-28 bg-[#000000] text-white">
      {/* Background cyber ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-[#00f0ff]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-[#00f0ff]/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl lg:max-w-[940px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showHeading && (data.eyebrow || data.title_regular) && (
          <div className="text-center mb-10 sm:mb-14">
            {data.eyebrow && (
              <span className="inline-block text-xs font-bold tracking-widest text-[#00f0ff] uppercase mb-2">
                {data.eyebrow}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              <span>{data.title_regular} </span>
              {data.title_highlight && (
                <span className="text-[#00f0ff] text-cyber-glow">
                  {data.title_highlight}
                </span>
              )}
            </h2>
          </div>
        )}

        {/* 10 FAQ Accordion Cards - Normal instant toggle without animation */}
        <div className="space-y-3 sm:space-y-3.5">
          {data.items.map((item: FaqItem, index: number) => {
            const isOpen = openIndex === index;
            const numberLabel = item.number || (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={item.id || item.question}
                className={`relative rounded-2xl overflow-hidden ${
                  isOpen
                    ? 'bg-[#020b16] border border-[#00f0ff]/60 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                    : 'bg-[#020713]/95 border border-[#00f0ff]/20 hover:border-[#00f0ff]/45'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between py-3.5 px-4 sm:py-4 sm:px-5 lg:px-6 text-left group cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  {/* Left: Number Box + Question Text */}
                  <div className="flex items-center gap-3.5 sm:gap-4.5 flex-1 pr-3 sm:pr-4">
                    {/* Number Badge */}
                    <div
                      className={`w-10 h-8 sm:w-12 sm:h-9 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm sm:text-base tracking-wide ${
                        isOpen
                          ? 'bg-[#00f0ff] text-black shadow-[0_0_12px_rgba(0,240,255,0.45)]'
                          : 'border-2 border-[#00f0ff] bg-black/50 text-[#00f0ff]'
                      }`}
                    >
                      {numberLabel}
                    </div>

                    {/* Question Text */}
                    <h3 className="text-[15px] sm:text-[16.5px] lg:text-[17.5px] font-bold text-white tracking-tight leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  {/* Right: Cyan Chevron */}
                  <div className="shrink-0 p-1">
                    <ChevronDown
                      className={`h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#00f0ff] ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                {/* Normal direct rendering without animation */}
                {isOpen && (
                  <div className="px-4 sm:pl-[74px] lg:pl-[78px] sm:pr-8 pb-4.5 pt-0 text-[#cbd5e1] font-light text-[13.5px] sm:text-[14px] leading-relaxed">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
