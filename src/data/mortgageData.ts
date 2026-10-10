import { LoanProduct, ProcessStep, Testimonial, FaqItem } from '../types';

export const OFFICER_PROFILE = {
  name: 'Julian Vance',
  title: 'Senior Mortgage Advisor',
  company: 'Vance Residential Capital & Advisory',
  nmlsId: '1948201',
  nmlsCompanyId: '293847',
  phone: '(800) 555-8290',
  directPhone: '(415) 890-3412',
  email: 'julian@vancemortgage.com',
  location: 'San Francisco, CA & Serving Clients Nationwide',
  experienceYears: 14,
  volumeFunded: '$420M+',
  clientsServed: '1,850+',
  onTimeClosingRate: '99.4%',
  equalHousingNotice: 'Equal Housing Opportunity Lender. All loans subject to underwriting and credit approval.',
  portraitUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
  officeAddress: 'One Embarcadero Center, Suite 1800, San Francisco, CA 94111',
};

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'first-time',
    title: 'First-Time Homebuyer Solutions',
    tagline: 'Accessible pathways to stepping into your first front door.',
    category: 'Home Purchase',
    minDownPayment: 'From 3% down',
    idealFor: 'Buyers purchasing their primary residence for the first time who want structured, patient guidance.',
    overview: 'Navigating your very first home purchase should be empowering, not intimidating. We combine flexible low down payment options, down payment assistance grant coordination, and clear financial education.',
    keyFeatures: [
      'As little as 3% down on conventional fixed-rate options',
      'Eligibility for down payment assistance programs and grants',
      'Gift funds allowed from family members for down payment and closing costs',
      'Complimentary personalized homebuyer readiness consultation'
    ],
    qualifications: [
      'Credit score generally 620+ for conventional, 580+ for FHA',
      'Stable 2-year employment history or recent education in the same field',
      'Primary residence occupancy only'
    ],
    considerations: 'Mortgage insurance applies if putting down less than 20%, but can be cancelled once equity reaches 20% on conventional financing.'
  },
  {
    id: 'conventional',
    title: 'Conventional Mortgages',
    tagline: 'The gold standard for flexibility, terms, and cost-efficiency.',
    category: 'Purchase & Refinance',
    minDownPayment: 'From 3% to 20%',
    idealFor: 'Borrowers with solid credit looking for competitive interest rates and customizable terms.',
    overview: 'Conventional conforming loans adhere to Fannie Mae and Freddie Mac guidelines. They offer the greatest versatility for primary residences, second homes, and investment properties with fixed or adjustable rates.',
    keyFeatures: [
      'Choice of 15, 20, or 30-year fixed terms, or 5/1, 7/1 ARMs',
      'Private Mortgage Insurance (PMI) automatically cancels at 78% LTV',
      'Available for single-family homes, townhomes, and approved condos',
      'Lower overall lifetime interest compared to government-backed products for strong credit'
    ],
    qualifications: [
      'Minimum credit score typically 620 (best rates at 740+)',
      'Debt-to-Income (DTI) ratio generally up to 45% (up to 50% with compensating factors)',
      'Loan amounts up to standard conforming limits ($766,550+ depending on county)'
    ],
    considerations: 'Stricter qualification criteria compared to FHA loans, requiring strong credit history and documented reserves.'
  },
  {
    id: 'jumbo',
    title: 'Jumbo & Luxury Portfolio Financing',
    tagline: 'Tailored financing for premium properties exceeding conforming limits.',
    category: 'High-Value Real Estate',
    minDownPayment: 'From 10% to 20%',
    idealFor: 'Buyers in high-cost metro areas, executive relocations, and luxury estate acquisitions.',
    overview: 'When a property exceeds federal conforming loan limits, jumbo financing steps in. We provide specialized manual underwriting, asset-depletion qualifications for high-net-worth clients, and bespoke rate structures.',
    keyFeatures: [
      'Financing available from $766,550 up to $5,000,000+',
      'Asset utilization / depletion underwriting available for retired or entrepreneurial buyers',
      'Interest-only payment options available for qualifying liquidity profiles',
      'Single-close construction-to-permanent jumbo options'
    ],
    qualifications: [
      'Typically 680–720+ credit score',
      '6 to 12 months of post-closing principal, interest, tax & insurance (PITI) liquid reserves',
      'Thorough asset and tax return verification'
    ],
    considerations: 'Underwriting involves rigorous scrutiny of assets and self-employment income, handled with discretion and speed.'
  },
  {
    id: 'refinance',
    title: 'Strategic Refinancing',
    tagline: 'Optimize your monthly cash flow or tap accumulated home equity.',
    category: 'Home Retention',
    minDownPayment: 'N/A (Equity based)',
    idealFor: 'Homeowners seeking a lower interest rate, shortened loan term, or cash out for renovations and debt consolidation.',
    overview: 'Your mortgage is not a static contract—it is an active financial instrument. We perform comprehensive break-even analyses to ensure refinancing delivers genuine, measurable return on investment.',
    keyFeatures: [
      'Rate-and-Term refinancing to lower monthly payments or pay off mortgage sooner',
      'Cash-Out refinancing up to 80% of current appraised property value',
      'Removal of FHA MIP or conventional PMI without selling',
      'Detailed break-even calculator showing exact timeline to recoup closing fees'
    ],
    qualifications: [
      'Current on all mortgage payments for the past 12 months',
      'Sufficient home equity based on current market valuation',
      'Income verification matching current underwriting guidelines'
    ],
    considerations: 'Closing costs apply; we carefully evaluate whether your anticipated tenure in the home warrants the transaction.'
  },
  {
    id: 'va',
    title: 'VA Military Loans',
    tagline: 'Honoring service with zero down payment and exceptional benefits.',
    category: 'Military & Veteran',
    minDownPayment: '0% Down Payment',
    idealFor: 'Active-duty service members, military veterans, and qualifying surviving spouses.',
    overview: 'One of the most valuable benefits earned through military service. Backed by the Department of Veterans Affairs, this program offers 100% financing, competitive interest rates, and no monthly mortgage insurance.',
    keyFeatures: [
      'Zero down payment required up to qualifying limits',
      'No monthly Private Mortgage Insurance (PMI), saving hundreds each month',
      'Competitive interest rates typically lower than conventional financing',
      'Limits on allowable closing fees charged to the veteran'
    ],
    qualifications: [
      'Valid Certificate of Eligibility (COE) — we retrieve this on your behalf',
      'Qualifying military service record (active duty, reserves, or veteran status)',
      'Primary residence purchase only'
    ],
    considerations: 'One-time VA Funding Fee applies (often rolled into loan balance), waived for veterans with service-connected disabilities.'
  },
  {
    id: 'fha',
    title: 'FHA Government-Insured Loans',
    tagline: 'Leniency for developing credit and modest savings.',
    category: 'Government Insured',
    minDownPayment: '3.5% down',
    idealFor: 'Borrowers with less-than-perfect credit scores or limited down payment reserves.',
    overview: 'Insured by the Federal Housing Administration, FHA loans provide an accessible entryway to homeownership when traditional conventional criteria might feel slightly out of reach.',
    keyFeatures: [
      'Down payment as low as 3.5% with credit scores as low as 580',
      'Higher debt-to-income allowances compared to standard conventional loans',
      'More forgiving guidelines regarding past credit events or medical debt',
      'Assumable loan options if selling in a high-interest environment'
    ],
    qualifications: [
      'Minimum 580 credit score for 3.5% down (500–579 with 10% down)',
      'Property must meet HUD safety, soundness, and structural security guidelines',
      'Primary residence occupancy required'
    ],
    considerations: 'Requires upfront and annual Mortgage Insurance Premiums (MIP) that generally remain for the life of the loan.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Start With a Conversation',
    subtitle: 'Human listening, zero pressure.',
    description: 'We begin with an unhurried 15-to-30 minute dialogue about your long-term goals, financial rhythm, and comfort zone—not just numbers on a screen.',
    timeline: 'Day 1 · 20–30 Minutes',
    milestones: [
      'Clarify short- and long-term homeownership vision',
      'Discuss comfortable monthly budget thresholds',
      'Review credit foundation and down payment horizons'
    ]
  },
  {
    stepNumber: '02',
    title: 'Explore Your Options',
    subtitle: 'Clear comparisons, no jargon.',
    description: 'I build a personalized Mortgage Strategy Blueprint comparing 2–3 loan programs side-by-side, detailing your exact monthly breakdown and total cost over time.',
    timeline: 'Days 2–3 · Collaborative Review',
    milestones: [
      'Side-by-side loan scenario matrix',
      'Transparent breakdown of rates, fees, and closing costs',
      'Pre-approval letter issued to empower your purchase offer'
    ]
  },
  {
    stepNumber: '03',
    title: 'Navigate Your Application',
    subtitle: 'Proactive momentum & weekly updates.',
    description: 'Once under contract or refinancing, my dedicated advisory team gathers documentation through a secure, bank-level portal. You receive Tuesday updates without having to ask.',
    timeline: 'Days 4–21 · Streamlined Underwriting',
    milestones: [
      'Simple, paperless document upload portal',
      'Strategic interest rate lock consultation',
      'Proactive appraisal and underwriting condition clearance'
    ]
  },
  {
    stepNumber: '04',
    title: 'Move Toward Homeownership',
    subtitle: 'Confident closing & lifelong partnership.',
    description: 'We review your Closing Disclosure line by line before settlement so there are never surprises at the closing table. Then, you receive the keys to your next chapter.',
    timeline: 'Final Week · Keys in Hand',
    milestones: [
      'Clear-to-Close issued with verified wire instructions',
      'Pre-closing walkthrough review and final figures audit',
      'Annual mortgage review and rate check-ins for life'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Julian took what felt like an overwhelmingly complex process and made it profoundly calm. As self-employed architects, our tax returns were unconventional. He structured our loan with precision and closed four days ahead of schedule.',
    clientName: 'Elena & Marcus Vance-Reyes',
    clientLocation: 'Oakland, CA',
    loanType: 'Jumbo Portfolio Loan',
    propertyDetail: 'Mid-Century Architectural Home · $1.42M',
    highlight: 'Closed 4 days ahead of schedule'
  },
  {
    id: 'test-2',
    quote: 'We had spoken with two large retail banks who treated us like ticket numbers and gave vague answers. Julian sat down with us on Zoom, explained how 3% down conventional worked for first-time buyers, and helped us win in a multi-offer situation.',
    clientName: 'David Chen & Priya Patel',
    clientLocation: 'Austin, TX',
    loanType: 'First-Time Buyer Conventional',
    propertyDetail: 'Single Family Home · $540,000',
    highlight: 'Competitive offer letter won the home'
  },
  {
    id: 'test-3',
    quote: 'Navigating the VA loan with previous lenders had been frustrating because of misunderstandings about the funding fee. Julian knew the VA guidelines inside and out. Zero down, no PMI, and total respect for our service.',
    clientName: 'Captain Thomas M. & Sarah Miller',
    clientLocation: 'Colorado Springs, CO',
    loanType: 'VA Military Loan',
    propertyDetail: 'Suburban Craftsman · $615,000',
    highlight: '$0 down payment with zero monthly PMI'
  },
  {
    id: 'test-4',
    quote: 'When interest rates shifted, Julian did not try to sell me a quick refi. He showed me a break-even chart that proved waiting three months was smarter financially. That integrity is why I refer every friend and colleague to him.',
    clientName: 'Dr. Arthur Sterling',
    clientLocation: 'Seattle, WA',
    loanType: 'Rate-and-Term Refinance',
    propertyDetail: 'Urban Brownstone · $980,000',
    highlight: 'Saved $640/month with zero upfront surprises'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is the real difference between Pre-Qualification and Pre-Approval?',
    answer: 'A pre-qualification is an informal estimate based on self-reported financial information with no documentation verified. A pre-approval from Julian Vance involves reviewing your actual tax returns, W-2s, bank statements, and credit report. Sellers and real estate agents treat our verified pre-approval like cash because the underwriting foundation is already established.'
  },
  {
    id: 'faq-2',
    category: 'First-Time',
    question: 'Do I really need 20% down to buy a home in today’s market?',
    answer: 'No. The 20% down myth is one of the most common barriers for buyers. Conventional loans allow down payments as low as 3% for first-time buyers, and FHA loans require 3.5%. VA loans for eligible military veterans require 0% down. While putting 20% down avoids Private Mortgage Insurance (PMI), many clients find that buying sooner with 5% to 10% down and building equity outperforms waiting years to save 20%.'
  },
  {
    id: 'faq-3',
    category: 'Credit & Rates',
    question: 'When should I lock in my mortgage interest rate?',
    answer: 'Once you are under contract on a property and have an agreed closing date, we can lock your interest rate anytime during the loan process. We monitor secondary mortgage markets daily and will advise you on macroeconomic trends—whether to lock immediately or float cautiously if market conditions indicate a favorable dip.'
  },
  {
    id: 'faq-4',
    category: 'Credit & Rates',
    question: 'What credit score do I need, and how does it impact my rate?',
    answer: 'Conventional loans generally require a minimum score of 620, while FHA loans can accommodate scores down to 580. However, mortgage rates follow tiered brackets. Scores of 740 and above command the most favorable pricing. During our initial conversation, we can run a soft credit scenario without hurting your credit score to see where you stand.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'What are typical closing costs, and who pays for them?',
    answer: 'Closing costs typically total between 2% and 4% of the loan amount. They include third-party services (appraisal, title insurance, county recording fees) and prepaid escrows (property taxes and hazard insurance). In many transactions, we can structure lender credits or negotiate seller concessions to cover a portion of these costs.'
  },
  {
    id: 'faq-6',
    category: 'Refinancing',
    question: 'How do I know if refinancing my current mortgage makes sense?',
    answer: 'The primary rule of thumb is the break-even period: dividing total closing costs by your monthly savings gives the number of months required to recoup the cost. If you plan to remain in your home longer than that break-even period, refinancing can save you tens of thousands of dollars. We calculate this exact break-even timeline for every client before moving forward.'
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    title: 'Clarity Over Jargon',
    description: 'We believe you shouldn’t need a finance degree to understand your mortgage. Every fee, interest rate point, and option is translated into plain, actionable language.'
  },
  {
    title: 'Fiduciary Mindset',
    description: 'If taking a smaller loan or waiting six months serves your family better than closing today, that is the exact counsel you will receive. Integrity builds lifetime relationships.'
  },
  {
    title: 'Precision Execution',
    description: 'In competitive real estate markets, timing is everything. Our verified pre-approvals and 99.4% on-time closing record give sellers confidence in your offer.'
  }
];
