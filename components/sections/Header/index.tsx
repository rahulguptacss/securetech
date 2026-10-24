'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, Activity, Lock, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statusHudOpen, setStatusHudOpen] = useState(false);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close HUD on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hudRef.current && !hudRef.current.contains(e.target as Node)) {
        setStatusHudOpen(false);
      }
    };
    if (statusHudOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [statusHudOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-[#040812] py-4 sm:py-5 border-b border-slate-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - calls /logo/logo.png */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-12 sm:h-14 w-52 sm:w-60">
              <Image
                src={data.logo || '/logo/logo.png'}
                alt={`${data.logo_text} ${data.logo_subtext}`}
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {data.links.map((link: NavItem) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative flex flex-col items-center py-1"
                >
                  <span
                    className={`text-[15px] font-medium transition-colors duration-200 ${
                      active
                        ? 'text-[#00f0ff] font-semibold'
                        : 'text-white hover:text-[#00f0ff]'
                    }`}
                  >
                    {link.name}
                  </span>
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Section */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Vertical Divider Line */}
            <div className="h-6 w-[1px] bg-slate-700/60" />

            {/* Glowing Cyber Radar Control Box with Interactive Status HUD */}
            <div className="relative" ref={hudRef}>
              <button
                type="button"
                onClick={() => setStatusHudOpen(!statusHudOpen)}
                aria-label="Toggle Live Cyber Security Status"
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/30 bg-[#06101e] shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_22px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 group cursor-pointer overflow-hidden"
              >
                {/* Background ambient glow inside the box */}
                <span className="absolute inset-0 rounded-2xl bg-cyan-500/5 group-hover:bg-cyan-500/15 transition-colors" />

                {/* Radar ripple rings expanding outwards */}
                <span className="absolute h-3 w-3 rounded-full border border-cyan-400/80 animate-ring-expand pointer-events-none" />
                <span className="absolute h-3 w-3 rounded-full border border-cyan-300/40 animate-ring-expand pointer-events-none [animation-delay:1.2s]" />

                {/* Soft glow halo */}
                <span className="absolute h-5 w-5 rounded-full bg-cyan-400/35 blur-sm" />

                {/* Luminous Neon Cyan Dot */}
                <span className="relative z-10 h-3 w-3 rounded-full bg-[#00f0ff] animate-dot-glow" />

                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-cyan-300 tracking-wider whitespace-nowrap bg-black/90 px-2 py-0.5 rounded border border-cyan-500/30 shadow-lg">
                  LIVE SECURE
                </span>
              </button>

              {/* Interactive Cyber Security HUD Popover */}
              <AnimatePresence>
                {statusHudOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-cyan-400/40 bg-[#050c18]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.25)] backdrop-blur-xl z-50"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                        <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase">
                          Defense Grid Active
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">24/7 SOC</span>
                    </div>

                    {/* Stats List */}
                    <div className="space-y-2.5 py-3 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-2 text-slate-400">
                          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                          Zero-Trust Shield:
                        </span>
                        <span className="font-semibold text-emerald-400">Armed (100%)</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-2 text-slate-400">
                          <Activity className="h-3.5 w-3.5 text-cyan-400" />
                          Threat Radar:
                        </span>
                        <span className="font-mono text-cyan-300 font-semibold">0 Detected</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-2 text-slate-400">
                          <Lock className="h-3.5 w-3.5 text-cyan-400" />
                          Encryption:
                        </span>
                        <span className="font-mono text-slate-200">Quantum AES-256</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-2 text-slate-400">
                          <Radio className="h-3.5 w-3.5 text-cyan-400" />
                          Response Latency:
                        </span>
                        <span className="font-mono text-emerald-400 font-semibold">12ms</span>
                      </div>
                    </div>

                    {/* Footer link */}
                    <div className="pt-2 border-t border-cyan-900/40 text-center">
                      <Link
                        href="/contact"
                        onClick={() => setStatusHudOpen(false)}
                        className="text-[11px] font-bold text-[#00f0ff] hover:underline"
                      >
                        Request Security Audit →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get a Quote Button */}
            {data.button_text && (
              <Link
                href={data.button_link || '/contact'}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ffc2] px-6 py-2.5 text-[14px] font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)]"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-black" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? data.close_aria_label : data.menu_aria_label}
            className="lg:hidden p-2 text-slate-200 hover:text-[#00f0ff] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070e1c]/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {data.links.map((link: NavItem) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-1.5 transition-colors ${
                    active ? 'text-[#00f0ff] font-semibold' : 'text-white hover:text-[#00f0ff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          {data.button_text && (
            <div className="pt-2">
              <Link
                href={data.button_link || '/contact'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ffc2] px-6 py-3 text-[14px] font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
