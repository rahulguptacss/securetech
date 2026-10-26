import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import GetAQuote from '../../components/sections/GetAQuote';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.get_a_quote || {
  title: 'Get A Quote | SecureTech Cyber Security',
  pageName: 'Get A Quote',
  metadata: {
    title: 'Get A Quote | SecureTech Cyber Security',
    description: 'Tell us about your requirements and our team will provide you with a customized solution and pricing.',
  },
  watermark: 'QUOTE',
  components: [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'GetAQuoteSection', component: 'GetAQuote' },
  ],
};

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function GetAQuotePage() {
  const quoteData = sections.get_a_quote;

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
        watermark={pageData.watermark}
      />
    ),
    GetAQuote: quoteData ? <GetAQuote data={quoteData} /> : null,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
