'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { ContactSectionData, ContactCardItem } from '../../types';

interface ContactProps {
  data: ContactSectionData;
}

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 4000);
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'map':
      case 'mappin':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z"
              fill="#00f0ff"
            />
            <circle cx="12" cy="9" r="2.5" fill="#020712" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="#00f0ff">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" fill="#00f0ff" />
            <path
              d="M3 6L12 12.5L21 6"
              stroke="#020712"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'messagesquare':
      case 'chat':
      default:
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 11.5C20 15.642 16.418 19 12 19C10.68 19 9.43 18.705 8.33 18.18L4 19.5L5.42 16.27C4.53 14.93 4 13.29 4 11.5C4 7.358 7.582 4 12 4C16.418 4 20 7.358 20 11.5Z"
              fill="#00f0ff"
            />
            <circle cx="8.5" cy="11.5" r="1.1" fill="#020712" />
            <circle cx="12" cy="11.5" r="1.1" fill="#020712" />
            <circle cx="15.5" cy="11.5" r="1.1" fill="#020712" />
          </svg>
        );
    }
  };

  return (
    <section className="relative w-full pt-4 sm:pt-6 pb-20 sm:pb-28 lg:pb-32 bg-[#000000] text-white">
      {/* Background cyber ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />
        <div className="absolute bottom-1/3 right-0 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow with Cyan flanking lines matching screenshot */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 sm:w-12 h-[1.5px] bg-[#00f0ff]" />
          <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#ffffff] uppercase">
            {data.eyebrow}
          </span>
          <div className="w-10 sm:w-12 h-[1.5px] bg-[#00f0ff]" />
        </div>

        {/* Section Heading matching screenshot */}
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight mb-4 text-center leading-tight">
          <span>{data.title_regular} </span>
          <span className="text-[#00f0ff]">{data.title_highlight}</span>
        </h2>

        {/* Section Description matching screenshot */}
        <p className="text-center text-[#cbd5e1] text-sm sm:text-[15px] font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
          {data.description}
        </p>

        {/* 4 Contact Info Cards (2 in 1 row on mobile, 4 in 1 row on desktop) */}
        {data.cards && data.cards.length > 0 && (
          <div className="relative rounded-2xl border border-[#00f0ff]/30 bg-[#020713]/95 shadow-[0_0_25px_rgba(0,240,255,0.08)] overflow-hidden mb-8 sm:mb-10">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {data.cards.map((card: ContactCardItem, idx: number) => {
                const isCol1 = idx % 2 === 0;
                const isRow1 = idx < 2;
                return (
                  <div
                    key={card.id}
                    className={`p-3 sm:p-5 lg:p-4.5 xl:p-6 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 group transition-colors duration-200 hover:bg-[#00f0ff]/[0.02] ${
                      isCol1 ? 'border-r border-[#00f0ff]/30' : ''
                    } ${
                      isRow1 ? 'border-b border-[#00f0ff]/30 lg:border-b-0' : ''
                    } ${
                      idx === 1 ? 'lg:border-r lg:border-[#00f0ff]/30' : ''
                    }`}
                  >
                    {/* Left/Top: Circular Cyan Icon Badge */}
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#00f0ff] sm:border-2 bg-black/50 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.35)] transition-transform duration-300 group-hover:scale-105">
                      {getCardIcon(card.icon)}
                    </div>

                    {/* Right/Bottom: Content Column */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch w-full">
                      <div>
                        {/* Card Title */}
                        <h3 className="text-xs sm:text-[15px] xl:text-[17px] font-bold text-white tracking-tight leading-snug mb-1">
                          {card.title}
                        </h3>

                        {/* Description or Two Address Lines */}
                        {card.description ? (
                          <p className="text-[11px] sm:text-xs xl:text-[13px] text-[#cbd5e1] font-light leading-relaxed mb-2.5 sm:mb-4">
                            {card.description}
                          </p>
                        ) : (
                          <div className="text-[11px] sm:text-xs xl:text-[13px] text-[#cbd5e1] font-light leading-relaxed mb-2.5 sm:mb-4">
                            <p>{card.line1}</p>
                            <p>{card.line2}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Link with Circle Arrow Icon */}
                      <Link
                        href={card.action_link}
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs xl:text-[13px] font-semibold text-[#00f0ff] hover:text-white transition-colors duration-200 mt-auto group/link"
                      >
                        <span className="truncate">{card.action_text}</span>
                        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#00f0ff] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/link:border-white group-hover/link:translate-x-0.5">
                          <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#00f0ff] group-hover/link:text-white" />
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Showcase 2-Column Container: Leave A Message Form + Interactive Cyber Map */}
        <div id="contact-form" className="relative rounded-3xl border border-[#00f0ff]/30 bg-[#030917]/90 shadow-[0_0_40px_rgba(0,240,255,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Left Column: Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Form Eyebrow with Cyan Dash */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1.5px] bg-[#00f0ff]" />
                  <span className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase">
                    {data.form?.eyebrow || 'SEND US A MESSAGE'}
                  </span>
                </div>

                {/* Form Title & Subtitle matching screenshot */}
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight mb-2">
                  <span>{data.form?.title_regular || 'Leave A'} </span>
                  <span className="text-[#00f0ff]">{data.form?.title_highlight || 'Message'}</span>
                </h3>

                <p className="text-[#cbd5e1] text-xs sm:text-[14px] font-light leading-relaxed mb-6 sm:mb-8">
                  {data.form?.description || 'Fill out the form below and our team will get back to you as soon as possible.'}
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-cyan-400 bg-cyan-950/30 p-8 text-center my-6">
                    <CheckCircle2 className="h-12 w-12 text-[#00f0ff] mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-white mb-2">Message Transmitted!</h4>
                    <p className="text-slate-300 text-sm">
                      Thank you for contacting SecureTech. Our team will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Your Name & Your Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <User className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={data.form?.fields.name_placeholder || 'Your Name'}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <Mail className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={data.form?.fields.email_placeholder || 'Your Email'}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Your Phone & Your Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <Phone className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={data.form?.fields.phone_placeholder || 'Your Phone'}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Subject */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <FileText className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={data.form?.fields.subject_placeholder || 'Your Subject'}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Your Message */}
                    <div className="relative flex items-start rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                      <MessageSquare className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3 mt-1" />
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={data.form?.fields.message_placeholder || 'Your Message'}
                        className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 rounded-2xl bg-[#00f0ff] py-3.5 px-8 font-bold text-sm sm:text-base text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-white hover:shadow-[0_0_30px_#00f0ff] transform-gpu will-change-transform transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] group cursor-pointer"
                      >
                        <span>{data.form?.button_text || 'Submit Message'}</span>
                        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:translate-x-1">
                          <ArrowRight className="h-3.5 w-3.5 text-black" />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Simple Google Map */}
            <div className="lg:col-span-6 relative min-h-[460px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#00f0ff]/20 overflow-hidden bg-[#020713]">
              <iframe
                title="Office Location Map"
                src={
                  data.map?.embed_url ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    data.address || '123 Cyber Park Avenue, New York, NY 10001, USA'
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                }
                className="w-full h-full min-h-[460px] lg:min-h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
