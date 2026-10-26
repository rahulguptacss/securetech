import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Portfolio from '../../components/sections/Portfolio';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.portfolio;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Portfolio | SecureTech Cyber Security',
  description:
    pageData?.metadata?.description ||
    'Explore our portfolio of proven cybersecurity solutions and real-world implementations.',
};

export default function PortfolioPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData?.pageName || 'Portfolio'}
        watermark={pageData?.watermark || 'PORTFOLIO'}
      />
    ),
    Portfolio: <Portfolio data={sections.portfolio} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData?.components?.map((block: PageComponent) => (
          <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
        )) || (
          <>
            <Breadcrumb
              data={sections.breadcrumb}
              currentPage="Portfolio"
              watermark="PORTFOLIO"
            />
            <Portfolio data={sections.portfolio} />
          </>
        )}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
