'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Cloud,
  Network,
  Monitor,
  Database,
  Settings,
  FileText,
  Users,
  Search,
  CheckCircle,
  Lock,
  Zap,
  Key,
  Activity,
  Cpu,
  Check,
  Clock,
  Compass,
  Award,
  TrendingUp,
  Crosshair,
  AlertTriangle,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import type { ServiceDetailSectionData, ServiceDetailItem, ServiceBenefitItem } from '../../types';

interface PortfolioDetailProps {
  data: ServiceDetailSectionData;
  activeSlug: string;
  basePath?: string;
}

const iconMap: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  cloud: Cloud,
  network: Network,
  monitor: Monitor,
  database: Database,
  settings: Settings,
  'file-text': FileText,
  users: Users,
  search: Search,
  'check-circle': CheckCircle,
  lock: Lock,
  zap: Zap,
  key: Key,
  activity: Activity,
  cpu: Cpu,
  check: Check,
  clock: Clock,
  compass: Compass,
  award: Award,
  'trending-up': TrendingUp,
  crosshair: Crosshair,
  'alert-triangle': AlertTriangle,
};

function renderProjectIcon(name: string, className: string = 'w-5 h-5') {
  const IconComponent = iconMap[name] || ShieldCheck;
  return <IconComponent className={className} />;
}

export default function PortfolioDetail({
  data,
  activeSlug,
  basePath = '/portfolio',
}: PortfolioDetailProps) {
  const projectsList = data?.services || [];

  // Find current project or fallback to first project
  const currentProject: ServiceDetailItem =
    projectsList.find((p) => p.slug === activeSlug) || projectsList[0];

  if (!currentProject) return null;

  return (
    <section
      id="portfolio-detail"
      className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 bg-[#000000] text-white"
    >
      {/* Background ambient cyber glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-0 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.05] blur-[160px]" />
        <div className="absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.05] blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: "Our Portfolio" Sticky Sidebar Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 xl:top-28 self-start z-30">
            <div className="rounded-2xl border border-[#00f0ff] bg-[#000000] overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.18)]">
              {/* Sidebar Header Banner */}
              <div className="bg-[#00f0ff] px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shadow-[0_2px_12px_rgba(0,240,255,0.35)]">
                <h2 className="text-black font-extrabold text-[15px] sm:text-[17px] tracking-wide uppercase">
                  {data?.sidebar_title || 'Our Portfolio'}
                </h2>
                <span className="w-2.5 h-2.5 rounded-full bg-black/80 animate-pulse" />
              </div>

              {/* Sidebar List of 9 Portfolio Projects Matching Portfolio Page */}
              <nav
                className="p-2 sm:p-2.5 divide-y divide-[#00f0ff]/15 max-h-[calc(100vh-170px)] overflow-y-auto"
                aria-label="Portfolio Projects List"
              >
                {projectsList.map((item) => {
                  const isActive = item.slug === currentProject.slug;

                  return (
                    <Link
                      key={item.slug}
                      href={`${basePath}/${item.slug}`}
                      className={`group flex items-center justify-between px-3.5 sm:px-4 py-3 sm:py-3.5 transition-all duration-200 rounded-xl ${
                        isActive
                          ? 'bg-[#00f0ff]/12 text-[#00f0ff] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)] font-semibold'
                          : 'text-slate-200 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 font-normal'
                      }`}
                    >
                      {/* Left: Icon + Project Name */}
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
                        <span
                          className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? 'text-[#00f0ff]' : 'text-[#00f0ff]'
                          }`}
                        >
                          {renderProjectIcon(item.sidebar_icon, 'w-4 h-4 sm:w-5 sm:h-5')}
                        </span>
                        <span
                          className={`text-xs sm:text-[13.5px] leading-tight truncate ${
                            isActive ? 'text-[#00f0ff] font-bold' : 'group-hover:text-[#00f0ff]'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Right: Cyan Arrow */}
                      <span className="shrink-0 text-[#00f0ff] transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* RIGHT COLUMN: Project Detail Overview & Key Deliverables */}
          <div className="lg:col-span-8">
            <motion.div
              key={currentProject.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Eyebrow: — PORTFOLIO OVERVIEW — */}
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-2.5">
                <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase">
                  {currentProject.eyebrow || 'PORTFOLIO OVERVIEW'}
                </span>
                <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
              </div>

              {/* Main Project Heading */}
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15] mb-3">
                <span>{currentProject.title_regular} </span>
                <span className="text-[#00f0ff] drop-shadow-[0_0_18px_rgba(0,240,255,0.45)]">
                  {currentProject.title_highlight}
                </span>
              </h1>

              {/* Subtitle / Project Summary */}
              <p className="text-sm sm:text-[15.5px] leading-relaxed text-[#cbd5e1] font-light max-w-2xl mb-6">
                {currentProject.subtitle}
              </p>

              {/* Featured Project Hero Image with Cyan Border & Subtle Glow */}
              <div className="relative w-full h-[220px] sm:h-[310px] lg:h-[370px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.22)] my-6 sm:my-7 bg-black">
                <Image
                  src={currentProject.image || '/images/soc-room.webp'}
                  alt={currentProject.image_alt || currentProject.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Descriptive Project Case Study Paragraphs */}
              <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light mb-10 sm:mb-12">
                {currentProject.paragraphs?.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Key Deliverables / Project Highlights Section */}
              <div className="pt-8 sm:pt-10 border-t border-cyan-900/30">
                {/* Deliverables Eyebrow */}
                <div className="inline-flex items-center gap-3 sm:gap-4 mb-2.5">
                  <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase">
                    {currentProject.benefits_eyebrow || 'KEY DELIVERABLES'}
                  </span>
                  <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
                </div>

                {/* Deliverables Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-[1.2] mb-3">
                  <span>{currentProject.benefits_title_regular} </span>
                  <span className="text-[#00f0ff] drop-shadow-[0_0_14px_rgba(0,240,255,0.4)]">
                    {currentProject.benefits_title_highlight}
                  </span>
                </h2>

                {/* Deliverables Description */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light max-w-2xl mb-8">
                  {currentProject.benefits_description}
                </p>

                {/* 2x2 Deliverables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {currentProject.benefits?.map((benefit: ServiceBenefitItem, bIdx: number) => (
                    <div
                      key={bIdx}
                      className="group relative rounded-2xl border border-cyan-900/40 bg-[#020b14] p-5 sm:p-6 transition-all duration-300 hover:border-[#00f0ff]/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-start gap-4"
                    >
                      {/* Circular Cyan Icon */}
                      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#00f0ff] group-hover:text-black">
                        {renderProjectIcon(benefit.icon, 'w-6 h-6')}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-[17px] font-bold text-white mb-1.5 transition-colors group-hover:text-[#00f0ff]">
                          {benefit.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] leading-relaxed text-[#94a3b8] font-light">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
