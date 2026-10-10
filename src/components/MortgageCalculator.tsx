import React, { useState, useMemo } from 'react';
import { CalculatorState } from '../types';
import { calculateMortgage, generateAmortizationSchedule, formatCurrency } from '../utils/calculator';
import { 
  Calculator, 
  HelpCircle, 
  Printer, 
  ArrowRight, 
  RotateCcw, 
  ShieldAlert, 
  TrendingDown, 
  Table 
} from 'lucide-react';

interface MortgageCalculatorProps {
  onApplyScenario: (homePrice: number, loanAmount: number, monthlyPayment: number) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onApplyScenario }) => {
  const [homePrice, setHomePrice] = useState<number>(650000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.625);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(7800); // ~1.2%
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1800);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(0);
  const [includePmi, setIncludePmi] = useState<boolean>(true);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Synchronized calculation state
  const calcState: CalculatorState = useMemo(() => ({
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    monthlyHoa,
    includePmi,
  }), [homePrice, downPaymentPercent, interestRate, loanTermYears, propertyTaxAnnual, homeInsuranceAnnual, monthlyHoa, includePmi]);

  const results = useMemo(() => calculateMortgage(calcState), [calcState]);

  // Amortization schedule
  const amortization = useMemo(() => {
    return generateAmortizationSchedule(results.loanAmount, interestRate, loanTermYears);
  }, [results.loanAmount, interestRate, loanTermYears]);

  // Handlers for down payment sync
  const handleDownPaymentPercentChange = (val: number) => {
    const pct = Math.min(100, Math.max(0, val));
    setDownPaymentPercent(pct);
  };

  const handleDownPaymentAmountChange = (amt: number) => {
    if (homePrice <= 0) return;
    const clampedAmt = Math.min(homePrice, Math.max(0, amt));
    const calculatedPct = Math.round((clampedAmt / homePrice) * 100);
    setDownPaymentPercent(calculatedPct);
  };

  // Reset to default
  const handleReset = () => {
    setHomePrice(650000);
    setDownPaymentPercent(20);
    setInterestRate(6.625);
    setLoanTermYears(30);
    setPropertyTaxAnnual(7800);
    setHomeInsuranceAnnual(1800);
    setMonthlyHoa(0);
    setIncludePmi(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Percentages for breakdown bar
  const total = results.totalMonthlyPayment || 1;
  const piPct = Math.round((results.monthlyPrincipalInterest / total) * 100);
  const taxPct = Math.round((results.monthlyPropertyTax / total) * 100);
  const insPct = Math.round((results.monthlyInsurance / total) * 100);
  const pmiPct = Math.round((results.monthlyPmi / total) * 100);
  const hoaPct = Math.round((results.monthlyHoa / total) * 100);

  return (
    <section id="calculator" className="py-24 bg-[#F7F4EE] relative border-t border-[#101C2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
            <span className="w-8 h-[1px] bg-[#C6A56B]" />
            <span>Interactive Financial Planning</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101C2C] font-semibold leading-tight">
            Personalized Mortgage Payment Estimator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#565D66] font-light leading-relaxed">
            Test scenarios in real time. We calculate principal, interest, taxes, and insurance so you can see your complete monthly investment upfront.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-[#101C2C]/10 shadow-sm space-y-6">
            
            {/* Header toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#101C2C]/10 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#101C2C] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#C6A56B]" />
                Loan Parameters
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[#565D66] hover:text-[#101C2C] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Home Price Input & Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="home-price" className="text-xs uppercase tracking-wider font-semibold text-[#101C2C]">
                  Target Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">$</span>
                  <input
                    id="home-price"
                    type="number"
                    min="50000"
                    max="5000000"
                    step="5000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="pl-6 pr-3 py-1.5 text-right font-serif text-base font-semibold border border-[#101C2C]/20 rounded-sm w-36 focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>
              </div>
              <input
                type="range"
                min="100000"
                max="2500000"
                step="10000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full accent-[#101C2C] h-1.5 bg-[#F7F4EE] rounded-sm cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#565D66] mt-1">
                <span>$100,000</span>
                <span>$1,250,000</span>
                <span>$2,500,000+</span>
              </div>
            </div>

            {/* Down Payment ($ and %) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  <label htmlFor="down-payment-amt" className="text-xs uppercase tracking-wider font-semibold text-[#101C2C]">
                    Down Payment
                  </label>
                  <span className="text-[11px] text-[#565D66]">
                    ({formatCurrency(results.downPaymentAmount)})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">$</span>
                    <input
                      id="down-payment-amt"
                      type="number"
                      min="0"
                      max={homePrice}
                      step="1000"
                      value={results.downPaymentAmount}
                      onChange={(e) => handleDownPaymentAmountChange(Number(e.target.value))}
                      className="pl-6 pr-2 py-1.5 text-right font-serif text-sm border border-[#101C2C]/20 rounded-sm w-28 focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={downPaymentPercent}
                      onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                      className="pl-2 pr-6 py-1.5 text-right font-serif text-sm border border-[#101C2C]/20 rounded-sm w-16 focus:outline-none focus:border-[#C6A56B]"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">%</span>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={downPaymentPercent}
                onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                className="w-full accent-[#101C2C] h-1.5 bg-[#F7F4EE] rounded-sm cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#565D66] mt-1">
                <span>0% (VA/Gov)</span>
                <span>3.5% (FHA)</span>
                <span>5%</span>
                <span>10%</span>
                <span>20% (No PMI)</span>
              </div>
            </div>

            {/* Loan Term Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#101C2C] mb-2">
                Loan Term
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[30, 20, 15].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermYears(term)}
                    className={`py-2.5 px-3 rounded-sm text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                      loanTermYears === term
                        ? 'bg-[#101C2C] text-[#F7F4EE] border-[#101C2C] shadow-xs'
                        : 'bg-white text-[#565D66] border-[#101C2C]/20 hover:border-[#101C2C]'
                    }`}
                  >
                    {term} Years Fixed
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="interest-rate-input" className="text-xs uppercase tracking-wider font-semibold text-[#101C2C]">
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    id="interest-rate-input"
                    type="number"
                    min="2.5"
                    max="15.0"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="pl-3 pr-6 py-1.5 text-right font-serif text-base font-semibold border border-[#101C2C]/20 rounded-sm w-24 focus:outline-none focus:border-[#C6A56B]"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">%</span>
                </div>
              </div>
              <input
                type="range"
                min="3.5"
                max="10.0"
                step="0.125"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#C6A56B] h-1.5 bg-[#F7F4EE] rounded-sm cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#565D66] mt-1">
                <span>3.5%</span>
                <span>6.5%</span>
                <span>10.0%</span>
              </div>
            </div>

            {/* Taxes, Insurance, and HOA expandable inputs */}
            <div className="pt-4 border-t border-[#101C2C]/10 space-y-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#101C2C] block">
                Taxes, Insurance & Dues (Estimated)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="property-tax-input" className="block text-[11px] text-[#565D66] mb-1">
                    Annual Property Tax
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">$</span>
                    <input
                      id="property-tax-input"
                      type="number"
                      min="0"
                      step="100"
                      value={propertyTaxAnnual}
                      onChange={(e) => setPropertyTaxAnnual(Number(e.target.value))}
                      className="w-full pl-5 pr-2 py-1.5 text-sm font-medium border border-[#101C2C]/20 rounded-sm focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>
                  <span className="text-[10px] text-[#565D66] mt-0.5 block">
                    {formatCurrency(results.monthlyPropertyTax)}/mo
                  </span>
                </div>

                <div>
                  <label htmlFor="home-insurance-input" className="block text-[11px] text-[#565D66] mb-1">
                    Annual Home Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">$</span>
                    <input
                      id="home-insurance-input"
                      type="number"
                      min="0"
                      step="50"
                      value={homeInsuranceAnnual}
                      onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value))}
                      className="w-full pl-5 pr-2 py-1.5 text-sm font-medium border border-[#101C2C]/20 rounded-sm focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>
                  <span className="text-[10px] text-[#565D66] mt-0.5 block">
                    {formatCurrency(results.monthlyInsurance)}/mo
                  </span>
                </div>

                <div>
                  <label htmlFor="monthly-hoa-input" className="block text-[11px] text-[#565D66] mb-1">
                    Monthly HOA Dues
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#565D66]">$</span>
                    <input
                      id="monthly-hoa-input"
                      type="number"
                      min="0"
                      step="25"
                      value={monthlyHoa}
                      onChange={(e) => setMonthlyHoa(Number(e.target.value))}
                      className="w-full pl-5 pr-2 py-1.5 text-sm font-medium border border-[#101C2C]/20 rounded-sm focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>
                  <span className="text-[10px] text-[#565D66] mt-0.5 block">
                    Optional condo/community
                  </span>
                </div>
              </div>

              {/* PMI Checkbox if down payment < 20% */}
              {downPaymentPercent < 20 && (
                <div className="flex items-center gap-2 pt-2 text-xs text-[#565D66]">
                  <input
                    type="checkbox"
                    id="pmi-check"
                    checked={includePmi}
                    onChange={(e) => setIncludePmi(e.target.checked)}
                    className="accent-[#101C2C] rounded-sm cursor-pointer"
                  />
                  <label htmlFor="pmi-check" className="cursor-pointer">
                    Estimate Private Mortgage Insurance (PMI) until 20% equity is reached (~{formatCurrency(results.monthlyPmi)}/mo)
                  </label>
                </div>
              )}
            </div>

          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Payment Summary Box */}
            <div className="bg-[#101C2C] text-[#F7F4EE] p-6 sm:p-8 rounded-sm shadow-xl border border-[#C6A56B]/30 relative overflow-hidden">
              <div className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold mb-2">
                Estimated Monthly Payment
              </div>

              {/* Big payment number */}
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#F7F4EE] tracking-tight">
                {formatCurrency(results.totalMonthlyPayment)}
                <span className="text-xs font-sans font-normal text-[#F7F4EE]/70 ml-2">/ month</span>
              </div>

              <div className="mt-4 text-xs text-[#F7F4EE]/70 border-t border-white/10 pt-3 flex items-center justify-between">
                <span>Calculated Loan Amount:</span>
                <span className="font-serif text-sm font-semibold text-[#C6A56B]">{formatCurrency(results.loanAmount)}</span>
              </div>

              {/* Proportional visual breakdown bar */}
              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-wider text-[#F7F4EE]/60 mb-2 flex justify-between">
                  <span>Payment Breakdown</span>
                  <span>100% Total</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/10">
                  <div style={{ width: `${piPct}%` }} className="bg-[#C6A56B]" title={`Principal & Interest: ${piPct}%`} />
                  <div style={{ width: `${taxPct}%` }} className="bg-[#DFCA9D]" title={`Property Tax: ${taxPct}%`} />
                  <div style={{ width: `${insPct}%` }} className="bg-sky-400" title={`Home Insurance: ${insPct}%`} />
                  {results.monthlyPmi > 0 && (
                    <div style={{ width: `${pmiPct}%` }} className="bg-rose-400" title={`PMI: ${pmiPct}%`} />
                  )}
                  {results.monthlyHoa > 0 && (
                    <div style={{ width: `${hoaPct}%` }} className="bg-emerald-400" title={`HOA: ${hoaPct}%`} />
                  )}
                </div>
              </div>

              {/* Detailed Breakdown List */}
              <div className="mt-6 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#F7F4EE]/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C6A56B]" />
                    Principal & Interest
                  </span>
                  <span className="font-semibold">{formatCurrency(results.monthlyPrincipalInterest)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#F7F4EE]/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DFCA9D]" />
                    Property Taxes
                  </span>
                  <span className="font-semibold">{formatCurrency(results.monthlyPropertyTax)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#F7F4EE]/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    Homeowners Insurance
                  </span>
                  <span className="font-semibold">{formatCurrency(results.monthlyInsurance)}</span>
                </div>

                {results.monthlyPmi > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#F7F4EE]/80">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      Mortgage Insurance (PMI)
                    </span>
                    <span className="font-semibold">{formatCurrency(results.monthlyPmi)}</span>
                  </div>
                )}

                {results.monthlyHoa > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#F7F4EE]/80">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      HOA Dues
                    </span>
                    <span className="font-semibold">{formatCurrency(results.monthlyHoa)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => onApplyScenario(homePrice, results.loanAmount, results.totalMonthlyPayment)}
                  className="w-full bg-[#C6A56B] text-[#101C2C] py-3.5 px-4 rounded-sm text-xs uppercase tracking-wider font-bold hover:bg-[#DFCA9D] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Apply With This Calculation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="flex-1 py-2 text-[11px] text-[#F7F4EE]/80 hover:text-white border border-white/20 rounded-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Table className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>{showAmortization ? 'Hide Amortization' : 'Amortization Schedule'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2 text-[#F7F4EE]/80 hover:text-white border border-white/20 rounded-sm hover:bg-white/5 transition-colors cursor-pointer"
                    title="Print calculation summary"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Lifetime Cost Summary */}
            <div className="bg-white p-5 rounded-sm border border-[#101C2C]/10 text-xs space-y-2">
              <div className="flex justify-between text-[#565D66]">
                <span>Total Principal Paid:</span>
                <span className="font-semibold text-[#101C2C]">{formatCurrency(results.loanAmount)}</span>
              </div>
              <div className="flex justify-between text-[#565D66]">
                <span>Total Lifetime Interest:</span>
                <span className="font-semibold text-[#101C2C]">{formatCurrency(results.totalInterestPaid)}</span>
              </div>
              <div className="flex justify-between text-[#565D66] pt-2 border-t border-[#101C2C]/5">
                <span className="font-medium text-[#101C2C]">Total Estimated Loan Cost:</span>
                <span className="font-serif font-bold text-[#101C2C]">{formatCurrency(results.totalCostOfLoan)}</span>
              </div>
            </div>

            {/* Compliance Disclaimer */}
            <div className="flex items-start gap-2.5 p-3.5 bg-[#F7F4EE] border border-[#101C2C]/10 rounded-sm text-[11px] text-[#565D66] leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
              <span>
                <strong>Important Disclosure:</strong> Figures are for informational guidance and planning only. Actual monthly payments, interest rates, points, and mortgage insurance fees will be determined upon formal application, credit verification, and property appraisal.
              </span>
            </div>

          </div>

        </div>

        {/* Amortization Schedule Drawer/Table if toggled */}
        {showAmortization && (
          <div className="mt-12 bg-white p-6 sm:p-8 rounded-sm border border-[#101C2C]/15 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#101C2C]/10">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#101C2C]">
                  Annual Amortization Schedule ({loanTermYears}-Year Fixed)
                </h3>
                <p className="text-xs text-[#565D66] mt-1">
                  Track how your balance reduces and equity accumulates year by year.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs text-[#101C2C] border border-[#101C2C]/20 px-3 py-1.5 rounded-sm hover:bg-[#F7F4EE] cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Print Schedule</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#101C2C] text-[#F7F4EE] uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Year</th>
                    <th className="py-2.5 px-4 font-semibold">Starting Balance</th>
                    <th className="py-2.5 px-4 font-semibold">Principal Paid</th>
                    <th className="py-2.5 px-4 font-semibold">Interest Paid</th>
                    <th className="py-2.5 px-4 font-semibold">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#101C2C]/10">
                  {amortization.map((item) => (
                    <tr key={item.year} className="hover:bg-[#F7F4EE]/50 transition-colors">
                      <td className="py-2 px-4 font-semibold text-[#101C2C]">Year {item.year}</td>
                      <td className="py-2 px-4 text-[#565D66]">{formatCurrency(item.startingBalance)}</td>
                      <td className="py-2 px-4 font-medium text-emerald-700">+{formatCurrency(item.principalPaid)}</td>
                      <td className="py-2 px-4 text-[#565D66]">{formatCurrency(item.interestPaid)}</td>
                      <td className="py-2 px-4 font-semibold text-[#101C2C]">{formatCurrency(item.endingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
