'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, Shield } from 'lucide-react';
import type { BackToTopData } from '../types';

interface BackToTopProps {
  data?: BackToTopData;
}

export default function BackToTop({ data }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={data?.aria_label || 'Back to top'}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-[#091224]/90 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-300 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.7)]"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
