import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import AboutUs from './pages/AboutUs';
import Research from './pages/Research';
import Sidebar from './dashboard/components/Sidebar';
import Login from './dashboard/pages/Login';
import Dashboard from './dashboard/pages/Dashboard';
import Requests from './dashboard/pages/Requests';
import ApiKeys from './dashboard/pages/ApiKeys';
import Billing from './dashboard/pages/Billing';
import Memories from './dashboard/pages/Memories';
import ImportDataModal from './dashboard/components/ImportDataModal';
import { Menu } from 'lucide-react';
import { supabase } from './dashboard/lib/supabaseClient';
import { Page } from './dashboard/types';

export type Theme = 'dark' | 'light' | 'system';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const DashboardApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [memoriesFilter, setMemoriesFilter] = useState<string>('Overview');
  const [authUser, setAuthUser] = useState<{ email?: string | null; name?: string | null } | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (data.session?.user) {
        const user = data.session.user;
        setAuthUser({
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        });
        setCurrentPage(Page.DASHBOARD);
      } else {
        setAuthUser(null);
        setCurrentPage(Page.LOGIN);
      }
    };

    syncSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = session.user;
        setAuthUser({
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        });
        setCurrentPage(Page.DASHBOARD);
      } else {
        setAuthUser(null);
        setCurrentPage(Page.LOGIN);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const userEmail = authUser?.email ?? '';
  const userName = authUser?.name || (userEmail ? userEmail.split('@')[0] : 'User');
  const userInitial = userName ? userName[0].toUpperCase() : 'U';

  const handleLogin = () => {
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setCurrentPage(Page.LOGIN);
  };

  const handleNavigate = (page: Page) => {
    if (page === Page.IMPORT_DATA) {
      setIsImportModalOpen(true);
    } else {
      setCurrentPage(page);
    }
  };

  const handleViewProject = (project: string) => {
    setMemoriesFilter(project);
    setCurrentPage(Page.MEMORIES);
  };

  if (currentPage === Page.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-background text-textMain overflow-hidden transition-colors duration-300">
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-surfaceHighlight rounded text-textMain"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 absolute lg:relative z-40 h-full`}>
        <Sidebar 
          activePage={currentPage} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          theme={theme}
          onThemeChange={setTheme}
          userName={userName}
          userEmail={userEmail}
          userInitial={userInitial}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-background h-full relative transition-colors duration-300">
        {currentPage === Page.DASHBOARD && (
           <div className="px-8 pt-6 pb-0 flex space-x-6 border-b border-border bg-background z-10">
               <button className="pb-2 text-sm font-medium text-textMain border-b-2 border-textMuted">Overview</button>
               <button onClick={() => setCurrentPage(Page.REQUESTS)} className="pb-2 text-sm font-medium text-textMuted hover:text-textMain transition-colors">Requests</button>
           </div>
        )}

        {currentPage === Page.REQUESTS && (
           <div className="px-8 pt-6 pb-0 flex space-x-6 border-b border-border bg-background z-10">
               <button onClick={() => setCurrentPage(Page.DASHBOARD)} className="pb-2 text-sm font-medium text-textMuted hover:text-textMain transition-colors">Overview</button>
               <button className="pb-2 text-sm font-medium text-textMain border-b-2 border-textMuted">Requests</button>
           </div>
        )}

        <div className="flex-1 flex overflow-hidden relative">
          {currentPage === Page.DASHBOARD && <Dashboard onNavigate={setCurrentPage} onViewProject={handleViewProject} />}
          {currentPage === Page.REQUESTS && <Requests />}
          {currentPage === Page.MEMORIES && <Memories initialView={memoriesFilter} />}
          {currentPage === Page.API_KEYS && <ApiKeys />}
          {currentPage === Page.BILLING && <Billing />}
          {currentPage === Page.ADVANCED_SETTINGS && (
            <div className="flex-1 flex items-center justify-center text-textMuted">Advanced Settings Module Coming Soon</div>
          )}
          {currentPage === Page.DOCS && (
            <div className="flex-1 flex items-center justify-center text-textMuted">Docs Module Coming Soon</div>
          )}
        </div>
      </div>

      <ImportDataModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </div>
  );
};

const MainWebsiteApp: React.FC<{ toggleTheme: () => void; isDark: boolean }> = ({ toggleTheme, isDark }) => {
  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<MainWebsiteApp toggleTheme={toggleTheme} isDark={darkMode} />} />
        <Route path="/dashboard/*" element={<DashboardApp />} />
        <Route 
          path="/join" 
          element={<Login onLogin={() => {
            // 登录成功后跳转到仪表板
            window.location.href = '/dashboard';
          }} />} 
        />
        <Route 
          path="/login" 
          element={<Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/register" 
          element={<Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/signup" 
          element={<Navigate to="/dashboard" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;