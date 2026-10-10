import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mortgageData';
import { ChevronDown, HelpCircle, PhoneCall, ArrowUpRight } from 'lucide-react';

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const categories = ['All', 'General', 'First-Time', 'Refinancing', 'Credit & Rates'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#F7F4EE] border-t border-[#101C2C]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
            <span className="w-8 h-[1px] bg-[#C6A56B]" />
            <span>Clarity & Understanding</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101C2C] font-semibold leading-tight">
            Frequently Asked Mortgage Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#565D66] font-light leading-relaxed">
            Direct, plain-English answers to the critical financial decisions you will encounter.
          </p>
        </div>

        {/* Category Filters (Segmented interactive buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#101C2C]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#101C2C] text-[#F7F4EE] shadow-xs'
                  : 'bg-white text-[#565D66] border border-[#101C2C]/10 hover:border-[#101C2C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-sm border border-[#101C2C]/10 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#F7F4EE]/40"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-widest text-[#C6A56B] font-semibold block">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-[#101C2C]">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-1.5 rounded-full transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C6A56B]' : 'text-[#565D66]'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#565D66] font-light leading-relaxed border-t border-[#101C2C]/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Aside */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-sm border border-[#101C2C]/10 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">
              <HelpCircle className="w-4 h-4 text-[#C6A56B]" />
              <span>Have a Unique Scenario?</span>
            </div>

            <h3 className="font-serif text-xl font-semibold text-[#101C2C]">
              No two home-financing stories are identical.
            </h3>

            <p className="text-xs sm:text-sm text-[#565D66] font-light leading-relaxed">
              Whether you are self-employed with multiple K-1 entities, divorcing, receiving equity grant vesting, or relocating across states, Julian is happy to review your scenario candidly.
            </p>

            <div className="pt-4 border-t border-[#101C2C]/10 space-y-3">
              <button
                onClick={onOpenConsultation}
                className="w-full py-3 bg-[#101C2C] text-[#F7F4EE] rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#1A2B42] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ask Julian Directly</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A56B]" />
              </button>

              <p className="text-[11px] text-[#565D66] text-center">
                Average reply time is under 2 hours.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
