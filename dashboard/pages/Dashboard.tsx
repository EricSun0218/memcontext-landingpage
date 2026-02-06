
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Page } from '../types';

// Mock Data
const usageData = [
  { day: 'Wed', val: 4000 },
  { day: 'Thu', val: 6500 },
  { day: 'Fri', val: 9800 },
  { day: 'Sat', val: 5200 },
  { day: 'Sun', val: 7600 },
  { day: 'Mon', val: 10900 },
  { day: 'Tue', val: 9000 },
];

const requestTypesData = [
  { name: 'add_memory', value: 50, color: '#3B82F6' },
  { name: 'retrieve_memory', value: 35, color: '#8B5CF6' },
  { name: 'get_user_profile', value: 15, color: '#10B981' },
];

interface DashboardProps {
    onNavigate: (page: Page) => void;
    onViewProject: (project: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({onNavigate, onViewProject}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-background p-8 pt-16 transition-colors duration-300">
      {/* Top Header / Sub-nav */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-textMain">Overview</h1>
        
        {/* Time Filter */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-input border border-border rounded text-sm text-textMain hover:border-textMuted transition-colors">
              <span>Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>
           <DropdownMenu.Portal>
            <DropdownMenu.Content className="min-w-[150px] bg-card border border-border rounded-md shadow-xl p-1 z-50 text-sm">
              <DropdownMenu.Item className="text-textMain px-2 py-1.5 hover:bg-surfaceHighlight rounded cursor-pointer outline-none">Last 24 hours</DropdownMenu.Item>
              <DropdownMenu.Item className="text-textMain px-2 py-1.5 hover:bg-surfaceHighlight rounded cursor-pointer outline-none">Last 7 days</DropdownMenu.Item>
              <DropdownMenu.Item className="text-textMain px-2 py-1.5 hover:bg-surfaceHighlight rounded cursor-pointer outline-none">Last 30 days</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Stat 1 */}
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-sm text-textMuted">Tokens Processed</span>
            <span className="text-[10px] bg-surfaceHighlight px-2 py-0.5 rounded-full text-textMuted">53.0K / 1.0M</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-textMain mb-1">53.0K</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +100%
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-sm text-textMuted">Search Queries</span>
            <span className="text-[10px] bg-surfaceHighlight px-2 py-0.5 rounded-full text-textMuted">1.2K / 10.0K</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-textMain mb-1">1,204</div>
             <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +24%
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-sm text-textMuted">Memories Created</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-textMain mb-1">8</div>
             <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +300%
            </div>
          </div>
        </div>
      </div>

      {/* Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 h-[350px]">
        {/* Projects (formerly Distribution) */}
        <div className="bg-card border border-border rounded-lg flex flex-col">
            <div className="p-6">
                <h3 className="w-full text-left text-sm font-medium text-textMain">Projects</h3>
            </div>
            
            <div className="flex flex-col w-full">
                {/* Project Item 1 */}
                <div 
                    onClick={() => onViewProject('sm_project')}
                    className="flex flex-col space-y-1 px-6 py-4 hover:bg-surfaceHighlight transition-colors cursor-pointer border-t border-border"
                >
                    <div className="flex justify-between text-xs">
                        <span className="text-textMain font-medium">sm_project</span>
                        <span className="text-textMuted">233 memories</span>
                    </div>
                </div>

                {/* Project Item 2 */}
                <div 
                    onClick={() => onViewProject('default_project')}
                    className="flex flex-col space-y-1 px-6 py-4 hover:bg-surfaceHighlight transition-colors cursor-pointer border-t border-border"
                >
                    <div className="flex justify-between text-xs">
                        <span className="text-textMain font-medium">default_project</span>
                        <span className="text-textMuted">128 memories</span>
                    </div>
                </div>
            </div>
            <div className="mb-auto"></div>
        </div>

        {/* Token Usage Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-medium text-textMain mb-1">Token Usage</h3>
            <p className="text-xs text-textMuted mb-6">53,000 tokens processed over the last 7 days</p>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                        <XAxis 
                            dataKey="day" 
                            stroke="var(--text-muted)" 
                            tick={{fill: 'var(--text-muted)', fontSize: 12}} 
                            axisLine={false} 
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis 
                            stroke="var(--text-muted)" 
                            tick={{fill: 'var(--text-muted)', fontSize: 12}} 
                            axisLine={false} 
                            tickLine={false}
                            dx={-10}
                            tickFormatter={(value) => `${value/1000}k`}
                            tickCount={5}
                        />
                        <Tooltip 
                            contentStyle={{backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)'}}
                            itemStyle={{color: 'var(--text-main)'}}
                        />
                        <Line type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{r: 4}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Request Types Pie */}
        <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
            <h3 className="text-sm font-medium text-textMain mb-1">Request Types</h3>
            <p className="text-xs text-textMuted mb-4">Distribution of API request types</p>
            <div className="flex-1 min-h-0 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={requestTypesData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {requestTypesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 flex-wrap gap-4">
                {requestTypesData.map((entry) => (
                    <div key={entry.name} className="flex items-center text-xs text-textMuted">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
