import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import PortfolioDetail from '../../../components/sections/PortfolioDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type ServiceDetailItem } from '../../../components/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const portfolioAliasMap: Record<string, string> = {
  // Aliases for portfolio detail routes -> default to first portfolio project
  detail: 'enterprise-cloud-security',
  details: 'enterprise-cloud-security',
  'portfolio-detail': 'enterprise-cloud-security',
  'portfolio-details': 'enterprise-cloud-security',
  'threat-monitoring': '24-7-threat-monitoring',
};

export async function generateStaticParams() {
  const portfolioDetailData = sections.portfolio_detail;
  const projectList = portfolioDetailData?.services || [];
  const params: { slug: string }[] = [];

  // Add all canonical portfolio project slugs
  projectList.forEach((project) => {
    params.push({ slug: project.slug });
  });

  // Add all portfolio items from sections.portfolio
  sections.portfolio?.items?.forEach((item) => {
    if (!params.some((p) => p.slug === item.slug)) {
      params.push({ slug: item.slug });
    }
  });

  // Add all alias keys
  Object.keys(portfolioAliasMap).forEach((alias) => {
    params.push({ slug: alias });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = portfolioAliasMap[slug] || slug;
  const portfolioDetailData = sections.portfolio_detail;
  const projectList = portfolioDetailData?.services || [];
  const project = projectList.find((p) => p.slug === canonicalSlug);

  if (!project) {
    return {
      title: 'Portfolio Detail | SecureTech Cyber Security',
      description: 'Comprehensive cybersecurity project case study and detailed security implementation overview.',
    };
  }

  return {
    title: `${project.name} | Portfolio Detail | SecureTech`,
    description: project.subtitle || project.paragraphs?.[0],
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const canonicalSlug = portfolioAliasMap[slug] || slug;
  const portfolioDetailData = sections.portfolio_detail;

  if (!portfolioDetailData) {
    return notFound();
  }

  const project = portfolioDetailData.services.find((s) => s.slug === canonicalSlug);
  if (!project) {
    return notFound();
  }

  const pageMeta = pages.portfolio_detail;

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {/* Breadcrumb: "Portfolio Detail", "Home / Portfolio Detail" */}
        <Breadcrumb
          data={sections.breadcrumb}
          currentPage={pageMeta?.pageName || 'Portfolio Detail'}
          watermark={pageMeta?.watermark || 'PORTFOLIO DETAIL'}
        />
        {/* Dedicated PortfolioDetail Component with "Our Portfolio" Sidebar */}
        <PortfolioDetail
          data={portfolioDetailData}
          activeSlug={canonicalSlug}
          basePath="/portfolio"
        />
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
