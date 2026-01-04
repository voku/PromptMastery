import React, { useState, useEffect, useRef } from 'react';
import { TECHNIQUES } from '../constants';
import * as Icons from 'lucide-react';
import { Menu, X, Sun, Moon, Home } from 'lucide-react';

interface LayoutProps {
  currentTechniqueId: string | null;
  onNavigate: (id: string | null) => void;
  children: React.ReactNode;
  completedIds: string[];
}

export const Layout: React.FC<LayoutProps> = ({ currentTechniqueId, onNavigate, children, completedIds }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Scroll to top of main content when navigating
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentTechniqueId]);

  const categories = Array.from(new Set(TECHNIQUES.map(t => t.category)));

  const totalProgress = Math.round((completedIds.length / TECHNIQUES.length) * 100);

  return (
    <div className={`h-screen flex flex-col md:flex-row overflow-hidden ${isDark ? 'dark' : ''}`}>
      {/* Mobile Header */}
      <div className="md:hidden flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center z-40 relative shadow-sm">
        <span 
          onClick={() => onNavigate(null)}
          className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-teal-500 cursor-pointer select-none"
        >
          PromptMastery
        </span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out flex flex-col shadow-xl md:shadow-none
        md:relative md:translate-x-0 vt-sidebar
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="hidden md:flex items-center gap-2 mb-8 cursor-pointer select-none" onClick={() => onNavigate(null)}>
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-sm">PM</div>
             <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">PromptMastery</span>
          </div>
          
          {/* Mobile-only close button header inside sidebar for better UX */}
          <div className="md:hidden flex items-center justify-between mb-6">
             <span className="font-bold text-lg text-gray-900 dark:text-white">Menu</span>
             <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-gray-500">
                <X size={20} />
             </button>
          </div>

          <div className="mb-6 flex-shrink-0">
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <span>Course Progress</span>
              <span>{totalProgress}%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${totalProgress}%` }} />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 space-y-6">
            
            {/* Start Page Link */}
            <div>
               <button
                  onClick={() => { onNavigate(null); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition-colors text-left
                    ${currentTechniqueId === null
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <Home size={18} className={currentTechniqueId === null ? 'text-brand-500' : 'text-gray-400'} />
                  <span className="leading-snug">Start Page</span>
                </button>
            </div>

            {categories.map(category => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pl-3">{category}</h3>
                <ul className="space-y-1">
                  {TECHNIQUES.filter(t => t.category === category).map(tech => {
                    // Dynamic Icon
                    const IconComponent = (Icons as any)[tech.icon] || Icons.Circle;
                    const isActive = currentTechniqueId === tech.id;
                    const isCompleted = completedIds.includes(tech.id);

                    return (
                      <li key={tech.id}>
                        <button
                          onClick={() => { onNavigate(tech.id); setIsSidebarOpen(false); }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors group text-left
                            ${isActive 
                              ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent size={18} className={`flex-shrink-0 transition-colors ${isActive ? 'text-brand-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                            <span className="leading-snug">{tech.title}</span>
                          </div>
                          {isCompleted && <Icons.Check size={14} className="text-green-500 flex-shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
            <span className="text-sm font-medium text-gray-500">Appearance</span>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        ref={mainRef}
        className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 md:p-8 lg:p-12 relative w-full scroll-smooth vt-content"
      >
        {children}
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};