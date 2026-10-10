import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalIntro } from './components/PersonalIntro';
import { LoanSolutions } from './components/LoanSolutions';
import { ProcessSection } from './components/ProcessSection';
import { MortgageCalculator } from './components/MortgageCalculator';
import { SocialProof } from './components/SocialProof';
import { ConsultationSection } from './components/ConsultationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuizModal } from './components/QuizModal';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [prefilledGoal, setPrefilledGoal] = useState<string>('purchase');
  const [prefilledPrice, setPrefilledPrice] = useState<number | undefined>(undefined);
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');

  const scrollToConsultation = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLoanPrograms = () => {
    const el = document.getElementById('loan-programs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLoanForInquiry = (loanId: string, notes?: string) => {
    let goal = 'purchase';
    if (loanId === 'refinance') goal = 'refinance';
    else if (loanId === 'first-time') goal = 'purchase';
    else if (loanId === 'va') goal = 'purchase';
    else if (loanId === 'jumbo') goal = 'purchase';

    setPrefilledGoal(goal);
    if (notes) {
      setPrefilledNotes(notes);
    } else {
      setPrefilledNotes(`Inquiring about: ${loanId.toUpperCase()} program details`);
    }

    scrollToConsultation();
  };

  const handleApplyScenarioFromCalc = (
    homePrice: number, 
    loanAmount: number, 
    monthlyPayment: number
  ) => {
    setPrefilledGoal('purchase');
    setPrefilledPrice(homePrice);
    setPrefilledNotes(
      `Calculator estimate: Home Price $${homePrice.toLocaleString()}, Loan Amount $${loanAmount.toLocaleString()}, Target Est. Monthly Payment $${monthlyPayment.toLocaleString()}`
    );
    scrollToConsultation();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#292D32]">
      {/* Editorial Navigation */}
      <Navbar
        onOpenConsultation={scrollToConsultation}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1">
        {/* Split-screen Editorial Hero */}
        <Hero
          onOpenConsultation={scrollToConsultation}
          onExploreOptions={scrollToLoanPrograms}
        />

        {/* Personal Introduction & Philosophy */}
        <PersonalIntro
          onOpenConsultation={scrollToConsultation}
        />

        {/* Loan Solutions & Program Portfolios */}
        <LoanSolutions
          onSelectLoanForInquiry={handleSelectLoanForInquiry}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 4-Step Mortgage Journey Timeline */}
        <ProcessSection
          onOpenConsultation={scrollToConsultation}
        />

        {/* Interactive Payment Estimator & Amortization */}
        <MortgageCalculator
          onApplyScenario={handleApplyScenarioFromCalc}
        />

        {/* Client Experiences & Social Proof */}
        <SocialProof />

        {/* Signature Consultation Booking & Calendar Scheduling */}
        <ConsultationSection
          prefilledGoal={prefilledGoal}
          prefilledPrice={prefilledPrice}
          prefilledNotes={prefilledNotes}
        />

        {/* Frequently Asked Questions */}
        <FaqSection
          onOpenConsultation={scrollToConsultation}
        />
      </main>

      {/* Disclosures & Regulatory Footer */}
      <Footer
        onOpenConsultation={scrollToConsultation}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* 60-Second Loan Matcher Quiz Dialog */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectLoanForInquiry={handleSelectLoanForInquiry}
      />
    </div>
  );
}
