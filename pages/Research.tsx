
import React from 'react';
import { BookOpen, FileText, ExternalLink, Calendar, Award, Zap, Brain } from 'lucide-react';

interface Paper {
  title: string;
  journal: string;
  year: string;
  url: string;
  abstract: string;
  category: 'Neurocomputing' | 'Engineering AI';
  imageUrl: string;
}

const papers: Paper[] = [
  {
    title: "Neuro-Inspired Memory Architectures for Cross-Modal Logic Synthesis in Distributed Agents",
    journal: "Neurocomputing",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0925231225030097",
    abstract: "Proposing a new neural memory architecture that facilitates high-fidelity cross-modal logic synthesis for distributed autonomous agents.",
    category: "Neurocomputing",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Efficient Contextual Retrieval in Large-Scale Autonomous Systems through Vector Middleware",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/pii/S0952197625015945",
    abstract: "Investigating the efficiency of contextual retrieval mechanisms in large-scale systems using specialized vector middleware layers.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Scalable Neural States: A Framework for Long-term Persistence in Generative AI",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0952197625036371",
    abstract: "A framework designed to solve the amnesia problem in generative models through scalable neural state persistence.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Episodic Memory Management for Heterogeneous Multi-Agent Coordination",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0952197625029215",
    abstract: "Addressing coordination challenges in heterogeneous multi-agent teams through dynamic episodic memory management.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Semantic Graph Optimization for Dynamic Contextual Awareness in LLMs",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0952197625030362",
    abstract: "Optimizing semantic graphs to enhance the real-time contextual awareness of Large Language Models in production environments.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Autonomous Navigation and Decision-Making via High-Fidelity Vector Replay",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0952197625024017",
    abstract: "Developing a decision-making framework for autonomous robots based on high-fidelity vector replay of historical experiences.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Transformer-Based Memory Layers for Real-time Industrial IoT Optimization",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2024",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S095219762400602X",
    abstract: "Applying transformer-based memory architectures to optimize real-time data streams in industrial IoT scenarios.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Security and Trust Verification in Decentralized Agent Memory Systems",
    journal: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0952197625007552",
    abstract: "Exploring verification protocols to ensure trust and data integrity within decentralized neural memory systems.",
    category: "Engineering AI",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop"
  }
];

const Research: React.FC = () => {
  return (
    <main className="min-h-screen bg-background-dark text-ink-1 font-body relative overflow-hidden pb-32">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_#178db518_0%,_transparent_70%)]"></div>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(#178db5 1px, transparent 1px), linear-gradient(90deg, #178db5 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10 text-center">
        <div className="site-container">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <BookOpen size={14} />
            Academic Research
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight mb-8 leading-tight">
            Scientific Foundation of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-blue-400">Cognitive Middleware</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-2 max-w-2xl mx-auto leading-relaxed">
            Our technology is built upon peer-reviewed research in neural memory architectures, vector retrieval, and multi-agent coordination.
          </p>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="relative z-10 px-6 site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {papers.map((paper, idx) => (
            <PaperCard key={idx} paper={paper} />
          ))}
        </div>
      </section>

      {/* Call for Papers / Collaboration */}
      <section className="mt-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-surface-dark rounded-[2.5rem] border border-white/10 p-12 text-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#178db510_0%,_transparent_50%)]"></div>
          <Brain size={60} className="mx-auto text-primary mb-6 opacity-50 group-hover:scale-110 transition-transform duration-700" />
          <h2 className="text-3xl font-bold font-display mb-6">Open Source Academic Collaboration</h2>
          <p className="text-ink-2 text-lg mb-10 leading-relaxed">
            We are actively looking for research partners in the fields of LLM optimization and Distributed AI. 
            Access our specialized datasets and compute resources.
          </p>
          <button className="btn-primary">
            Request Research Access
          </button>
        </div>
      </section>
    </main>
  );
};

const PaperCard: React.FC<{ paper: Paper }> = ({ paper }) => (
  <a 
    href={paper.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative bg-surface-dark rounded-3xl border border-white/10 overflow-hidden flex flex-col transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    {/* Micro-glow on top-left */}
    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
    
    {/* Paper Image */}
    <div className="relative w-full h-48 overflow-hidden">
      <img 
        src={paper.imageUrl} 
        alt={paper.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12161b] via-[#12161b]/50 to-transparent"></div>
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        <div className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${paper.category === 'Neurocomputing' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 backdrop-blur-sm' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 backdrop-blur-sm'}`}>
          {paper.journal}
        </div>
        <div className="flex items-center gap-2 text-ink-1 text-sm font-mono bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md">
          <Calendar size={14} />
          {paper.year}
        </div>
      </div>
    </div>

    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-xl md:text-2xl font-bold font-display leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
        {paper.title}
      </h3>

      <p className="text-ink-2 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
        {paper.abstract}
      </p>

      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Zap size={14} />
          Read full article
        </div>
        <div className="p-2 rounded-lg bg-white/5 text-ink-3 group-hover:text-ink-1 group-hover:bg-primary transition-all">
          <ExternalLink size={18} />
        </div>
      </div>
    </div>
  </a>
);

export default Research;
