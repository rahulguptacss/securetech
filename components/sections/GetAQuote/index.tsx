'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Settings,
  Zap,
  Users,
  FileText,
  User,
  Mail,
  Phone,
  LayoutGrid,
  MessageSquare,
  MapPin,
  Building2,
  CircleDollarSign,
  ChevronDown,
  ArrowRight,
  Lock,
  CheckCircle2,
  Check,
} from 'lucide-react';
import type { GetAQuoteSectionData, QuoteFeatureItem } from '../../types';

interface GetAQuoteProps {
  data: GetAQuoteSectionData;
}

interface CustomDropdownProps {
  name: string;
  value: string;
  placeholder: string;
  options?: string[];
  icon: React.ReactNode;
  direction?: 'up' | 'down';
  onChange: (name: string, value: string) => void;
}

function CustomDropdown({
  name,
  value,
  placeholder,
  options = [],
  icon,
  direction = 'down',
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(name, option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex w-full items-center justify-between rounded-xl border bg-[#020713]/90 px-3.5 py-3 text-sm text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.35)]'
            : 'border-[#00f0ff]/25 hover:border-[#00f0ff]/50'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
          <span className="shrink-0">{icon}</span>
          <span
            className={`truncate text-sm ${
              value ? 'text-white font-medium' : 'text-[#94a3b8]'
            }`}
          >
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`h-4.5 w-4.5 text-[#00f0ff] shrink-0 transition-transform duration-250 ease-out ${
            isOpen ? (direction === 'up' ? '-rotate-180' : 'rotate-180') : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Cyber Dropdown Menu (direction-aware: opens UP for bottom inputs, DOWN for top inputs) */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 max-h-56 overflow-y-auto rounded-xl border border-[#00f0ff]/40 bg-[#050e1e]/98 p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(0,240,255,0.25)] backdrop-blur-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#00f0ff]/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent ${
            direction === 'up' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
        >
          {options.length > 0 ? (
            options.map((opt) => {
              const isSelected = value === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-xs sm:text-[13.5px] transition-all duration-150 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] font-semibold'
                      : 'text-slate-300 hover:bg-[#00f0ff]/15 hover:text-[#00f0ff] hover:pl-4.5'
                  }`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {isSelected && <Check className="h-4 w-4 text-[#00f0ff] shrink-0" />}
                </button>
              );
            })
          ) : (
            <div className="px-3.5 py-2.5 text-xs text-slate-400">No options available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GetAQuote({ data }: GetAQuoteProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    requirements: '',
    country: '',
    industry: '',
    budget: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        company: '',
        service: '',
        requirements: '',
        country: '',
        industry: '',
        budget: '',
      });
    }, 4000);
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'settings':
      case 'cog':
        return <Settings className="h-5 w-5 text-[#00f0ff]" />;
      case 'zap':
      case 'lightning':
        return <Zap className="h-5 w-5 text-[#00f0ff]" />;
      case 'users':
      case 'team':
        return <Users className="h-5 w-5 text-[#00f0ff]" />;
      case 'filetext':
      case 'document':
      default:
        return <FileText className="h-5 w-5 text-[#00f0ff]" />;
    }
  };

  return (
    <section className="relative w-full pt-4 sm:pt-6 pb-20 sm:pb-28 lg:pb-32 bg-[#000000] text-white">
      {/* Background cyber ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />
        <div className="absolute bottom-1/3 right-0 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        <p className="text-center text-[#cbd5e1] text-sm sm:text-[15px] font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-14">
          {data.description}
        </p>

        {/* Main Showcase 2-Column Card matching screenshot (WITHOUT overflow-hidden so menus never get clipped) */}
        <div className="relative rounded-3xl border border-[#00f0ff]/30 bg-[#030917]/90 shadow-[0_0_40px_rgba(0,240,255,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: 3D Hologram Shield Image + 4 Features */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#00f0ff]/20 flex flex-col justify-between bg-black/20 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl overflow-hidden">
              <div>
                {/* 3D Cyber Shield Hologram Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#00f0ff]/40 mb-8 bg-black/60 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                  <Image
                    src={data.feature_image}
                    alt={data.feature_image_alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* 4 Feature Items */}
                <div className="space-y-6">
                  {data.features.map((feature: QuoteFeatureItem) => (
                    <div key={feature.id} className="flex items-start gap-4">
                      {/* Circular Cyan Icon Badge */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#00f0ff] bg-cyan-950/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.35)]">
                        {getFeatureIcon(feature.icon)}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-[13.5px] text-[#cbd5e1] font-light leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Request a Quote Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Form Title & Subtitle matching screenshot */}
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight mb-2">
                  <span>{data.form.title_regular} </span>
                  <span className="text-[#00f0ff]">{data.form.title_highlight}</span>
                </h3>

                <p className="text-[#cbd5e1] text-xs sm:text-[14px] font-light leading-relaxed mb-6 sm:mb-8">
                  {data.form.description}
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-cyan-400 bg-cyan-950/30 p-8 text-center my-8">
                    <CheckCircle2 className="h-12 w-12 text-[#00f0ff] mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-white mb-2">Quote Request Received!</h4>
                    <p className="text-slate-300 text-sm">
                      Our cybersecurity specialists will review your requirements and reach out within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name & Email */}
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
                          placeholder={data.form.fields.name.placeholder}
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
                          placeholder={data.form.fields.email.placeholder}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
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
                          placeholder={data.form.fields.phone.placeholder}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <FileText className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={data.form.fields.company.placeholder}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Service Interested In Custom Cyber Dropdown (Opens downwards) */}
                    <CustomDropdown
                      name="service"
                      value={formData.service}
                      placeholder={data.form.fields.service.placeholder}
                      options={data.form.fields.service.options}
                      direction="down"
                      icon={<LayoutGrid className="h-4.5 w-4.5 text-[#00f0ff]" />}
                      onChange={handleDropdownChange}
                    />

                    {/* Requirements Textarea */}
                    <div className="relative flex items-start rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                      <MessageSquare className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3 mt-1" />
                      <textarea
                        name="requirements"
                        rows={3}
                        required
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder={data.form.fields.requirements.placeholder}
                        className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none resize-none"
                      />
                    </div>

                    {/* Country Custom Cyber Dropdown (Opens downwards) */}
                    <CustomDropdown
                      name="country"
                      value={formData.country}
                      placeholder={data.form.fields.country.placeholder}
                      options={data.form.fields.country.options}
                      direction="down"
                      icon={<MapPin className="h-4.5 w-4.5 text-[#00f0ff]" />}
                      onChange={handleDropdownChange}
                    />

                    {/* Industry Type Custom Cyber Dropdown (Opens UPWARDS so it never touches or gets clipped by bottom) */}
                    <CustomDropdown
                      name="industry"
                      value={formData.industry}
                      placeholder={data.form.fields.industry.placeholder}
                      options={data.form.fields.industry.options}
                      direction="up"
                      icon={<Building2 className="h-4.5 w-4.5 text-[#00f0ff]" />}
                      onChange={handleDropdownChange}
                    />

                    {/* Budget Range Custom Cyber Dropdown (Opens UPWARDS so it never touches or gets clipped by bottom) */}
                    <CustomDropdown
                      name="budget"
                      value={formData.budget}
                      placeholder={data.form.fields.budget.placeholder}
                      options={data.form.fields.budget.options}
                      direction="up"
                      icon={<CircleDollarSign className="h-4.5 w-4.5 text-[#00f0ff]" />}
                      onChange={handleDropdownChange}
                    />

                    {/* Submit Button matching screenshot */}
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#00f0ff] py-3.5 px-6 font-bold text-base sm:text-lg text-black flex items-center justify-center gap-3.5 shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:bg-white hover:shadow-[0_0_35px_#00f0ff] transform-gpu will-change-transform transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] group cursor-pointer"
                    >
                      <span>{data.form.button_text}</span>
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-black" />
                      </span>
                    </button>

                    {/* Security Guarantee Note matching screenshot */}
                    <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#94a3b8]">
                      <Lock className="h-3.5 w-3.5 text-[#94a3b8]" />
                      <span>{data.form.security_note}</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
