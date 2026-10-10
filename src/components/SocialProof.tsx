import React from 'react';
import { TESTIMONIALS } from '../data/mortgageData';
import { Star, Quote, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white relative border-t border-[#101C2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
            <span className="w-8 h-[1px] bg-[#C6A56B]" />
            <span>Client Experiences & Social Proof</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101C2C] font-semibold leading-tight">
            Real Journeys. Thoughtful Financing.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#565D66] font-light leading-relaxed">
            Every transaction represents a family’s life transition. Here is what borrowers say about the clarity, speed, and calm Julian brings to the process.
          </p>
        </div>

        {/* Testimonials Grid (2x2 layout with generous whitespace) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-[#F7F4EE]/70 rounded-sm p-8 sm:p-10 border border-[#101C2C]/10 relative flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* 5 Stars Rating & Loan Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C6A56B] text-[#C6A56B]" />
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">
                    {test.loanType}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif text-base sm:text-lg text-[#101C2C] leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Author & Context Footer */}
              <div className="mt-8 pt-6 border-t border-[#101C2C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-sm font-semibold text-[#101C2C]">
                    {test.clientName}
                  </h3>
                  <p className="text-xs text-[#565D66]">
                    {test.clientLocation} · <span className="text-[#101C2C]">{test.propertyDetail}</span>
                  </p>
                </div>

                <div className="text-[11px] font-medium text-[#C6A56B] bg-[#101C2C] px-2.5 py-1 rounded-sm self-start sm:self-auto">
                  {test.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges & Membership Affirmations */}
        <div className="mt-16 p-8 bg-[#101C2C] text-[#F7F4EE] rounded-sm border border-[#C6A56B]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center lg:text-left">
            <p className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Industry Credentials & Consumer Protections
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">
              Adhering to strict fiduciary and fair lending standards.
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#F7F4EE]/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C6A56B]" />
              <div>
                <p className="font-semibold text-white">Equal Housing Lender</p>
                <p className="text-[10px] text-[#F7F4EE]/60">NMLS Registered</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C6A56B]" />
              <div>
                <p className="font-semibold text-white">MBA Member</p>
                <p className="text-[10px] text-[#F7F4EE]/60">Mortgage Bankers Assoc.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C6A56B]" />
              <div>
                <p className="font-semibold text-white">AIME Affiliate</p>
                <p className="text-[10px] text-[#F7F4EE]/60">Assoc. Independent Experts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clear social proof notice */}
        <p className="mt-6 text-center text-xs text-[#565D66] max-w-2xl mx-auto">
          *Note: Representative client scenarios reflecting typical advisory experiences. Actual loan terms, interest rates, and loan approvals are determined by individual borrower documentation, creditworthiness, and underwriting criteria.
        </p>

      </div>
    </section>
  );
};
