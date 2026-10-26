'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ServicesSectionData, ServiceItem } from '../../types';

interface ServicesProps {
  data: ServicesSectionData;
  limit?: number;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Services({ data, limit }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const effectiveLimit = limit !== undefined ? limit : (isHomePage ? 3 : undefined);
  const displayedItems = effectiveLimit && effectiveLimit > 0 ? data.items.slice(0, effectiveLimit) : data.items;

  // Chunk items into panels of 3 cards each (exact user requirement: 3 cards per view)
  const panels: ServiceItem[][] = [];
  for (let i = 0; i < displayedItems.length; i += 3) {
    panels.push(displayedItems.slice(i, i + 3));
  }

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop layout (1024px+): Pinned Panels with Overscroll (Stacking Cards of 3)
      // Exactly matches the GSAP pinned-panels animation used in the Blog section
      mm.add('(min-width: 1024px)', () => {
        const panelEls = gsap.utils.toArray<HTMLElement>('.service-panel');
        if (panelEls.length <= 1) return;

        // Pin each panel until the next panel scrolls up to its position
        panelEls.slice(0, -1).forEach((panel, i) => {
          const innerPanel = panel.querySelector<HTMLElement>('.service-panel-inner');
          const nextPanel = panelEls[i + 1];

          // Overscroll calculation matching GreenSock demo
          const overscroll =
            (innerPanel ? innerPanel.offsetHeight : panel.offsetHeight) - (window.innerHeight - 160);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top top+=110',
              endTrigger: nextPanel,
              end: 'top top+=110',
              pin: true,
              pinSpacing: false,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onRefresh: () => {
                gsap.set(panel, { transformOrigin: 'center top' });
              },
            },
          });

          // If content is taller than viewport, scroll content first
          if (overscroll > 0 && innerPanel) {
            tl.to(innerPanel, { y: -overscroll - 24, ease: 'none' });
          }

          // Panel scales down and dims as next panel slides over it
          if (innerPanel) {
            tl.to(
              innerPanel,
              {
                scale: 0.94,
                opacity: 0.35,
                y: -20,
                ease: 'power1.out',
              },
              overscroll > 0 ? '+=0.05' : 0
            );
          }
        });
      });

      // Mobile / Tablet layout (< 1024px): Smooth sequential reveal
      mm.add('(max-width: 1023px)', () => {
        const panelEls = gsap.utils.toArray<HTMLElement>('.service-panel');
        panelEls.forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full pt-8 sm:pt-9 lg:pt-6 pb-8 sm:pb-12 bg-[#000000] text-white"
    >
      {/* Background ambient cyber glow - pure compositor GPU layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/5 blur-[140px]" />
        <div className="absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-[#00f0ff]/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-14 items-start">
          
          {/* Left Column: Mobile Centered Title / Desktop Sticky Cyber Wave */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-start lg:sticky lg:top-28 self-start z-30 mb-8 sm:mb-9 lg:mb-0">
            
            {/* Mobile Only: Centered Title Badge with equal top and bottom spacing in the middle */}
            <div className="flex lg:hidden justify-center items-center w-full">
              <div className="relative inline-flex items-center select-none">
                {/* Capsule border - centered */}
                <div className="rounded-full border border-[#00f0ff] bg-black/90 px-4 sm:px-5 py-1.5 shadow-[0_0_15px_rgba(0,240,255,0.35)] backdrop-blur-md">
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-white uppercase whitespace-nowrap">
                    {data.badge_text || 'OUR SERVICES'}
                  </span>
                </div>
                {/* Horizontal stem and glowing terminal flare */}
                <div className="absolute left-[calc(100%-2px)] flex items-center pointer-events-none">
                  <span className="h-px w-3 sm:w-5 bg-[#00f0ff]" />
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-4 h-[2px] bg-[#00f0ff] blur-[2px] rounded-full" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_16px_#00f0ff] animate-pulse" />
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Only: Sticky 600px Cyber Wave Wireframe with Floating Animation & Badge */}
            <div className="hidden lg:flex relative w-full max-w-[430px] h-[600px] items-center justify-start">
              {/* Static GPU-accelerated ambient glows around the wave */}
              <div className="pointer-events-none absolute top-12 left-6 w-36 h-36 rounded-full bg-[#00f0ff]/20 blur-[45px]" />
              <div className="pointer-events-none absolute top-1/2 right-1 w-40 h-40 rounded-full bg-[#00f0ff]/15 blur-[55px]" />
              <div className="pointer-events-none absolute bottom-2 left-0 w-44 h-44 rounded-full bg-[#00f0ff]/35 blur-[40px]" />

              {/* Floating "OUR SERVICES" Capsule Badge with Right Connector & Glowing Flare */}
              <div className="absolute top-10 left-2 z-20 flex items-center select-none">
                {/* Capsule border */}
                <div className="rounded-full border border-[#00f0ff] bg-black/90 px-6 py-2 shadow-[0_0_15px_rgba(0,240,255,0.35)] backdrop-blur-md">
                  <span className="text-[13px] font-bold tracking-[0.16em] text-white uppercase whitespace-nowrap">
                    {data.badge_text || 'OUR SERVICES'}
                  </span>
                </div>
                {/* Horizontal stem and glowing terminal flare */}
                <div className="relative flex items-center">
                  <span className="h-px w-10 bg-[#00f0ff]" />
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-10 h-[2px] bg-[#00f0ff] blur-[2px] rounded-full" />
                    <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_16px_#00f0ff] animate-pulse" />
                  </span>
                </div>
              </div>

              {/* Smooth 60fps GPU-Accelerated Floating Wave */}
              <div 
                className="relative w-full h-full animate-float"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              >
                <Image
                  src={data.wave_image || '/images/save-wave.webp'}
                  alt={data.wave_alt || 'Cyber security digital wave'}
                  fill
                  sizes="430px"
                  priority
                  className="object-contain object-left pointer-events-none select-none drop-shadow-[0_0_18px_rgba(0,240,255,0.4)]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Pinned Panels with 3 Cards per Panel (Stacked Scroller like Blog) */}
          <div className="lg:col-span-7 min-w-0 w-full relative pt-0 pb-3 sm:py-4 lg:py-6">
            {panels.map((group: ServiceItem[], pIdx: number) => (
              <div
                key={`service-panel-${pIdx}`}
                className={`service-panel relative w-full will-change-transform ${
                  pIdx === panels.length - 1 ? 'mb-0' : 'mb-8 sm:mb-12 lg:mb-16'
                }`}
                style={{ zIndex: 10 + pIdx }}
              >
                {/* Panel Inner Canvas: Solid black background to cover previous panel cleanly */}
                <div className="service-panel-inner relative w-full bg-[#000000] rounded-2xl pt-0 pb-2 sm:py-2 will-change-transform space-y-7 sm:space-y-8 lg:space-y-9 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px]">
                  {group.map((item: ServiceItem) => (
                    <div
                      key={item.id}
                      className="group relative rounded-xl px-2 sm:px-3 py-2 transition-colors duration-200"
                    >
                      {/* Service Row Hover: Subtle Cyan Glow */}
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

                      {/* Row 3: Cyan Divider Line with glowing dot */}
                      <div className="relative flex items-center w-full mt-4 sm:mt-5 overflow-hidden">
                        <span className="relative flex items-center justify-center h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_14px_#00f0ff] shrink-0 z-10" />
                        <span className="h-[1px] w-full bg-[#00f0ff]/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
