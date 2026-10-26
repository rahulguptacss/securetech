'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { MissionVisionSectionData } from '../../types';

interface MissionVisionProps {
  data: MissionVisionSectionData;
}

export default function MissionVision({ data }: MissionVisionProps) {
  if (!data || !data.mission || !data.vision) return null;

  return (
    <section id="mission-vision" className="relative w-full pt-4 sm:pt-6 pb-6 sm:pb-8 bg-[#000000] overflow-hidden text-white">
      {/* Background ambient cyan glows */}
      <div
        className="pointer-events-none absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.06] blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.06] blur-[160px]"
        aria-hidden="true"
      />

      {/* TOP-LEFT CYBER WAVE WIREFRAME (matching screenshot exactly) */}
      <div className="pointer-events-none absolute -top-8 -left-8 sm:-top-12 sm:-left-12 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] opacity-50 select-none z-0">
        <Image
          src="/images/save-wave.webp"
          alt=""
          fill
          className="object-contain object-top-left"
          priority={false}
        />
      </div>

      {/* BOTTOM-RIGHT CYBER WAVE WIREFRAME (matching screenshot exactly) */}
      <div className="pointer-events-none absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] opacity-50 select-none z-0 rotate-180">
        <Image
          src="/images/save-wave.webp"
          alt=""
          fill
          className="object-contain object-top-left"
          priority={false}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ROW 1: OUR MISSION (Text Left, Image Right) */}
        <div className="relative py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Mission Content */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* Eyebrow: — OUR MISSION — with pure white text and cyan lines */}
              <div className="inline-flex items-center gap-3.5 mb-4">
                <span className="w-12 sm:w-14 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-white uppercase">
                  {data.mission.eyebrow || 'OUR MISSION'}
                </span>
                <span className="w-12 sm:w-14 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
              </div>

              {/* Heading: Our Mission */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] mb-5 sm:mb-6">
                <span>{data.mission.title_regular} </span>
                <span className="text-[#00f0ff] drop-shadow-[0_0_18px_rgba(0,240,255,0.45)]">
                  {data.mission.title_highlight}
                </span>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base leading-[1.75] text-[#e2e8f0] font-light max-w-lg">
                {data.mission.description}
              </p>
            </motion.div>

            {/* Right Column: Mission Image in Cyan Frame */}
            <motion.div
              initial={{ opacity: 0, x: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="relative w-full max-w-[550px] aspect-[16/10] sm:aspect-[16/9.5] rounded-[22px] overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.45)] bg-[#030914] group hover:shadow-[0_0_55px_rgba(0,240,255,0.65)] transition-shadow duration-500">
                <Image
                  src={data.mission.image || '/images/mission-shield.webp'}
                  alt={data.mission.image_alt || 'Our Mission'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="animate-scanline" aria-hidden="true" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* HORIZONTAL CYAN DIVIDER LINE (matching screenshot middle divider) */}
        <div className="w-full h-[1.5px] bg-[#00f0ff]/35 shadow-[0_0_10px_rgba(0,240,255,0.4)] my-4 sm:my-6" />

        {/* ROW 2: OUR VISION (Image Left, Text Right) */}
        <div className="relative py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Vision Image in Cyan Frame */}
            <motion.div
              initial={{ opacity: 0, x: -35, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex justify-center order-2 lg:order-1"
            >
              <div className="relative w-full max-w-[550px] aspect-[16/10] sm:aspect-[16/9.5] rounded-[22px] overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.45)] bg-[#030914] group hover:shadow-[0_0_55px_rgba(0,240,255,0.65)] transition-shadow duration-500">
                <Image
                  src={data.vision.image || '/images/vision-eye.webp'}
                  alt={data.vision.image_alt || 'Our Vision'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="animate-scanline" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Right Column: Vision Content */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
            >
              {/* Eyebrow: — OUR VISION — with pure white text and cyan lines */}
              <div className="inline-flex items-center gap-3.5 mb-4">
                <span className="w-12 sm:w-14 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-white uppercase">
                  {data.vision.eyebrow || 'OUR VISION'}
                </span>
                <span className="w-12 sm:w-14 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
              </div>

              {/* Heading: Our Vision */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] mb-5 sm:mb-6">
                <span>{data.vision.title_regular} </span>
                <span className="text-[#00f0ff] drop-shadow-[0_0_18px_rgba(0,240,255,0.45)]">
                  {data.vision.title_highlight}
                </span>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base leading-[1.75] text-[#e2e8f0] font-light max-w-lg">
                {data.vision.description}
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
