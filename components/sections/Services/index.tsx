'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ServicesSectionData, ServiceItem } from '../../types';

interface ServicesProps {
  data: ServicesSectionData;
}

export default function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="relative w-full py-0 bg-[#000000] overflow-hidden text-white">
      {/* Background ambient cyber glow - pure compositor GPU layer */}
      <div className="pointer-events-none absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-[#00f0ff]/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Cyber Wave Wireframe with smooth floating motion */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[400px] sm:max-w-[430px] h-[450px] sm:h-[530px] lg:h-[600px] flex items-center justify-center">
              
              {/* Static GPU-accelerated ambient glows around the wave */}
              <div className="pointer-events-none absolute top-12 left-6 w-36 h-36 rounded-full bg-[#00f0ff]/20 blur-[45px]" />
              <div className="pointer-events-none absolute top-1/2 right-2 w-40 h-40 rounded-full bg-[#00f0ff]/15 blur-[55px]" />
              <div className="pointer-events-none absolute bottom-2 left-0 w-44 h-44 rounded-full bg-[#00f0ff]/35 blur-[40px]" />

              {/* Floating "OUR SERVICES" Capsule Badge with Right Connector & Glowing Flare */}
              <div className="absolute top-6 sm:top-8 lg:top-10 left-0 sm:left-2 z-20 flex items-center select-none">
                {/* Capsule border */}
                <div className="rounded-full border border-[#00f0ff] bg-black/90 px-5 sm:px-6 py-1.5 sm:py-2 shadow-[0_0_18px_rgba(0,240,255,0.35)] backdrop-blur-md">
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-white uppercase whitespace-nowrap">
                    {data.badge_text || 'OUR SERVICES'}
                  </span>
                </div>
                {/* Horizontal stem and glowing terminal flare */}
                <div className="relative flex items-center">
                  <span className="h-px w-6 sm:w-10 bg-[#00f0ff]" />
                  <span className="relative flex items-center justify-center">
                    {/* Horizontal flare halo */}
                    <span className="absolute w-8 sm:w-10 h-[2px] bg-[#00f0ff] blur-[2px] rounded-full" />
                    {/* Center glowing node */}
                    <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff,0_0_20px_#00f0ff] animate-pulse" />
                  </span>
                </div>
              </div>

              {/* Smooth 60fps GPU-Accelerated Floating Wave (Compositor-only translateY) */}
              <div 
                className="relative w-full h-full animate-float"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              >
                <Image
                  src={data.wave_image || '/images/save-wave.png'}
                  alt={data.wave_alt || 'Cyber security digital wave'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 430px"
                  priority
                  className="object-contain object-left pointer-events-none select-none drop-shadow-[0_0_22px_rgba(0,240,255,0.45)]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 3 Service Items with Butter-Smooth Scroll Reveals */}
          <div className="lg:col-span-7 py-3 sm:py-4 lg:py-6 space-y-7 sm:space-y-8 lg:space-y-9">
            {data.items.map((item: ServiceItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                style={{ willChange: 'transform, opacity' }}
                className="group relative rounded-xl px-2 sm:px-3 py-2 transition-colors duration-200"
              >
                {/* Service Row Hover: Subtle Cyan Glow (Pure CSS GPU opacity, 0 layout cost) */}
                <div className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 rounded-xl bg-gradient-to-r from-[#00f0ff]/[0.05] via-[#00f0ff]/[0.015] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 -z-10" />

                {/* Row 1: Heading */}
                <h3 className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-white tracking-tight leading-tight mb-2 sm:mb-2.5">
                  <span>{item.title_regular} </span>
                  <span className="text-[#00f0ff] transition-all duration-200 group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                    {item.title_highlight}
                  </span>
                </h3>

                {/* Row 2: 2-line Description on left, LEARN MORE on right */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5">
                  {/* Left: Two-line description */}
                  <div className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#cbd5e1] font-light max-w-lg">
                    {item.description.split('\n').map((line: string, lIdx: number) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>

                  {/* Right: LEARN MORE Button with Circled Arrow */}
                  <div className="shrink-0 sm:self-center">
                    <Link
                      href={item.link_href}
                      className="group/btn inline-flex items-center gap-3 sm:gap-3.5 text-xs sm:text-[13px] font-semibold tracking-wider text-[#00f0ff] hover:text-white transition-colors duration-200"
                    >
                      <span className="uppercase transition-colors duration-200 group-hover/btn:text-white">
                        {item.link_text}
                      </span>
                      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#00f0ff] text-[#00f0ff] transition-all duration-200 group-hover/btn:bg-[#00f0ff] group-hover/btn:text-black group-hover/btn:shadow-[0_0_15px_#00f0ff]">
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/btn:translate-x-[6px]" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Row 3: Animated Cyan Divider Line */}
                <div className="relative flex items-center w-full mt-4 sm:mt-5 overflow-hidden">
                  {/* Glowing Cyan Dot */}
                  <span className="relative flex items-center justify-center h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_14px_#00f0ff] shrink-0 z-10" />

                  {/* Horizontal Line expanding 0% -> 100% width on scroll */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left', willChange: 'transform' }}
                    className="h-[1px] w-full bg-[#00f0ff]/60"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
