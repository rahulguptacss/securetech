'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import type { HeroSectionData } from '../../types';

interface HeroProps {
  data: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for responsive, gentle parallax
  const springConfig = { damping: 24, stiffness: 140, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax for Text (moves gently in response to mouse)
  const textX = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-8, 8]);
  const textY = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-8, 8]);

  // Parallax & 3D tilt for Hacker Image Card (counter-moves with depth)
  const imageX = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [14, -14]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [14, -14]);
  const imageRotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [5, -5]);
  const imageRotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const highlightWords = (data.title_highlight || 'SAFER TOMORROW').trim().split(/\s+/);
  const highlightWord1 = highlightWords[0] || 'SAFER';
  const highlightWord2 = highlightWords.slice(1).join(' ') || 'TOMORROW';
  const eyebrowItems = (data.eyebrow || 'PROTECT . DETECT . PREVENT')
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-24 pb-8 sm:pt-32 sm:pb-4 lg:pt-36 lg:pb-2 bg-[#000000] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Row: Left Text Content + Right Cyber Hacker Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-2 sm:mb-4">
          {/* Left Column: Heading Reveal Sequence */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="lg:col-span-8 z-10 flex flex-col justify-end"
          >
            {/* 1. Page load tagline reveal from data.json */}
            <motion.div
              initial={{ opacity: 0, y: -12, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 sm:mb-6"
            >
              <p className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] uppercase text-white/90">
                {eyebrowItems.map((item, idx) => (
                  <span key={idx}>
                    {item}
                    {idx < eyebrowItems.length - 1 && (
                      <span className="text-[#00f0ff] font-bold mx-1.5">•</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* 2. Headings Reveal: Advanced Cyber Security & Solutions For A */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 sm:mb-6"
            >
              <h1 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold text-white tracking-tight leading-[1.2]">
                <span className="relative inline-block pb-1 sm:pb-1.5">
                  {data.title_line1 || 'Advanced Cyber Security'}
                  {/* Underline draws in from left */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 bottom-0 w-full h-[2.5px] bg-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff] origin-left"
                  />
                </span>
              </h1>
              <h2 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold text-white tracking-tight leading-[1.2] mt-1 sm:mt-1.5">
                {data.title_line2 || 'Solutions For A'}
              </h2>
            </motion.div>

            {/* 3. Giant Highlight Word 1 Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="select-none"
            >
              <span className="block text-[62px] sm:text-[88px] md:text-[115px] lg:text-[145px] xl:text-[165px] font-[950] tracking-tight leading-[0.88] uppercase bg-gradient-to-b from-[#ffffff] via-[#75f5e8] to-[#00f0ff] bg-clip-text text-transparent">
                {highlightWord1}
              </span>
            </motion.div>

            {/* 4. Giant Highlight Word 2 Reveal for Mobile (< lg, stacked directly under Word 1) */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="block lg:hidden select-none mt-1"
            >
              <span className="block text-[62px] sm:text-[88px] md:text-[115px] font-[950] tracking-tight leading-[0.88] uppercase bg-gradient-to-b from-[#ffffff] via-[#75f5e8] to-[#00f0ff] bg-clip-text text-transparent">
                {highlightWord2}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Hacker Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              x: imageX,
              y: imageY,
              rotateX: imageRotateX,
              rotateY: imageRotateY,
              perspective: 1000,
            }}
            className="lg:col-span-4 flex justify-center lg:justify-end z-10 mt-4 sm:mt-6 lg:mt-0 lg:-translate-y-8"
          >
            <div className="relative w-full max-w-[420px] lg:max-w-none lg:w-auto aspect-[4/3.8] sm:aspect-[4/4.2] lg:aspect-[4/4.8] max-h-[315px] sm:max-h-[370px] lg:max-h-none lg:h-[330px] xl:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-400/35 bg-[#06101e] shadow-[0_0_35px_rgba(0,240,255,0.22)] group">
              {/* Hacker image with slight cinematic zoom-in entrance */}
              <motion.div
                initial={{ scale: 1.14, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={data.image || '/images/hero-hacker.webp'}
                  alt={data.image_alt || 'Cyber Security Solutions'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Shield Glow Pulse right over the holographic shield lock */}
              <div
                className="pointer-events-none absolute top-[36%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-cyan-400/25 blur-xl animate-shield-glow z-10"
                aria-hidden="true"
              />

              {/* Cyber Scan Line sweeping across the card continuously */}
              <div className="animate-scanline" aria-hidden="true" />

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>
        </div>

        {/* Desktop-only Bottom Full-Width Row: Giant Highlight Word 2 Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block w-full select-none overflow-hidden mt-1 sm:mt-0"
        >
          <span className="block w-full text-[135px] xl:text-[165px] font-[950] tracking-tight leading-[0.85] uppercase bg-gradient-to-b from-[#ffffff] via-[#75f5e8] to-[#00f0ff] bg-clip-text text-transparent">
            {highlightWord2}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
