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
import { ShieldCheck } from 'lucide-react';
import type { AboutSectionData } from '../../types';

interface AboutProps {
  data: AboutSectionData;
  showButton?: boolean;
}

export default function About({ data }: AboutProps) {
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

  // Mouse tilt physics for the 3D card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cardRotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [6, -6]);
  const cardRotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-6, 6]);
  const badgeParallaxX = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-10, 10]);
  const badgeParallaxY = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <section id="about" className="relative w-full pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 bg-[#000000] overflow-hidden">
      {/* Ambient background cyber glow */}
      <div
        className="pointer-events-none absolute top-1/2 -left-40 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cyber Robotic Hand with 3D Tilt, Neon Border & Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -35, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                perspective: 1000,
              }}
              className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.28)] bg-[#030914] group transition-shadow duration-500 hover:shadow-[0_0_55px_rgba(0,240,255,0.45)]"
            >
              {/* Robotic Hand Image */}
              <Image
                src={data.image || '/images/about-robot.webp'}
                alt={data.image_alt || 'Establish and maintain complete digital security'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cyber Scan Line sweeping across the card */}
              <div className="animate-scanline" aria-hidden="true" />

              {/* Subtle Ambient Radial Glow on image center */}
              <div
                className="pointer-events-none absolute top-[35%] right-[25%] h-36 w-36 rounded-full bg-cyan-400/20 blur-2xl animate-shield-glow z-10"
                aria-hidden="true"
              />

              {/* Floating "Secure Protection" Badge with Levitation Animation */}
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: badgeParallaxX, y: badgeParallaxY }}
                className="absolute bottom-5 right-5 z-20"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center text-center rounded-2xl border border-cyan-400/40 bg-[#050c18]/95 px-5 py-5 shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                >
                  {/* Glowing Shield Check Icon */}
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-950/70 border border-cyan-400/50 text-[#00f0ff] mb-2.5 shadow-[0_0_12px_rgba(0,240,255,0.35)]">
                    <span className="absolute inset-0 rounded-xl bg-cyan-400/20 animate-ping opacity-60" />
                    <ShieldCheck className="relative z-10 h-6 w-6 text-[#00f0ff]" />
                  </div>
                  {/* Badge Title */}
                  <h4 className="text-[14.5px] font-bold text-white tracking-wide leading-tight mb-1">
                    {data.badge.title}
                  </h4>
                  {/* Badge Subtitle */}
                  <p className="text-[11.5px] text-slate-400 max-w-[130px] leading-tight">
                    {data.badge.subtitle}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Staggered Content Reveal */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tagline: Single Cyan Line on left + ABOUT US */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] w-10 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff] origin-left"
              />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase">
                {data.eyebrow || 'ABOUT US'}
              </span>
            </motion.div>

            {/* Headline with Staggered Slide-Up */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-[1.18] tracking-tight mb-6"
            >
              <span>{data.title_regular} </span>
              <span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                {data.title_highlight}
              </span>
            </motion.h2>

            {/* Paragraph Description Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal max-w-lg"
            >
              {data.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
