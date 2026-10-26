'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  href: string;
  text: string;
  variant?: 'solid' | 'outline' | 'pill';
  className?: string;
  onClick?: () => void;
}

export default function PrimaryButton({
  href,
  text,
  variant = 'pill',
  className = '',
  onClick,
}: PrimaryButtonProps) {
  if (variant === 'outline') {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`group inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/20 px-6 py-3 text-sm font-semibold text-cyan-300 transform-gpu will-change-transform transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 ${className}`}
      >
        <span>{text}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`btn-cyber group ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#020712]" />
    </Link>
  );
}
