import React from 'react';
import { ArrowDown, ShieldCheck, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { OFFICER_PROFILE } from '../data/mortgageData';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreOptions: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreOptions }) => {
  const scrollToNext = () => {
    const el = document.getElementById('philosophy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[#F7F4EE]">
      {/* Subtle background texture/fine grid lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#101C2C 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Typography & Editorial Column (Left, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#565D66] mb-5">
              <span className="w-8 h-[1px] bg-[#C6A56B]" />
              <span className="text-[#C6A56B]">Bespoke Mortgage Advisory</span>
              <span aria-hidden="true">·</span>
              <span>NMLS #{OFFICER_PROFILE.nmlsId}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-[#101C2C] leading-[1.12] font-semibold tracking-tight">
              Your Next Chapter Starts With the Right Home Loan.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-[#565D66] leading-relaxed max-w-2xl font-light">
              Clear guidance. Thoughtful financing. A mortgage experience built around you.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-3 bg-[#101C2C] text-[#F7F4EE] px-7 py-4 rounded-sm text-sm font-semibold tracking-wide hover:bg-[#1A2B42] transition-all shadow-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C6A56B]"
              >
                <span>Let’s Talk About Your Goals</span>
                <ChevronRight className="w-4 h-4 text-[#C6A56B] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreOptions}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#101C2C] border border-[#101C2C]/25 hover:border-[#101C2C] px-6 py-4 rounded-sm text-sm font-medium tracking-wide transition-colors cursor-pointer hover:bg-white/60"
              >
                <span>Explore Your Options</span>
              </button>
            </div>

            {/* Personal Brand Signature & Credibility Bar */}
            <div className="mt-12 pt-8 border-t border-[#101C2C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Signature representation */}
              <div className="flex items-center gap-4">
                <div className="font-editorial italic text-2xl text-[#101C2C] tracking-wide select-none">
                  Julian Vance
                </div>
                <div className="h-8 w-[1px] bg-[#101C2C]/15" />
                <div className="text-xs text-[#565D66] leading-tight">
                  <p className="font-semibold text-[#101C2C]">{OFFICER_PROFILE.title}</p>
                  <p>Fiduciary Approach · 14+ Years Serving Borrowers</p>
                </div>
              </div>

              {/* Direct Touchpoint */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#101C2C]">
                <ShieldCheck className="w-4 h-4 text-[#C6A56B]" />
                <span>Equal Housing Lender</span>
              </div>
            </div>

            {/* Key Micro Trust Markers */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#565D66]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                Zero Obligation Consultations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                99.4% On-Time Closing Record
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                Direct Advisor Cell Access
              </span>
            </div>

          </div>

          {/* Visual Column / Authentic Editorial Portrait (Right, 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Elegant Decorative Frame Border */}
              <div className="absolute -inset-2.5 sm:-inset-4 border border-[#C6A56B]/40 rounded-sm pointer-events-none transform translate-x-2 translate-y-2" />
              
              {/* Main Portrait Container */}
              <div className="relative overflow-hidden rounded-sm bg-[#101C2C] shadow-2xl aspect-[4/5] group">
                <img
                  src={OFFICER_PROFILE.portraitUrl}
                  alt="Julian Vance, Senior Mortgage Advisor"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 group-hover:scale-102"
                  loading="eager"
                />
                
                {/* Subtle vignette gradient at base of image */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#101C2C] via-[#101C2C]/50 to-transparent" />

                {/* Overlaid Editorial Card at bottom */}
                <div className="absolute inset-x-4 bottom-4 p-4 bg-[#101C2C]/90 backdrop-blur-md border border-[#C6A56B]/30 rounded-sm text-[#F7F4EE]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#C6A56B] font-semibold">
                        Direct Advisory Desk
                      </p>
                      <p className="font-serif text-base font-medium text-[#F7F4EE] mt-0.5">
                        {OFFICER_PROFILE.directPhone}
                      </p>
                    </div>
                    <a
                      href={`tel:${OFFICER_PROFILE.phone}`}
                      className="p-2.5 bg-[#C6A56B] text-[#101C2C] rounded-sm hover:bg-[#DFCA9D] transition-colors"
                      title="Call directly"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[11px] text-[#F7F4EE]/70 mt-2 border-t border-white/10 pt-2 flex items-center justify-between">
                    <span>Mon – Sat: 8:00 AM – 7:00 PM PT</span>
                    <span className="text-[#C6A56B]">Licensed in 48 States</span>
                  </p>
                </div>
              </div>

              {/* Floating Stat Note */}
              <div className="hidden sm:block absolute -top-4 -left-6 bg-white p-3.5 shadow-lg border border-[#101C2C]/10 rounded-sm text-left max-w-[190px]">
                <p className="text-[10px] uppercase tracking-wider text-[#565D66] font-semibold">
                  Client Advocacy
                </p>
                <p className="font-serif text-2xl font-bold text-[#101C2C]">
                  $420M+
                </p>
                <p className="text-[11px] text-[#565D66] mt-0.5">
                  Funded thoughtfully with zero hidden surprise fees
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Refined Scroll Indicator */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#565D66] hover:text-[#101C2C] transition-colors cursor-pointer"
            aria-label="Scroll to learn more"
          >
            <span>Discover The Approach</span>
            <div className="w-6 h-10 border border-[#101C2C]/25 rounded-full flex items-start justify-center p-1.5 group-hover:border-[#C6A56B] transition-colors">
              <ArrowDown className="w-3 h-3 text-[#C6A56B] animate-bounce" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
