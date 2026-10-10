import React, { useState, useEffect } from 'react';
import { OFFICER_PROFILE } from '../data/mortgageData';
import { ConsultationFormData } from '../types';
import { downloadCalendarEvent } from '../utils/calculator';
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface ConsultationSectionProps {
  prefilledGoal?: string;
  prefilledPrice?: number;
  prefilledNotes?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  prefilledGoal,
  prefilledPrice,
  prefilledNotes
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    phone: '',
    loanGoal: (prefilledGoal as any) || 'purchase',
    timeframe: 'immediately',
    estimatedPrice: prefilledPrice ? `$${prefilledPrice.toLocaleString()}` : '$650,000',
    contactPreference: 'phone',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM PT',
    message: prefilledNotes || '',
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Update formData when props change (e.g. from calculator or quiz)
  useEffect(() => {
    if (prefilledGoal) {
      setFormData((prev) => ({
        ...prev,
        loanGoal: (prefilledGoal as any) || prev.loanGoal,
      }));
    }
    if (prefilledPrice) {
      setFormData((prev) => ({
        ...prev,
        estimatedPrice: `$${prefilledPrice.toLocaleString()}`,
      }));
    }
    if (prefilledNotes) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n${prefilledNotes}` : prefilledNotes,
      }));
    }
  }, [prefilledGoal, prefilledPrice, prefilledNotes]);

  // Set default preferred date to next business day
  useEffect(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 2);
    const dateStr = nextDay.toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, preferredDate: prev.preferredDate || dateStr }));
  }, []);

  const timeSlots = [
    '09:00 AM PT',
    '10:30 AM PT',
    '01:00 PM PT',
    '03:30 PM PT',
    '05:00 PM PT'
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.contactPreference === 'phone' && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for phone consultations.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent to be contacted regarding your inquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean dispatch & store confirmation
    setTimeout(() => {
      const randomCode = `JV-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationCode(randomCode);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleDownloadIcs = () => {
    downloadCalendarEvent(
      `Mortgage Strategy Call with Julian Vance (${formData.loanGoal.toUpperCase()})`,
      `Scheduled advisory conversation with Julian Vance (NMLS #1948201) regarding your mortgage plans. Ref Code: ${confirmationCode}`,
      formData.preferredDate || new Date().toISOString().split('T')[0],
      formData.preferredTimeSlot || '10:00 AM PT'
    );
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      loanGoal: 'purchase',
      timeframe: 'immediately',
      estimatedPrice: '$650,000',
      contactPreference: 'phone',
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredTimeSlot: '10:00 AM PT',
      message: '',
      consent: true,
    });
    setErrors({});
  };

  return (
    <section id="consultation" className="py-24 bg-[#101C2C] text-[#F7F4EE] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `radial-gradient(#C6A56B 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Positioning & Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#C6A56B] mb-3">
                <span className="w-8 h-[1px] bg-[#C6A56B]" />
                <span>Begin Your Discovery</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EE] font-semibold leading-tight">
                Let’s Make Your Next Move a Confident One.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#F7F4EE]/75 font-light leading-relaxed">
                Tell me where you want to go. We’ll explore the financing options that make sense for your situation.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-[#1A2B42] border border-[#C6A56B]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C6A56B]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">Direct Advisor Line</p>
                  <a href={`tel:${OFFICER_PROFILE.directPhone}`} className="text-sm font-medium hover:text-[#C6A56B] transition-colors">
                    {OFFICER_PROFILE.directPhone}
                  </a>
                  <p className="text-[11px] text-[#F7F4EE]/60 mt-0.5">Toll-Free: {OFFICER_PROFILE.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-[#1A2B42] border border-[#C6A56B]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C6A56B]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">Confidential Email</p>
                  <a href={`mailto:${OFFICER_PROFILE.email}`} className="text-sm font-medium hover:text-[#C6A56B] transition-colors">
                    {OFFICER_PROFILE.email}
                  </a>
                  <p className="text-[11px] text-[#F7F4EE]/60 mt-0.5">Direct inbox monitored personally</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-[#1A2B42] border border-[#C6A56B]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#C6A56B]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">Response Commitment</p>
                  <p className="text-sm font-medium">Within 2 Business Hours</p>
                  <p className="text-[11px] text-[#F7F4EE]/60 mt-0.5">Weekend priority support for offers under negotiation</p>
                </div>
              </div>
            </div>

            {/* Privacy Assurance */}
            <div className="p-4 bg-[#1A2B42]/50 border border-white/10 rounded-sm text-xs text-[#F7F4EE]/70 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
              <span>
                <strong>Your privacy is protected:</strong> We never sell your personal contact information to third-party telemarketers or aggregate lead brokers.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A2B42] p-6 sm:p-10 rounded-sm border border-[#C6A56B]/30 shadow-2xl relative">
            
            {isSubmitted ? (
              /* Success State */
              <div className="py-6 space-y-6 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#C6A56B]/20 border border-[#C6A56B] text-[#C6A56B] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
                    Consultation Requested
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EE] mt-1">
                    Thank You, {formData.fullName.split(' ')[0]}
                  </h3>
                  <p className="mt-2 text-sm text-[#F7F4EE]/80 font-light max-w-md mx-auto">
                    Julian Vance has received your inquiry. A calendar confirmation has been provisioned.
                  </p>
                </div>

                {/* Reservation Summary Card */}
                <div className="bg-[#101C2C] p-5 rounded-sm border border-white/10 text-left text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#F7F4EE]/60">Reference Code:</span>
                    <span className="font-mono font-semibold text-[#C6A56B]">{confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F7F4EE]/60">Requested Date:</span>
                    <span className="font-medium text-white">{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F7F4EE]/60">Time Slot:</span>
                    <span className="font-medium text-white">{formData.preferredTimeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F7F4EE]/60">Format:</span>
                    <span className="font-medium text-white capitalize">{formData.contactPreference} Advisory Session</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F7F4EE]/60">Financing Focus:</span>
                    <span className="font-medium text-[#C6A56B] uppercase">{formData.loanGoal}</span>
                  </div>
                </div>

                {/* Helpful Prep Guide */}
                <div className="bg-[#101C2C]/50 p-4 rounded-sm border border-[#C6A56B]/20 text-left text-xs text-[#F7F4EE]/80 max-w-md mx-auto space-y-1.5">
                  <p className="font-semibold text-[#C6A56B] uppercase tracking-wider text-[10px]">
                    Helpful Checklist for our Call (Optional):
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#F7F4EE]/70">
                    <li>Target purchase location / zip codes</li>
                    <li>Estimated monthly budget comfort zone</li>
                    <li>Approximate recent gross household income</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handleDownloadIcs}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C6A56B] text-[#101C2C] text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#DFCA9D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Calendar Event (.ics)</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-5 py-3 border border-white/20 text-xs text-[#F7F4EE]/80 rounded-sm hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="border-b border-white/10 pb-4 mb-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#F7F4EE]">
                    Schedule a Conversation
                  </h3>
                  <p className="text-xs text-[#F7F4EE]/70 font-light mt-1">
                    No pressure, no commitment. Just clear answers from a senior advisor.
                  </p>
                </div>

                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="full-name-input" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="full-name-input"
                      type="text"
                      placeholder="e.g. Robert Caldwell"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-[#101C2C] border rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C6A56B] ${
                        errors.fullName ? 'border-rose-400' : 'border-white/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email-input" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="robert@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-[#101C2C] border rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C6A56B] ${
                        errors.email ? 'border-rose-400' : 'border-white/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone-input" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Phone Number {formData.contactPreference === 'phone' ? '*' : '(Optional)'}
                    </label>
                    <input
                      id="phone-input"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 bg-[#101C2C] border rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C6A56B] ${
                        errors.phone ? 'border-rose-400' : 'border-white/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="loan-goal-select" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Financing Objective
                    </label>
                    <select
                      id="loan-goal-select"
                      value={formData.loanGoal}
                      onChange={(e) => setFormData({ ...formData, loanGoal: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-[#101C2C] border border-white/20 rounded-sm text-sm text-white focus:outline-none focus:border-[#C6A56B] cursor-pointer"
                    >
                      <option value="purchase">New Home Purchase</option>
                      <option value="pre-approval">Verified Pre-Approval</option>
                      <option value="refinance">Rate-and-Term Refinance</option>
                      <option value="equity">Cash-Out Equity Access</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget & Timeframe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="estimated-price-input" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Estimated Home Price / Budget
                    </label>
                    <input
                      id="estimated-price-input"
                      type="text"
                      placeholder="$650,000"
                      value={formData.estimatedPrice}
                      onChange={(e) => setFormData({ ...formData, estimatedPrice: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#101C2C] border border-white/20 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="timeframe-select" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Anticipated Timeframe
                    </label>
                    <select
                      id="timeframe-select"
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-[#101C2C] border border-white/20 rounded-sm text-sm text-white focus:outline-none focus:border-[#C6A56B] cursor-pointer"
                    >
                      <option value="immediately">Immediately (Under contract or ready)</option>
                      <option value="1-3-months">Next 1 to 3 months</option>
                      <option value="3-6-months">Next 3 to 6 months</option>
                      <option value="just-exploring">Just exploring possibilities</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-2">
                    Preferred Consultation Method
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'phone', label: 'Phone Call', icon: Phone },
                      { id: 'video', label: 'Video Call', icon: Video },
                      { id: 'email', label: 'Email First', icon: Mail },
                    ].map((method) => {
                      const Icon = method.icon;
                      const active = formData.contactPreference === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, contactPreference: method.id as any })}
                          className={`p-2.5 rounded-sm border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            active
                              ? 'bg-[#C6A56B] text-[#101C2C] border-[#C6A56B] font-semibold'
                              : 'bg-[#101C2C] text-[#F7F4EE]/70 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date & Time Slot selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferred-date-input" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      id="preferred-date-input"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#101C2C] border border-white/20 rounded-sm text-sm text-white focus:outline-none focus:border-[#C6A56B] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferred-timeslot-select" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      id="preferred-timeslot-select"
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#101C2C] border border-white/20 rounded-sm text-sm text-white focus:outline-none focus:border-[#C6A56B] cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message-textarea" className="block text-xs uppercase tracking-wider text-[#F7F4EE]/80 font-medium mb-1.5">
                    Your Goals or Scenario Details (Optional)
                  </label>
                  <textarea
                    id="message-textarea"
                    rows={3}
                    placeholder="Tell me a bit about the property you're considering or questions on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#101C2C] border border-white/20 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 accent-[#C6A56B] cursor-pointer"
                    />
                    <label htmlFor="consent-check" className="text-[11px] text-[#F7F4EE]/70 leading-snug cursor-pointer">
                      I consent to receive a personal telephone call, video invitation, or email from Julian Vance regarding my mortgage inquiry. We respect your privacy and will never share your information.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#C6A56B] text-[#101C2C] rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-[#DFCA9D] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Securing Consultation...</span>
                  ) : (
                    <>
                      <span>Schedule A Conversation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[#F7F4EE]/50">
                  By submitting, no credit check is performed and no Social Security Number is required.
                </p>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
