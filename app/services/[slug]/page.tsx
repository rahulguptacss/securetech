import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import ServiceDetail from '../../../components/sections/ServiceDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type ServiceDetailItem } from '../../../components/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const aliasMap: Record<string, string> = {
  'service-detail': 'managed-security-services',
  detail: 'managed-security-services',
  privacy: 'data-protection-encryption',
  'data-privacy': 'data-protection-encryption',
  'data-privacy-program': 'data-protection-encryption',
  training: 'compliance-risk-management',
  'security-awareness-training': 'compliance-risk-management',
  safety: 'managed-security-services',
  'comprehensive-24-7-safety': 'managed-security-services',
};

export async function generateStaticParams() {
  const serviceList = sections.service_detail?.services || [];
  const params = serviceList.map((service) => ({
    slug: service.slug,
  }));

  // Also include alias slugs
  Object.keys(aliasMap).forEach((alias) => {
    params.push({ slug: alias });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = aliasMap[slug] || slug;
  const serviceList = sections.service_detail?.services || [];
  const service = serviceList.find((s) => s.slug === canonicalSlug);

  if (!service) {
    return {
      title: 'Service Detail | SecureTech',
      description: 'Comprehensive cyber security service overview.',
    };
  }

  return {
    title: `${service.name} | SecureTech Cyber Security`,
    description: service.subtitle || service.paragraphs?.[0],
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const canonicalSlug = aliasMap[slug] || slug;
  const serviceDetailData = sections.service_detail;

  if (!serviceDetailData) {
    return notFound();
  }

  const service = serviceDetailData.services.find((s) => s.slug === canonicalSlug);
  if (!service) {
    return notFound();
  }

  const pageMeta = pages.service_detail;

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb
          data={sections.breadcrumb}
          currentPage={pageMeta?.pageName || 'Service Detail'}
          watermark={pageMeta?.watermark || 'SERVICE DETAIL'}
        />
        <ServiceDetail data={serviceDetailData} activeSlug={canonicalSlug} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
