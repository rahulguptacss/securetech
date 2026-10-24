import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { common, pages } from '../components/types';

const notFoundData = pages.not_found;

export const metadata: Metadata = {
  title: `${notFoundData.code} - ${notFoundData.title}`,
  description: notFoundData.description,
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#040812] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-28 cyber-grid">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <section className="relative z-10 flex max-w-xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl border border-red-500/40 bg-red-950/30 p-4 text-red-400">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <p
            className="text-[100px] sm:text-[140px] font-black leading-none tracking-tight text-cyan-gradient select-none"
          >
            {notFoundData.code}
          </p>
          <span className="mt-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#00f0ff]">
            {notFoundData.badge}
          </span>
          <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-white">{notFoundData.title}</h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">{notFoundData.description}</p>
          <Link href={notFoundData.back_home.href} className="btn-cyber mt-8">
            <ArrowLeft className="h-4 w-4" />
            <span>{notFoundData.back_home.text}</span>
          </Link>
        </section>
      </main>
      <Footer data={common.Footer} />
    </div>
  );
}
