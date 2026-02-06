
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <main className="flex-grow flex flex-col items-center w-full relative pb-20 bg-background-dark text-ink-1">
      {/* Background Grid Decoration */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none bg-grid-pattern"
        style={{ 
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      ></div>

      {/* Hero Section */}
      <section className="w-full site-container section-pad-sm text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-ink-1 mb-6">
          Flexible Memory for <br className="hidden sm:block" /> Your <span className="text-primary">AI Agents</span>
        </h1>
        <p className="text-lg md:text-xl text-ink-2 font-body max-w-2xl mx-auto leading-relaxed">
          Give your autonomous fleet the long-term context they need to perform complex tasks. Choose a plan that scales with your intelligence.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white/5 border border-white/10 p-1 rounded-lg inline-flex relative shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-ink-3 hover:text-ink-1'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-ink-3 hover:text-ink-1'
              }`}
            >
              Yearly
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full tracking-wide ${billingCycle === 'yearly' ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full site-container z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Hobby Plan */}
          <PricingCard 
            title="Hobby"
            desc="For individual developers experimenting with agent memory."
            price="$0"
            billingCycle={billingCycle}
            btnText="Start Building"
            btnVariant="outline"
            features={[
              { text: "8k Context Window", bold: "8k" },
              { text: "100 API calls/day", bold: "100" },
              { text: "Community Support", bold: "" },
            ]}
            unavailable={[
              "Vector DB Storage"
            ]}
          />

          {/* Pro Plan */}
          <PricingCard 
            title="Pro"
            desc="For production-ready agents requiring deep context."
            price="$29"
            billingCycle={billingCycle}
            btnText="Upgrade to Pro"
            btnVariant="solid"
            isPopular
            features={[
              { text: "128k Context Window", bold: "128k" },
              { text: "Unlimited API calls", bold: "Unlimited" },
              { text: "Vector DB Storage", bold: "" },
              { text: "Priority Email Support", bold: "" },
            ]}
          />

          {/* Enterprise Plan */}
          <PricingCard 
            title="Enterprise"
            desc="For large-scale autonomous fleets and custom needs."
            price="Custom"
            billingCycle={billingCycle}
            isCustomPrice
            btnText="Contact Sales"
            btnVariant="outline"
            features={[
              { text: "1M+ Context Window", bold: "1M+" },
              { text: "Dedicated Instance", bold: "" },
              { text: "SLA & 24/7 Support", bold: "" },
              { text: "Custom Retention Policies", bold: "" },
            ]}
          />

        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl px-6 pt-24 z-10">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-ink-1 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem 
            q="How is context window size measured?" 
            a="We measure context in tokens. The 8k limit for Hobby is roughly equivalent to 6,000 words. The Pro plan's 128k context allows for full-book-length memory retention." 
          />
          <FaqItem 
            q="What happens if I exceed my API limit?" 
            a="On the Hobby plan, requests will be rate-limited until the next 24-hour cycle. Pro plans enjoy unlimited calls, subject only to fair use policies for extreme spikes." 
          />
          <FaqItem 
            q="Can I host Memcontext on-premise?" 
            a="Yes, our Enterprise plan offers dedicated instances which can be deployed in your VPC or on-premise infrastructure for maximum security." 
          />
        </div>
      </section>
    </main>
  );
};

// Pricing Card Component to reduce repetition and handle "Corner Marker" logic
const PricingCard: React.FC<{
  title: string;
  desc: string;
  price: string;
  billingCycle: 'monthly' | 'yearly';
  btnText: string;
  btnVariant: 'outline' | 'solid';
  isPopular?: boolean;
  isCustomPrice?: boolean;
  features: { text: string; bold: string }[];
  unavailable?: string[];
}> = ({ title, desc, price, billingCycle, btnText, btnVariant, isPopular, isCustomPrice, features, unavailable = [] }) => {
  return (
    <div className={`group relative flex flex-col rounded-2xl bg-surface-dark p-6 lg:p-8 transition-all duration-300 ${isPopular ? 'border-2 border-primary/30 shadow-xl shadow-primary/10 scale-[1.02] md:scale-105 z-10' : 'border border-white/10 shadow-sm hover:shadow-lg hover:border-primary/40'}`}>
      
      {/* Tech Corner Markers */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 ${isPopular ? 'border-primary' : 'border-white/20 group-hover:border-primary'}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 ${isPopular ? 'border-primary' : 'border-white/20 group-hover:border-primary'}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 ${isPopular ? 'border-primary' : 'border-white/20 group-hover:border-primary'}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${isPopular ? 'border-primary' : 'border-white/20 group-hover:border-primary'}`} />

      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-xl font-bold font-display ${isPopular ? 'text-primary' : 'text-ink-1'}`}>{title}</h3>
        <p className="text-sm text-ink-3 mt-2 font-body h-10">{desc}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-black font-display text-ink-1 tracking-tight">{price}</span>
        {!isCustomPrice && <span className="text-ink-3 font-medium">/mo</span>}
      </div>

      <button className={`w-full rounded-lg font-bold py-2.5 px-4 mb-8 text-sm transition-colors ${
        btnVariant === 'solid' 
          ? 'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20' 
          : 'border-2 border-white/10 text-ink-1 hover:border-primary hover:text-primary'
      }`}>
        {btnText}
      </button>

      <div className="space-y-4 flex-1">
        {features.map((feat, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-ink-2">
            <Check size={20} className="text-primary shrink-0" />
            <span>
              {feat.bold ? <strong className="font-display text-ink-1 mr-1">{feat.bold}</strong> : null}
              {feat.text.replace(feat.bold, '')}
            </span>
          </div>
        ))}
        {unavailable.map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-ink-3 line-through">
            <X size={20} className="shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-ink-2 group-hover:text-primary transition-colors">{q}</span>
        <span className={`material-symbols-outlined text-ink-3 group-hover:text-primary transition-colors transform ${isOpen ? 'rotate-180' : ''}`}>
           {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <p className="mt-2 text-ink-3 font-body leading-relaxed animate-in slide-in-from-top-2 duration-200">
          {a}
        </p>
      )}
    </div>
  );
};

export default Pricing;
