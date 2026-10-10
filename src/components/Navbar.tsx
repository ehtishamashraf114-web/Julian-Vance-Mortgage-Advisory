import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ArrowRight } from 'lucide-react';
import { OFFICER_PROFILE } from '../data/mortgageData';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Loan Programs', href: '#loan-programs' },
    { label: 'The Process', href: '#process' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#101C2C]/95 backdrop-blur-md py-3.5 shadow-md border-b border-[#C6A56B]/20 text-[#F7F4EE]'
            : 'bg-transparent py-5 text-[#101C2C]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Monogram & Name */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A56B]"
            >
              <div className="w-10 h-10 rounded-sm bg-[#101C2C] border border-[#C6A56B]/60 flex items-center justify-center text-[#C6A56B] font-serif text-lg font-bold tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
                JV
              </div>
              <div>
                <span className={`block font-serif text-lg tracking-wide uppercase font-semibold transition-colors ${
                  isScrolled ? 'text-[#F7F4EE]' : 'text-[#101C2C]'
                }`}>
                  {OFFICER_PROFILE.name}
                </span>
                <span className={`block text-[11px] tracking-wider uppercase transition-colors ${
                  isScrolled ? 'text-[#C6A56B]' : 'text-[#565D66]'
                }`}>
                  Advisory · NMLS #{OFFICER_PROFILE.nmlsId}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm tracking-wide font-medium transition-colors hover:text-[#C6A56B] relative py-1 focus:outline-none cursor-pointer ${
                    isScrolled ? 'text-[#F7F4EE]/85' : 'text-[#292D32]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Quick Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={onOpenQuiz}
                className={`text-xs uppercase tracking-wider font-medium px-3.5 py-2 border rounded-sm transition-all cursor-pointer ${
                  isScrolled
                    ? 'border-[#C6A56B]/40 text-[#C6A56B] hover:bg-[#C6A56B]/10'
                    : 'border-[#101C2C]/20 text-[#101C2C] hover:border-[#101C2C] hover:bg-[#101C2C]/5'
                }`}
                title="Find your loan program match"
              >
                Loan Matcher
              </button>

              <button
                onClick={onOpenConsultation}
                className="flex items-center gap-2 bg-[#C6A56B] text-[#101C2C] px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wide hover:bg-[#DFCA9D] transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C6A56B]/50"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenConsultation}
                className="bg-[#C6A56B] text-[#101C2C] px-3 py-1.5 rounded-sm text-xs font-semibold"
              >
                Book Call
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-sm focus:outline-none ${
                  isScrolled ? 'text-[#F7F4EE]' : 'text-[#101C2C]'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#101C2C] text-[#F7F4EE] shadow-2xl p-6 flex flex-col justify-between border-l border-[#C6A56B]/30 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C6A56B]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-[#101C2C] border border-[#C6A56B] flex items-center justify-center text-[#C6A56B] font-serif text-sm font-bold">
                    JV
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold tracking-wide text-[#F7F4EE]">
                      {OFFICER_PROFILE.name}
                    </p>
                    <p className="text-[10px] text-[#C6A56B] tracking-wider uppercase">
                      NMLS #{OFFICER_PROFILE.nmlsId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#F7F4EE]/70 hover:text-[#F7F4EE]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-base font-serif tracking-wide text-[#F7F4EE]/90 hover:text-[#C6A56B] py-2 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A56B]/40" />
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuiz();
                  }}
                  className="w-full text-center py-2.5 px-4 border border-[#C6A56B]/50 text-[#C6A56B] text-xs uppercase tracking-wider rounded-sm font-medium hover:bg-[#C6A56B]/10"
                >
                  Take Loan Matcher Quiz
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C6A56B]/20 space-y-4">
              <a
                href={`tel:${OFFICER_PROFILE.phone}`}
                className="flex items-center gap-3 text-xs text-[#F7F4EE]/80 hover:text-[#C6A56B]"
              >
                <Phone className="w-4 h-4 text-[#C6A56B]" />
                <span>Direct: {OFFICER_PROFILE.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-[#C6A56B] text-[#101C2C] py-3 rounded-sm text-sm font-semibold tracking-wide hover:bg-[#DFCA9D] transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
