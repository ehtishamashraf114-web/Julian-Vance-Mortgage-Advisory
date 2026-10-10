import React from 'react';
import { OFFICER_PROFILE } from '../data/mortgageData';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenQuiz }) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B131E] text-[#F7F4EE] border-t border-[#C6A56B]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand & Advisor Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#101C2C] border border-[#C6A56B] flex items-center justify-center text-[#C6A56B] font-serif font-bold text-sm">
                JV
              </div>
              <div>
                <span className="font-serif text-lg font-semibold tracking-wide text-[#F7F4EE] block">
                  {OFFICER_PROFILE.name}
                </span>
                <span className="text-[11px] text-[#C6A56B] tracking-widest uppercase block">
                  {OFFICER_PROFILE.title}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F7F4EE]/70 font-light leading-relaxed max-w-sm">
              Providing bespoke mortgage advisory, tailored residential lending strategies, and dedicated fiduciary advocacy for borrowers nationwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C6A56B]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Equal Housing Opportunity Lender</span>
            </div>
          </div>

          {/* Direct Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F4EE]/80">
              <li>
                <button onClick={() => scrollToSection('philosophy')} className="hover:text-[#C6A56B] transition-colors cursor-pointer">
                  Advisory Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('loan-programs')} className="hover:text-[#C6A56B] transition-colors cursor-pointer">
                  Loan Solutions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process')} className="hover:text-[#C6A56B] transition-colors cursor-pointer">
                  4-Step Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('calculator')} className="hover:text-[#C6A56B] transition-colors cursor-pointer">
                  Payment Calculator
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="hover:text-[#C6A56B] transition-colors cursor-pointer">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-[#C6A56B] transition-colors cursor-pointer">
                  Mortgage FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Loan Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Loan Programs
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F4EE]/80">
              <li>First-Time Homebuyer Assistance</li>
              <li>Conventional 15 & 30-Year Fixed</li>
              <li>Jumbo & Luxury Portfolio Financing</li>
              <li>VA Military 0% Down Loans</li>
              <li>FHA Government-Insured Financing</li>
              <li>Rate-and-Term & Cash-Out Refinancing</li>
            </ul>
          </div>

          {/* Contact Details & Headquarters (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Advisory Desk
            </h4>
            <div className="space-y-2 text-xs text-[#F7F4EE]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C6A56B] shrink-0 mt-0.5" />
                <span>{OFFICER_PROFILE.officeAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                <a href={`tel:${OFFICER_PROFILE.phone}`} className="hover:text-[#C6A56B]">
                  Direct: {OFFICER_PROFILE.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                <a href={`mailto:${OFFICER_PROFILE.email}`} className="hover:text-[#C6A56B]">
                  {OFFICER_PROFILE.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-4 bg-[#C6A56B] text-[#101C2C] text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#DFCA9D] transition-colors text-center cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

        </div>

        {/* NMLS & Mandatory Compliance Disclosures */}
        <div className="pt-10 space-y-4 text-[11px] text-[#F7F4EE]/60 leading-relaxed font-light">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">NMLS Individual ID #{OFFICER_PROFILE.nmlsId}</span>
              <span>·</span>
              <span>Company NMLS #{OFFICER_PROFILE.nmlsCompanyId}</span>
              <span>·</span>
              <a
                href="https://www.nmlsconsumeraccess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C6A56B] hover:underline inline-flex items-center gap-1"
              >
                <span>NMLS Consumer Access</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#C6A56B] font-serif uppercase tracking-widest text-[10px]">
                Licensed in CA, TX, CO, WA, NY, FL & Nationwide
              </span>
            </div>
          </div>

          <p>
            <strong>Regulatory Disclosure:</strong> Julian Vance is a licensed mortgage loan originator. This website is an advertisement and does not constitute an offer or commitment to lend. All loan programs, interest rates, terms, and conditions are subject to change without notice and are dependent upon applicant's credit score, loan-to-value ratio, financial qualifications, property type, and final underwriting approval.
          </p>

          <p>
            <strong>Equal Housing Opportunity:</strong> We conduct business in accordance with the Federal Fair Housing Law and the Equal Credit Opportunity Act. We do not discriminate on the basis of race, color, religion, national origin, sex, handicap, familial status, or marital status.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-[10px]">
            <p>© {currentYear} {OFFICER_PROFILE.company}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Advisory</span>
              <span>·</span>
              <span>Electronic Disclosures Agreement</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
