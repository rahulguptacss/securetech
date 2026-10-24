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

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-28 pb-1 sm:pt-36 sm:pb-2 bg-[#000000] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Row: Left Text Content + Right Cyber Hacker Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-2 sm:mb-4">
          {/* Left Column: Heading Reveal Sequence */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="lg:col-span-8 z-10 flex flex-col justify-end"
          >
            {/* 1. Page load tagline reveal: PROTECT . DETECT . PREVENT */}
            <motion.div
              initial={{ opacity: 0, y: -12, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 sm:mb-7"
            >
              <p className="text-[11px] sm:text-[12px] font-medium uppercase text-white/90">
                PROTECT <span className="text-[#00f0ff] font-bold mx-1.5">.</span> DETECT{' '}
                <span className="text-[#00f0ff] font-bold mx-1.5">.</span> PREVENT
              </p>
            </motion.div>

            {/* 1. Headings Reveal: Advanced Cyber Security & Solutions For A */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 sm:mb-7"
            >
              <h1 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[44px] font-bold text-white tracking-tight leading-[1.2]">
                <span className="relative inline-block pb-1.5">
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
              <h2 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[44px] font-bold text-white tracking-tight leading-[1.2] mt-1.5 sm:mt-2">
                {data.title_line2 || 'Solutions For A'}
              </h2>
            </motion.div>

            {/* 1. Giant SAFER Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="select-none"
            >
              <span className="block text-7xl sm:text-9xl md:text-[120px] lg:text-[145px] xl:text-[165px] font-[900] tracking-tight leading-[0.85] uppercase bg-gradient-to-r from-[#00ffb2] via-[#2bf0bd] to-[#80ffdb] bg-clip-text text-transparent">
                SAFER
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: 2. Hacker image slight zoom-in appear + 3. Shield pulse & scan line + 4. Mouse parallax */}
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
            className="lg:col-span-4 flex justify-center lg:justify-end z-10 -translate-y-4 sm:-translate-y-6 lg:-translate-y-8"
          >
            <div className="relative h-[260px] sm:h-[290px] md:h-[320px] lg:h-[330px] w-auto aspect-[4/4.8] max-w-full rounded-2xl overflow-hidden border border-cyan-400/35 bg-[#06101e] shadow-[0_0_35px_rgba(0,240,255,0.22)] group">
              {/* 2. Hacker image with slight cinematic zoom-in entrance */}
              <motion.div
                initial={{ scale: 1.14, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={data.image}
                  alt={data.image_alt || 'Cyber Security Solutions'}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* 3. Shield Glow Pulse right over the holographic shield lock */}
              <div
                className="pointer-events-none absolute top-[38%] left-[45%] -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-cyan-400/25 blur-xl animate-shield-glow z-10"
                aria-hidden="true"
              />

              {/* 3. Cyber Scan Line sweeping across the card continuously */}
              <div className="animate-scanline" aria-hidden="true" />

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>
        </div>

        {/* 1. Bottom Full-Width Row: Giant TOMORROW Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="w-full select-none overflow-hidden mt-1 sm:mt-0"
        >
          <span className="block w-full text-7xl sm:text-9xl md:text-[120px] lg:text-[145px] xl:text-[165px] font-[900] tracking-tight leading-[0.85] uppercase bg-gradient-to-r from-[#00ffb2] via-[#5af7c7] via-40% to-[#ffffff] bg-clip-text text-transparent">
            TOMORROW
          </span>
        </motion.div>
      </div>
    </section>
  );
}
