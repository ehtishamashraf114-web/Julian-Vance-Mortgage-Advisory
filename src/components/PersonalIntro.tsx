import React from 'react';
import { OFFICER_PROFILE, PHILOSOPHY_PILLARS } from '../data/mortgageData';
import { Award, Compass, Shield, Users, ArrowUpRight } from 'lucide-react';

interface PersonalIntroProps {
  onOpenConsultation: () => void;
}

export const PersonalIntro: React.FC<PersonalIntroProps> = ({ onOpenConsultation }) => {
  return (
    <section id="philosophy" className="py-24 bg-white border-y border-[#101C2C]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
            <span className="w-8 h-[1px] bg-[#C6A56B]" />
            <span>Advisory Philosophy & Approach</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101C2C] font-semibold leading-tight">
            More Than a Mortgage. A Relationship Built on Trust.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#565D66] font-light leading-relaxed">
            In an industry obsessed with transaction speed and automated rate tables, Julian Vance takes the opposite approach: unhurried clarity, honest numbers, and personal advocacy.
          </p>
        </div>

        {/* Narrative & Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Editorial Imagery & Quote (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <div className="overflow-hidden rounded-sm bg-[#F7F4EE] aspect-[4/5] shadow-lg border border-[#101C2C]/10">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern architectural home interior with warm light"
                  className="w-full h-full object-cover filter contrast-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Editorial Quote Card */}
              <div className="mt-6 p-6 bg-[#F7F4EE] border-l-2 border-[#C6A56B] text-[#292D32]">
                <p className="font-serif italic text-lg leading-snug text-[#101C2C]">
                  &ldquo;A mortgage is never merely an interest rate; it is the financial foundation of where your family wakes up every morning.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#565D66]">
                  <span className="font-medium text-[#101C2C]">{OFFICER_PROFILE.name}</span>
                  <span>Senior Mortgage Advisor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & 3 Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-slate max-w-none text-[#565D66] leading-relaxed space-y-4">
              <p className="text-base sm:text-lg text-[#292D32]">
                Homeownership is one of the most consequential financial decisions of your lifetime. Yet too often, prospective buyers are left dealing with revolving call centers, confusing fine print, and automated algorithms that treat unique human lives like standardized data rows.
              </p>
              <p className="text-base">
                Over the past 14 years, I have advised first-time buyers stretching into their starter home, seasoned real estate investors scaling multi-property portfolios, and military families utilizing their hard-earned VA benefits. Every client receives the same fiduciary dedication: independent options, transparent disclosures, and proactive weekly communication.
              </p>
            </div>

            {/* Three Philosophy Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#101C2C]/10">
              {PHILOSOPHY_PILLARS.map((pillar, idx) => (
                <div key={pillar.title} className="p-4 bg-[#F7F4EE]/60 rounded-sm border border-[#101C2C]/5">
                  <div className="text-xs font-mono text-[#C6A56B] font-semibold mb-2">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#101C2C] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#565D66] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Verified Performance Highlights */}
            <div className="p-6 bg-[#101C2C] text-[#F7F4EE] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 divide-x divide-white/10 w-full sm:w-auto">
                <div className="pr-3">
                  <p className="font-serif text-2xl font-bold text-[#C6A56B]">{OFFICER_PROFILE.experienceYears} Years</p>
                  <p className="text-[11px] text-[#F7F4EE]/70 uppercase tracking-wider mt-0.5">Advisory Service</p>
                </div>
                <div className="px-3">
                  <p className="font-serif text-2xl font-bold text-[#C6A56B]">{OFFICER_PROFILE.volumeFunded}</p>
                  <p className="text-[11px] text-[#F7F4EE]/70 uppercase tracking-wider mt-0.5">Thoughtfully Funded</p>
                </div>
                <div className="pl-3">
                  <p className="font-serif text-2xl font-bold text-[#C6A56B]">{OFFICER_PROFILE.onTimeClosingRate}</p>
                  <p className="text-[11px] text-[#F7F4EE]/70 uppercase tracking-wider mt-0.5">On-Time Closings</p>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto whitespace-nowrap bg-[#C6A56B] text-[#101C2C] px-5 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#DFCA9D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule A Chat</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
