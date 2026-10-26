'use client';

import React from 'react';
import Image from 'next/image';
import { User, Calendar, Check } from 'lucide-react';
import type { BlogDetailPost } from '../../types';

interface BlogDetailProps {
  post: BlogDetailPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  if (!post) return null;

  return (
    <section id="blog-detail" className="relative w-full bg-[#000000] text-white">
      {/* Background ambient cyber glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.04] blur-[150px]" />
        <div className="absolute bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/[0.03] blur-[160px]" />
      </div>

      <article className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main Article Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.2] mb-5 sm:mb-6">
          <span>{post.title_regular}</span>
          <span className="text-[#00f0ff] drop-shadow-[0_0_18px_rgba(0,240,255,0.45)]">
            {post.title_highlight}
          </span>
          {post.title_suffix && <span>{post.title_suffix}</span>}
        </h1>

        {/* Metadata Row: Author & Published Date with Cyan Circles */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-[14px]">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00f0ff] text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              <User className="h-4 w-4 stroke-[2.5]" />
            </span>
            <span className="font-semibold text-white">{post.author?.name || 'Aaron Loeb'}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00f0ff] text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              <Calendar className="h-4 w-4 stroke-[2.5]" />
            </span>
            <span className="text-[#94a3b8]">{post.published_date}</span>
          </div>
        </div>

        {/* Intro Paragraph */}
        <p className="text-sm sm:text-[15.5px] leading-relaxed text-[#cbd5e1] font-light mb-8 sm:mb-10">
          {post.intro_paragraph}
        </p>

        {/* Featured Hero Image Container */}
        <div className="relative w-full h-[240px] sm:h-[350px] md:h-[420px] lg:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.22)] my-8 sm:my-10 bg-black">
          <Image
            src={post.hero_image}
            alt={post.hero_image_alt || post.title_regular}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 980px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Middle Section: Full-Width Descriptive Paragraphs */}
        <div className="my-8 sm:my-10 space-y-4 sm:space-y-5 text-sm sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light">
          {post.body_paragraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Subheading Section */}
        <div className="my-10 sm:my-12">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-snug mb-3 sm:mb-4">
            <span>{post.subheading_regular}</span>
            <span className="text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              {post.subheading_highlight}
            </span>
          </h2>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light">
            {post.subheading_paragraph}
          </p>
        </div>

        {/* Key Highlights (Checklist) + Secondary Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 my-10 sm:my-14 items-center">
          {/* Left Column: 6 Checkmark Items */}
          <div className="lg:col-span-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-5">
              <span>{post.checklist_title_regular}</span>
              <span className="text-[#00f0ff]">{post.checklist_title_highlight}</span>
            </h3>
            <div className="divide-y divide-cyan-900/30 border-t border-b border-cyan-900/30">
              {post.checklist_items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 py-3 sm:py-3.5">
                  <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-[#00f0ff] text-black shrink-0 shadow-[0_0_8px_#00f0ff]">
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xs sm:text-[14px] text-slate-200 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Secondary Image */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[220px] sm:h-[290px] lg:h-[330px] rounded-2xl overflow-hidden border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.2)] bg-black">
              <Image
                src={post.secondary_image}
                alt={post.secondary_image_alt || post.checklist_title_regular}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
