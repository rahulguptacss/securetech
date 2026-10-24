'use client';

import { motion } from 'framer-motion';

interface EyebrowProps {
  text: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function Eyebrow({ text, align = 'left' }: EyebrowProps) {
  const lineClass = 'h-[2px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#00f0ff] to-[#00ffb2]';

  return (
    <div className={`flex items-center gap-3 mb-3.5 ${align === 'center' ? 'justify-center' : ''}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`${lineClass} origin-right`}
      />
      <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] text-[#00f0ff] uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
        {text}
      </span>
      {align === 'center' && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${lineClass} origin-left`}
        />
      )}
    </div>
  );
}
