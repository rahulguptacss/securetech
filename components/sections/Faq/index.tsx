'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqSectionData, FaqItem } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface FaqProps {
  data: FaqSectionData;
}

export default function Faq({ data }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#040812] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Eyebrow text={data.eyebrow} align="center" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            <span>{data.title_regular} </span>
            <span className="text-[#00f0ff] text-cyber-glow">
              {data.title_highlight}
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {data.items.map((item: FaqItem, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-cyan-500/20 bg-[#071122]/80 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-bold text-white pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#00f0ff] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-cyan-900/30">
                    <p className="pt-4">{item.answer}</p>
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
