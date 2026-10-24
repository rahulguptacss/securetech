'use client';

import { motion } from 'framer-motion';
import type { ProcessSectionData, ProcessStep } from '../../types';

interface ProcessProps {
  data: ProcessSectionData;
}

// Custom SVG icons matching screenshot exactly
const renderStepIcon = (index: number) => {
  switch (index) {
    case 0:
      // Document with magnifying glass
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
          <circle cx="15.5" cy="15.5" r="3" stroke="#00f0ff" strokeWidth="2" />
          <line x1="17.7" y1="17.7" x2="21" y2="21" stroke="#00f0ff" strokeWidth="2" />
        </svg>
      );
    case 1:
      // Shield with checkmark
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" stroke="#00f0ff" strokeWidth="2.2" />
        </svg>
      );
    case 2:
      // Mechanical gear / cog
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" stroke="#00f0ff" strokeWidth="2" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 3:
      // Monitor with bar chart and shield
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="16" height="12" rx="2" />
          <line x1="7" y1="19" x2="13" y2="19" />
          <line x1="10" y1="15" x2="10" y2="19" />
          <line x1="6" y1="11" x2="6" y2="9.5" stroke="#00f0ff" strokeWidth="2" />
          <line x1="9" y1="11" x2="9" y2="7.5" stroke="#00f0ff" strokeWidth="2" />
          <line x1="12" y1="11" x2="12" y2="5.5" stroke="#00f0ff" strokeWidth="2" />
          <path
            d="M17 14s2.5-1.2 2.5-3.5V7l-2.5-1-2.5 1v3.5c0 2.3 2.5 3.5 2.5 3.5z"
            stroke="#00f0ff"
            strokeWidth="1.6"
            fill="#000000"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function Process({ data }: ProcessProps) {
  return (
    <section id="process" className="relative w-full pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 bg-[#000000] overflow-hidden text-white">
      {/* Background ambient cyber glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[750px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: — HOW IT WORKS — */}
        <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-10 lg:mb-11">
          <div className="inline-flex items-center justify-center gap-4 sm:gap-5 mb-3 sm:mb-4">
            <span className="w-9 sm:w-12 h-[2px] bg-[#00f0ff]" />
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-white uppercase">
              {data.eyebrow || 'HOW IT WORKS'}
            </span>
            <span className="w-9 sm:w-12 h-[2px] bg-[#00f0ff]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] xl:text-[42px] font-extrabold text-white tracking-tight leading-[1.2] mb-4 md:whitespace-nowrap">
            <span>{data.title_regular} </span>
            <span className="text-[#00f0ff]">{data.title_highlight}</span>
          </h2>

          <p className="text-[14px] sm:text-[15.5px] leading-[1.65] text-[#cbd5e1] font-light max-w-2xl mx-auto">
            We follow a structured approach to understand your needs, implement the right solutions
            <br className="hidden sm:inline" />
            {' '}and ensure continuous protection for your business.
          </p>
        </div>

        {/* 4 Process Step Cards with Connected Dashed Curved Swoops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-4 relative">
          {data.steps.map((step: ProcessStep, index: number) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
              className="flex flex-col items-center text-center group relative"
            >
              {/* Main Step Circle Container */}
              <div className="relative mb-6">
                
                {/* Number Badge at Top-Left of Circle: 01, 02, 03, 04 */}
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#00f0ff] bg-black text-[#00f0ff] font-bold text-xs sm:text-[13px] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.45)]">
                  {step.number}
                </div>

                {/* Glowing Cyan Circle with Icon */}
                <div className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-full border-2 border-[#00f0ff] bg-black shadow-[0_0_28px_rgba(0,240,255,0.4),inset_0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(0,240,255,0.65)]">
                  {renderStepIcon(index)}
                </div>

                {/* Desktop Connecting Curved Dashed Line with Arrow & Glowing Dot */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-[50%] -translate-y-1/2 left-[calc(100%-15px)] w-[calc(100%+30px)] h-[60px] pointer-events-none z-0">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 180 60"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Curved downward dashed path */}
                      <path
                        d="M 5 30 C 50 68, 120 68, 160 26"
                        stroke="#00f0ff"
                        strokeWidth="1.8"
                        strokeDasharray="4 4"
                        fill="none"
                      />
                      {/* Arrowhead pointing towards next circle */}
                      <polygon
                        points="155,20 163,27 154,30"
                        fill="#00f0ff"
                      />
                      {/* Glowing cyan terminal dot */}
                      <circle
                        cx="170"
                        cy="27"
                        r="3.5"
                        fill="#00f0ff"
                        className="drop-shadow-[0_0_8px_#00f0ff]"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Step Title */}
              <h3 className="text-lg sm:text-[19px] font-bold text-white tracking-tight mb-2.5 text-center transition-colors duration-200 group-hover:text-[#00f0ff]">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#cbd5e1] font-light text-center max-w-[260px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
