import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type BlogDetailPost } from '../../../components/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const blogAliasMap: Record<string, string> = {
  detail: 'top-10-cyber-security-threats-2024',
  details: 'top-10-cyber-security-threats-2024',
  'blog-detail': 'top-10-cyber-security-threats-2024',
  'blog-details': 'top-10-cyber-security-threats-2024',
  'the-role-of-managed-security-services-in-todays-threat-landscape': 'top-10-cyber-security-threats-2024',
  'managed-security-services': 'top-10-cyber-security-threats-2024',
  'role-of-mss': 'top-10-cyber-security-threats-2024',
};

export async function generateStaticParams() {
  const blogDetailData = sections.blog_detail;
  const postsList = blogDetailData?.posts || [];
  const params: { slug: string }[] = [];

  // Add all canonical post slugs
  postsList.forEach((post) => {
    params.push({ slug: post.slug });
  });

  // Add all alias keys
  Object.keys(blogAliasMap).forEach((alias) => {
    params.push({ slug: alias });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = blogAliasMap[slug] || slug;
  const blogDetailData = sections.blog_detail;
  const postsList = blogDetailData?.posts || [];
  const post = postsList.find((p) => p.slug === canonicalSlug);

  if (!post) {
    return {
      title: 'Blog Detail | SecureTech Cyber Security',
      description: 'In-depth cybersecurity research, industry insights, and threat defense analysis.',
    };
  }

  const fullTitle = `${post.title_regular}${post.title_highlight}${post.title_suffix || ''}`;
  return {
    title: `${fullTitle} | SecureTech Blog`,
    description: post.intro_paragraph,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const canonicalSlug = blogAliasMap[slug] || slug;
  const blogDetailData = sections.blog_detail;

  if (!blogDetailData) {
    return notFound();
  }

  const post: BlogDetailPost | undefined =
    blogDetailData.posts.find((p) => p.slug === canonicalSlug) || blogDetailData.posts[0];

  if (!post) {
    return notFound();
  }

  const pageMeta = pages.blog_detail;

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {/* Breadcrumb: "Blog Detail", "Home / Blog Detail" matching Screenshot */}
        <Breadcrumb
          data={sections.breadcrumb}
          currentPage={pageMeta?.pageName || 'Blog Detail'}
          watermark={pageMeta?.watermark || 'BLOG DETAIL'}
        />
        {/* Article Details Section */}
        <BlogDetail post={post} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
