import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Technique } from '../types';
import { Playground } from './Playground';
import { Quiz } from './Quiz';
import { TechniqueDiagram } from './TechniqueDiagram';
import { BookOpen, Code2, Brain, Activity, Terminal, ArrowRight, ArrowLeft, CheckCircle, TrendingUp, TrendingDown, Link2, Unlink, Tag, ExternalLink, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { TECHNIQUES } from '../constants';

interface TechniqueViewProps {
  technique: Technique;
  onQuizComplete: (score: number) => void;
  onNext: () => void;
  onPrev: () => void;
  nextTitle?: string;
  prevTitle?: string;
  onNavigateTo: (id: string) => void;
}

export const TechniqueView: React.FC<TechniqueViewProps> = ({ technique, onQuizComplete, onNext, onPrev, nextTitle, prevTitle, onNavigateTo }) => {
  const [activeSection, setActiveSection] = useState('theory');
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Smooth scroll to section
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const mainContainer = document.querySelector('main');
    
    if (el && mainContainer) {
      const mainRect = mainContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      
      // Calculate position relative to the scroll container's current scroll position
      // We want the element to settle with some offset from the top (to account for sticky header)
      const headerOffset = 160; 
      const offsetPosition = elRect.top - mainRect.top + mainContainer.scrollTop - headerOffset;

      mainContainer.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Optimistic update
      setActiveSection(id);
    }
  };

  // Helper to get title from ID
  const getTechniqueTitle = (id: string) => {
      const tech = TECHNIQUES.find(t => t.id === id);
      return tech ? tech.title : id;
  };

  // Scroll Spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['theory', 'technology', 'resources', 'lab', 'quiz'];
      const mainContainer = document.querySelector('main');
      if (!mainContainer) return;

      const mainRect = mainContainer.getBoundingClientRect();
      // Trigger point: Where on screen we consider the section "active".
      // Usually around 1/3 down the screen or just below header.
      const triggerPoint = 200; 

      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const topRelative = rect.top - mainRect.top;
          
          // If the section's top has passed the trigger point (is above it), it's potentially the active one.
          // Since we iterate in order, the last one that satisfies this is the current one.
          if (topRelative <= triggerPoint) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        mainContainer.addEventListener('scroll', handleScroll);
        // Trigger once on mount
        handleScroll();
    }
    return () => {
        if (mainContainer) {
            mainContainer.removeEventListener('scroll', handleScroll);
        }
    };
  }, [technique.id]);

  useEffect(() => {
    setIsQuizFinished(false);
    // Reset scroll when switching technique
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        mainContainer.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [technique.id]);

  const handleQuizFinish = (score: number) => {
    onQuizComplete(score);
    if (score >= 70) {
      setIsQuizFinished(true);
    }
  };

  const cleanContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return content;
    const minIndent = lines.reduce((min, line) => {
      const indent = line.match(/^[ \t]*/)?.[0].length || 0;
      return indent < min ? indent : min;
    }, Infinity);
    return content.split('\n').map(line => line.slice(minIndent)).join('\n');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <header className="pt-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-bold uppercase tracking-wide">
            {technique.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{technique.title}</h1>
      </header>

      {/* Sticky Sub-Navigation */}
      <div className="sticky top-0 z-20 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 mb-8 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 pt-2">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar max-w-4xl mx-auto">
          {[
            { id: 'theory', label: 'Theory', icon: BookOpen },
            { id: 'technology', label: 'Technology', icon: Code2 },
            { id: 'resources', label: 'Related Resources', icon: FileText },
            { id: 'lab', label: 'Practice Lab', icon: Brain },
            { id: 'quiz', label: 'Quiz', icon: Activity },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`
                flex items-center gap-2 pb-3 pt-2 border-b-2 text-sm font-bold transition-colors whitespace-nowrap outline-none
                ${activeSection === item.id
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}
              `}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-12">
        {/* Theory Section */}
        <section id="theory" className="scroll-mt-40 animate-fade-in">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{technique.shortDescription}</p>
          
          {/* Also Known As (Aliases) */}
          {technique.alsoKnownAs && technique.alsoKnownAs.length > 0 && (
            <div className="mb-8 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
               <Tag size={16} className="mt-0.5 shrink-0 text-brand-500" />
               <div>
                 <span className="font-bold mr-1">Also Known As:</span>
                 {technique.alsoKnownAs.join(", ")}
               </div>
            </div>
          )}

          {/* Trade-off Matrix */}
          {technique.tradeOffs && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">
                            <TrendingUp size={14} /> Advantages (Pros)
                        </h4>
                        <ul className="space-y-1">
                            {technique.tradeOffs.pros.map((pro, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-500 shrink-0"></span>
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                            <TrendingDown size={14} /> Trade-offs (Cons)
                        </h4>
                        <ul className="space-y-1">
                            {technique.tradeOffs.cons.map((con, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0"></span>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="space-y-4 md:border-l md:border-gray-100 md:dark:border-gray-800 md:pl-4">
                     {technique.tradeOffs.compatibleWith.length > 0 && (
                        <div>
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                                <Link2 size={14} /> Synergies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {technique.tradeOffs.compatibleWith.map((item, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => onNavigateTo(item)}
                                        className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-200 transition-colors cursor-pointer text-left"
                                        title={`Go to: ${getTechniqueTitle(item)}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                     )}
                     {technique.tradeOffs.incompatibleWith.length > 0 && (
                        <div>
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
                                <Unlink size={14} /> Incompatible / Conflicts
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {technique.tradeOffs.incompatibleWith.map((item, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => onNavigateTo(item)}
                                        className="text-xs px-2 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded border border-orange-100 dark:border-orange-900/50 hover:bg-orange-100 dark:hover:bg-orange-900/40 hover:border-orange-200 transition-colors cursor-pointer text-left"
                                        title={`Go to: ${getTechniqueTitle(item)}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                     )}
                </div>
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <ReactMarkdown components={{
                strong: ({node, ...props}) => <span className="font-bold text-gray-900 dark:text-gray-100 bg-brand-50 dark:bg-brand-900/20 px-1 rounded" {...props} />
            }}>
                {cleanContent(technique.theoryContent)}
            </ReactMarkdown>
          </div>
          <TechniqueDiagram techniqueId={technique.id} />
        </section>

        {/* Technology Section */}
        <section id="technology" className="scroll-mt-40">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            <Code2 className="text-brand-500" /> Technology & Implementation
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400">
                <ReactMarkdown>{cleanContent(technique.technologyContent)}</ReactMarkdown>
            </div>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 h-fit">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                        <Terminal size={14} /> Python Implementation
                    </span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                </div>
                <div className="p-4 overflow-x-auto custom-scrollbar">
                    <pre className="text-sm font-mono text-blue-100 leading-relaxed">
                        <code>{technique.codeExample.trim()}</code>
                    </pre>
                </div>
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        {technique.relatedLinks && technique.relatedLinks.length > 0 && (
          <section id="resources" className="scroll-mt-40">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
              <ExternalLink className="text-brand-500" /> Related Resources
            </h2>
            <div className="grid gap-4">
              {technique.relatedLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <ExternalLink size={18} className="text-brand-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {link.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                        {link.url}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Lab Section */}
        <section id="lab" className="scroll-mt-40">
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            <Brain className="text-brand-500" /> Practice Lab
          </h2>
          <Playground 
            initialPrompt={technique.playgroundPrompt}
            taskDescription={technique.playgroundTask}
            optimizedExample={technique.optimizedExample}
            optimizedPrompt={technique.optimizedPrompt}
          />
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="scroll-mt-40">
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            <Activity className="text-brand-500" /> Knowledge Check
          </h2>
          <Quiz 
            questions={technique.quiz} 
            onComplete={handleQuizFinish} 
          />
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-8 flex items-center justify-between">
         {prevTitle ? (
             <button 
                onClick={onPrev}
                className="group flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
             >
                 <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                     <ArrowLeft size={12} /> Previous Topic
                 </span>
                 <span className="font-bold text-gray-900 dark:text-white">{prevTitle}</span>
             </button>
         ) : <div />}

         {/* If quiz is done or this is the last item, allow next. Or always allow but highlight if done. */}
         {nextTitle ? (
            <div className="flex flex-col items-end gap-2">
                {isQuizFinished && (
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1 animate-fade-in">
                        <CheckCircle size={12} /> Topic Mastered!
                    </span>
                )}
                <Button 
                    onClick={onNext}
                    variant={isQuizFinished ? 'primary' : 'outline'}
                    className="group flex items-center gap-2"
                >
                    Next: {nextTitle} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
         ) : (
            <Button onClick={onNext} variant="primary">Return to Home</Button>
         )}
      </div>
    </div>
  );
};