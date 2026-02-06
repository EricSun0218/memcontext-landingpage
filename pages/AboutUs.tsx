import React from 'react';
import { Target, Users, Shield, Sparkles, Brain, Zap, Globe, Github, Rocket, Heart, Star, GitFork, MessageCircle } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <main className="flex-grow bg-background-dark text-ink-1 font-body pb-0 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-48 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#178db518_0%,_transparent_70%)] opacity-60"></div>
          <div 
            className="absolute inset-0 opacity-[0.06]" 
            style={{ 
              backgroundImage: `linear-gradient(#178db5 1px, transparent 1px), linear-gradient(90deg, #178db5 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>
        <div className="site-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            Our Mission
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight mb-8 leading-[1.02]">
            The Memory of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">Artificial Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed">
            We are building the fundamental cognitive layer for the next generation of agents. By solving the context window bottleneck, we enable AI to learn, remember, and grow with its users.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative px-6 -mt-24 mb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] md:aspect-square bg-surface-dark">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Our Team Workspace" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">Solving for <span className="text-primary">Continuity</span></h2>
              <p className="text-lg text-ink-2 leading-relaxed">
                MemContext was born out of a simple observation: AI models are brilliant but amnesiac. Every conversation starts from zero. Every project requires manual context feeding.
              </p>
              <p className="text-lg text-ink-2 leading-relaxed">
                We've built a high-performance vector-native middleware that functions like the human hippocampus. It captures, indexes, and retrieves information in real-time, allowing your agents to possess a "lived experience."
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-4xl font-black font-display text-white mb-2">2023</div>
                  <div className="text-sm font-bold text-ink-3 uppercase tracking-widest">Founded</div>
                </div>
                <div>
                  <div className="text-4xl font-black font-display text-white mb-2">50B+</div>
                  <div className="text-sm font-bold text-ink-3 uppercase tracking-widest">Memories Managed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-32 bg-background-darker border-y border-white/10">
        <div className="site-container">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-6">Our Engineering Values</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield className="text-primary" size={32} />}
              title="Privacy First"
              desc="Memory is personal. We employ state-of-the-art encryption and local-first architectures to ensure context remains under user control."
            />
            <ValueCard 
              icon={<Zap className="text-cyan-400" size={32} />}
              title="Zero Latency"
              desc="Intelligence must be instant. Our indexing engine is optimized for sub-10ms retrieval, even with petabytes of vector data."
            />
            <ValueCard 
              icon={<Brain className="text-purple-400" size={32} />}
              title="Unified Context"
              desc="Knowledge isn't just text. We handle multimodal memory across code, images, and video to provide a holistic cognitive layer."
            />
          </div>
        </div>
      </section>

      {/* GitHub Call to Action Section */}
      <section className="relative py-32 bg-background-dark overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full opacity-50"></div>
          <Github 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] -rotate-12" 
            size={600} 
          />
        </div>
        <div className="site-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs font-bold uppercase tracking-[0.2em] mb-10 backdrop-blur-md">
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            Join our Community
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight mb-8 leading-[1.02]">
            Code the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Future of Memory</span>
          </h2>
          
          <p className="text-lg md:text-xl text-ink-2 max-w-2xl mx-auto mb-12 leading-relaxed font-body">
            MemContext is built on open standards. Explore our core engine, contribute to our vector optimization algorithms, and help us define how AI remembers.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Primary GitHub Button */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary text-base md:text-lg"
            >
              <Github size={28} />
              Explore on GitHub
              <div className="ml-4 pl-4 border-l border-white/20 flex items-center gap-2 text-sm opacity-80 group-hover:opacity-100">
                <Star size={16} className="fill-white" />
                <span>12.4k</span>
              </div>
            </a>

            {/* Secondary Actions */}
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 text-ink-3 hover:text-ink-1 transition-colors font-bold tracking-tight">
                <GitFork size={20} />
                <span>Fork Project</span>
              </a>
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
              <a href="#" className="flex items-center gap-2 text-ink-3 hover:text-ink-1 transition-colors font-bold tracking-tight">
                <MessageCircle size={20} />
                <span>Join Discord</span>
              </a>
            </div>
          </div>

          {/* Contributors Preview */}
          <div className="mt-20 pt-12 border-t border-white/10 flex flex-col items-center gap-6">
            <p className="text-xs font-bold text-ink-3 uppercase tracking-widest">Trusted by 500+ Open Source Contributors</p>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-background-dark bg-surface-dark overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=contributor${i}`} alt="Contributor" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-background-dark bg-primary flex items-center justify-center text-xs font-black">
                +48
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-10 rounded-[2.5rem] bg-surface-dark border border-white/10 hover:border-primary/50 transition-all duration-500 group">
    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold font-display mb-4">{title}</h3>
    <p className="text-ink-2 leading-relaxed">{desc}</p>
  </div>
);

export default AboutUs;
