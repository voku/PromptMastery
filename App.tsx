import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { TechniqueView } from './components/TechniqueView';
import { TECHNIQUES } from './constants';
import * as Icons from 'lucide-react';
import { ArrowRight, Terminal, Copy, Check, CheckCircle, Tag, AlertCircle, X, Sparkles } from 'lucide-react';
import { useClipboard } from './hooks/useClipboard';

// Add type support for View Transitions API which might not be in the TS environment yet
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => { finished: Promise<void> };
  }
}

function App() {
  const [currentTechniqueId, setCurrentTechniqueId] = useState<string | null>(null);
  const [completedTechniques, setCompletedTechniques] = useState<string[]>([]);
  
  // Use a global clipboard hook for the grid listing, or manage IDs locally
  // We'll use a local ID tracker combined with the hook logic for the grid
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { copy } = useClipboard();

  // Load progress from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem('promptMastery_progress');
      if (saved) {
        setCompletedTechniques(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage is unavailable (Private mode or Restricted). Progress will not persist.', e);
    }
  }, []);

  // Helper to handle navigation with view transitions
  const navigateTo = (id: string | null) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setCurrentTechniqueId(id);
      });
    } else {
      setCurrentTechniqueId(id);
    }
  };

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    copy(text).then((success) => {
        if (success) {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    });
  };

  const handleQuizComplete = (score: number) => {
    if (currentTechniqueId && score >= 70) {
      if (!completedTechniques.includes(currentTechniqueId)) {
        const newCompleted = [...completedTechniques, currentTechniqueId];
        setCompletedTechniques(newCompleted);
        
        // Safety wrapper for localStorage write
        try {
          localStorage.setItem('promptMastery_progress', JSON.stringify(newCompleted));
        } catch (e) {
          console.error('Failed to save progress to LocalStorage. Disk full, Private Mode, or Disabled.', e);
        }
      }
    }
  };

  const handleNavigateNext = () => {
    const currentIndex = TECHNIQUES.findIndex(t => t.id === currentTechniqueId);
    if (currentIndex !== -1 && currentIndex < TECHNIQUES.length - 1) {
      navigateTo(TECHNIQUES[currentIndex + 1].id);
    } else {
      navigateTo(null); // Back to home if finished
    }
  };

  const handleNavigatePrev = () => {
    const currentIndex = TECHNIQUES.findIndex(t => t.id === currentTechniqueId);
    if (currentIndex > 0) {
      navigateTo(TECHNIQUES[currentIndex - 1].id);
    } else {
      navigateTo(null);
    }
  };

  const currentTechnique = TECHNIQUES.find(t => t.id === currentTechniqueId);

  // --- RENDER LANDING PAGE ---
  if (!currentTechniqueId) {
    return (
      <Layout currentTechniqueId={null} onNavigate={navigateTo} completedIds={completedTechniques}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16 px-4">
            <div className="mb-6 inline-flex items-center justify-center p-3 bg-gradient-to-br from-brand-500 to-teal-400 rounded-2xl shadow-lg transform -rotate-3">
              <Terminal size={48} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Prompt<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">Mastery</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              The definitive engineering field guide for LLM reliability. Master deterministic patterns through rigorous theory, static code analysis, and pre-calculated optimization examples.
            </p>
            
            <div className="flex justify-center gap-4">
               <button 
                 onClick={() => navigateTo(TECHNIQUES[0].id)}
                 className="px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
               >
                 Start the Course <ArrowRight size={20} />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {TECHNIQUES.map((tech) => {
              const Icon = (Icons as any)[tech.icon] || Icons.Circle;
              const isCompleted = completedTechniques.includes(tech.id);
              
              return (
                <div 
                  key={tech.id}
                  onClick={() => navigateTo(tech.id)}
                  className={`
                    group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all cursor-pointer flex flex-col
                    ${isCompleted ? 'ring-1 ring-green-500/20 bg-green-50/10' : ''}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${isCompleted ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'} group-hover:bg-brand-100 group-hover:text-brand-600 dark:group-hover:bg-brand-900/30 dark:group-hover:text-brand-400 transition-colors`}>
                      <Icon size={24} />
                    </div>
                    {isCompleted && <CheckCircle className="text-green-500" size={20} />}
                  </div>
                  
                  {/* Category tag removed per request */}
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tech.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {tech.shortDescription}
                  </p>

                  {/* PROMPT PREVIEW AREA */}
                  <div className="mt-auto space-y-3 pt-2">
                     {tech.playgroundPrompt && (
                        <div className="relative group/code">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                    <X size={10} className="text-red-400"/> Standard
                                </span>
                                <button 
                                    onClick={(e) => handleCopy(e, tech.playgroundPrompt!, `${tech.id}-standard`)}
                                    className="text-[10px] flex items-center gap-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                                    title="Copy Standard Prompt"
                                >
                                    {copiedId === `${tech.id}-standard` ? <Check size={10} className="text-green-500"/> : <Copy size={10} />}
                                    <span className="sr-only">Copy</span>
                                </button>
                             </div>
                             <div className="bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-2 group-hover/code:border-gray-300 dark:group-hover/code:border-gray-600 transition-colors">
                                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight" title={tech.playgroundPrompt}>
                                    {tech.playgroundPrompt}
                                </p>
                             </div>
                        </div>
                     )}

                     {tech.optimizedPrompt && (
                         <div className="relative group/code">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles size={10} className="text-brand-500"/> Optimized
                                </span>
                                <button 
                                    onClick={(e) => handleCopy(e, tech.optimizedPrompt!, `${tech.id}-optimized`)}
                                    className="text-[10px] flex items-center gap-1 text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors bg-brand-50 dark:bg-brand-900/20 px-1.5 py-0.5 rounded border border-transparent hover:border-brand-200 dark:hover:border-brand-700"
                                    title="Copy Optimized Prompt"
                                >
                                     {copiedId === `${tech.id}-optimized` ? <Check size={10} className="text-green-500"/> : <Copy size={10} />}
                                     <span className="sr-only">Copy</span>
                                </button>
                             </div>
                             <div className="bg-brand-50/50 dark:bg-brand-900/10 rounded border border-brand-100 dark:border-brand-900/30 p-2 group-hover/code:border-brand-200 dark:group-hover/code:border-brand-800 transition-colors">
                                <p className="text-xs font-mono text-gray-700 dark:text-gray-300 line-clamp-3 leading-tight" title={tech.optimizedPrompt}>
                                    {tech.optimizedPrompt}
                                </p>
                             </div>
                         </div>
                     )}
                  </div>
                  
                  {/* ID Tag footer removed per request */}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }

  // --- RENDER TECHNIQUE VIEW ---
  const currentIndex = TECHNIQUES.findIndex(t => t.id === currentTechniqueId);
  const prevTitle = currentIndex > 0 ? TECHNIQUES[currentIndex - 1].title : undefined;
  const nextTitle = currentIndex < TECHNIQUES.length - 1 ? TECHNIQUES[currentIndex + 1].title : undefined;

  return (
    <Layout currentTechniqueId={currentTechniqueId} onNavigate={navigateTo} completedIds={completedTechniques}>
      {currentTechnique ? (
        <TechniqueView 
          technique={currentTechnique}
          onQuizComplete={handleQuizComplete}
          onNext={handleNavigateNext}
          onPrev={handleNavigatePrev}
          nextTitle={nextTitle}
          prevTitle={prevTitle}
          onNavigateTo={navigateTo}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-red-500">
            <AlertCircle className="mr-2" /> Error: Technique not found.
        </div>
      )}
    </Layout>
  );
}

export default App;