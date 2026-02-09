import React from 'react';
import * as Progress from '@radix-ui/react-progress';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { 
  LayoutDashboard, 
  Key, 
  CreditCard, 
  Building, 
  Settings, 
  HelpCircle, 
  ChevronDown,
  Search,
  LogOut,
  User,
  Plus,
  Sun,
  Moon,
  Monitor,
  Rocket,
  LineChart,
  Brain,
  ExternalLink
} from 'lucide-react';
import { Page } from '../types';
import { Theme } from '../App';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  userName: string;
  userEmail: string;
  userInitial: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  onLogout,
  theme,
  onThemeChange,
  userName,
  userEmail,
  userInitial,
}) => {
  
  const navItems = [
    { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Page.API_KEYS, label: 'API Keys', icon: Key },
    { id: Page.MEMORIES, label: 'Memories', icon: Brain },
    { id: Page.BILLING, label: 'Usage & Billing', icon: CreditCard },
  ];

  const bottomItems = [
    { id: Page.ADVANCED_SETTINGS, label: 'Advanced Settings', icon: Settings }, 
    { id: Page.DOCS, label: 'Docs', icon: HelpCircle },
  ];

  // 处理 Docs 点击事件
  const handleDocsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open('https://memcontext.ai/docs', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-border flex flex-col flex-shrink-0 text-sm transition-colors duration-300">
      {/* Header / Org Switcher */}
      <div className="p-4 border-b border-border">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-full flex items-center justify-between text-textMain hover:bg-surfaceHighlight p-2 rounded transition-colors outline-none">
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm">NeuroBot</span>
                <span className="text-xs text-textMuted">Free Plan</span>
              </div>
              <ChevronDown className="w-4 h-4 text-textMuted" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="min-w-[220px] bg-card border border-border rounded-md shadow-xl p-1 z-50">
              <DropdownMenu.Item className="text-textMain flex items-center px-2 py-2 hover:bg-surfaceHighlight rounded cursor-pointer outline-none">
                <Building className="w-4 h-4 mr-2" />
                <span>NeuroBot</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-[1px] bg-border my-1" />
              <DropdownMenu.Item className="text-textMain flex items-center px-2 py-2 hover:bg-surfaceHighlight rounded cursor-pointer outline-none">
                <Plus className="w-4 h-4 mr-2" />
                <span>Create Organization</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Main Nav */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
              activePage === item.id 
                ? 'text-textMain bg-surfaceHighlight' 
                : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight'
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </button>
        ))}

        <div className="my-4 border-t border-border mx-3" />

        {bottomItems.map((item) => {
          // 单独处理 Docs，使用外部链接
          if (item.id === Page.DOCS) {
            return (
              <button
                key={item.id}
                onClick={handleDocsClick}
                className="w-full flex items-center px-3 py-2 rounded-md transition-colors text-textMuted hover:text-textMain hover:bg-surfaceHighlight group"
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
                <ExternalLink className="w-3 h-3 ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          }
          
          // 其他项目保持原样
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                activePage === item.id 
                  ? 'text-textMain bg-surfaceHighlight' 
                  : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight'
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Footer / Usage */}
      <div className="p-4 border-t border-border bg-sidebar">
        
        {/* User Profile */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-full flex items-center justify-between group outline-none">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">
                  {userInitial}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm text-textMain font-medium">{userName}</span>
                  <span className="text-xs text-textMuted truncate w-32">{userEmail}</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-textMuted group-hover:text-textMain" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              side="right"
              align="end"
              sideOffset={10}
              className="min-w-[280px] bg-card border border-border rounded-xl shadow-2xl p-0 z-50 animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Header Section */}
              <div className="p-4 border-b border-border flex justify-between items-start">
                  <div className="flex flex-col space-y-1">
                  <span className="text-sm font-semibold text-textMain">{userName}</span>
                  <span className="text-xs text-textMuted">{userEmail}</span>
                  </div>
                  <DropdownMenu.Item onClick={onLogout} className="text-textMuted hover:text-textMain cursor-pointer outline-none">
                       <LogOut className="w-4 h-4" />
                  </DropdownMenu.Item>
              </div>

              {/* Organization Section */}
              <div className="p-4 space-y-3 border-b border-border">
                  <div className="space-y-1.5">
                      <div className="text-xs text-textMuted font-medium">Organization ID</div>
                      <div className="text-xs text-textMuted font-mono tracking-wide select-all">
                          u5FG65e9NYVJd6wJzpya4m
                      </div>
                  </div>
                  
                  <DropdownMenu.Item className="flex items-center text-sm font-medium text-textMain hover:text-textMuted transition-colors cursor-pointer outline-none gap-2 pt-1">
                      <Plus className="w-4 h-4" />
                      Create Organization
                  </DropdownMenu.Item>
              </div>

              {/* Theme Section */}
              <div className="p-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-textMain">Theme</span>
                  <div className="flex bg-background border border-border rounded-md p-1 gap-1">
                       <button 
                         onClick={() => onThemeChange('light')}
                         className={`p-1.5 rounded transition-colors ${theme === 'light' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight'}`}
                       >
                          <Sun className="w-3.5 h-3.5" />
                      </button>
                       <button 
                         onClick={() => onThemeChange('dark')}
                         className={`p-1.5 rounded transition-colors ${theme === 'dark' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight'}`}
                       >
                          <Moon className="w-3.5 h-3.5" />
                      </button>
                       <button 
                         onClick={() => onThemeChange('system')}
                         className={`p-1.5 rounded transition-colors ${theme === 'system' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight'}`}
                       >
                          <Monitor className="w-3.5 h-3.5" />
                      </button>
                  </div>
              </div>

            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Sidebar;