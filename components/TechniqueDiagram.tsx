import React from 'react';
import { 
  ArrowRight, Terminal, Activity, Image, FileText, 
  Shield, AlertTriangle, CheckCircle, XCircle, 
  Database, Braces, Layers, Ban, ShieldBan, 
  RefreshCcw, Sparkles, LayoutList, GitCommitHorizontal,
  Lightbulb, Brain, Code, Octagon, UserCheck,
  Zap, Map, ListTree, GitBranch, Compass, MessageCircleQuestion,
  Eye, Undo2, ClipboardCheck, Thermometer, Megaphone, PenTool,
  Cpu, Layout, Wrench, Users, BarChart, Bot, GitCompare
} from 'lucide-react';

interface DiagramProps {
  techniqueId: string;
}

export const TechniqueDiagram: React.FC<DiagramProps> = ({ techniqueId }) => {
  const containerClass = "w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 my-6 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden select-none shadow-sm transition-all";

  const renderContent = () => {
    switch (techniqueId) {
      // --- AGENTIC ARCHITECTURE ---

      // 1. Chain of Thought
      case 'workflow-phases':
        return (
          <div className="flex flex-col items-center w-full max-w-lg">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Sequential Orchestration</h4>
             <div className="flex items-center gap-2 w-full justify-between px-4">
                 {[
                   { label: 'Discovery', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800' },
                   { label: 'Plan', icon: LayoutList, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
                   { label: 'Execute', icon: Terminal, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' }
                 ].map((step, i) => (
                    <React.Fragment key={step.label}>
                        <div className={`flex flex-col items-center gap-2 z-10`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step.bg} ${step.border} ${step.color} shadow-sm`}>
                                <step.icon size={20} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase ${step.color}`}>{step.label}</span>
                        </div>
                        {i < 2 && <div className="h-0.5 flex-1 bg-gray-200 dark:bg-gray-700 relative -top-3" />}
                    </React.Fragment>
                 ))}
             </div>
             <div className="mt-4 text-[10px] text-gray-400 font-mono text-center">
                State is preserved between phases
             </div>
          </div>
        );

      // 2. Code-Aided Reasoning
      case 'code-aided-reasoning':
        return (
          <div className="flex flex-col items-center gap-6 w-full max-w-lg">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Logic Offloading</h4>
            <div className="flex w-full items-center justify-between gap-4 px-4">
              {/* Text Path */}
              <div className="flex flex-col items-center gap-2 opacity-30 grayscale transition-opacity hover:opacity-100">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                  <Brain size={16} />
                </div>
                <ArrowRight className="text-gray-300 dark:text-gray-600 rotate-90 md:rotate-0" size={14} />
                <div className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[9px] font-bold">
                  Guess
                </div>
              </div>

              <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

              {/* Code Path */}
              <div className="flex flex-col items-center gap-2 relative">
                <div className="flex items-center gap-2 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 rounded-lg p-2 shadow-sm">
                  <Terminal size={16} className="text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-bold text-brand-700 dark:text-brand-300">Generate Code</span>
                </div>
                <ArrowRight className="text-brand-500 rotate-90 md:rotate-0" size={16} />
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 shadow-sm">
                  <Activity size={14} />
                  <span className="text-xs font-bold">Execute & Return</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'component-isolation':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scope Bounding</h4>
                <div className="w-full flex flex-col items-center">
                    {/* Global Context */}
                    <div className="w-3/4 bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-2 mb-4 text-center shadow-sm z-10">
                        <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Global Context (Immutable)</span>
                    </div>
                    
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mb-2"></div>
                    
                    <div className="flex w-full justify-between gap-2">
                        {/* Task A */}
                        <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col items-center relative shadow-sm">
                            <span className="text-[9px] font-bold text-gray-500 uppercase mb-1">Task A</span>
                            <Database size={16} className="text-blue-500 mb-1" />
                            <span className="text-[10px] font-mono">DB Schema</span>
                        </div>
                        
                        <ArrowRight size={16} className="text-gray-300 self-center" />

                        {/* Task B */}
                        <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col items-center relative shadow-sm">
                            <span className="text-[9px] font-bold text-gray-500 uppercase mb-1">Task B</span>
                            <Code size={16} className="text-green-500 mb-1" />
                            <span className="text-[10px] font-mono">API Code</span>
                            {/* Injection Arrow */}
                            <div className="absolute -top-3 right-1/2 translate-x-1/2 w-0.5 h-3 bg-purple-200 dark:bg-purple-800"></div>
                        </div>
                    </div>
                </div>
            </div>
        );

      case 'dialectic-method':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Adversarial Synthesis</h4>
                <div className="flex items-center justify-center gap-4 w-full relative">
                    {/* Persona A */}
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                            <Users size={18} />
                        </div>
                        <span className="text-[9px] font-bold mt-1 text-blue-600">Thesis</span>
                    </div>

                    <div className="text-xs font-bold text-gray-400">VS</div>

                    {/* Persona B */}
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 flex items-center justify-center">
                            <ShieldBan size={18} />
                        </div>
                        <span className="text-[9px] font-bold mt-1 text-red-600">Antithesis</span>
                    </div>
                </div>
                
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

                {/* Synthesis */}
                <div className="w-32 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2 flex items-center justify-center gap-2 shadow-sm">
                    <Sparkles size={14} className="text-green-500" />
                    <span className="text-[10px] font-bold text-green-700 dark:text-green-300">Synthesis</span>
                </div>
            </div>
        );

      case 'cognitive-tool-use':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Deterministic Execution</h4>
                <div className="flex items-center gap-2 w-full justify-center px-4">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                            <Brain size={18} className="text-gray-400" />
                        </div>
                        <span className="text-[9px] font-bold text-gray-500">LLM</span>
                    </div>

                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 relative">
                        <span className="absolute top-[-8px] left-1/2 -translate-x-1/2 text-[8px] font-mono bg-white dark:bg-gray-800 px-1 text-gray-400">JSON</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 rounded-lg flex items-center justify-center shadow-sm">
                            <Wrench size={18} className="text-brand-600 dark:text-brand-400" />
                        </div>
                        <span className="text-[9px] font-bold text-brand-600 dark:text-brand-400">Tool</span>
                    </div>

                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 relative">
                         <span className="absolute top-[-8px] left-1/2 -translate-x-1/2 text-[8px] font-mono bg-white dark:bg-gray-800 px-1 text-gray-400">Result</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full flex items-center justify-center">
                            <CheckCircle size={18} className="text-green-500" />
                        </div>
                        <span className="text-[9px] font-bold text-green-600 dark:text-green-400">Answer</span>
                    </div>
                </div>
            </div>
        );

      case 'context-caching':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prefix Caching</h4>
                <div className="flex w-3/4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm h-12">
                    <div className="flex-1 bg-green-100 dark:bg-green-900/30 flex items-center justify-center border-r border-green-200 dark:border-green-800 gap-2">
                        <Database size={14} className="text-green-600 dark:text-green-400" />
                        <span className="text-[10px] font-bold text-green-800 dark:text-green-300">Static Docs</span>
                    </div>
                    <div className="flex-[0.5] bg-white dark:bg-gray-900 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-gray-500">Query</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <Zap size={12} className="text-yellow-500 fill-yellow-500" />
                    <span>Cached (0ms compute)</span>
                </div>
            </div>
        );

      case 'context-map':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cognitive Indexing</h4>
                <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm w-64">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 border border-blue-200 dark:border-blue-800">
                        <Map size={10} /> Map
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div>
                            <div className="h-2 w-1/2 bg-brand-50 dark:bg-brand-900/20 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div>
                            <div className="h-2 w-2/3 bg-brand-50 dark:bg-brand-900/20 rounded"></div>
                        </div>
                    </div>
                    {/* Agent Pointer */}
                    <div className="absolute right-2 bottom-2 text-brand-500 animate-bounce">
                        <ArrowRight size={16} className="-rotate-45" />
                    </div>
                </div>
            </div>
        );

      case 'least-to-most':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recursive Decomposition</h4>
                <div className="flex flex-col gap-2 w-48">
                    <div className="p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-center opacity-50 text-[9px] font-mono">Big Problem</div>
                    <div className="flex justify-center"><ArrowRight className="rotate-90 text-gray-300" size={12}/></div>
                    <div className="p-2 rounded bg-white dark:bg-gray-900 border-2 border-brand-200 dark:border-brand-800 text-center shadow-sm relative">
                        <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">Sub-Q 1</span>
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2"><CheckCircle size={12} className="text-green-500"/></div>
                    </div>
                    <div className="flex justify-center"><ArrowRight className="rotate-90 text-gray-300" size={12}/></div>
                    <div className="p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Sub-Q 2</span>
                    </div>
                </div>
            </div>
        );

      case 'tree-of-thoughts':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Branching Logic</h4>
                <div className="flex flex-col items-center relative">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mb-4"></div>
                    {/* Branches */}
                    <div className="flex gap-8 relative">
                        {/* Dead End */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 absolute top-[-16px] left-1/4 origin-bottom -rotate-12"></div>
                            <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-center">
                                <XCircle size={14} className="text-red-400" />
                            </div>
                        </div>
                        
                        {/* Success Path */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-px bg-brand-300 dark:bg-brand-700 absolute top-[-16px] left-3/4 origin-bottom rotate-12"></div>
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center justify-center relative">
                                <GitBranch size={14} className="text-green-500" />
                                <div className="absolute -bottom-4 w-px h-4 bg-green-300 dark:bg-green-700"></div>
                                <div className="absolute -bottom-5 w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

      // --- RELIABILITY ENGINEERING ---

      case 'decision-gate':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pre-Implementation Checklist</h4>
                <div className="flex items-center gap-2 w-full justify-center px-2">
                    {/* User Request */}
                    <div className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
                        <span className="text-[8px] font-bold text-gray-500 uppercase block">Task</span>
                        <span className="text-[9px] font-bold">"Reset Pwd"</span>
                    </div>

                    <ArrowRight size={12} className="text-gray-300" />

                    {/* The Gate */}
                    <div className="flex flex-col items-center relative z-10 group">
                        <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-center shadow-sm">
                             <Octagon size={20} />
                        </div>
                        <span className="text-[8px] font-bold text-red-500 mt-1 uppercase">Halt</span>
                        
                        {/* Checklist Popover */}
                        <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 shadow-lg w-28">
                             <div className="flex items-center gap-1 mb-1 border-b border-gray-100 dark:border-gray-700 pb-1">
                                <LayoutList size={10} className="text-gray-400" />
                                <span className="text-[8px] font-bold uppercase text-gray-500">Checklist</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-[7px]">Security Policy</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-[7px]">Patterns</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-8"></div> {/* Spacer for popover */}

                    <ArrowRight size={12} className="text-gray-300" />

                     {/* Execution */}
                    <div className="p-2 bg-gray-900 rounded border border-gray-700 shadow-sm flex items-center justify-center">
                        <Terminal size={14} className="text-green-400" />
                    </div>
                </div>
            </div>
        );

      case 'north-star':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Constitutional Alignment</h4>
                <div className="relative w-48 h-32 flex flex-col items-center justify-end">
                    {/* The Star */}
                    <div className="absolute top-0 flex flex-col items-center animate-pulse">
                        <Compass size={24} className="text-brand-500" />
                        <span className="text-[8px] font-bold uppercase text-brand-600 dark:text-brand-400 mt-1 tracking-widest">Policy</span>
                    </div>
                    
                    {/* Beams */}
                    <div className="absolute top-8 inset-x-0 h-full bg-gradient-to-b from-brand-500/10 to-transparent clip-path-beam"></div>

                    {/* Agent */}
                    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded-lg text-center shadow-sm z-10">
                        <span className="text-[10px] text-gray-500">Agent Action</span>
                    </div>
                </div>
            </div>
        );

      case 'instruction-enclosure':
         return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Attention Distribution</h4>
                <div className="flex flex-col gap-1 w-3/4 relative">
                    {/* Top Bun */}
                    <div className="bg-brand-500 text-white rounded-t-lg p-2 text-center text-[10px] font-bold shadow-md z-10 relative">
                        Primary Instruction
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-brand-500 border-b-[6px] border-b-transparent"></div>
                    </div>
                    {/* Meat */}
                    <div className="bg-gray-100 dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700 p-2 text-center text-[9px] text-gray-400 font-mono h-20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />
                        <span className="z-10">Massive Context Data...</span>
                    </div>
                    {/* Bottom Bun */}
                    <div className="bg-brand-600 text-white rounded-b-lg p-2 text-center text-[10px] font-bold shadow-md z-10 flex items-center justify-center gap-2 relative">
                         Recency Reminder
                         <RefreshCcw size={10} className="text-brand-200" />
                         <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-brand-600 border-b-[6px] border-b-transparent"></div>
                    </div>
                    
                    {/* Arrows */}
                    <div className="absolute -left-16 top-0 bottom-0 flex flex-col justify-between py-2 h-full">
                         <div className="text-[8px] font-bold text-brand-500 text-right pr-2">Primacy Bias</div>
                         <div className="w-px h-full bg-gradient-to-b from-brand-500 via-gray-200 to-brand-600 absolute right-0" />
                         <div className="text-[8px] font-bold text-brand-600 text-right pr-2">Recency Bias</div>
                    </div>
                </div>
            </div>
         );

      case 'multi-pass-refinement':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recursive Improvement</h4>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1 opacity-50">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-[8px] font-bold uppercase">Draft</span>
                    </div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-brand-500 flex items-center justify-center">
                            <RefreshCcw size={18} className="text-brand-500" />
                        </div>
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-brand-600">Critique</span>
                    </div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div className="flex flex-col items-center gap-1">
                        <Sparkles size={16} className="text-yellow-500" />
                        <span className="text-[8px] font-bold uppercase">Final</span>
                    </div>
                </div>
            </div>
        );

      case 'interactive-clarification':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ambiguity Halt</h4>
                <div className="flex flex-col gap-2 w-full max-w-[200px]">
                    <div className="self-end bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-l-lg rounded-tr-lg text-[10px] mb-1">
                        "Build notification system"
                    </div>
                    <div className="self-start flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                            <Bot size={12} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-800 px-3 py-2 rounded-r-lg rounded-tl-lg shadow-sm">
                            <div className="flex items-center gap-1 text-brand-600 font-bold text-[10px] mb-1">
                                <MessageCircleQuestion size={12} />
                                Clarification Needed
                            </div>
                            <div className="text-[9px] text-gray-500 leading-tight">
                                Email or SMS? Real-time?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      
      case 'source-grounding':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Closed-Loop Verification</h4>
                <div className="flex items-center gap-2 w-full justify-center px-2">
                    {/* User Query */}
                    <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center min-w-[60px]">
                        <span className="text-[9px] font-bold">User Query</span>
                    </div>

                    <ArrowRight size={12} className="text-gray-300" />

                    {/* Grounding Box */}
                    <div className="relative p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border-2 border-blue-200 dark:border-blue-800 flex flex-col items-center w-32">
                        <span className="absolute -top-2 bg-blue-500 text-white px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">Constraint</span>
                        <div className="flex items-center gap-1.5 mb-2">
                            <Database size={14} className="text-blue-500" />
                            <span className="text-[9px] font-bold text-blue-700 dark:text-blue-300">Context</span>
                        </div>
                        <div className="flex gap-1 w-full">
                             <div className="flex-1 flex flex-col items-center p-1 bg-green-100 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800/50">
                                <CheckCircle size={8} className="text-green-500 mb-0.5" />
                                <span className="text-[7px] text-green-700 dark:text-green-400 font-bold leading-none">Found</span>
                             </div>
                             <div className="flex-1 flex flex-col items-center p-1 bg-red-100 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800/50">
                                <Ban size={8} className="text-red-500 mb-0.5" />
                                <span className="text-[7px] text-red-700 dark:text-red-400 font-bold leading-none">Missing</span>
                             </div>
                        </div>
                    </div>

                    <ArrowRight size={12} className="text-gray-300" />

                    {/* Output */}
                    <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center min-w-[60px]">
                        <span className="text-[9px] font-bold">Answer</span>
                        <div className="text-[7px] text-gray-400 mt-0.5">Hallucination-Free</div>
                    </div>
                </div>
            </div>
        );

      case 'blind-spot-analysis':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Red Teaming</h4>
                <div className="relative p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <div className="space-y-2 opacity-50 blur-[1px]">
                        <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-2 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <Eye size={32} className="text-red-500 drop-shadow-md" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 text-[8px] font-bold px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
                        Risk Detected
                    </div>
                </div>
            </div>
        );

      case 'step-back-prompting':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Abstraction First</h4>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                        <div className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
                            <span className="text-[9px] font-bold">Specific Q</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center relative -top-3">
                        <Undo2 size={16} className="text-brand-500" />
                        <span className="text-[7px] font-bold text-brand-500 uppercase">Abstract</span>
                    </div>

                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded shadow-sm text-center">
                        <span className="text-[9px] font-bold text-purple-700 dark:text-purple-300">Principle</span>
                    </div>

                    <ArrowRight size={14} className="text-gray-300" />

                    <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded shadow-sm text-center">
                        <span className="text-[9px] font-bold text-green-700 dark:text-green-300">Solution</span>
                    </div>
                </div>
            </div>
        );

      case 'verification-protocol':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Epistemic Hygiene</h4>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 w-40 shadow-sm relative">
                    <div className="flex items-center gap-2 mb-2 border-b border-gray-100 dark:border-gray-800 pb-1">
                        <ClipboardCheck size={14} className="text-brand-500" />
                        <span className="text-[9px] font-bold uppercase text-gray-500">Artifacts</span>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-green-100 dark:bg-green-900/30 border border-green-400 rounded-sm flex items-center justify-center">
                                <CheckCircle size={8} className="text-green-600" />
                            </div>
                            <span className="text-[8px] font-mono text-gray-600 dark:text-gray-300">Assumptions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-green-100 dark:bg-green-900/30 border border-green-400 rounded-sm flex items-center justify-center">
                                <CheckCircle size={8} className="text-green-600" />
                            </div>
                            <span className="text-[8px] font-mono text-gray-600 dark:text-gray-300">Constraints</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-2.5 h-2.5 border border-gray-300 rounded-sm"></div>
                            <span className="text-[8px] font-mono text-gray-400">Solution</span>
                        </div>
                    </div>
                </div>
            </div>
        );

      // --- HIGH-PERFORMANCE OPTIMIZATION ---

      case 'contextual-justification':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Intent Alignment</h4>
                <div className="flex items-center gap-1">
                    <div className="flex flex-col gap-1">
                        <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 text-[9px] font-bold text-center">Task</div>
                        <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 rounded border border-yellow-300 dark:border-yellow-700 text-[9px] font-bold text-center text-yellow-700 dark:text-yellow-400 flex items-center gap-1 justify-center">
                            <Lightbulb size={8} /> Why
                        </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div className="w-20 h-10 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded flex items-center justify-center text-center px-1">
                        <span className="text-[8px] text-green-700 dark:text-green-300 font-bold leading-none">Optimized Result</span>
                    </div>
                </div>
            </div>
        );

      case 'controlled-hallucination':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Temperature Modulation</h4>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                        <div className="relative">
                            <Thermometer size={20} className="text-red-500" />
                            <span className="absolute -top-1 -right-1 text-[7px] font-bold text-red-600">0.9</span>
                        </div>
                        <span className="text-[8px] uppercase font-bold text-red-500">Dream</span>
                    </div>
                    
                    <div className="h-px w-8 bg-gray-300"></div>
                    
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-gray-400"></div>
                    
                    <div className="h-px w-8 bg-gray-300"></div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="relative">
                            <Thermometer size={20} className="text-blue-500" />
                            <span className="absolute -top-1 -right-1 text-[7px] font-bold text-blue-600">0.1</span>
                        </div>
                        <span className="text-[8px] uppercase font-bold text-blue-500">Reality</span>
                    </div>
                </div>
            </div>
        );

      case 'structure':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Attention Anchors</h4>
                <div className="w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm flex flex-col gap-2">
                    <div className="h-2 w-1/2 bg-brand-500 rounded-sm"></div>
                    <div className="space-y-1">
                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                        <div className="h-1 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                    </div>
                    <div className="h-2 w-1/2 bg-brand-500 rounded-sm mt-1"></div>
                    <div className="space-y-1">
                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                    </div>
                </div>
            </div>
        );

      case 'probabilities':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Logit Bias</h4>
                <div className="flex items-end gap-1 h-16 border-b border-gray-300 dark:border-gray-600 px-2 pb-1 w-32">
                    <div className="w-4 bg-gray-300 dark:bg-gray-700 h-1/4 rounded-t"></div>
                    <div className="w-4 bg-gray-300 dark:bg-gray-700 h-1/3 rounded-t"></div>
                    <div className="w-4 bg-brand-500 h-full rounded-t shadow-sm"></div>
                    <div className="w-4 bg-gray-300 dark:bg-gray-700 h-1/5 rounded-t"></div>
                </div>
                <span className="text-[9px] text-gray-500">Token Probability Shift</span>
            </div>
        );

      case 'contrastive-prompting':
        return (
             <div className="flex flex-col items-center gap-5 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Decision Boundary Definition</h4>
                <div className="relative w-full h-32 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex overflow-hidden shadow-inner">
                     {/* Background Grid */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
                     
                     {/* Bad Zone */}
                     <div className="absolute left-8 top-4 flex flex-col items-center z-10 group cursor-default">
                         <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 flex items-center justify-center transition-transform group-hover:scale-110">
                             <XCircle size={16} className="text-red-500" />
                         </div>
                         <div className="text-[8px] font-bold text-red-500 mt-1 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-red-100 dark:border-red-900/50 shadow-sm">Bad Example</div>
                     </div>

                     {/* Good Zone */}
                     <div className="absolute right-8 bottom-4 flex flex-col items-center z-10 group cursor-default">
                         <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 flex items-center justify-center transition-transform group-hover:scale-110">
                             <CheckCircle size={16} className="text-green-500" />
                         </div>
                         <div className="text-[8px] font-bold text-green-500 mt-1 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-green-100 dark:border-green-900/50 shadow-sm">Good Example</div>
                     </div>

                     {/* Repulsion Field Visualization */}
                     <div className="absolute left-12 top-8 w-24 h-24 border-r-2 border-b-2 border-red-500/10 rounded-br-full pointer-events-none" />

                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-2 py-1 rounded shadow text-[9px] font-mono border border-gray-200 dark:border-gray-700 z-20">
                        Latent Space Trajectory
                     </div>
                </div>
             </div>
        );

      case 'context':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sliding Window</h4>
                <div className="flex gap-1 overflow-hidden w-48 relative mask-linear">
                    <div className="w-8 h-10 bg-gray-200 dark:bg-gray-800 rounded shrink-0 opacity-30"></div>
                    <div className="w-8 h-10 bg-gray-200 dark:bg-gray-800 rounded shrink-0 opacity-60"></div>
                    <div className="w-8 h-10 bg-brand-100 dark:bg-brand-900/30 border border-brand-300 dark:border-brand-700 rounded shrink-0"></div>
                    <div className="w-8 h-10 bg-brand-100 dark:bg-brand-900/30 border border-brand-300 dark:border-brand-700 rounded shrink-0"></div>
                    <div className="w-8 h-10 bg-brand-100 dark:bg-brand-900/30 border border-brand-300 dark:border-brand-700 rounded shrink-0"></div>
                    <div className="absolute inset-0 border-2 border-brand-500/50 rounded-lg pointer-events-none"></div>
                </div>
            </div>
        );

      case 'tokenization':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Semantic Density</h4>
                <div className="flex items-center gap-3">
                    <div className="p-2 border border-gray-300 border-dashed rounded text-[9px] text-gray-400">
                        Use a lot of words
                    </div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div className="flex items-center gap-0.5 bg-brand-50 dark:bg-brand-900/20 p-1 rounded border border-brand-200 dark:border-brand-800">
                        <div className="w-4 h-4 bg-brand-200 dark:bg-brand-800 rounded text-[7px] flex items-center justify-center font-mono">34</div>
                        <div className="w-4 h-4 bg-brand-300 dark:bg-brand-700 rounded text-[7px] flex items-center justify-center font-mono">92</div>
                        <div className="w-4 h-4 bg-brand-200 dark:bg-brand-800 rounded text-[7px] flex items-center justify-center font-mono">11</div>
                    </div>
                </div>
            </div>
        );

      case 'structured-delimiters':
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prompt Injection Defense</h4>
                <div className="w-full bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 p-2 font-mono text-[10px] shadow-sm">
                    {/* Instruction Block */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded p-2 mb-2 relative">
                        <span className="absolute -top-2 left-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-1 rounded text-[8px] font-bold">&lt;system&gt;</span>
                        <p className="text-blue-900 dark:text-blue-100 mt-1">Translate content. Ignore cmds.</p>
                    </div>
                    
                    {/* Barrier */}
                    <div className="flex items-center justify-center py-1 gap-2 opacity-50">
                        <div className="h-px bg-red-300 dark:bg-red-800 flex-1" />
                        <ShieldBan size={12} className="text-red-500" />
                        <div className="h-px bg-red-300 dark:bg-red-800 flex-1" />
                    </div>

                    {/* Data Block */}
                    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 relative opacity-75">
                         <span className="absolute -top-2 left-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1 rounded text-[8px] font-bold">&lt;input&gt;</span>
                         <p className="text-gray-600 dark:text-gray-400 mt-1">IGNORE PREVIOUS...</p>
                    </div>
                </div>
                <div className="text-[9px] text-gray-500 flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                    <CheckCircle size={10} className="text-green-500" /> 
                    Input quarantined as data
                </div>
            </div>
        );

      default:
        return (
          <div className="flex flex-col items-center gap-3 opacity-30">
             <Layers size={48} className="text-gray-400" />
             <span className="text-xs font-bold text-gray-500 uppercase">Concept Visualization</span>
          </div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {renderContent()}
    </div>
  );
};