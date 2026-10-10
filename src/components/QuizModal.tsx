import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { LOAN_PRODUCTS } from '../data/mortgageData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLoanForInquiry: (loanId: string, prefillNotes?: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSelectLoanForInquiry }) => {
  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<string>('first-time');
  const [downPayment, setDownPayment] = useState<string>('low');
  const [credit, setCredit] = useState<string>('excellent');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setGoal('first-time');
    setDownPayment('low');
    setCredit('excellent');
  };

  // Determine recommendation
  let recommendedId = 'conventional';
  let reason = '';

  if (goal === 'veteran') {
    recommendedId = 'va';
    reason = 'As an eligible military veteran or active-duty service member, the VA Loan offers 0% down payment with zero monthly mortgage insurance (PMI).';
  } else if (goal === 'refinance') {
    recommendedId = 'refinance';
    reason = 'A strategic rate-and-term or cash-out refinance optimizes your existing equity and monthly cash flow.';
  } else if (goal === 'jumbo' || downPayment === 'high-jumbo') {
    recommendedId = 'jumbo';
    reason = 'For luxury purchases exceeding county conforming limits ($766,550+), a specialized jumbo portfolio structure provides bespoke underwriting.';
  } else if (credit === 'developing' || downPayment === 'fha-low') {
    recommendedId = 'fha';
    reason = 'FHA financing offers forgiving credit thresholds and a low 3.5% down payment backed by the Federal Housing Administration.';
  } else if (goal === 'first-time') {
    recommendedId = 'first-time';
    reason = 'First-Time Homebuyer programs allow down payments as low as 3%, with access to down payment assistance and flexible gift funds.';
  } else {
    recommendedId = 'conventional';
    reason = 'A Conventional Mortgage provides the lowest lifetime cost, cancelable PMI, and standard conforming rates.';
  }

  const recommendedProduct = LOAN_PRODUCTS.find((p) => p.id === recommendedId) || LOAN_PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative bg-white rounded-sm shadow-2xl max-w-xl w-full border border-[#101C2C]/15 z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#101C2C] text-[#F7F4EE] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-[11px] uppercase tracking-widest text-[#C6A56B] font-semibold mb-1">
            Interactive Loan Discovery
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#F7F4EE]">
            {step < 4 ? `Question ${step} of 3` : 'Your Personalized Program Match'}
          </h3>
          <p className="text-xs text-[#F7F4EE]/70 mt-1 font-light">
            {step < 4 ? 'Answer 3 brief questions to view tailored loan pathways.' : 'Based on your specific financing priorities.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#101C2C]">
                What is your primary financing goal?
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: 'first-time', label: 'Purchasing my first primary home' },
                  { id: 'move-up', label: 'Moving / purchasing a larger next home' },
                  { id: 'veteran', label: 'Military veteran or active service homebuyer' },
                  { id: 'refinance', label: 'Refinancing an existing mortgage' },
                  { id: 'jumbo', label: 'Purchasing a luxury home over $766,000+' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setGoal(opt.id);
                      setStep(2);
                    }}
                    className={`w-full text-left p-3.5 rounded-sm border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      goal === opt.id
                        ? 'border-[#C6A56B] bg-[#F7F4EE] text-[#101C2C]'
                        : 'border-[#101C2C]/10 hover:border-[#101C2C]/30 text-[#565D66]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#101C2C]">
                What down payment range are you contemplating?
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: 'zero', label: '0% Down (Military / VA eligible)' },
                  { id: 'low', label: '3% to 5% Down (Keep cash reserves)' },
                  { id: 'fha-low', label: '3.5% Down (Modest savings)' },
                  { id: 'moderate', label: '10% to 19% Down' },
                  { id: 'twenty', label: '20% or more (Eliminate mortgage insurance)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setDownPayment(opt.id);
                      setStep(3);
                    }}
                    className={`w-full text-left p-3.5 rounded-sm border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      downPayment === opt.id
                        ? 'border-[#C6A56B] bg-[#F7F4EE] text-[#101C2C]'
                        : 'border-[#101C2C]/10 hover:border-[#101C2C]/30 text-[#565D66]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#101C2C]">
                What best describes your credit profile?
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: 'excellent', label: 'Excellent (740+) — Prime interest rates' },
                  { id: 'good', label: 'Good (680 – 739) — Competitive standard terms' },
                  { id: 'developing', label: 'Fair / Developing (580 – 679) — Flexible criteria' },
                  { id: 'self-employed', label: 'Self-Employed / Complex business tax filings' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setCredit(opt.id);
                      setStep(4);
                    }}
                    className={`w-full text-left p-3.5 rounded-sm border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      credit === opt.id
                        ? 'border-[#C6A56B] bg-[#F7F4EE] text-[#101C2C]'
                        : 'border-[#101C2C]/10 hover:border-[#101C2C]/30 text-[#565D66]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="p-4 bg-[#F7F4EE] rounded-sm border-l-4 border-[#C6A56B]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C6A56B] font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A56B]" />
                  <span>Recommended Path</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#101C2C]">
                  {recommendedProduct.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#292D32] leading-relaxed">
                  {reason}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#565D66]">
                  Typical Features for this Profile:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#292D32]">
                  <div className="p-2.5 bg-white border border-[#101C2C]/10 rounded-sm">
                    <span className="text-[#565D66] block">Down Payment</span>
                    <span className="font-semibold text-[#101C2C]">{recommendedProduct.minDownPayment}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#101C2C]/10 rounded-sm">
                    <span className="text-[#565D66] block">Category</span>
                    <span className="font-semibold text-[#101C2C]">{recommendedProduct.category}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#101C2C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#565D66] hover:text-[#101C2C] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSelectLoanForInquiry(
                      recommendedProduct.id, 
                      `Quiz result: ${recommendedProduct.title} (Goal: ${goal}, Down: ${downPayment}, Credit: ${credit})`
                    );
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#101C2C] text-[#F7F4EE] text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#1A2B42] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply With This Program</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C6A56B]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls when in question steps */}
        {step < 4 && (
          <div className="p-4 bg-[#F7F4EE] border-t border-[#101C2C]/10 flex items-center justify-between text-xs">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-[#565D66] hover:text-[#101C2C] font-medium cursor-pointer"
              >
                ← Back
              </button>
            ) : <span />}
            <span className="text-[#565D66]">Step {step} of 3</span>
          </div>
        )}
      </div>
    </div>
  );
};
