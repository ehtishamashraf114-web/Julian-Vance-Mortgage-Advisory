import React, { useState } from 'react';
import { LOAN_PRODUCTS } from '../data/mortgageData';
import { LoanProduct } from '../types';
import { LoanModal } from './LoanModal';
import { ArrowRight, Check, Compass, Sparkles } from 'lucide-react';

interface LoanSolutionsProps {
  onSelectLoanForInquiry: (loanId: string) => void;
  onOpenQuiz: () => void;
}

export const LoanSolutions: React.FC<LoanSolutionsProps> = ({ 
  onSelectLoanForInquiry, 
  onOpenQuiz 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null);

  return (
    <section id="loan-programs" className="py-24 bg-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
              <span className="w-8 h-[1px] bg-[#C6A56B]" />
              <span>Financing Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101C2C] font-semibold leading-tight">
              Financing Programs Built for Real Life.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#565D66] font-light">
              No one-size-fits-all loans. Explore competitive fixed, adjustable, and government-backed structures tailored to your capital strategy.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="self-start md:self-auto inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-white border border-[#C6A56B] text-[#101C2C] text-xs uppercase tracking-wider font-semibold hover:bg-[#101C2C] hover:text-[#F7F4EE] hover:border-[#101C2C] transition-all shadow-xs cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-[#C6A56B] group-hover:rotate-45 transition-transform" />
            <span>Loan Program Matcher</span>
          </button>
        </div>

        {/* 6 Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOAN_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-[#101C2C]/10 p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#C6A56B]/60 transition-all duration-300 group relative"
            >
              {/* Subtle top gold accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6A56B] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Unboxed Metadata */}
                <div className="flex items-center justify-between text-xs text-[#565D66] mb-4">
                  <span className="uppercase tracking-widest text-[#C6A56B] font-semibold">{product.category}</span>
                  <span className="font-medium text-[#101C2C]">{product.minDownPayment}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#101C2C] group-hover:text-[#A6864C] transition-colors leading-snug">
                  {product.title}
                </h3>

                {/* Tagline */}
                <p className="mt-2 text-xs sm:text-sm text-[#565D66] font-light leading-relaxed">
                  {product.tagline}
                </p>

                {/* Key Points Preview */}
                <div className="mt-6 pt-6 border-t border-[#101C2C]/5 space-y-2.5">
                  {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#292D32]">
                      <Check className="w-3.5 h-3.5 text-[#C6A56B] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#101C2C]/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-xs uppercase tracking-wider font-semibold text-[#101C2C] hover:text-[#C6A56B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Learn Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C6A56B] transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onSelectLoanForInquiry(product.id)}
                  className="text-xs text-[#565D66] hover:text-[#101C2C] underline underline-offset-4 cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Guidance Banner */}
        <div className="mt-16 bg-[#101C2C] text-[#F7F4EE] p-8 sm:p-10 rounded-sm border border-[#C6A56B]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              <Sparkles className="w-4 h-4 text-[#C6A56B]" />
              <span>Independent Broker Advantage</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
              Uncertain which program offers the lowest lifetime cost?
            </h3>
            <p className="text-sm text-[#F7F4EE]/70 font-light max-w-xl">
              As an independent advisor, I work across top wholesale lending institutions to find the exact rate and terms that suit your tax profile and liquidity goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#C6A56B] text-[#101C2C] text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#DFCA9D] transition-colors cursor-pointer text-center"
            >
              Take 60-Sec Quiz
            </button>
            <button
              onClick={() => onSelectLoanForInquiry('purchase')}
              className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-white/20 text-[#F7F4EE] text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-white/10 transition-colors cursor-pointer text-center"
            >
              Custom Review
            </button>
          </div>
        </div>

      </div>

      {/* Loan Detail Modal */}
      <LoanModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onApplyForLoan={(loanId) => onSelectLoanForInquiry(loanId)}
      />
    </section>
  );
};
