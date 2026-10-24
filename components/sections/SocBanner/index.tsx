'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SocBannerData } from '../../types';

interface SocBannerProps {
  data: SocBannerData;
}

export default function SocBanner({ data }: SocBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#000000] py-0 my-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] max-h-[700px] overflow-hidden rounded-none border-y border-cyan-900/30"
      >
        <Image
          src={data.image || '/images/soc-room.jpg'}
          alt={data.image_alt || 'Security Operations Center'}
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark gradient overlay to blend into top & bottom sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-[#000000]/60 pointer-events-none" />
      </motion.div>
    </section>
  );
}
