'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { BlogSectionData, BlogPostItem } from '../../types';

interface BlogProps {
  data: BlogSectionData;
  limit?: number;
  showButton?: boolean;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Blog({ data, limit, showButton }: BlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const effectiveLimit = limit !== undefined ? limit : (isHomePage ? 4 : undefined);
  const shouldShowButton = showButton !== undefined ? showButton : isHomePage;
  const displayedPosts =
    effectiveLimit && effectiveLimit > 0
      ? data.posts.slice(0, effectiveLimit)
      : data.posts;

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop layout (1024px+): Pinned Panels with Overscroll (Stacking Cards)
      // Exactly matches https://demos.gsap.com/demo/pinned-panels-with-overscroll/
      mm.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.blog-panel');
        if (panels.length === 0) return;

        // Pin each panel until the next panel scrolls up to its position
        panels.slice(0, -1).forEach((panel, i) => {
          const innerCard = panel.querySelector<HTMLElement>('.blog-card-inner');
          const nextPanel = panels[i + 1];

          // Overscroll calculation matching GreenSock demo
          const overscroll =
            (innerCard ? innerCard.offsetHeight : panel.offsetHeight) - (window.innerHeight - 160);

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
          if (overscroll > 0 && innerCard) {
            tl.to(innerCard, { y: -overscroll - 24, ease: 'none' });
          }

          // Card scales down and dims as next card slides over it
          if (innerCard) {
            tl.to(
              innerCard,
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
        const panels = gsap.utils.toArray<HTMLElement>('.blog-panel');
        panels.forEach((panel) => {
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
      id="blog"
      ref={sectionRef}
      className="relative w-full pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 bg-[#000000] text-white"
    >
      {/* Background cyber ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Left Column: Heading, Description & Button - Rock-Solid Fixed/Sticky at top-28 */}
          <div className="lg:w-[32%] xl:w-[30%] shrink-0 lg:sticky lg:top-28 self-start z-30">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="block">{data.title_regular}</span>
              <span className="block text-[#00f0ff]">{data.title_highlight}</span>
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light mb-6 sm:mb-8 max-w-sm">
              {data.description}
            </p>

            {shouldShowButton && (
              <Link
                href={data.button_link}
                scroll={true}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }
                }}
                className="inline-flex items-center gap-3 rounded-full bg-[#00f0ff] px-6 sm:px-7 py-3 text-sm font-bold text-black tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] transform-gpu will-change-transform transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-white hover:shadow-[0_0_25px_#00f0ff] active:scale-95 group/btn cursor-pointer"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-1 text-black" />
              </Link>
            )}
          </div>

          {/* Vertical Cyan Divider Line between Left & Right Columns matching screenshot */}
          <div className="hidden lg:block w-[1.5px] bg-[#00f0ff] self-stretch shadow-[0_0_8px_rgba(0,240,255,0.4)] z-20" />

          {/* Right Column: Pinned Panels with Overscroll (Cards Stack as you scroll) */}
          <div className="flex-1 min-w-0 w-full relative">
            {displayedPosts.map((post: BlogPostItem, index: number) => (
              <div
                key={post.id}
                className={`blog-panel relative w-full will-change-transform ${
                  index === displayedPosts.length - 1 ? 'mb-0' : 'mb-6 sm:mb-8 lg:mb-10'
                }`}
                style={{ zIndex: 10 + index }}
              >
                {/* Blog Card Inner with solid black canvas so stacking covers previous card seamlessly */}
                <div className="blog-card-inner group/card relative w-full bg-[#000000] pb-3 sm:pb-4 will-change-transform">
                  <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 lg:gap-7 py-2">
                    {/* Left: Thumbnail with solid 2px cyan border & glow */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative w-full sm:w-[230px] md:w-[250px] lg:w-[280px] aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#00f0ff] shrink-0 bg-black shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-500 ease-out group-hover/card:border-[#00f0ff] group-hover/card:shadow-[0_0_30px_rgba(0,240,255,0.7),0_0_50px_rgba(0,240,255,0.35)] block"
                    >
                      <Image
                        src={post.image}
                        alt={post.image_alt || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 280px"
                        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105"
                      />
                    </Link>

                    {/* Right: Text Information */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      {/* Category Pill: Solid Cyan Pill with Black Text */}
                      <div className="mb-2">
                        <span className="inline-block rounded-full bg-[#00f0ff] px-3.5 py-0.5 text-xs font-bold text-black tracking-wide shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-shadow duration-300 group-hover/card:shadow-[0_0_16px_rgba(0,240,255,0.75)]">
                          {post.category}
                        </span>
                      </div>

                      {/* Post Title */}
                      <h3 className="text-base sm:text-lg lg:text-[20px] font-bold text-white tracking-tight leading-snug mb-1.5 transition-colors duration-200 group-hover/card:text-[#00f0ff]">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#cbd5e1] font-light mb-2">
                        {post.excerpt}
                      </p>

                      {/* Meta: Author with Cyan highlight & Date */}
                      <div className="flex items-center text-xs sm:text-[13px] text-[#cbd5e1] font-normal">
                        <span>
                          by{' '}
                          <span className="text-[#00f0ff] font-medium hover:underline cursor-pointer">
                            {post.author}
                          </span>
                        </span>
                        <span className="mx-2 text-white/50">•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Cyan Divider Line Between Posts */}
                  <div className="mt-4 sm:mt-5 h-[1.5px] w-full bg-[#00f0ff] shadow-[0_0_6px_rgba(0,240,255,0.4)]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
