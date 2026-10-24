'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import type { ContactSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface ContactProps {
  data: ContactSectionData;
}

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Enterprise Protection',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#040812] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-5">
            <Eyebrow text={data.eyebrow} />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-6">
              <span>{data.title_regular} </span>
              <span className="text-[#00f0ff] text-cyber-glow">
                {data.title_highlight}
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              {data.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-950/40 text-[#00f0ff]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Email Operations</h4>
                  <a href={`mailto:${data.email}`} className="text-slate-400 text-sm hover:text-[#00f0ff] transition-colors">
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-950/40 text-[#00f0ff]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Emergency Incident Hotline</h4>
                  <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="text-slate-400 text-sm hover:text-[#00f0ff] transition-colors">
                    {data.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-950/40 text-[#00f0ff]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Headquarters</h4>
                  <p className="text-slate-400 text-sm">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-cyan-500/25 bg-[#071122]/90 p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6">
                Request Security Assessment
              </h3>

              {submitted ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Message Dispatched Securely</h4>
                  <p className="text-sm text-slate-300">
                    Our cyber defense team has received your inquiry and will respond within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#030914] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#030914] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Required Protection Tier
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl border border-cyan-500/20 bg-[#030914] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="Enterprise Protection">Enterprise 24/7 SOC Operations</option>
                      <option value="Data Privacy Program">Data Privacy & Encryption Program</option>
                      <option value="Penetration Testing">Penetration Testing & Red Teaming</option>
                      <option value="Security Awareness Training">Workforce Security Awareness Training</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Incident or Scope Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your security requirements or infrastructure size..."
                      className="w-full rounded-xl border border-cyan-500/20 bg-[#030914] px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-cyber w-full justify-center !py-3.5"
                  >
                    <span>Transmit Secure Request</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
