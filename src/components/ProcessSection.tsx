import React from 'react';
import { PROCESS_STEPS } from '../data/mortgageData';
import { MessageSquare, Layers, FileCheck, KeyRound, Clock, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageSquare className="w-5 h-5 text-[#C6A56B]" />;
      case 1:
        return <Layers className="w-5 h-5 text-[#C6A56B]" />;
      case 2:
        return <FileCheck className="w-5 h-5 text-[#C6A56B]" />;
      case 3:
        return <KeyRound className="w-5 h-5 text-[#C6A56B]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#C6A56B]" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-white border-t border-[#101C2C]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
            <span>The Mortgage Journey</span>
            <span className="w-6 h-[1px] bg-[#C6A56B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101C2C] font-semibold leading-tight">
            Predictable. Transparent. Dignified.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#565D66] font-light leading-relaxed">
            Financing a home doesn’t have to feel like a black box. Here is the calm, step-by-step roadmap we walk together.
          </p>
        </div>

        {/* 4-Step Timeline Layout */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-[#101C2C]/10 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="bg-[#F7F4EE]/70 rounded-sm border border-[#101C2C]/10 p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all duration-300 relative group"
              >
                {/* Step Number & Icon Header */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-bold text-[#101C2C]/20 group-hover:text-[#C6A56B] transition-colors">
                      {step.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-white border border-[#101C2C]/10 flex items-center justify-center shadow-xs">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl font-semibold text-[#101C2C] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold mt-1">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-[#565D66] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Milestones & Expected Timeline */}
                <div className="mt-6 pt-4 border-t border-[#101C2C]/10">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#101C2C] font-medium mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>{step.timeline}</span>
                  </div>

                  <ul className="space-y-1.5">
                    {step.milestones.map((milestone, mIdx) => (
                      <li key={mIdx} className="text-[11px] text-[#565D66] flex items-start gap-1.5">
                        <span className="text-[#C6A56B] mt-0.5">·</span>
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance Callout */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#565D66] max-w-xl mx-auto">
            *Timelines are typical estimates based on borrower responsiveness and third-party appraisal schedules. All loan applications are subject to final underwriting and verification.
          </p>
          <div className="mt-6">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#101C2C] text-[#F7F4EE] rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#1A2B42] transition-colors cursor-pointer"
            >
              Start Step 01 With Julian
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
