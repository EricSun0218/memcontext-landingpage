import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  LifeBuoy, 
  Database, 
  Cpu, 
  PlayCircle, 
  User, 
  Bot, 
  Clock, 
  Workflow,
  Zap,
  BrainCircuit,
  Layers,
  Filter,
  Puzzle, 
  ShieldCheck,
  Sparkles,
  Share2,
  Video,
  Code2,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  MonitorPlay,
  Network,
  Atom,
  Infinity,
  Globe,
  Radio,
  ExternalLink,
  Target,
  Layers3,
  Rocket,
  Copy,
  Mail,
  TrendingUp,
  TrendingDown,
  Link2,
  RotateCw,
  Timer,
  Settings2,
  FileText,
  MessageSquare,
  Github
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 添加useNavigate导入
import { SiNotion, SiYoutube, SiGithub, SiAnthropic, SiCoze, SiN8N } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { supabase } from '../dashboard/lib/supabaseClient';

// 滚动动画Hook
const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 一旦可见就不再观察，避免重复触发
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// 滚动动画包装组件
const ScrollAnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}> = ({ children, className = '', delay = 0, threshold = 0.1 }) => {
  const { ref, isVisible } = useScrollAnimation(threshold);

  return (
    <div
      ref={ref}
      className={`scroll-fade-in ${isVisible ? 'visible' : ''} ${className}`}
      style={{
        transitionDelay: delay > 0 ? `${delay}s` : undefined
      }}
    >
      {children}
    </div>
  );
};

const FloatingLogo: React.FC<{ 
  icon: any, 
  top: string, 
  left?: string, 
  right?: string, 
  delay: string, 
  color: string, 
  rotate?: number,
  size?: number
}> = ({ 
  icon: Icon, 
  top, 
  left, 
  right, 
  delay, 
  color, 
  rotate = 0,
  size = 28
}) => {
  return (
    <div 
      className="absolute animate-twinkle z-20"
      style={{ 
        top, 
        left, 
        right, 
        animationDelay: delay,
      }}
    >
      <div 
        className="relative group transition-all duration-500 ease-out hover:scale-110"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="relative flex items-center justify-center p-6 rounded-[2rem] bg-white/5 backdrop-blur-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none"></div>
          <div 
            className="absolute inset-0 rounded-[2rem] pointer-events-none animate-twinkle-opacity group-hover:animate-none group-hover:opacity-100 transition-opacity duration-300"
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.7) 100%)',
                padding: '1.5px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                animationDelay: delay,
            }}
          />
          <div 
            className="relative z-10 transition-all duration-300"
            style={{ 
              filter: `drop-shadow(0 0 15px ${color}70)` 
            }}
          >
            <Icon size={size} color={color} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const CursorLogo: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#FFFFFF' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <polygon points="32 4 58 18 6 18" fill={color} />
    <polygon points="6 18 58 18 32 32" fill="#000000" />
    <polygon points="6 18 32 32 32 60 6 46" fill={color} />
    <polygon points="58 18 32 32 32 60" fill="#000000" />
    <polygon points="58 18 32 60 58 46" fill={color} />
    <polyline points="32 4 58 18 32 32 6 18 32 4" stroke="#1F2937" strokeWidth="1" opacity="0.35" />
    <polyline points="6 18 32 32 58 18" stroke="#1F2937" strokeWidth="1" opacity="0.45" />
    <polyline points="32 32 32 60" stroke="#1F2937" strokeWidth="1" opacity="0.35" />
    <polyline points="6 18 6 46 32 60 58 46 58 18" stroke="#111827" strokeWidth="1" opacity="0.25" />
  </svg>
);

const CustomTrendArrow: React.FC<{ trend: 'up' | 'down' }> = ({ trend }) => {
  const strokeColor = trend === 'up' ? '#22d3ee' : '#34d399';
  return (
    <div className="relative w-10 h-10 flex items-center justify-center overflow-visible">
      <svg 
        viewBox="0 0 32 32" 
        fill="none" 
        className={`w-full h-full overflow-visible origin-center ${
          trend === 'up' ? 'animate-arrow-up' : 'animate-arrow-down'
        }`}
      >
        <path 
          d={trend === 'up' ? "M6 26L26 6M26 6H14M26 6V18" : "M6 6L26 26M26 26H14M26 26V14"} 
          stroke={strokeColor} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            strokeDasharray: 60, 
            strokeDashoffset: 60,
            filter: `drop-shadow(0 0 12px ${strokeColor})`
          }}
        />
      </svg>
    </div>
  );
};

// Animated number component that counts from 0 to target value
const AnimatedNumber: React.FC<{ 
  value: string, 
  trend: 'up' | 'down',
  duration?: number 
}> = ({ value, trend, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Parse the value string (e.g., "+99.2%" or "-42ms")
    const parseValue = (val: string): { prefix: string; number: number; suffix: string } => {
      const match = val.match(/^([+-]?)(\d+\.?\d*)(.*)$/);
      if (!match) return { prefix: '', number: 0, suffix: '' };
      
      const prefix = match[1] || '';
      const number = parseFloat(match[2]);
      const suffix = match[3] || '';
      
      return { prefix, number, suffix };
    };

    const { prefix, number, suffix } = parseValue(value);
    const targetNumber = Math.abs(number);
    const isNegative = prefix === '-';

    // Check if element is in viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smooth animation
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const currentNumber = targetNumber * easeOutCubic;
              
              // Format number based on original format
              let formattedNumber: string;
              if (suffix === '%') {
                formattedNumber = currentNumber.toFixed(1);
              } else if (suffix === 'ms') {
                formattedNumber = Math.round(currentNumber).toString();
              } else {
                formattedNumber = currentNumber.toFixed(1);
              }
              
              const sign = isNegative ? '-' : (prefix === '+' ? '+' : '');
              setDisplayValue(`${sign}${formattedNumber}${suffix}`);
              
              if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
              } else {
                setDisplayValue(value); // Ensure final value is exact
              }
            };

            animate();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration, hasAnimated]);

  return (
    <span 
      ref={elementRef}
      className={`text-2xl font-black font-mono tracking-tighter ${trend === 'up' ? 'text-cyan-400' : 'text-emerald-400'}`}
    >
      {displayValue}
    </span>
  );
};

const MetricCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  desc?: string; 
  trend: 'up' | 'down';
  value: string;
}> = ({ icon, title, desc, trend, value }) => (
  <div className="card-base p-6 md:p-7 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="scale-90">
        <CustomTrendArrow trend={trend} />
      </div>
    </div>
    <div>
      <div className="text-[11px] uppercase tracking-[0.24em] text-ink-3 font-bold font-display">
        {title}
      </div>
      <AnimatedNumber value={value} trend={trend} />
    </div>
    {desc ? (
      <p className="text-sm text-ink-2 leading-relaxed opacity-80">
        {desc}
      </p>
    ) : null}
  </div>
);

interface CompCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  secondarySubtitle?: string;
  subtitleLogo?: React.ReactNode;
  secondarySubtitleLogo?: React.ReactNode;
  titleSpacingClass?: string;
  secondarySubtitleClass?: string;
  desc: string;
  stats: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  features?: string[];
  imageUrl: string;
  style?: React.CSSProperties;
  className?: string;
}

const CompatibilityCard: React.FC<CompCardProps> = ({ icon, title, subtitle, secondarySubtitle, subtitleLogo, secondarySubtitleLogo, titleSpacingClass, secondarySubtitleClass, desc, stats, quote, features, imageUrl, style, className }) => (
  <div 
    style={style}
    className={`relative flex-shrink-0 w-full md:w-[950px] h-[520px] group overflow-hidden rounded-[3rem] bg-surface-dark border border-white/10 p-10 md:p-14 flex flex-col md:flex-row gap-12 shadow-card transition-all duration-500 hover:border-primary/40 ${className}`}
  >
    <div className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-primary/10 blur-[120px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

    <div className="flex-1 flex flex-col relative z-10">
      <div className="flex items-center gap-4 mb-10">
        {icon ? (
          <div className="w-16 h-16 flex items-center justify-center text-ink-1 bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-colors">
            {icon}
          </div>
        ) : null}
        <h3 className={`text-5xl font-black text-ink-1 font-display tracking-tighter ${title === "Coding + Memory" ? "whitespace-nowrap" : ""}`}>
          {title}
        </h3>
      </div>

      <div className="space-y-6 mb-10">
        <div className={titleSpacingClass ?? "space-y-10"}>
          <div className="flex items-center gap-4">
            {subtitleLogo ? (
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ink-1">
                {subtitleLogo}
              </div>
            ) : null}
            <h4 className="text-2xl md:text-3xl font-bold text-ink-1 font-display leading-[1.1] tracking-tight">
              {subtitle}
            </h4>
          </div>
          {secondarySubtitle ? (
            <div className={`flex items-center gap-4 ${secondarySubtitleClass ?? ""}`}>
              {secondarySubtitleLogo ? (
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ink-1">
                  {secondarySubtitleLogo}
                </div>
              ) : null}
              <h4 className="text-2xl md:text-3xl font-bold text-ink-1 font-display leading-[1.1] tracking-tight">
                {secondarySubtitle}
              </h4>
            </div>
          ) : null}
        </div>
        {desc ? (
          <p className="text-ink-2 text-lg md:text-xl leading-relaxed font-body max-w-lg">
            {desc}
          </p>
        ) : null}
      </div>

    </div>

    <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

    <div className="w-full md:w-[320px] flex flex-col relative z-10">
      <div className="relative mb-8 rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12161b] via-transparent to-transparent opacity-40"></div>
      </div>

      <div className="flex flex-col gap-1">
        {quote ? (
          <>
            <div className="relative">
              <Quote className="absolute -top-3 -left-4 text-primary opacity-20" size={32} />
              <p className="text-ink-2 text-lg leading-relaxed italic relative z-10 pl-2">
                "{quote.text}"
              </p>
            </div>
            <div className="mt-4 pt-6 border-t border-white/5">
              <p className="text-ink-1 font-bold text-lg">{quote.author}</p>
              <p className="text-ink-3 text-sm font-medium uppercase tracking-wider">{quote.role}</p>
            </div>
          </>
        ) : features ? (
          <div className="space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 py-1 border-b border-white/10 last:border-0 group/feat">
                <CheckCircle2 size={24} className="text-primary group-hover/feat:scale-110 transition-transform" />
                <span className="text-ink-1 font-bold text-lg tracking-tight leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

const EnterpriseScaleHeadlineSection = () => {
  return (
    <ScrollAnimatedSection>
      <section className="relative w-full section-pad-sm bg-transparent">
        <div className="site-container text-center">
          <div className="flex justify-center mb-6">
            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 shadow-xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-1">Capabilities</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.05]">
            <span className="text-ink-1">Reinventing</span> <span className="text-primary">Agent Memory</span>
            <br />
            <span className="text-ink-1">for Enterprise Scale</span>
          </h2>
        </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const PlatformCompatibilitySection = () => {

  const compatibilityData: CompCardProps[] = [
    {
      title: "Coding + Memory",
      subtitle: "Coze: Empowering Agents with Cross-Session Knowledge and Memory Continuity",
      secondarySubtitle: "n8n: Bringing Persistent and Retrievable Multimodal Memory to Automated Workflows",
      subtitleLogo: <SiCoze size={28} color="#5b5bf6" />,
      secondarySubtitleLogo: <SiN8N size={28} color="#ff6d5a" />,
      desc: "",
      stats: [
        { value: "85%", label: "reduction in token overhead" },
        { value: "4x", label: "improved video indexing speed" }
      ],
      features: [
        "Video Understanding",
        "Multimodal Support",
        "Task Management",
        "Progress Tracking"
      ],
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Workflow+Memory",
      subtitle: "Claude: Adds memory to Claude for deeper context and smarter data access",
      secondarySubtitle: "Cursor: Gives Cursor memory so it truly understands your project",
      subtitleLogo: <SiAnthropic size={28} color="#8b5cf6" />,
      secondarySubtitleLogo: <CursorLogo size={28} color="#ffffff" />,
      titleSpacingClass: "space-y-16",
      secondarySubtitleClass: "mt-26",
      desc: "",
      stats: [
        { value: "3.5x", label: "higher task completion rate" },
        { value: "12s", label: "saved per complex workflow step" }
      ],
      features: [
        "Persistent Memory",
        "Multimodal Processing",
        "Smart Retrieval",
        "Plug and Play"
      ],
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <ScrollAnimatedSection>
      <section className="relative w-full section-pad bg-transparent overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(23,141,181,0.08)_0%,_transparent_60%)]"></div>
        </div>

        <div className="site-container relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Compatibility
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.05] text-ink-1">
              Memory that plugs into your stack
            </h2>
            <p className="text-lg md:text-xl text-ink-2 max-w-2xl mx-auto mt-4 leading-relaxed">
              Built for modern agent ecosystems — connect once, then scale across workflows, tools, and sessions.
            </p>
          </div>

          <div className="flex flex-col gap-10 items-center">
            {compatibilityData.map((data, idx) => (
              <ScrollAnimatedSection key={idx} delay={idx * 0.1}>
                <CompatibilityCard {...data} />
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const AdvantageCard: React.FC<{ 
  title: string; 
  desc: string; 
  icon: React.ReactNode; 
  imageUrl: string 
}> = ({ title, desc, icon, imageUrl }) => {
  return (
    <div className="group relative w-full h-[520px] rounded-[2.25rem] overflow-hidden bg-surface-dark border border-white/10 transition-all duration-700 hover:border-primary/40 shadow-card cursor-default">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-60 transition-all duration-700 group-hover:blur-md group-hover:scale-110 group-hover:opacity-30 group-hover:grayscale-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/40 to-background-dark/90 transition-opacity duration-700 group-hover:opacity-95" />

      <div className="relative z-20 w-full h-full p-10 flex flex-col justify-center items-center text-center transition-all duration-700">
        <div className="flex flex-col items-center transition-all duration-700 group-hover:-translate-y-40">
           <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white transition-all duration-700 group-hover:scale-75 group-hover:opacity-50">
             {icon}
           </div>
           <h3 className="text-3xl lg:text-4xl font-black text-white font-display leading-[1.1] tracking-tight group-hover:text-primary transition-colors duration-500 whitespace-pre-line">
             {title}
           </h3>
        </div>

        <div className="absolute inset-x-10 top-[45%] opacity-0 transform translate-y-12 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
          <p className="text-ink-2 text-lg lg:text-xl leading-relaxed font-body font-medium">
            {desc}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-1 bg-primary/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvantagesSection = () => {
  return (
    <ScrollAnimatedSection>
      <section className="relative w-full section-pad bg-transparent overflow-hidden">
        <div className="site-container relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 shadow-xl mb-6">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-1">Core Strengths</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink-1 font-display tracking-tight leading-tight max-w-4xl">
              Why Teams Choose Our <br /><span className="text-primary">Cognitive Layer</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimatedSection delay={0.1}>
              <AdvantageCard 
                icon={<MonitorPlay size={48} strokeWidth={1.5} />}
                title={"Multimodal\nMemory Engine"}
                desc="Real-time API ingestion of text, images, and videos—automatically extracts entities and relationships to build high-fidelity, traceable long-term memory for agents."
                imageUrl="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
              />
            </ScrollAnimatedSection>
            <ScrollAnimatedSection delay={0.2}>
              <AdvantageCard 
                icon={<Network size={48} strokeWidth={1.5} />}
                title={"Context-Aware\nReasoning Capability"}
                desc="Built on a Context Graph, it accumulates memory, evolves preferences, and models behavior—staying consistent, understanding history, and forming a unique personality."
                imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
              />
            </ScrollAnimatedSection>
            <ScrollAnimatedSection delay={0.3}>
              <AdvantageCard 
                icon={<Atom size={48} strokeWidth={1.5} />}
                title={"Multi-Agent\nPlatform Integration"}
                desc="Lightweight, standard API—deeply compatible with n8n, Coze, and more. Add memory to your agent without changing your existing architecture."
                imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              />
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const FeatureContentCard: React.FC<{ 
  stage: number; 
  title: string; 
  desc: string; 
  icon: React.ReactNode; 
  features: string[];
  isFirst?: boolean;
  isActive?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}> = ({ stage, title, desc, icon, features, isFirst = false, isActive = false, innerRef }) => (
  <div ref={innerRef} data-stage={stage} className="min-h-[56vh] flex flex-col justify-center py-10 snap-center">
    <div className={`group relative w-full px-4 md:px-6 py-8 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-40 translate-y-10 scale-[0.96] blur-[1px]'}`}>
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            stage === 1
              ? 'radial-gradient(420px circle at 18% 20%, rgba(23,141,181,0.25) 0%, rgba(0,0,0,0) 70%)'
              : stage === 2
              ? 'radial-gradient(420px circle at 78% 28%, rgba(23,141,181,0.25) 0%, rgba(0,0,0,0) 70%)'
              : stage === 3
              ? 'radial-gradient(420px circle at 20% 80%, rgba(23,141,181,0.25) 0%, rgba(0,0,0,0) 70%)'
              : 'radial-gradient(420px circle at 82% 78%, rgba(23,141,181,0.25) 0%, rgba(0,0,0,0) 70%)'
        }}
      ></div>
      <div className="flex items-center justify-between mb-10">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 shadow-[0_0_30px_rgba(23,141,181,0.2)] group-hover:scale-105 transition-transform duration-500">
          {icon}
        </div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
           <span className="text-[11px] font-black text-ink-2 uppercase tracking-[0.24em] font-display">Stage {stage}</span>
        </div>
      </div>
      
      <h3 className={`text-4xl md:text-5xl font-black text-ink-1 font-display mb-6 tracking-tight group-hover:text-primary transition-colors transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} delay-[60ms]`}>
        {title}
      </h3>
      
      <p className={`text-xl md:text-2xl text-ink-2 font-body leading-relaxed mb-10 group-hover:text-ink-1 transition-colors transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'} delay-[140ms]`}>
        {desc}
      </p>
      
      <div className={`flex flex-wrap gap-3 pt-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} delay-[220ms]`}>
        {features.map((feature, i) => (
          <div key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs font-bold font-display hover:bg-primary/20 hover:text-ink-1 hover:border-primary/30 transition-all cursor-default">
            {feature}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const [alignPadding, setAlignPadding] = useState({ top: 0, bottom: 0, marginTop: 0 });
  const [activeStage, setActiveStage] = useState(1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updatePadding = () => {
      if (!rightColumnRef.current || !rightImageRef.current) {
        setAlignPadding({ top: 0, bottom: 0, marginTop: 0 });
        return;
      }

      if (window.innerWidth < 1024) {
        setAlignPadding({ top: 0, bottom: 0, marginTop: 0 });
        return;
      }

      const columnHeight = rightColumnRef.current.clientHeight;
      const imageTop = rightImageRef.current.offsetTop;
      const imageHeight = rightImageRef.current.clientHeight;
      const cardEdgeOffsetTop = 43; // top align offset (lock top alignment)
      const cardEdgeOffsetBottom = 180; // bottom extra space (positive => move left bottom down)
      const topRaw = imageTop - cardEdgeOffsetTop;
      const bottomOffset = Math.max(0, cardEdgeOffsetBottom);
      const bottomRaw = columnHeight - imageTop - imageHeight - bottomOffset;
      const top = Math.max(0, topRaw);
      const bottom = Math.max(0, bottomRaw);
      const marginTop = Math.min(0, topRaw);

      setAlignPadding({ top, bottom, marginTop });
    };

    updatePadding();

    const resizeObserver = new ResizeObserver(updatePadding);
    if (rightColumnRef.current) resizeObserver.observe(rightColumnRef.current);
    if (rightImageRef.current) resizeObserver.observe(rightImageRef.current);
    window.addEventListener('resize', updatePadding);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let nextStage = activeStage;
        let maxRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            const stageAttr = (entry.target as HTMLElement).dataset.stage;
            const stageValue = stageAttr ? Number(stageAttr) : 1;
            maxRatio = entry.intersectionRatio;
            nextStage = stageValue;
          }
        });
        if (nextStage !== activeStage) {
          setActiveStage(nextStage);
        }
      },
      { threshold: [0.4, 0.6, 0.8] }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeStage]);

  const featureImages = [
    {
      title: "Persistent Memory",
      src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2000&auto=format&fit=crop&ar=1:1"
    },
    {
      title: "Multimodal Indexing",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop&ar=1:1"
    },
    {
      title: "Universal Integration",
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&ar=1:1"
    },
    {
      title: "Live Synchronization",
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop&ar=1:1"
    }
  ];

  return (
    <ScrollAnimatedSection>
      <section className="relative w-full bg-transparent overflow-visible section-pad">
        <div className="site-container mb-16 flex flex-col items-center text-center">
          <div className="inline-flex px-6 py-2 rounded-full bg-white/5 border border-white/10 shadow-xl mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-1">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink-1 font-display tracking-tight leading-[1.02] max-w-4xl">
            The memory layer <br />for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">agentic AI</span>
          </h2>
        </div>

        <div className="site-container flex flex-col lg:flex-row items-start gap-16 lg:gap-28">
        <div
          ref={leftColumnRef}
          className="flex-1 space-y-0 w-full lg:max-w-3xl"
          style={{
            paddingTop: alignPadding.top,
            paddingBottom: alignPadding.bottom,
            marginTop: alignPadding.marginTop
          }}
        >
          <FeatureContentCard 
            stage={1}
            innerRef={(el) => { cardRefs.current[0] = el; }}
            isFirst
            isActive={activeStage === 1}
            title="Persistent"
            icon={<Database size={36} strokeWidth={1.5} />}
            desc="Supports long-term memory—continuously capturing coding context and knowledge to break AI's short-window limits, enabling true lifelong learning and experience reuse"
            features={["Infinite Context Retrieval", "Knowledge Accumulation", "Cross-Session Recall"]}
          />
          <FeatureContentCard 
            stage={2}
            innerRef={(el) => { cardRefs.current[1] = el; }}
            isActive={activeStage === 2}
            title="Omni"
            icon={<Atom size={36} strokeWidth={1.5} />}
            desc="Seamlessly integrates multimodal inputs—code, text, images, and files—capturing every coding insight, from screenshots and config files to sketch notes, all turned into searchable memory units"
            features={["Multimodal Indexing", "Visual Context Parsing", "Structured Memory Units"]}
          />
          <FeatureContentCard 
            stage={3}
            innerRef={(el) => { cardRefs.current[2] = el; }}
            isActive={activeStage === 3}
            title="Universal"
            icon={<Zap size={36} strokeWidth={1.5} />}
            desc="Our platform natively supports MCP and Skill—plugs into any modern AI agent environment. Universal memory persistence that travels across tools and sessions."
            features={["Plugin System", "Browser Extension", "Native SDKs"]}
          />
          <FeatureContentCard 
            stage={4}
            innerRef={(el) => { cardRefs.current[3] = el; }}
            isActive={activeStage === 4}
            title="Live"
            icon={<Radio size={36} strokeWidth={1.5} />}
            desc="Real-time knowledge synchronization ensures your agents never hallucinate on stale data. Constant monitoring and indexing of dynamic information streams."
            features={["Docs Auto-Sync", "Real-time Indexing", "Self-Correction"]}
          />
        </div>

        <div ref={rightColumnRef} className="lg:w-1/2 h-[70vh] sticky top-24 hidden lg:flex flex-col justify-center items-center">
          <div ref={rightImageRef} className="relative w-full max-w-[80vh] aspect-square rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.8)] bg-surface-dark">
            {featureImages.map((image, idx) => {
              const isActive = activeStage === idx + 1;
              return (
                <img
                  key={image.title}
                  src={image.src}
                  alt={image.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 scale-100 translate-y-0 blur-0' : 'opacity-0 scale-[1.1] -translate-y-2 blur-[6px]'} filter brightness-[0.85] contrast-[1.05]`}
                />
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
            <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-white/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-white/20 rounded-br-2xl"></div>
            <div className="absolute bottom-8 left-8 bg-black/40 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] text-ink-2">
              {featureImages[activeStage - 1].title}
            </div>
          </div>
        </div>
      </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const ExamplesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const examplesData = [
    {
      buttonTitle: "A truly personalized agent that gets you",
      leftTitle: "Say goodbye to forgetful, transactional chats",
      leftDesc: "MemContext remembers your preferences—like diet or interests—so agents recall history across chats, turning random replies into thoughtful, caring conversations.",
      features: ["LTM (Long-term Memory - Profile Evolution)", "Memory Recall", "Proactive Care Across Time Cycles"],
      visual: "radial-gradient(circle at center, rgba(23, 141, 181, 0.4) 0%, transparent 70%)",
      bgImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      buttonTitle: "Integrated Brain for Long-cycle Projects",
      leftTitle: "Break the Fragmentation of Time and Modality",
      leftDesc: "Meeting recordings, whiteboard sketches, and code docs are unified into mid-term memory. Agents can trace back across months and compare multimodal contexts.",
      features: ["MTM (Mid-term Memory - Recency Recall)", "Cross-modal Verification", "Consistency Supervision Over Time Cycles"],
      visual: "linear-gradient(135deg, rgba(23, 141, 181, 0.2) 0%, rgba(34, 211, 238, 0.2) 100%)",
      bgImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
    },
    {
      buttonTitle: "Learning Companion Tutor",
      leftTitle: "Understand Your Learning Trajectory Better",
      leftDesc: "The system blends short-term emotional sensing with long-term knowledge graphs, proactively retrieving relevant teaching clips based on individual cognitive history.",
      features: ["STM (Short-term Memory - Context Awareness)", "Knowledge Association", "Proactive Intervention"],
      visual: "conic-gradient(from 180deg at 50% 50%, rgba(23, 141, 181, 0.1) 0deg, rgba(34, 211, 238, 0.2) 180deg, rgba(23, 141, 181, 0.1) 360deg)",
      bgImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop"
    },
    {
      buttonTitle: "Smart Home Butler Memory",
      leftTitle: "Give Homes Memory and Warmth",
      leftDesc: "Facing complex semantic requests, MemContext accurately locates specific people, actions, and time segments, directly presenting highlight moments.",
      features: ["Episodic Memory", "Complex Semantic Positioning", "High-precision Presentation"],
      visual: "radial-gradient(circle at center, rgba(34, 211, 238, 0.3) 0%, transparent 80%)",
      bgImage: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <ScrollAnimatedSection threshold={0.2}>
      <section className="relative w-full bg-transparent section-pad overflow-visible">
        <div className="site-container">
          <ScrollAnimatedSection threshold={0.25}>
            <div className="flex justify-center w-full mb-6">
              <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 shadow-xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-1">Examples</span>
              </div>
            </div>
            <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.05] text-ink-1 mb-12">
              <span className="text-ink-1">Breaking</span>{" "}
              <span className="text-primary">Time Limits</span>
              <br />
              <span className="text-ink-1">Intelligence</span>
            </h2>
          </ScrollAnimatedSection>
          <div className="mt-8">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
              <ScrollAnimatedSection delay={0.05} threshold={0.3} className="lg:w-1/2 w-full h-[650px] lg:sticky lg:top-32 flex flex-col">
                <div className="relative flex-1 rounded-[3.25rem] bg-surface-dark border border-white/10 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)] transition-all duration-700 group/card">
                  <div 
                    className="absolute inset-0 z-0 transition-all duration-1000 opacity-20 filter grayscale blur-[2px] group-hover/card:opacity-30 group-hover/card:blur-0 scale-105"
                    style={{ 
                      backgroundImage: `url(${examplesData[activeIndex].bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div 
                    className="absolute inset-0 z-1 opacity-60 transition-all duration-1000 scale-[1.5]" 
                    style={{ background: examplesData[activeIndex].visual }}
                  ></div>
                  <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#0d151f] via-[#0d151f]/40 to-transparent"></div>
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                    <div className="mb-8 md:mb-12">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                        <Quote size={36} className="md:w-10 md:h-10 text-ink-1 opacity-80" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-ink-1 font-display mb-6 md:mb-10 leading-[1.1] tracking-tight transition-all duration-500 transform">
                        {examplesData[activeIndex].leftTitle}
                      </h3>
                      <p className="text-lg md:text-xl text-ink-2 font-body leading-relaxed mb-10 md:mb-16 max-w-xl transition-all duration-500">
                        {examplesData[activeIndex].leftDesc}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] to-transparent"></div>
                </div>
              </ScrollAnimatedSection>

              <ScrollAnimatedSection delay={0.15} threshold={0.3} className="lg:w-1/2 w-full flex flex-col lg:h-[650px] lg:sticky lg:top-32">
                <div className="flex flex-col gap-4">
                  {examplesData.map((example, idx) => (
                    <ScrollAnimatedSection key={idx} delay={0.1 + idx * 0.05} threshold={0.35}>
                      <button
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`relative px-6 py-6 rounded-[2rem] border text-left transition-all duration-500 group overflow-hidden ${
                          activeIndex === idx 
                            ? 'bg-white/10 border-primary shadow-[0_0_30px_rgba(23,141,181,0.2)] scale-[1.02]' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`absolute top-0 left-0 h-full w-1 transition-all duration-500 ${activeIndex === idx ? 'bg-primary' : 'bg-transparent'}`}></div>
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xl md:text-2xl font-black font-display tracking-tight transition-all duration-500 ${activeIndex === idx ? 'text-ink-1' : 'text-ink-3'}`}>
                            {example.buttonTitle}
                          </h4>
                          {activeIndex === idx && <ChevronRight size={24} className="text-primary animate-pulse" />}
                        </div>
                      </button>
                    </ScrollAnimatedSection>
                  ))}
                </div>
                <ScrollAnimatedSection delay={0.25} threshold={0.35}>
                  <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 my-auto"></div>
                </ScrollAnimatedSection>
                <ScrollAnimatedSection delay={0.3} threshold={0.35}>
                  <div className="flex flex-col gap-4 -mt-2">
                    {examplesData[activeIndex].features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-6 group/feat">
                        <div className="w-12 h-12 rounded-xl bg-[#0a141a] border border-primary/40 flex items-center justify-center text-primary transition-all duration-300 shadow-[inset_0_0_15px_rgba(23,141,181,0.2)] group-hover/feat:border-primary group-hover/feat:shadow-primary/20">
                          <div className="w-6 h-6 rounded-full border border-primary/60 flex items-center justify-center">
                            <CheckCircle2 size={14} className="fill-primary/10" />
                          </div>
                        </div>
                        <span className="text-ink-1 font-bold text-xl tracking-tight transition-all duration-300 group-hover/feat:translate-x-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </ScrollAnimatedSection>
              </ScrollAnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const MetricsSection = () => {
  const metrics = [
    { icon: <Link2 size={22} />, title: "Key Info Recall Rate", trend: 'up' as const, value: "+99.2%", desc: "Precision recall under real production load." },
    { icon: <BrainCircuit size={22} />, title: "AI Answer Accuracy", trend: 'up' as const, value: "+85.4%", desc: "Higher response correctness with memory." },
    { icon: <Settings2 size={22} />, title: "Memory Management Efficiency", trend: 'up' as const, value: "75.3%", desc: "Lean storage without recall loss." },
    { icon: <RotateCw size={22} />, title: "Repetitive Input Frequency", trend: 'down' as const, value: "-76.5%", desc: "Less redundant prompting over time." },
    { icon: <Timer size={22} />, title: "AI Response Latency", trend: 'down' as const, value: "-44.2%", desc: "Faster retrieval at scale." },
    { icon: <Puzzle size={22} />, title: "Multimodal Retrieval Time", trend: 'down' as const, value: "-62.3%", desc: "Video + doc recall under 0.1s." },
  ];

  return (
    <ScrollAnimatedSection>
      <section className="relative w-full section-pad bg-transparent overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[40%] w-[1200px] h-[800px] opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(23,141,181,0.28) 0%, rgba(0,0,0,0) 70%)' }}
      ></div>
      <div className="absolute -top-24 right-[-10%] w-[420px] h-[420px] bg-primary/20 blur-[140px] rounded-full opacity-60 pointer-events-none"></div>
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Performance
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.05] text-ink-1">
              Performance that feels instant
            </h2>
            <p className="text-lg md:text-xl text-ink-2 max-w-2xl mt-4 leading-relaxed">
              Memory isn’t just stored — it’s measured. We track recall quality, latency, and efficiency across multimodal workloads.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs uppercase tracking-[0.2em]">
                Retrieval <span className="text-ink-1 font-black tracking-tight">0.1s</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs uppercase tracking-[0.2em]">
                Recall <span className="text-ink-1 font-black tracking-tight">+99.2%</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-ink-2 text-xs uppercase tracking-[0.2em]">
                Cost <span className="text-ink-1 font-black tracking-tight">-76.5%</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full opacity-70 pointer-events-none"></div>
            <div className="relative card-base p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(120deg, rgba(23,141,181,0.6), transparent 55%)' }}></div>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-ink-3">Peak Metric</span>
                <span className="text-xs text-ink-3">Live</span>
              </div>
              <div className="mt-6">
                <div className="text-6xl md:text-7xl font-black text-ink-1 tracking-tight">0.1s</div>
                <p className="text-base md:text-lg text-ink-2 mt-3 max-w-sm leading-relaxed">
                  Frame-level spatiotemporal retrieval across video, audio, and docs.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="border-l border-white/10 pl-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-ink-3">Recall</div>
                  <div className="text-xl font-black text-ink-1">99.2%</div>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-ink-3">Accuracy</div>
                  <div className="text-xl font-black text-ink-1">85.4%</div>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-ink-3">Latency</div>
                  <div className="text-xl font-black text-ink-1">-44%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <ScrollAnimatedSection key={idx} delay={idx * 0.1}>
              <MetricCard {...metric} />
            </ScrollAnimatedSection>
          ))}
        </div>
      </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const QuickstartSection = () => {
  return (
    <ScrollAnimatedSection>
      <section className="relative w-full section-pad bg-transparent overflow-hidden">
      <div className="site-container relative z-10">
        <div className="w-fit px-6 py-2 rounded-full bg-white/5 border border-white/10 shadow-xl mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-ink-1">Quickstart</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">
          <div className="lg:w-1/2 flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink-1 font-display tracking-tight leading-[1.02]">
              You can deploy it with just a few simple lines of code
            </h2>
            <p className="text-lg md:text-xl text-ink-2 font-body leading-relaxed max-w-xl">
              Whether you're using MemContext in Coze, n8n, via the MCP protocol, or as a Skill, simply follow the installation guide—and you'll have it up and running smoothly and successfully
            </p>
          </div>
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-[2rem] overflow-hidden bg-surface-dark border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-primary/40 group-hover:scale-[1.01]">
                <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
                      <Copy size={10} className="text-slate-400" />
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-10 overflow-x-auto">
                  <pre className="font-mono text-base lg:text-lg leading-relaxed space-y-4">
                    <code className="block">
                      <span className="text-slate-500">#Create a Python virtual environment</span><br />
                      <span className="text-blue-400">conda</span> create <span className="text-cyan-300">-n</span> memcontext python<span className="text-orange-400">=3.10 -y</span><br />
                      <span className="text-blue-400">conda</span> activate memcontext
                    </code>
                    <code className="block mt-6">
                      <span className="text-slate-500">#Install dependencies by loading</span><br />
                      <span className="text-slate-500">requirements.txt from the root directory.</span><br />
                      <span className="text-cyan-300">pip</span> install <span className="text-orange-400">-r</span> requirements.txt
                    </code>
                    <code className="block mt-6">
                      <span className="text-slate-500">#Create a .env file in the memdemo directory</span><br />
                      <span className="text-slate-500">and add your secrets as shown in the</span><br />
                      <span className="text-slate-500">example.</span>
                    </code>
                    <code className="block mt-6">
                      <span className="text-slate-500">#Run the AI conversation demo with memory</span><br />
                      <span className="text-slate-500">functionality.</span><br />
                      <span className="text-cyan-300">cd</span> memdemo<br />
                      <span className="text-slate-500">#Default port: 5019</span><br />
                      <span className="text-blue-400">python</span> app.py
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const FinalCTASection = () => {
  return (
    <ScrollAnimatedSection>
      <section className="relative w-full section-pad bg-transparent overflow-hidden flex justify-center">
      <div className="site-container flex justify-center">
        <div className="relative w-full max-w-4xl bg-surface-dark rounded-[3rem] border border-white/10 p-12 md:p-20 flex flex-col items-center text-center overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#178db515_0%,_transparent_70%)] opacity-50"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink-1 font-display tracking-tight mb-6 relative z-10 leading-none">
          Ready to evolve?
        </h2>
        
        <p className="text-lg md:text-xl text-ink-2 font-body max-w-2xl mb-12 relative z-10">
          Join developers building the next generation of intelligent AI.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center relative z-10">
          <a 
            href="https://github.com/memcontext/memcontext" 
            target="_blank" 
            rel="noreferrer"
            className="btn-primary text-base md:text-lg"
          >
            <Github size={28} />
            Get Started on GitHub
          </a>
          
          <Link 
            to="/docs" 
            className="btn-secondary text-base md:text-lg"
          >
            Read the Docs
          </Link>
        </div>

        {/* Subtle decorative grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>
      </div>
      </section>
    </ScrollAnimatedSection>
  );
};

const Home: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [workEmail, setWorkEmail] = useState(''); // 添加状态来存储输入的email
  const [emailError, setEmailError] = useState(''); // 添加错误状态
  const navigate = useNavigate(); // 添加useNavigate钩子
  const words = ["coze", "n8n", "Claude", "dify"];

  // 处理输入变化
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkEmail(e.target.value);
    // 清除错误当用户开始输入
    if (emailError) {
      setEmailError('');
    }
  };

  // 处理Get Started按钮点击
  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 自定义验证
    if (!workEmail.trim()) {
      setEmailError('Please enter your work email');
      return;
    }
    
    // 清除错误并提交
    setEmailError('');
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      navigate('/dashboard?tab=api-keys');
      return;
    }
    // 未登录：跳转到/join页面，并将email作为state传递
    navigate('/join', { state: { email: workEmail } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full relative"
      style={{
        background: 'var(--bg-background)'
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[36%] w-[1400px] h-[1400px] rounded-full blur-[180px] opacity-90"
          style={{ background: 'rgba(23,141,181,0.28)' }}
        ></div>
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[18%] w-[900px] h-[900px] rounded-full blur-[120px] opacity-85"
          style={{ background: 'rgba(23,141,181,0.45)' }}
        ></div>
      </div>
      <section className="relative w-full min-h-screen flex flex-col justify-center bg-transparent overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-transparent z-10 pointer-events-none"></div>
        {/* Grid removed for cleaner hero */}
        {/* Removed bottom band to avoid visual seam between sections */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <FloatingLogo icon={VscVscode} top="12%" left="8%" delay="0s" color="#38bdf8" rotate={-12} size={44} />
            <FloatingLogo icon={SiAnthropic} top="40%" left="4%" delay="-8s" color="#fb923c" rotate={8} size={40} />
            <FloatingLogo icon={SiGithub} top="72%" left="10%" delay="-4s" color="#ffffff" rotate={-5} size={44} />
            <FloatingLogo icon={SiNotion} top="18%" right="8%" delay="-10s" color="#ffffff" rotate={10} size={42} />
            <FloatingLogo icon={CursorLogo} top="62%" right="8%" delay="-2s" color="#ffffff" rotate={-15} size={40} />
        </div>
        <div className="relative z-10 w-full site-container flex flex-col items-center px-4 sm:px-6 md:px-8 -mt-4 md:-mt-8 gap-8 sm:gap-10 md:gap-12">
          <ScrollAnimatedSection threshold={0.2}>
            <h1 className="flex flex-col items-center justify-center font-display font-black tracking-tight leading-[1.1] w-full text-center">
              <span className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-ink-1 drop-shadow-2xl pb-2 sm:pb-3 md:pb-5 px-2 sm:px-0">
                <span className="block sm:inline">Memory-Centric Context</span>{' '}
                <span className="block sm:inline">For</span>
              </span>
              <div className="flex flex-nowrap items-center justify-center mt-4 sm:mt-6 text-center">
                <div className="relative inline-block text-center w-[2ch] min-[375px]:w-[2.5ch] sm:w-[3.5ch] md:w-[4ch] lg:w-[4.5ch] min-w-[100px] min-[375px]:min-w-[120px] sm:min-w-[180px] md:min-w-[280px] lg:min-w-[360px]">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span 
                      className={`text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-cyan-300 inline-block py-1 sm:py-2 leading-tight transition-all duration-500 transform drop-shadow-[0_0_60px_rgba(34,211,238,0.7)] ${
                        isFading ? 'opacity-0 -translate-x-8 scale-95 blur-md' : 'opacity-100 translate-x-0 scale-100 blur-0'
                      }`}
                    >
                      {words[wordIndex]}
                    </span>
                  </span>
                </div>
              </div>
            </h1>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection delay={0.1} threshold={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-ink-2 text-center max-w-2xl leading-relaxed px-4 sm:px-6 md:px-0">
              Give agents persistent, multimodal memory across sessions — built for precision retrieval, real-time updates, and scale.
            </p>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection delay={0.2} threshold={0.2}>
            <div className="relative w-full max-w-lg px-4 sm:px-0">
            <svg
              className="pointer-events-none absolute -inset-[6px] w-[calc(100%+12px)] h-[calc(100%+12px)] overflow-visible"
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="emailGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.0)" />
                  <stop offset="35%" stopColor="rgba(34, 211, 238, 0.9)" />
                  <stop offset="70%" stopColor="rgba(168, 85, 247, 0.9)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0.0)" />
                </linearGradient>
                <filter id="emailGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect
                x="4"
                y="10"
                width="992"
                height="100"
                rx="50"
                ry="50"
                fill="none"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="4"
                filter="url(#emailGlow)"
              />
              <rect
                x="4"
                y="10"
                width="992"
                height="100"
                rx="50"
                ry="50"
                fill="none"
                stroke="url(#emailGlowGradient)"
                strokeWidth="4"
                strokeDasharray="18 82"
                strokeLinecap="round"
                pathLength="100"
                filter="url(#emailGlow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-100"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
            {/* 添加form标签包裹输入框和按钮，并添加noValidate属性 */}
            <form onSubmit={handleJoinWaitlist} className="relative z-10 w-full" noValidate>
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl sm:rounded-full backdrop-blur-md shadow-2xl focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="flex items-center gap-2 flex-1 px-3 sm:pl-5 sm:pr-2 py-1 sm:py-0">
                  <div className="text-ink-3 flex-shrink-0">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your work email" 
                    value={workEmail}
                    onChange={handleEmailChange}
                    className="flex-1 bg-transparent border-none outline-none text-ink-1 placeholder:text-ink-3 font-medium text-sm sm:text-base px-1 sm:px-2 py-2 sm:py-3 min-w-0"
                    onInvalid={(e) => {
                      e.preventDefault(); // 阻止浏览器默认验证提示
                      if (!workEmail.trim()) {
                        setEmailError('Please enter your work email');
                      }
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-xl sm:rounded-full hover:bg-primaryHover transition-all active:scale-95 whitespace-nowrap text-sm sm:text-base sm:mr-1 w-full sm:w-auto"
                >
                  Get Started
                </button>
              </div>
              {emailError && (
                <div className="text-red-400 text-xs sm:text-sm mt-2 text-center font-medium">
                  {emailError}
                </div>
              )}
            </form>
            </div>
          </ScrollAnimatedSection>
          <ScrollAnimatedSection delay={0.3} threshold={0.2}>
            <p className="text-ink-3 text-xs sm:text-sm mt-4 text-center font-medium px-4 sm:px-0">
              Join 2,000+ developers building the future of AI.
            </p>
          </ScrollAnimatedSection>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/20 blur-[100px] pointer-events-none"></div>
      </section>
      <MetricsSection />
      <EnterpriseScaleHeadlineSection />
      <PlatformCompatibilitySection />
      <AdvantagesSection />
      <FeaturesSection />
      <ExamplesSection />
      <QuickstartSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
