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
  ArrowRight,
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
  LucideIcon,
} from 'lucide-react';
import type { ServiceDetailSectionData, ServiceDetailItem, ServiceBenefitItem } from '../../types';

interface ServiceDetailProps {
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

function renderServiceIcon(name: string, className: string = 'w-5 h-5') {
  const IconComponent = iconMap[name] || ShieldCheck;
  return <IconComponent className={className} />;
}

export default function ServiceDetail({ data, activeSlug, basePath = '/services' }: ServiceDetailProps) {
  const servicesList = data?.services || [];
  
  // Find current service or fallback to first
  const currentService: ServiceDetailItem =
    servicesList.find((s) => s.slug === activeSlug) || servicesList[0];

  if (!currentService) return null;

  return (
    <section id="service-detail" className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 bg-[#000000] text-white">
      {/* Background ambient cyber glow isolated to avoid breaking position:sticky */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-0 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.05] blur-[160px]" />
        <div className="absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.05] blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: "Our Services" Sticky Sidebar Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 xl:top-28 self-start z-30">
            <div className="rounded-2xl border border-[#00f0ff] bg-[#000000] overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.18)]">
              {/* Sidebar Header Banner */}
              <div className="bg-[#00f0ff] px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shadow-[0_2px_12px_rgba(0,240,255,0.35)]">
                <h2 className="text-black font-extrabold text-[15px] sm:text-[17px] tracking-wide uppercase">
                  {data.sidebar_title || 'Our Services'}
                </h2>
              </div>

              {/* Sidebar List of Services with viewport adaptation */}
              <nav className="p-2 sm:p-2.5 divide-y divide-[#00f0ff]/15 max-h-[calc(100vh-170px)] overflow-y-auto">
                {servicesList.map((item) => {
                  const isActive = item.slug === currentService.slug;

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
                      {/* Left: Icon + Service Name */}
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
                        <span
                          className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? 'text-[#00f0ff]' : 'text-[#00f0ff]'
                          }`}
                        >
                          {renderServiceIcon(item.sidebar_icon, 'w-4 h-4 sm:w-5 sm:h-5')}
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

          {/* RIGHT COLUMN: Service Detail Overview & Benefits */}
          <div className="lg:col-span-8">
            <motion.div
              key={currentService.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Eyebrow: — SERVICE OVERVIEW — */}
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-2.5">
                <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase">
                  {currentService.eyebrow || 'SERVICE OVERVIEW'}
                </span>
                <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
              </div>

              {/* Title: Managed Security Services */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.18] mb-3">
                <span>{currentService.title_regular} </span>
                <span className="text-[#00f0ff] drop-shadow-[0_0_16px_rgba(0,240,255,0.45)]">
                  {currentService.title_highlight}
                </span>
              </h1>

              {/* Subtitle / Tagline */}
              <p className="text-sm sm:text-[15.5px] leading-relaxed text-[#cbd5e1] font-light max-w-2xl mb-6">
                {currentService.subtitle}
              </p>

              {/* Featured Hero Image */}
              <div className="relative w-full h-[220px] sm:h-[310px] lg:h-[370px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.22)] my-6 sm:my-7 bg-black">
                <Image
                  src={currentService.image || '/images/soc-room.webp'}
                  alt={currentService.image_alt || currentService.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Descriptive Paragraphs */}
              <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light mb-10 sm:mb-12">
                {currentService.paragraphs?.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Key Benefits Section */}
              <div className="pt-8 sm:pt-10 border-t border-cyan-900/30">
                {/* Benefits Eyebrow: — KEY BENEFITS — */}
                <div className="inline-flex items-center gap-3 sm:gap-4 mb-2.5">
                  <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase">
                    {currentService.benefits_eyebrow || 'KEY BENEFITS'}
                  </span>
                  <span className="w-8 sm:w-10 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]" />
                </div>

                {/* Benefits Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-[1.2] mb-3">
                  <span>{currentService.benefits_title_regular} </span>
                  <span className="text-[#00f0ff] drop-shadow-[0_0_14px_rgba(0,240,255,0.4)]">
                    {currentService.benefits_title_highlight}
                  </span>
                </h2>

                {/* Benefits Description */}
                <p className="text-xs sm:text-[14px] leading-relaxed text-[#94a3b8] font-light max-w-2xl mb-7 sm:mb-8">
                  {currentService.benefits_description}
                </p>

                {/* 2x2 Grid of Benefit Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {currentService.benefits?.map((benefit: ServiceBenefitItem, bIdx: number) => (
                    <div
                      key={bIdx}
                      className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl border border-[#00f0ff]/25 bg-[#020b16] hover:border-[#00f0ff] hover:shadow-[0_0_24px_rgba(0,240,255,0.2)] transition-all duration-300"
                    >
                      {/* Left Circular Badge */}
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border border-[#00f0ff] bg-black shadow-[0_0_14px_rgba(0,240,255,0.35)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300">
                        <span className="text-[#00f0ff]">
                          {renderServiceIcon(benefit.icon, 'w-5 h-5 sm:w-6 sm:h-6')}
                        </span>
                      </div>

                      {/* Right Benefit Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm sm:text-base mb-1 tracking-tight group-hover:text-[#00f0ff] transition-colors duration-200">
                          {benefit.title}
                        </h3>
                        <p className="text-[#94a3b8] text-xs sm:text-[13px] leading-relaxed font-light">
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
