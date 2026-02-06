
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Clock, 
  User, 
  Trash2, 
  RefreshCcw,
  Calendar,
  Filter,
  Check,
  X,
  Layout,
  Download
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface Memory {
  id: number;
  createdAt: string;
  entity: string;
  content: string;
  category: {
    name: string;
    color: string;
    count?: number;
  };
}

const mockMemories: Memory[] = [
  { 
    id: 1, 
    createdAt: '2026/01/28 16:15:30', 
    entity: 'default', 
    content: 'Kieran is an AI product manager intern.', 
    category: { name: 'professional_details', color: '#10B981' } 
  },
  { 
    id: 2, 
    createdAt: '2026/01/28 14:20:15', 
    entity: 'default', 
    content: "User's name is Kieran", 
    category: { name: 'personal_details', color: '#3B82F6' } 
  },
  { 
    id: 3, 
    createdAt: '2026/01/27 18:30:45', 
    entity: 'playground', 
    content: 'I am an AI product manager based in Beijing, working in the AI ind...', 
    category: { name: 'professional_details', color: '#10B981' } 
  },
  { 
    id: 4, 
    createdAt: '2026/01/27 09:12:33', 
    entity: 'playground', 
    content: 'I work at NeuroBot', 
    category: { name: 'professional_details', color: '#10B981' } 
  },
];

interface MemoriesProps {
    initialView?: string;
}

const Memories: React.FC<MemoriesProps> = ({ initialView = 'Overview' }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState('All Time');
  const [activeView, setActiveView] = useState(initialView);

  const toggleSelectAll = () => {
    if (selectedIds.length === mockMemories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockMemories.map(m => m.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    console.log('Deleting:', selectedIds);
    // Logic to delete selected items would go here
    setSelectedIds([]);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background p-8 transition-colors duration-300 relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-textMain">Memories</h1>
      </div>

      {/* Filters & Toolbar */}
      <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
              {/* Left Group: Combined Project/View Selector */}
              <div className="flex items-center bg-card border border-border rounded-lg p-1 gap-1">
                  <button 
                    onClick={() => setActiveView('Overview')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'Overview' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight/50'}`}
                  >
                      <Layout className="w-4 h-4" />
                      Overview
                  </button>
                  <div className="w-[1px] h-4 bg-border mx-1"></div>
                  
                  <button 
                    onClick={() => setActiveView('sm_project')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${activeView === 'sm_project' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight/50'}`}
                  >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      sm_project
                  </button>
                  <button 
                    onClick={() => setActiveView('default_project')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${activeView === 'default_project' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight/50'}`}
                  >
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      default_project
                  </button>
              </div>

              {/* Right Group: Time, Export, Refresh */}
              <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-card border border-border rounded text-sm text-textMain flex items-center gap-2 hover:bg-surfaceHighlight transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      Export
                  </button>

                  <div className="flex items-center bg-card border border-border rounded overflow-hidden">
                      {['All Time', '1d', '7d', '30d'].map((range) => (
                          <button 
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${dateRange === range ? 'bg-surfaceHighlight text-textMain' : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight/50'}`}
                          >
                              {range}
                          </button>
                      ))}
                  </div>

                  <button className="px-3 py-1.5 bg-card border border-border rounded text-sm text-textMain flex items-center gap-2 hover:bg-surfaceHighlight transition-colors">
                      <RefreshCcw className="w-3.5 h-3.5" />
                      Refresh
                  </button>
              </div>
          </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden flex-1">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-surfaceHighlight/30 text-xs font-semibold text-textMuted uppercase tracking-wider items-center">
            <div className="col-span-1 flex justify-center">
                 <div 
                    onClick={toggleSelectAll}
                    className={`w-4 h-4 border border-border rounded cursor-pointer flex items-center justify-center transition-colors ${selectedIds.length > 0 && selectedIds.length === mockMemories.length ? 'bg-primary border-primary' : 'bg-input hover:border-textMuted'}`}
                >
                    {selectedIds.length > 0 && selectedIds.length === mockMemories.length && <Check className="w-3 h-3 text-white" />}
                </div>
            </div>
            <div className="col-span-2 flex items-center gap-2"><Clock className="w-3.5 h-3.5"/> Created At</div>
            <div className="col-span-2 flex items-center gap-2"><User className="w-3.5 h-3.5"/> Entities</div>
            <div className="col-span-4 flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> Memory Content</div>
            <div className="col-span-2 flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> Categories</div>
            <div className="col-span-1 text-right flex justify-end gap-2">Delete</div>
        </div>

        {mockMemories.map((mem) => {
             const isSelected = selectedIds.includes(mem.id);
             return (
                <div 
                    key={mem.id} 
                    className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-sm hover:bg-surfaceHighlight transition-colors items-center group ${isSelected ? 'bg-surfaceHighlight/50' : ''}`}
                >
                     <div className="col-span-1 flex justify-center">
                        <div 
                            onClick={() => toggleSelect(mem.id)}
                            className={`w-4 h-4 border border-border rounded cursor-pointer flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'bg-input hover:border-textMuted'}`}
                        >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                    </div>
                    <div className="col-span-2 text-textMain text-sm font-mono tracking-tight">{mem.createdAt}</div>
                    <div className="col-span-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-input border border-border text-textMuted text-xs">
                            <User className="w-3 h-3" />
                            {mem.entity}
                        </span>
                    </div>
                    <div className="col-span-4 text-textMain truncate pr-4">
                        {mem.content}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                         <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-input text-xs font-medium text-textMuted">
                            <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: mem.category.color}}></div>
                            {mem.category.name}
                        </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                        <button className="text-textMuted hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
             );
        })}
      </div>

       {/* Bulk Actions Floating Bar */}
       {selectedIds.length > 0 && (
            <div className="fixed bottom-8 left-[60%] transform -translate-x-1/2 bg-card border border-border shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-4 fade-in duration-200 z-50">
                <div className="flex items-center gap-2">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{selectedIds.length}</span>
                    <span className="text-sm font-medium text-textMain">selected</span>
                </div>
                <div className="h-4 w-[1px] bg-border"></div>
                <button 
                    onClick={handleDeleteSelected}
                    className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete memories
                </button>
                    <button 
                    onClick={() => setSelectedIds([])}
                    className="text-textMuted hover:text-textMain ml-2"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        )}
    </div>
  );
};

export default Memories;
