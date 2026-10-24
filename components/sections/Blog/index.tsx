'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BlogSectionData, BlogPostItem } from '../../types';

interface BlogProps {
  data: BlogSectionData;
}

export default function Blog({ data }: BlogProps) {
  return (
    <section id="blog" className="relative w-full pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 bg-[#000000] overflow-hidden text-white">
      {/* Subtle ambient cyan glow */}
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[400px] w-[400px] rounded-full bg-[#00f0ff]/5 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* Left Column: Heading, Subtitle and Cyan View All Blog Button */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:w-[32%] shrink-0 lg:sticky lg:top-14 -translate-y-6 sm:-translate-y-10 lg:-translate-y-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight mb-5">
              <span className="block">{data.title_regular}</span>
              <span className="block">
                In Our <span className="text-[#00f0ff]">{data.title_highlight}</span>
              </span>
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#cbd5e1] font-light mb-8 max-w-sm">
              {data.description}
            </p>

            <Link
              href={data.button_link}
              className="inline-flex items-center gap-3 rounded-full bg-[#00f0ff] px-6 sm:px-7 py-3 text-sm font-bold text-black tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_#00f0ff] hover:scale-105 active:scale-95 group/btn"
            >
              <span>{data.button_text}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-black" />
            </Link>
          </motion.div>

          {/* Vertical Cyan Divider Line between Left & Right Columns */}
          <div className="hidden lg:block w-[1.5px] bg-[#00f0ff] self-stretch" />

          {/* Right Column: 4 Horizontal Blog Posts with Cyan Dividers */}
          <div className="flex-1 min-w-0 w-full space-y-0">
            {data.posts.map((post: BlogPostItem, index: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="group"
              >
                {/* Blog Card Content */}
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 lg:gap-7 py-3.5 sm:py-4.5">
                  {/* Left: Thumbnail with solid 2px cyan border */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative w-full sm:w-[225px] md:w-[250px] lg:w-[270px] aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#00f0ff] shrink-0 bg-black shadow-[0_0_20px_rgba(0,240,255,0.2)] block group/img"
                  >
                    <Image
                      src={post.image}
                      alt={post.image_alt || post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 270px"
                      className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                    />
                  </Link>

                  {/* Right: Text Information */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    {/* Category Pill: Solid Cyan Pill with Black Text */}
                    <div className="mb-2">
                      <span className="inline-block rounded-full bg-[#00f0ff] px-3.5 py-0.5 text-xs font-bold text-black tracking-wide">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-base sm:text-lg lg:text-[20px] font-bold text-white tracking-tight leading-snug mb-1.5 group-hover:text-[#00f0ff] transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#cbd5e1] font-light mb-2.5">
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
                {index < data.posts.length - 1 && (
                  <div className="h-[1.5px] w-full bg-[#00f0ff]" />
                )}
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
