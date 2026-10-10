import React from 'react';
import { X, Check, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { LoanProduct } from '../types';

interface LoanModalProps {
  product: LoanProduct | null;
  onClose: () => void;
  onApplyForLoan: (loanId: string) => void;
}

export const LoanModal: React.FC<LoanModalProps> = ({ product, onClose, onApplyForLoan }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        className="relative bg-white rounded-sm shadow-2xl max-w-2xl w-full border border-[#101C2C]/15 z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loan-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#101C2C] text-[#F7F4EE] p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-sm transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A56B] font-semibold mb-2">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.minDownPayment}</span>
          </div>

          <h3 id="loan-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EE]">
            {product.title}
          </h3>
          <p className="mt-2 text-sm text-[#F7F4EE]/80 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#565D66] font-semibold mb-2">
              Program Overview
            </h4>
            <p className="text-sm text-[#292D32] leading-relaxed">
              {product.overview}
            </p>
          </div>

          {/* Who it's ideal for */}
          <div className="bg-[#F7F4EE] p-4 rounded-sm border-l-2 border-[#C6A56B]">
            <h4 className="text-xs uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
              Who This Program Best Serves
            </h4>
            <p className="text-xs sm:text-sm text-[#565D66]">
              {product.idealFor}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#565D66] font-semibold mb-3">
              Key Structural Benefits
            </h4>
            <ul className="space-y-2">
              {product.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#292D32]">
                  <Check className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Underwriting Qualifications */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#565D66] font-semibold mb-3">
              General Qualification Criteria
            </h4>
            <ul className="space-y-2">
              {product.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#565D66]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#101C2C] shrink-0 mt-1.5" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Considerations */}
          <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-sm flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Key Advisory Consideration:</span>
              <p className="mt-0.5">{product.considerations}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#F7F4EE] border-t border-[#101C2C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#565D66]">
            <ShieldCheck className="w-4 h-4 text-[#C6A56B]" />
            <span>Subject to individual credit and property approval</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#565D66] hover:text-[#101C2C] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApplyForLoan(product.id);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#101C2C] text-[#F7F4EE] px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#1A2B42] transition-colors cursor-pointer"
            >
              <span>Explore My Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A56B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
