import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  MessageSquare, 
  Zap, 
  Check, 
  BarChart, 
  Clock,
  ArrowRight
} from 'lucide-react';

type BillingTab = 'Plans' | 'Usage' | 'Invoices';

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BillingTab>('Plans');

  return (
    <div className="flex-1 overflow-y-auto bg-background p-8 transition-colors duration-300 font-sans">
        
      {/* Header Info */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-textMuted mb-1">
            <span>NeuroBot</span>
            <span className="mx-2">/</span>
        </div>
        <div className="text-xs text-textMuted">Free Plan</div>
      </div>

       {/* Tabs Navigation */}
       <div className="flex space-x-1 bg-input w-fit p-1 rounded-lg mb-8 border border-border">
           {(['Plans', 'Usage', 'Invoices'] as BillingTab[]).map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${
                 activeTab === tab 
                   ? 'bg-surfaceHighlight text-textMain shadow-sm' 
                   : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight'
               }`}
             >
               {tab}
             </button>
           ))}
       </div>

       {/* CONTENT: PLANS TAB */}
       {activeTab === 'Plans' && (
         <div className="animate-in fade-in duration-300">
            {/* Paid Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Pro Plan */}
                <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/50 transition-all shadow-sm group">
                    {/* Header Image/Gradient */}
                    <div className="h-32 bg-black relative overflow-hidden p-6 flex flex-col justify-end">
                        <div className="absolute top-[-50%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#178db5_0%,_transparent_60%)] blur-3xl opacity-60"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 className="relative z-10 text-xl font-bold text-white">Pro</h3>
                        <p className="relative z-10 text-xs text-zinc-300 mt-1">For power users and growing teams.</p>
                        {/* Abstract Cube/Shape */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80">
                            <div className="w-16 h-16 border border-primary/30 transform rotate-45 backdrop-blur-sm bg-primary/10"></div>
                            <div className="w-16 h-16 border border-primary/40 transform rotate-45 absolute top-2 left-2"></div>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col bg-card">
                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-textMain">$19</span>
                                <span className="text-textMuted text-sm">/month</span>
                            </div>
                            <div className="mt-2 inline-block bg-surfaceHighlight border border-border text-[10px] px-2 py-0.5 rounded text-textMuted">
                                $40 value at $19/m
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 text-sm text-textMain flex-1">
                            <li className="flex items-start gap-3">
                                <Database className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>3M tokens processed</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Search className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>100K search queries</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MessageSquare className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Priority support</span>
                            </li>
                        </ul>

                        <button className="w-full bg-primary hover:bg-primaryHover text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>

                {/* Scale Plan */}
                <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-purple-500/50 transition-all shadow-sm group">
                     {/* Header Image/Gradient */}
                    <div className="h-32 bg-black relative overflow-hidden p-6 flex flex-col justify-end">
                        <div className="absolute top-[-50%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#a855f7_0%,_transparent_60%)] blur-3xl opacity-60"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 className="relative z-10 text-xl font-bold text-white">Scale</h3>
                        <p className="relative z-10 text-xs text-zinc-300 mt-1">Enterprise-grade memory for large organizations.</p>
                         {/* Abstract Cube/Shape */}
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80">
                            <div className="w-16 h-16 border border-purple-500/30 transform rotate-12 backdrop-blur-sm bg-purple-500/10"></div>
                            <div className="w-16 h-16 border border-purple-400/50 transform rotate-12 absolute top-2 left-2"></div>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col bg-card">
                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-textMain">$399</span>
                                <span className="text-textMuted text-sm">/month</span>
                            </div>
                             <div className="mt-2 inline-block bg-surfaceHighlight border border-border text-[10px] px-2 py-0.5 rounded text-textMuted">
                                $1000 value at $399/m
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 text-sm text-textMain flex-1">
                             <li className="flex items-start gap-3">
                                <Database className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>80M tokens processed</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Search className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>20M search queries</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MessageSquare className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Dedicated support</span>
                            </li>
                        </ul>

                        <button className="w-full bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:text-black dark:hover:bg-white font-medium py-2.5 rounded-lg text-sm transition-colors border border-transparent">
                            Upgrade to Scale
                        </button>
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-yellow-500/50 transition-all shadow-sm group">
                     {/* Header Image/Gradient */}
                    <div className="h-32 bg-black relative overflow-hidden p-6 flex flex-col justify-end">
                        <div className="absolute top-[-50%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#eab308_0%,_transparent_60%)] blur-3xl opacity-60"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <h3 className="relative z-10 text-xl font-bold text-white">Enterprise</h3>
                        <p className="relative z-10 text-xs text-zinc-300 mt-1">Enterprise plans available with custom token limits.</p>
                         {/* Abstract Cube/Shape */}
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80">
                            <div className="w-16 h-16 border border-yellow-500/30 transform -rotate-12 backdrop-blur-sm bg-yellow-500/10"></div>
                            <div className="w-16 h-16 border border-yellow-400/50 transform -rotate-12 absolute top-2 left-2"></div>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col bg-card">
                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-textMain">Custom</span>
                            </div>
                            {/* Spacer to align with others */}
                            <div className="mt-2 h-[22px]"></div>
                        </div>

                        <ul className="space-y-3 mb-8 text-sm text-textMain flex-1">
                             <li className="flex items-start gap-3">
                                <Database className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Unlimited token usage</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Search className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Unlimited search queries</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MessageSquare className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Forward deployed engineer</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Zap className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Custom integration</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <div className="w-4 h-4 flex items-center justify-center shrink-0">🏢</div>
                                <span>Dedicated support + Slack Channel</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Faster latency</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Database className="w-4 h-4 text-textMuted mt-0.5 shrink-0" />
                                <span>Self own data</span>
                            </li>
                        </ul>

                        <button className="w-full bg-primary hover:bg-primaryHover text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>

            {/* Free Plan (Wide Card) */}
            <div className="border border-border rounded-xl mb-8 shadow-sm bg-card flex flex-col lg:flex-row overflow-hidden">
                {/* Left Side: Visual */}
                <div className="relative lg:w-1/2 bg-black p-8 flex flex-col justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]"></div>
                    <div className="absolute top-[20%] right-[30%] w-32 h-64 bg-white/5 blur-[40px] rotate-45 transform"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-white mb-2">Free</h3>
                        <p className="text-zinc-400 text-sm max-w-sm">Perfect for getting started with memory as a service.</p>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="p-8 lg:w-1/2 flex flex-col bg-card">
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-textMain">$0</span>
                    </div>
                    
                    <ul className="space-y-3 text-sm text-textMain mb-8 flex-1">
                        <li className="flex items-center gap-3">
                            <Database className="w-4 h-4 text-textMain" />
                            <span>1M tokens processed</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Search className="w-4 h-4 text-textMain" />
                            <span>10K search queries</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MessageSquare className="w-4 h-4 text-textMain" />
                            <span>Email support</span>
                        </li>
                    </ul>

                    <button className="w-full bg-zinc-500/50 text-white font-medium py-2.5 rounded-lg text-sm cursor-not-allowed hover:bg-zinc-500/60 transition-colors">Current Plan</button>
                </div>
            </div>

            {/* Overages */}
            <div className="border border-dashed border-textMuted/40 rounded-xl p-6">
               <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-primary fill-primary" />
                    <h4 className="text-base font-semibold text-primary">Overages <span className="text-textMuted font-normal text-xs uppercase ml-1">FOR PAID PLANS</span></h4>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-surfaceHighlight/50 rounded-xl p-6 flex flex-col justify-center">
                       <h5 className="text-sm font-medium text-textMain mb-2">Token Processing</h5>
                       <p className="flex items-baseline gap-1">
                           <span className="text-2xl font-bold text-primary">$0.01</span> 
                           <span className="text-textMain text-xs font-semibold">/ 1,000 TOKENS</span>
                       </p>
                   </div>
                   <div className="bg-surfaceHighlight/50 rounded-xl p-6 flex flex-col justify-center">
                       <h5 className="text-sm font-medium text-textMain mb-2">Search Queries</h5>
                       <p className="flex items-baseline gap-1">
                           <span className="text-2xl font-bold text-primary">$0.10</span> 
                           <span className="text-textMain text-xs font-semibold">/ 1,000 QUERIES</span>
                       </p>
                   </div>
               </div>
           </div>
         </div>
       )}

       {/* CONTENT: USAGE TAB */}
       {activeTab === 'Usage' && (
         <div className="animate-in fade-in duration-300 max-w-5xl">
            <h2 className="text-2xl font-semibold text-textMain mb-2">Usage</h2>
            <p className="text-textMuted text-sm mb-8">Track your token and search query usage across billing periods</p>

            <div className="space-y-8">
                {/* Current Billing Period */}
                <div>
                     <h3 className="text-xs font-medium text-textMuted uppercase mb-3 tracking-wide">CURRENT BILLING PERIOD</h3>
                     <div className="border border-border rounded-xl bg-card p-6">
                        {/* Card Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-base font-semibold text-textMain">Jan 27 – Feb 27, 2026</span>
                                    <span className="bg-surfaceHighlight border border-border text-xs px-2 py-0.5 rounded text-textMuted font-medium">Current</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-textMuted">
                                    <Clock className="w-3 h-3" />
                                    <span>30 days remaining</span>
                                </div>
                            </div>
                            <div className="bg-surfaceHighlight border border-border px-3 py-1 rounded text-xs text-textMuted font-medium flex items-center gap-2 w-fit">
                                <Database className="w-3 h-3"/> Free Plan
                            </div>
                        </div>

                        {/* Usage Rows */}
                        <div className="space-y-8">
                            {/* Tokens */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <BarChart className="w-4 h-4 text-textMuted" />
                                        <span className="text-sm font-medium text-textMain">Tokens Processed</span>
                                    </div>
                                    <span className="text-sm text-textMain font-mono">0 / 1.0M</span>
                                </div>
                                <div className="h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden mb-1">
                                    <div className="h-full bg-textMain w-0 rounded-full"></div>
                                </div>
                                <div className="text-xs text-textMuted">0% used</div>
                            </div>

                            {/* Search Queries */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-textMuted" />
                                        <span className="text-sm font-medium text-textMain">Search Queries</span>
                                    </div>
                                    <span className="text-sm text-textMain font-mono">0 / 10.0K</span>
                                </div>
                                <div className="h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden mb-1">
                                    <div className="h-full bg-textMain w-0 rounded-full"></div>
                                </div>
                                <div className="text-xs text-textMuted">0% used</div>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Previous Billing Period */}
                <div>
                     <h3 className="text-xs font-medium text-textMuted uppercase mb-3 tracking-wide">PREVIOUS BILLING PERIOD</h3>
                     <div className="border border-border rounded-xl bg-card p-6 opacity-80 hover:opacity-100 transition-opacity">
                        {/* Card Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-base font-semibold text-textMain">Dec 27, 2025 – Jan 27, 2026</span>
                            </div>
                            <div className="bg-surfaceHighlight border border-border px-3 py-1 rounded text-xs text-textMuted font-medium flex items-center gap-2 w-fit">
                                <Database className="w-3 h-3"/> Free Plan
                            </div>
                        </div>

                        {/* Usage Rows */}
                        <div className="space-y-8">
                            {/* Tokens */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <BarChart className="w-4 h-4 text-textMuted" />
                                        <span className="text-sm font-medium text-textMain">Tokens Processed</span>
                                    </div>
                                    <span className="text-sm text-textMain font-mono">0 / 1.0M</span>
                                </div>
                                <div className="h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden mb-1">
                                    <div className="h-full bg-textMain w-0 rounded-full"></div>
                                </div>
                                <div className="text-xs text-textMuted">0% used</div>
                            </div>

                            {/* Search Queries */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-textMuted" />
                                        <span className="text-sm font-medium text-textMain">Search Queries</span>
                                    </div>
                                    <span className="text-sm text-textMain font-mono">0 / 10.0K</span>
                                </div>
                                <div className="h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden mb-1">
                                    <div className="h-full bg-textMain w-0 rounded-full"></div>
                                </div>
                                <div className="text-xs text-textMuted">0% used</div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
         </div>
       )}
       
       {/* CONTENT: INVOICES TAB */}
       {activeTab === 'Invoices' && (
         <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center h-64 border border-dashed border-border rounded-xl">
             <div className="bg-surfaceHighlight p-3 rounded-full mb-3">
                <Clock className="w-6 h-6 text-textMuted" />
             </div>
             <p className="text-textMain font-medium">No invoices found</p>
             <p className="text-textMuted text-sm">Invoices will appear here once you have a billing history.</p>
         </div>
       )}

    </div>
  );
};

export default Billing;
