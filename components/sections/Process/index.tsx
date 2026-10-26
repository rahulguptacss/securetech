'use client';

import { motion } from 'framer-motion';
import type { ProcessSectionData, ProcessStep } from '../../types';

interface ProcessProps {
  data: ProcessSectionData;
  variant?: 'timeline' | 'cards' | string;
}

// 6 Timeline SVGs matching reference screenshot
const renderTimelineIcon = (index: number) => {
  switch (index) {
    case 0:
      // Consultation & Assessment: 3 overlapping chat bubbles with dots (exact to close-up screenshot)
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-[#00f0ff]"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main top-center bubble */}
          <path d="M16 19 C16 14.5, 19.6 11, 24 11 C28.4 11, 32 14.5, 32 19 C32 20.8, 31.4 22.4, 30.3 23.7" />
          <path d="M17.7 23.7 C16.6 22.4, 16 20.8, 16 19 Z" />
          {/* Dots inside top bubble */}
          <circle cx="21" cy="18" r="1.1" fill="#00f0ff" />
          <circle cx="24" cy="18" r="1.1" fill="#00f0ff" />
          <circle cx="27" cy="18" r="1.1" fill="#00f0ff" />
          {/* Left speech bubble */}
          <path d="M17 23 C13 24.2, 10 27.5, 10 31.5 C10 33.6, 11 35.5, 12.8 36.8 L11 41 L16 39.5 C17.2 40, 18.6 40.2, 20 40.2 C22.8 40.2, 25.3 39.2, 27 37.5" />
          {/* Right speech bubble */}
          <path d="M29 23.5 C34 24.5, 38 27.8, 38 31.5 C38 33.6, 37 35.5, 35.2 36.8 L37 41 L32 39.5 C30.8 40, 29.4 40.2, 28 40.2 C26.2 40.2, 24.6 39.8, 23.2 39" />
        </svg>
      );
    case 1:
      // Strategy & Planning: Clipboard with checklist
      return (
        <svg
          className="w-9 h-9 sm:w-10 sm:h-10 text-[#00f0ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 12l2 2 4-4" />
          <path d="M9 17h6" />
        </svg>
      );
    case 2:
      // Implementation: Mechanical gear / cogs
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-[#00f0ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 3:
      // Monitoring & Detection: Shield with checkmark
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-[#00f0ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" strokeWidth="2.2" />
        </svg>
      );
    case 4:
      // Response & Recovery: Clock / circular response loop
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-[#00f0ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6" />
          <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
          <polyline points="12 6 12 12 16 14" strokeWidth="2.2" />
        </svg>
      );
    case 5:
      // Continuous Improvement: Ascending growth bar chart
      return (
        <svg
          className="w-10 h-10 sm:w-11 sm:h-11 text-[#00f0ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M4 14l5-5 4 4 7-7" strokeWidth="2.2" />
        </svg>
      );
    default:
      return null;
  }
};

// 4 Circle SVGs matching Services screenshot
const renderCircleIcon = (index: number) => {
  switch (index) {
    case 0:
      // Document with magnifying glass (Assess Your Needs)
      return (
        <svg
          className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white"
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
      // Shield with checkmark (Create a Secure Plan)
      return (
        <svg
          className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white"
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
      // Mechanical gear / cog (Implement Solutions)
      return (
        <svg
          className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white"
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
      // Monitor with bar chart and shield (Monitor & Support)
      return (
        <svg
          className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="16" height="12" rx="2" />
          <line x1="7" y1="19" x2="13" y2="19" strokeWidth="2" />
          <line x1="10" y1="15" x2="10" y2="19" strokeWidth="2" />
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

export default function Process({ data, variant }: ProcessProps) {
  const isTimeline = variant === 'timeline' || data?.steps?.length === 6 || data?.variant === 'timeline';

  if (!isTimeline) {
    // 4-step circle mode with connected dashed curved swoops matching screenshot
    return (
      <section id="process" className="relative w-full pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 bg-[#000000] overflow-hidden text-white">
        {/* Background ambient cyber glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[750px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header: — HOW IT WORKS — */}
          <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center gap-4 mb-3 sm:mb-4">
              <span className="w-9 sm:w-12 h-[2px] bg-[#00f0ff]" />
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-white uppercase">
                {data.eyebrow || 'HOW IT WORKS'}
              </span>
              <span className="w-9 sm:w-12 h-[2px] bg-[#00f0ff]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] xl:text-[42px] font-extrabold text-white tracking-tight leading-[1.2] mb-4">
              <span>{data.title_regular} </span>
              <span className="text-[#00f0ff]">{data.title_highlight}</span>
            </h2>

            <p className="text-[14px] sm:text-[15.5px] leading-[1.65] text-[#cbd5e1] font-light max-w-2xl mx-auto">
              {data.description}
            </p>
          </div>

          {/* 4 Process Step Cards with Connected Dashed Curved Swoops (2 per row on mobile, 4 on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 lg:gap-x-4 gap-y-8 sm:gap-y-10 lg:gap-y-0 relative">
            {data.steps.map((step: ProcessStep, index: number) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
                className="flex flex-col items-center text-center group relative px-1 sm:px-2"
              >
                {/* Main Step Circle Container */}
                <div className="relative mb-3.5 sm:mb-5 lg:mb-6">
                  
                  {/* Number Badge at Top-Left of Circle: 01, 02, 03, 04 */}
                  <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 z-20 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full border border-[#00f0ff] bg-black text-[#00f0ff] font-bold text-[11px] sm:text-xs lg:text-[13px] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.45)]">
                    {step.number}
                  </div>

                  {/* Glowing Cyan Circle with Icon */}
                  <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36 items-center justify-center rounded-full border-2 border-[#00f0ff] bg-black shadow-[0_0_24px_rgba(0,240,255,0.4),inset_0_0_12px_rgba(0,240,255,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(0,240,255,0.65)]">
                    {renderCircleIcon(index)}
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
                <h3 className="text-sm sm:text-base lg:text-[19px] font-bold text-white tracking-tight mb-1.5 sm:mb-2 text-center transition-colors duration-200 group-hover:text-[#00f0ff]">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[11.5px] sm:text-[13px] lg:text-[14px] leading-relaxed text-[#cbd5e1] font-light text-center max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // Exact Alternating Timeline matching screenshot
  return (
    <section id="process" className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-10 bg-[#000000] overflow-hidden text-white">
      {/* Subtle ambient cyan glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#00f0ff]/[0.04] blur-[160px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: — OUR PROCESS — */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-11">
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase">
              {data.eyebrow || 'OUR PROCESS'}
            </span>
            <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.2] mb-4">
            <span>{data.title_regular} </span>
            <span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              {data.title_highlight}
            </span>
          </h2>

          <p className="text-sm sm:text-[15px] leading-relaxed text-slate-300 font-normal max-w-xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Glowing Cyan Vertical Line (Desktop: center, Mobile: left-7) */}
          <div className="absolute top-0 bottom-0 left-7 md:left-1/2 -translate-x-1/2 w-[2px] bg-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.7)]">
            {/* Top Node */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
            {/* Bottom Node */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-8 sm:space-y-11 relative z-10">
            {data.steps.map((step: ProcessStep, index: number) => {
              const isEven = index % 2 === 0; // 0, 2, 4 -> Left card; 1, 3, 5 -> Right card

              return (
                <div key={step.number} className="relative">
                  {/* DESKTOP LAYOUT (md and above): Alternating Left / Right with integrated circle */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-0 items-center">
                    
                    {/* Left Column */}
                    {isEven ? (
                      /* Left Card: Text on Left, Circle on Right inside the card + branch to center */
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center justify-end"
                      >
                        {/* The Unified Card Container */}
                        <div className="relative flex items-center justify-between gap-5 sm:gap-6 rounded-[26px] border-[1.5px] border-[#00f0ff] bg-[#020b14]/90 backdrop-blur-md p-6 sm:p-7 pl-7 sm:pl-8 pr-6 sm:pr-7 max-w-[490px] w-full shadow-[0_0_20px_rgba(0,240,255,0.08)] hover:shadow-[0_0_30px_rgba(0,240,255,0.22)] transition-all duration-300">
                          {/* Text Content */}
                          <div className="flex-1 pr-1">
                            <span className="block text-[#00f0ff] font-bold text-2xl sm:text-[30px] leading-none mb-2.5 tracking-tight">
                              {step.number}
                            </span>
                            <h3 className="text-white font-bold text-lg sm:text-[21px] leading-tight mb-2.5">
                              {step.title}
                            </h3>
                            <p className="text-[#cbd5e1] text-xs sm:text-[14px] leading-[1.65] font-light">
                              {step.description}
                            </p>
                          </div>

                          {/* Circular Icon Badge inside the card on the right */}
                          <div className="relative shrink-0 flex items-center">
                            <div className="w-20 h-20 sm:w-[86px] sm:h-[86px] rounded-full border-[3px] border-[#00f0ff] bg-[#020914] flex items-center justify-center shadow-[0_0_25px_#00f0ff,0_0_10px_#00f0ff,inset_0_0_12px_rgba(0,240,255,0.25)] transition-transform duration-300 hover:scale-105">
                              {renderTimelineIcon(index)}
                            </div>
                          </div>
                        </div>

                        {/* Horizontal connector line from card/circle edge to center timeline line */}
                        <div className="w-8 sm:w-12 h-[2px] bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] shrink-0" />
                      </motion.div>
                    ) : (
                      /* Empty Left placeholder to maintain grid alignment */
                      <div className="hidden md:block" />
                    )}

                    {/* Right Column */}
                    {!isEven ? (
                      /* Right Card: branch from center + Circle on Left inside card, Text on Right */
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center justify-start"
                      >
                        {/* Horizontal connector line from center timeline line to card/circle edge */}
                        <div className="w-8 sm:w-12 h-[2px] bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] shrink-0" />

                        {/* The Unified Card Container */}
                        <div className="relative flex items-center justify-between gap-5 sm:gap-6 rounded-[26px] border-[1.5px] border-[#00f0ff] bg-[#020b14]/90 backdrop-blur-md p-6 sm:p-7 pl-6 sm:pl-7 pr-7 sm:pr-8 max-w-[490px] w-full shadow-[0_0_20px_rgba(0,240,255,0.08)] hover:shadow-[0_0_30px_rgba(0,240,255,0.22)] transition-all duration-300">
                          {/* Circular Icon Badge inside the card on the left */}
                          <div className="relative shrink-0 flex items-center">
                            <div className="w-20 h-20 sm:w-[86px] sm:h-[86px] rounded-full border-[3px] border-[#00f0ff] bg-[#020914] flex items-center justify-center shadow-[0_0_25px_#00f0ff,0_0_10px_#00f0ff,inset_0_0_12px_rgba(0,240,255,0.25)] transition-transform duration-300 hover:scale-105">
                              {renderTimelineIcon(index)}
                            </div>
                          </div>

                          {/* Text Content */}
                          <div className="flex-1 pl-1">
                            <span className="block text-[#00f0ff] font-bold text-2xl sm:text-[30px] leading-none mb-2.5 tracking-tight">
                              {step.number}
                            </span>
                            <h3 className="text-white font-bold text-lg sm:text-[21px] leading-tight mb-2.5">
                              {step.title}
                            </h3>
                            <p className="text-[#cbd5e1] text-xs sm:text-[14px] leading-[1.65] font-light">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Empty Right placeholder to maintain grid alignment */
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* MOBILE LAYOUT (< md): Vertical stack aligned with left line */}
                  <div className="flex md:hidden items-center pl-7 gap-3">
                    {/* Horizontal branch from line to card */}
                    <div className="w-4 h-[2px] bg-[#00f0ff] shrink-0 shadow-[0_0_6px_#00f0ff]" />

                    {/* The Card with internal circle */}
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[22px] border-[1.5px] border-[#00f0ff] bg-[#020b14]/90 p-5 shadow-[0_0_20px_rgba(0,240,255,0.08)]">
                      <div className="flex-1">
                        <span className="block text-[#00f0ff] font-bold text-2xl mb-1">
                          {step.number}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-[#cbd5e1] font-light">
                          {step.description}
                        </p>
                      </div>

                      <div className="w-16 h-16 rounded-full border-2 border-[#00f0ff] bg-[#020914] shrink-0 flex items-center justify-center shadow-[0_0_18px_#00f0ff,inset_0_0_10px_rgba(0,240,255,0.2)]">
                        {renderTimelineIcon(index)}
                      </div>
                    </div>
                  </div>

                  {/* Center Dot on Vertical Line */}
                  <div className="absolute top-1/2 left-7 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] border-2 border-black z-20 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
