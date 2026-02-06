import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Twitter, Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  isDark: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleTheme, isDark }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Docs', path: '/docs' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const logoUrl = "/logo/logo.png";

  return (
    <div className="min-h-screen flex flex-col font-body bg-background-dark text-ink-1">
      {/* 修复的导航栏 - 关键修改在这里！ */}
      <nav 
        className={`sticky top-0 z-50 w-full bg-black backdrop-blur transition-all duration-300 ${
          scrolled 
            ? 'border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]' 
            : 'border-b border-transparent'
        }`}
      >
        <div className="site-container">
          <div className="relative flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-transparent rounded-lg flex items-center justify-center text-primary group-hover:scale-105 transition-transform overflow-hidden relative border border-white/20 shadow-[0_0_22px_rgba(23,141,181,0.45)]">
                <img 
                  src={logoUrl} 
                  alt="MemContext Logo" 
                  className="w-full h-full object-cover brightness-150 contrast-125 saturate-150 drop-shadow-[0_0_10px_rgba(23,141,181,0.45)] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary/30 mix-blend-overlay"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-ink-1 font-display">
                MemContext
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-ink-2 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Join Waitlist 按钮 - 添加到这里！ */}
              <Link
                to="/join"
                className="btn-primary text-sm"
              >
                Join Waitlist
              </Link>
              
              <button
                onClick={toggleTheme}
                className="p-2 text-ink-2 hover:text-primary transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <a 
                href="https://github.com/memcontext/memcontext" 
                target="_blank" 
                rel="noreferrer"
                className="hidden md:flex p-2 text-ink-3 hover:text-ink-1 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github size={22} />
              </a>

              <button
                className="md:hidden text-slate-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-background-darker">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-base font-medium text-ink-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* 移动端 Join Waitlist 按钮 */}
              <Link
                to="/join"
                className="w-full py-3 flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-lg hover:bg-primaryHover transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </Link>
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <a 
                  href="https://github.com/memcontext/memcontext"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 flex items-center justify-center gap-2 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Github size={18} />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="flex-grow bg-background-dark">
        {children}
      </div>

      <footer className="bg-background-darker border-t border-white/10 text-ink-3 py-12">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4 text-ink-1">
                <div className="w-9 h-9 bg-transparent rounded-lg flex items-center justify-center text-primary overflow-hidden relative border border-white/20 shadow-[0_0_22px_rgba(23,141,181,0.45)]">
                  <img 
                    src={logoUrl} 
                    alt="MemContext Logo" 
                    className="w-full h-full object-cover brightness-150 contrast-125 saturate-150 drop-shadow-[0_0_10px_rgba(23,141,181,0.45)] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/30 mix-blend-overlay"></div>
                </div>
                <span className="font-bold text-lg font-display tracking-tight">MemContext</span>
              </div>
              <p className="text-sm mb-4 leading-relaxed">
                MemContext: The next-generation multi-modal memory framework for AI Agents. Empowering autonomous agents with 0.1s precision spatio-temporal retrieval and evolution-capable long-term memory across video, audio, and documents.
              </p>
            </div>
            <div>
              <h6 className="text-ink-1 font-bold mb-4 font-display">Company</h6>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-ink-1 font-bold mb-4 font-display">Resources</h6>
              <ul className="space-y-2 text-sm">
                <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-ink-1 font-bold mb-4 font-display">Legal</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2026 MemContext Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/memcontext/memcontext"
                target="_blank"
                rel="noreferrer"
                aria-label="Github"
                className="text-ink-3 hover:text-ink-1 transition-colors"
              >
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-ink-3 hover:text-ink-1 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
