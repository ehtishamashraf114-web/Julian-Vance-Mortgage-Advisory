export type LoanType = 
  | 'first-time'
  | 'conventional'
  | 'fha'
  | 'va'
  | 'refinance'
  | 'jumbo';

export interface LoanProduct {
  id: LoanType;
  title: string;
  tagline: string;
  category: string;
  minDownPayment: string;
  idealFor: string;
  overview: string;
  keyFeatures: string[];
  qualifications: string[];
  considerations: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  timeline: string;
  milestones: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientLocation: string;
  loanType: string;
  propertyDetail: string;
  highlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'First-Time' | 'Refinancing' | 'Credit & Rates';
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  loanGoal: 'purchase' | 'refinance' | 'pre-approval' | 'equity';
  timeframe: 'immediately' | '1-3-months' | '3-6-months' | 'just-exploring';
  estimatedPrice: string;
  contactPreference: 'phone' | 'video' | 'email';
  preferredDate?: string;
  preferredTimeSlot?: string;
  message: string;
  consent: boolean;
}

export interface CalculatorState {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  monthlyHoa: number;
  includePmi: boolean;
}

export interface CalculationResult {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
}
