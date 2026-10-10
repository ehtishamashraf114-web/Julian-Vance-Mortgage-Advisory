import { CalculatorState, CalculationResult } from '../types';

export function calculateMortgage(state: CalculatorState): CalculationResult {
  const homePrice = Math.max(0, state.homePrice);
  const downPaymentPercent = Math.min(100, Math.max(0, state.downPaymentPercent));
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);

  const annualRate = Math.max(0.1, state.interestRate);
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = Math.max(12, state.loanTermYears * 12);

  // Standard amortization formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  let monthlyPrincipalInterest = 0;
  if (loanAmount > 0) {
    if (monthlyRate === 0) {
      monthlyPrincipalInterest = loanAmount / totalMonths;
    } else {
      const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyPrincipalInterest = (loanAmount * (monthlyRate * compoundFactor)) / (compoundFactor - 1);
    }
  }

  const monthlyPropertyTax = Math.max(0, state.propertyTaxAnnual) / 12;
  const monthlyInsurance = Math.max(0, state.homeInsuranceAnnual) / 12;
  const monthlyHoa = Math.max(0, state.monthlyHoa);

  // PMI calculation: If down payment is under 20% and PMI is active, typical rate is ~0.5% - 1% of loan amount annually
  let monthlyPmi = 0;
  if (state.includePmi && downPaymentPercent < 20 && loanAmount > 0) {
    const annualPmiRate = 0.0075; // 0.75% avg PMI
    monthlyPmi = (loanAmount * annualPmiRate) / 12;
  }

  const totalMonthlyPayment = 
    monthlyPrincipalInterest + 
    monthlyPropertyTax + 
    monthlyInsurance + 
    monthlyPmi + 
    monthlyHoa;

  const totalCostOfLoan = (monthlyPrincipalInterest * totalMonths) + downPaymentAmount;
  const totalInterestPaid = Math.max(0, (monthlyPrincipalInterest * totalMonths) - loanAmount);

  return {
    loanAmount: Math.round(loanAmount),
    downPaymentAmount: Math.round(downPaymentAmount),
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyInsurance: Math.round(monthlyInsurance),
    monthlyPmi: Math.round(monthlyPmi),
    monthlyHoa: Math.round(monthlyHoa),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    totalInterestPaid: Math.round(totalInterestPaid),
    totalCostOfLoan: Math.round(totalCostOfLoan)
  };
}

export interface AmortizationYear {
  year: number;
  startingBalance: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export function generateAmortizationSchedule(
  loanAmount: number,
  annualRate: number,
  termYears: number
): AmortizationYear[] {
  if (loanAmount <= 0 || termYears <= 0) return [];
  
  const monthlyRate = (annualRate / 100) / 12;
  const totalMonths = termYears * 12;
  const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyPI = (loanAmount * (monthlyRate * compoundFactor)) / (compoundFactor - 1);

  const schedule: AmortizationYear[] = [];
  let currentBalance = loanAmount;

  for (let y = 1; y <= termYears; y++) {
    const startingBal = currentBalance;
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      if (currentBalance <= 0) break;
      const monthInterest = currentBalance * monthlyRate;
      const monthPrincipal = Math.min(currentBalance, monthlyPI - monthInterest);
      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      currentBalance -= monthPrincipal;
    }

    schedule.push({
      year: y,
      startingBalance: Math.round(startingBal),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      endingBalance: Math.max(0, Math.round(currentBalance))
    });
  }

  return schedule;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function downloadCalendarEvent(
  title: string,
  description: string,
  dateStr: string,
  timeSlot: string
) {
  // Simple ICS string generation for calendar invite download
  const cleanTitle = title.replace(/\n/g, ' ');
  const cleanDesc = description.replace(/\n/g, '\\n');
  const [hourStr, minStr] = (timeSlot.includes(':') ? timeSlot.split(' ')[0].split(':') : ['10', '00']);
  let hour = parseInt(hourStr, 10);
  if (timeSlot.toLowerCase().includes('pm') && hour < 12) hour += 12;
  if (timeSlot.toLowerCase().includes('am') && hour === 12) hour = 0;

  const dateObj = new Date(dateStr || Date.now());
  dateObj.setHours(hour, parseInt(minStr || '0', 10), 0, 0);

  const startIso = dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = new Date(dateObj.getTime() + 30 * 60000);
  const endIso = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Julian Vance Mortgage Advisory//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDesc}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    'LOCATION:Zoom / Direct Phone Advisory Line',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'mortgage-strategy-consultation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
