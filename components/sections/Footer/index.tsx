'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import type { FooterData, NavItem, FooterSocialItem } from '../../types';

interface FooterProps {
  data: FooterData;
}

// Crisp inline SVGs for social icons matching screenshot
const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    default:
      return null;
  }
};

const defaultSocials: FooterSocialItem[] = [
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
];

export default function Footer({ data }: FooterProps) {
  const socials = data.socials && data.socials.length > 0 ? data.socials : defaultSocials;

  return (
    <footer className="relative w-full bg-[#00101a] overflow-hidden text-white">
      {/* Background subtle cyber glow matching desktop reference */}
      <div className="pointer-events-none absolute top-12 right-0 sm:right-6 h-[550px] w-[550px] rounded-full bg-[#00f0ff]/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-28 right-10 h-[380px] w-[380px] rounded-full bg-[#00b4c8]/15 blur-[100px]" />

      {/* ========================================================================= */}
      {/* DESKTOP FOOTER (lg and above: 100% UNTOUCHED, IDENTICAL TO ORIGINAL)      */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        {/* Zone 1: Top Call-To-Action Block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Description, Contact Pills, and Social Links */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-2.5">
                <span>{data.cta_title_regular || "Let's Talk and"} </span>
                <span className="text-[#00f0ff]">{data.cta_title_highlight || "Work Together"}</span>
              </h2>

              {/* Description */}
              <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#cbd5e1] font-light max-w-xl mb-4 sm:mb-5">
                {data.cta_description ||
                  "Have a project in mind or need expert advice? Get in touch with our team and let's build a safer, more secure digital future together."}
              </p>

              {/* Contact Pills Row with Horizontal Connector Stem Line */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-5 sm:mb-6">
                {/* Email Pill */}
                <a
                  href={`mailto:${data.email || 'support@xyz.com'}`}
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-[#00f0ff] bg-[#001420]/80 px-4 py-2.5 shadow-[0_0_15px_rgba(0,240,255,0.18)] transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(0,240,255,0.35)] group/pill"
                >
                  <Mail className="h-4.5 w-4.5 text-[#00f0ff] transition-transform duration-300 group-hover/pill:scale-110" />
                  <span className="text-sm font-medium text-white">{data.email || 'support@xyz.com'}</span>
                </a>

                {/* Phone Pill */}
                <a
                  href={`tel:${data.phone || '(+1) 0000000000'}`}
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-[#00f0ff] bg-[#001420]/80 px-4 py-2.5 shadow-[0_0_15px_rgba(0,240,255,0.18)] transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(0,240,255,0.35)] group/pill"
                >
                  <Phone className="h-4.5 w-4.5 text-[#00f0ff] transition-transform duration-300 group-hover/pill:scale-110" />
                  <span className="text-sm font-medium text-white">{data.phone || '(+1) 0000000000'}</span>
                </a>

                {/* Horizontal Connecting Stem Line with Glowing Cyan Dot */}
                <div className="flex flex-1 items-center min-w-[40px]">
                  <span className="h-px w-full bg-[#00f0ff]/70" />
                  <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_16px_#00f0ff] shrink-0" />
                </div>
              </div>

              {/* Follow Us Section */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white tracking-wide mb-2 sm:mb-2.5">
                  {data.follow_us_text || 'Follow Us'}
                </p>
                
                {/* Circular Social Buttons */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-9 w-9 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full border border-[#00f0ff] bg-[#001420]/60 text-white transition-all duration-300 hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_15px_#00f0ff]"
                    >
                      <SocialIcon type={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Giant Glowing Concentric Circular "Get Started" Button */}
            <div className="lg:col-span-4 flex justify-end">
              <Link
                href={data.button_link || '/contact'}
                className="group relative flex items-center justify-center shrink-0 cursor-pointer select-none"
              >
                {/* Outer atmospheric cyan blur glow */}
                <div className="pointer-events-none absolute inset-[-12px] rounded-full bg-cyan-500/15 blur-2xl group-hover:bg-cyan-500/25 transition-opacity duration-300" />

                {/* Outer Subtle Dark Circle Ring */}
                <div className="relative flex items-center justify-center w-56 h-56 rounded-full border border-cyan-500/30 bg-[#001524]/80 p-2 transform-gpu will-change-transform transition-transform duration-250 ease-out group-hover:scale-105">
                  
                  {/* Middle Neon Cyan Ring */}
                  <div className="relative flex items-center justify-center w-full h-full rounded-full border-2 border-[#00f0ff] shadow-[0_0_24px_rgba(0,240,255,0.35)] p-2">
                    
                    {/* Inner Glowing Cyan/Turquoise Disk */}
                    <div className="relative flex items-center justify-center gap-2.5 w-full h-full rounded-full bg-gradient-to-tr from-[#00d8e6] via-[#00f0ff] to-[#00ffc8] shadow-[0_0_35px_rgba(0,240,255,0.7),inset_0_0_16px_rgba(255,255,255,0.45)] transform-gpu transition-[filter,box-shadow] duration-200 group-hover:brightness-110">
                      <span className="text-lg font-extrabold text-white tracking-wide drop-shadow-sm">
                        {data.button_text || 'Get Started'}
                      </span>
                      <span className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white text-[#00b4c8] shadow-md transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </span>
                    </div>

                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>

        {/* Zone 2: Navigation Links Row with Dividers */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Divider Line */}
          <div className="h-px w-full bg-[#1e2d3d]/90" />

          {/* Navigation Links Row with Vertical Pipe Dividers | */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-3">
            {data.links.map((link: NavItem, index: number) => (
              <div key={link.name} className="flex items-center gap-7">
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#cbd5e1] transition-colors duration-200 hover:text-[#00f0ff]"
                >
                  {link.name}
                </Link>
                {index < data.links.length - 1 && (
                  <span className="text-slate-700 select-none text-xs">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Middle Divider Line matching screenshot #0a434b */}
          <div className="h-px w-full bg-[#0a434b]/90" />

          {/* Zone 3: Bottom Bar: Logo Left, Copyright Right */}
          <div className="flex items-center justify-between gap-3 py-2.5">
            {/* Logo with Shield + "SecureTech SAFER TOMORROW" */}
            <Link
              href="/"
              className="relative h-10 w-48 block shrink-0 transition-opacity duration-200 hover:opacity-90"
            >
              <Image
                src={data.logo || '/logo/logo.webp'}
                alt={`${data.logo_text || 'SecureTech'} ${data.logo_subtext || 'SAFER TOMORROW'}`}
                fill
                sizes="192px"
                className="object-contain object-left"
                priority
              />
            </Link>

            {/* Copyright Notice */}
            <p className="text-[13px] text-slate-400 font-normal text-right">
              {data.copyright || 'Copyright © 2026. All rights reserved. Powered by Lestow'}
            </p>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE FOOTER (< lg: COMPACT, REDUCED HEIGHT, EXACT MATCH TO SCREENSHOT)  */}
      {/* ========================================================================= */}
      <div className="block lg:hidden">
        <div className="px-5 sm:px-8 pt-6 pb-4 relative z-10">
          
          {/* 1. Header: Let's Talk and / Work Together */}
          <h2 className="text-[28px] sm:text-[32px] font-extrabold text-white tracking-tight leading-[1.15] mb-2">
            <span>{data.cta_title_regular || "Let's Talk and"}</span>
            <span className="text-[#00f0ff] block">{data.cta_title_highlight || "Work Together"}</span>
          </h2>

          {/* 2. Description Paragraph */}
          <p className="text-[13px] leading-[1.55] text-[#cbd5e1] font-light mb-3.5">
            {data.cta_description ||
              "Have a project in mind or need expert advice? Get in touch with our team and let's build a safer, more secure digital future together."}
          </p>

          {/* 3. Contact Info Capsules in a Single Row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full mb-4">
            {/* Email Capsule */}
            <a
              href={`mailto:${data.email || 'support@xyz.com'}`}
              className="flex items-center gap-2 sm:gap-2.5 w-full rounded-xl border border-[#00f0ff] bg-[#00101a] px-2.5 sm:px-3.5 py-2 shadow-[0_0_12px_rgba(0,240,255,0.12)] transition-colors hover:border-cyan-300 min-w-0"
            >
              <Mail className="h-4 w-4 text-[#00f0ff] shrink-0" />
              <div className="h-4 w-[1px] bg-slate-700/80 shrink-0" />
              <span className="text-[11.5px] sm:text-[13px] text-white font-normal truncate">
                {data.email || 'support@xyz.com'}
              </span>
            </a>

            {/* Phone Capsule */}
            <a
              href={`tel:${data.phone || '(+1) 0000000000'}`}
              className="flex items-center gap-2 sm:gap-2.5 w-full rounded-xl border border-[#00f0ff] bg-[#00101a] px-2.5 sm:px-3.5 py-2 shadow-[0_0_12px_rgba(0,240,255,0.12)] transition-colors hover:border-cyan-300 min-w-0"
            >
              <Phone className="h-4 w-4 text-[#00f0ff] shrink-0" />
              <div className="h-4 w-[1px] bg-slate-700/80 shrink-0" />
              <span className="text-[11.5px] sm:text-[13px] text-white font-normal truncate">
                {data.phone || '(+1) 0000000000'}
              </span>
            </a>
          </div>

          {/* 4. Centered Giant Glowing Concentric Circular "Get Started" Button (Compact) */}
          <div className="flex justify-center items-center my-4 sm:my-5">
            <Link
              href={data.button_link || '/contact'}
              className="group relative flex items-center justify-center shrink-0 cursor-pointer select-none"
            >
              {/* Outer atmospheric cyan blur glow */}
              <div className="pointer-events-none absolute inset-[-10px] rounded-full bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/30 transition-opacity duration-300" />

              {/* Outer Ring with Glowing Cyan Dot on Track */}
              <div className="relative flex items-center justify-center w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-cyan-500/35 bg-[#001524]/60 p-2 transform-gpu will-change-transform transition-transform duration-250 ease-out group-hover:scale-105">
                
                {/* Glowing Orbital Dot on Outer Ring (Left side track dot) */}
                <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_16px_#00f0ff]" />

                {/* Middle Neon Cyan Ring */}
                <div className="relative flex items-center justify-center w-full h-full rounded-full border-2 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)] p-2">
                  
                  {/* Inner Glowing Cyan/Turquoise Disk */}
                  <div className="relative flex items-center justify-center gap-2 w-full h-full rounded-full bg-gradient-to-tr from-[#00c8e6] via-[#00f0ff] to-[#00ffc8] shadow-[0_0_30px_rgba(0,240,255,0.8),inset_0_0_14px_rgba(255,255,255,0.5)] transform-gpu transition-[filter,box-shadow] duration-200 group-hover:brightness-110">
                    <span className="text-[15px] font-extrabold text-white tracking-wide drop-shadow-sm">
                      {data.button_text || 'Get Started'}
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#00b4c8] shadow-md transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* 5. Follow Us Section (Centered on Mobile) */}
          <div className="flex flex-col items-center justify-center text-center mb-4">
            <p className="text-xs sm:text-sm font-bold text-white tracking-wide mb-2.5">
              {data.follow_us_text || 'Follow Us'}
            </p>
            
            {/* 5 Circular Social Buttons Row (Centered) */}
            <div className="flex items-center justify-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-[#00f0ff] bg-[#00101a] text-white transition-all duration-300 hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_12px_#00f0ff]"
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* 6. First Horizontal Divider Line */}
          <div className="h-px w-full bg-[#1e2d3d]/90 my-3" />

          {/* 7. Centered 2-Row Navigation Links with Vertical Separators dynamically from data.json */}
          <div className="flex flex-col items-center justify-center gap-2 py-1 text-xs sm:text-[13px] text-[#cbd5e1]">
            {/* Row 1 */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {data.links.slice(0, 3).map((link: NavItem, idx: number, arr: NavItem[]) => (
                <React.Fragment key={link.name}>
                  <Link href={link.href} className="hover:text-[#00f0ff] transition-colors">
                    {link.name}
                  </Link>
                  {idx < arr.length - 1 && (
                    <span className="text-cyan-700/60 select-none">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
              {data.links.slice(3).map((link: NavItem, idx: number, arr: NavItem[]) => (
                <React.Fragment key={link.name}>
                  <Link href={link.href} className="hover:text-[#00f0ff] transition-colors">
                    {link.name}
                  </Link>
                  {idx < arr.length - 1 && (
                    <span className="text-cyan-700/60 select-none">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 8. Second Horizontal Divider Line */}
          <div className="h-px w-full bg-[#0a434b]/90 my-3" />

          {/* 9. Bottom Branding & Copyright (Centered) */}
          <div className="flex flex-col items-center justify-center text-center gap-1.5 pt-0.5 pb-2">
            {/* Centered SecureTech Shield Logo */}
            <Link
              href="/"
              className="relative h-9 w-40 block shrink-0 transition-opacity duration-200 hover:opacity-90"
            >
              <Image
                src={data.logo || '/logo/logo.webp'}
                alt={`${data.logo_text || 'SecureTech'} ${data.logo_subtext || 'SAFER TOMORROW'}`}
                fill
                sizes="160px"
                className="object-contain object-center"
                priority
              />
            </Link>

            {/* Centered Copyright Notice */}
            <p className="text-[11px] sm:text-xs text-slate-400 font-normal">
              {data.copyright || 'Copyright © 2026. All rights reserved. Powered by Lestow'}
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
