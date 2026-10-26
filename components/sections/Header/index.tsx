'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Activity,
  Lock,
  Radio,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [statusHudOpen, setStatusHudOpen] = useState(false);
  const hudRef = useRef<HTMLDivElement>(null);
  const desktopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection for sticky header backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileDropdown(null);
    setDesktopDropdown(null);
    setStatusHudOpen(false);
  }, [pathname]);

  // Close HUD and dropdowns on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setStatusHudOpen(false);
        setDesktopDropdown(null);
        setExpandedMobileDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  // Handlers for desktop hover dropdowns with a short grace delay
  const handleDesktopMouseEnter = (name: string) => {
    if (desktopTimeoutRef.current) {
      clearTimeout(desktopTimeoutRef.current);
      desktopTimeoutRef.current = null;
    }
    setDesktopDropdown(name);
  };

  const handleDesktopMouseLeave = () => {
    if (desktopTimeoutRef.current) {
      clearTimeout(desktopTimeoutRef.current);
    }
    desktopTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 180);
  };

  const toggleMobileDropdown = (name: string) => {
    setExpandedMobileDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/20 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-[#040812] py-3.5 sm:py-4.5 border-b border-slate-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Increased responsive size */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative h-11 sm:h-14 lg:h-16 w-44 sm:w-60 lg:w-72 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src={data.logo || '/logo/logo.webp'}
                alt={`${data.logo_text} ${data.logo_subtext}`}
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links with Smooth Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {data.links.map((link: NavItem) => {
              const active = isActive(link.href);
              const hasChildren = Boolean(link.children && link.children.length > 0);

              if (hasChildren) {
                const isOpen = desktopDropdown === link.name;
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => handleDesktopMouseEnter(link.name)}
                    onMouseLeave={handleDesktopMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className="group relative flex items-center gap-1.5 py-1"
                    >
                      <span
                        className={`text-[15px] font-medium transition-colors duration-200 ${
                          active || isOpen
                            ? 'text-[#00f0ff] font-semibold'
                            : 'text-white hover:text-[#00f0ff]'
                        }`}
                      >
                        {link.name}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#00f0ff]' : 'text-slate-400 group-hover:text-[#00f0ff]'
                        }`}
                      />
                      {(active || isOpen) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
                      )}
                    </Link>

                    {/* Desktop Floating Cyber Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[280px]"
                        >
                          <div className="rounded-2xl border border-cyan-500/35 bg-[#030914]/98 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.22)] backdrop-blur-2xl">
                            {/* Header Overview link */}
                            <div className="pb-2 mb-1 border-b border-cyan-950/60 px-2 pt-1 flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00f0ff]">
                                {link.name}
                              </span>
                              <Link
                                href={link.href}
                                className="text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                              >
                                <span>Overview</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                            {/* Submenu Items */}
                            <div className="space-y-0.5">
                              {link.children?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] text-slate-300 hover:text-[#00f0ff] hover:bg-cyan-500/10 transition-all duration-150"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-[#00f0ff] group-hover:shadow-[0_0_6px_#00f0ff] transition-all" />
                                    <span>{subItem.name}</span>
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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

          {/* Desktop Right Action Section */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="h-6 w-[1px] bg-slate-700/60" />

            {/* Cyber Radar Control Box with Interactive Status HUD */}
            <div className="relative" ref={hudRef}>
              <button
                type="button"
                onClick={() => setStatusHudOpen(!statusHudOpen)}
                aria-label="Toggle Live Cyber Security Status"
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/30 bg-[#06101e] shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_22px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 group cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 rounded-2xl bg-cyan-500/5 group-hover:bg-cyan-500/15 transition-colors" />
                <span className="absolute h-3 w-3 rounded-full border border-cyan-400/80 animate-ring-expand pointer-events-none" />
                <span className="absolute h-3 w-3 rounded-full border border-cyan-300/40 animate-ring-expand pointer-events-none [animation-delay:1.2s]" />
                <span className="absolute h-5 w-5 rounded-full bg-cyan-400/35 blur-sm" />
                <span className="relative z-10 h-3 w-3 rounded-full bg-[#00f0ff] animate-dot-glow" />
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
                    <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                        <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase">
                          Defense Grid Active
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">24/7 SOC</span>
                    </div>

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
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ffc2] px-6 py-2.5 text-[14px] font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transform-gpu will-change-transform transition-[box-shadow,filter,transform] duration-200 ease-out hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:brightness-105 active:scale-95"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1 text-black" />
              </Link>
            )}
          </div>

          {/* Mobile Right Controls: Get a Quote Button + Animated Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile "Get a Quote" Button */}
            {data.button_text && (
              <Link
                href={data.button_link || '/contact'}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ffc2] px-3 sm:px-4 py-1.5 sm:py-2 text-[11.5px] sm:text-[13px] font-bold text-black shadow-[0_0_14px_rgba(0,240,255,0.4)] transform-gpu transition-[box-shadow,transform] duration-150 active:scale-95 whitespace-nowrap"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-3.5 w-3.5 text-black" />
              </Link>
            )}

            {/* Animated Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? data.close_aria_label : data.menu_aria_label}
              aria-expanded={mobileMenuOpen}
              className="relative flex h-9.5 w-9.5 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-[#050c18] text-white hover:text-[#00f0ff] hover:border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all active:scale-90 focus:outline-none shrink-0"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-5 w-5 text-[#00f0ff]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-5 w-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer with Silky Smooth Slide Down Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-[#040914]/98 backdrop-blur-2xl border-b border-cyan-500/25 shadow-[0_25px_50px_rgba(0,0,0,0.95)] max-h-[calc(100vh-4.5rem)] overflow-y-auto"
          >
            <div className="px-5 py-5 space-y-3.5">
              <nav className="flex flex-col space-y-1">
                {data.links.map((link: NavItem, idx: number) => {
                  const active = isActive(link.href);
                  const hasChildren = Boolean(link.children && link.children.length > 0);
                  const isExpanded = expandedMobileDropdown === link.name;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * idx, duration: 0.22 }}
                    >
                      {hasChildren ? (
                        <div className="flex flex-col">
                          {/* Parent row with toggle button */}
                          <div
                            className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 ${
                              active || isExpanded
                                ? 'bg-cyan-500/15 text-[#00f0ff]'
                                : 'text-slate-200 hover:bg-white/[0.04] hover:text-white'
                            }`}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[15px] font-medium flex-1"
                            >
                              {link.name}
                            </Link>
                            
                            <button
                              type="button"
                              onClick={() => toggleMobileDropdown(link.name)}
                              aria-label={`Toggle ${link.name} submenu`}
                              className="p-1 rounded-lg text-cyan-400 hover:bg-cyan-500/20 active:scale-95 transition-all"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180 text-[#00f0ff]' : ''
                                }`}
                              />
                            </button>
                          </div>

                          {/* Smooth Accordion Dropdown Submenu */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden mt-1 ml-4 pl-3 border-l-2 border-cyan-500/35 space-y-1 py-1"
                              >
                                {/* Quick link to parent overview page */}
                                <Link
                                  href={link.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center justify-between py-2 px-3 text-xs font-bold text-[#00f0ff] hover:bg-cyan-500/10 rounded-lg transition-colors uppercase tracking-wider"
                                >
                                  <span>All {link.name}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                                {link.children?.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-2 px-3 text-xs sm:text-[13px] text-slate-300 hover:text-[#00f0ff] hover:bg-cyan-500/10 rounded-lg transition-colors"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                                      <span>{child.name}</span>
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400/50" />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[15px] font-medium transition-colors ${
                            active
                              ? 'bg-cyan-500/15 text-[#00f0ff] font-semibold border-l-2 border-[#00f0ff]'
                              : 'text-slate-200 hover:text-[#00f0ff] hover:bg-white/[0.04]'
                          }`}
                        >
                          <span>{link.name}</span>
                          {active && (
                            <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                          )}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Primary Mobile CTA Button */}
              {data.button_text && (
                <div className="pt-1">
                  <Link
                    href={data.button_link || '/contact'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ffc2] px-6 py-3 text-[14px] font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-[0.98]"
                  >
                    <span>{data.button_text}</span>
                    <ArrowRight className="h-4 w-4 text-black" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
