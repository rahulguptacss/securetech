import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import SocBanner from '../components/sections/SocBanner';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Blog from '../components/sections/Blog';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../components/types';

const pageData = pages.home;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function Home() {
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    SocBanner: <SocBanner data={sections.soc_banner} />,
    Services: <Services data={sections.services} />,
    Process: <Process data={sections.process} />,
    Blog: <Blog data={sections.blog} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#040812] text-slate-100 font-sans">
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
