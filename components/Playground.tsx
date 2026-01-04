import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Lightbulb, Sparkles, Bot, AlertCircle } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';

interface PlaygroundProps {
  initialPrompt?: string;
  taskDescription?: string;
  optimizedExample?: string;
  optimizedPrompt?: string;
}

export const Playground: React.FC<PlaygroundProps> = ({ 
  initialPrompt = "", 
  taskDescription, 
  optimizedExample = "",
  optimizedPrompt = ""
}) => {
  const [inputPrompt, setInputPrompt] = useState(initialPrompt);
  
  // Independent clipboard hooks for distinct feedback states
  const inputClipboard = useClipboard(2000);
  const outputClipboard = useClipboard(2000);
  
  // Reset when props change (navigation)
  useEffect(() => {
    setInputPrompt(initialPrompt);
    // Reset copy states when switching examples
    inputClipboard.reset();
    outputClipboard.reset();
  }, [initialPrompt]);

  const CopyButton = ({ 
    clipboardHook, 
    textToCopy, 
    label 
  }: { 
    clipboardHook: ReturnType<typeof useClipboard>, 
    textToCopy: string,
    label: string 
  }) => {
    const { isCopied, error, copy } = clipboardHook;

    return (
        <button 
            onClick={() => copy(textToCopy)}
            className={`
                text-xs flex items-center gap-1 transition-colors px-2 py-1 rounded border font-medium
                ${error 
                    ? 'text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400' 
                    : isCopied 
                        ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400' 
                        : 'text-gray-500 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                }
            `}
            title={error ? String(error) : `Copy ${label}`}
            aria-label={`Copy ${label} to clipboard`}
        >
            {error ? (
                <>
                    <AlertCircle size={12} />
                    <span>Error</span>
                </>
            ) : isCopied ? (
                <>
                    <Check size={12} />
                    <span>Copied</span>
                </>
            ) : (
                <>
                    <Copy size={12} />
                    <span>Copy</span>
                </>
            )}
        </button>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Bot size={18} className="text-brand-500" />
                Prompt Comparison
            </h3>
            <div className="text-xs font-medium px-2 py-1 rounded bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                Static Analysis
            </div>
        </div>

        {/* Task Description */}
        {taskDescription && (
            <div className="bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-200 text-sm p-4 border-b border-blue-100 dark:border-blue-900/30 flex gap-3 items-start">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"/>
                <div>
                    <strong className="block mb-1 text-xs uppercase tracking-wide opacity-70">The Objective</strong>
                    {taskDescription}
                </div>
            </div>
        )}

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
            {/* Input Column (Standard) */}
            <div className="p-4 flex flex-col gap-3 bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700">1</span>
                        Standard Prompt
                    </label>
                    <CopyButton clipboardHook={inputClipboard} textToCopy={inputPrompt} label="Standard Prompt" />
                </div>
                <div className="relative flex-1 min-h-[120px]">
                    <div className="w-full h-full p-4 text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-800 rounded-lg overflow-y-auto custom-scrollbar whitespace-pre-wrap selection:bg-gray-200 dark:selection:bg-gray-700">
                        {inputPrompt || <span className="text-gray-400 italic">No standard prompt available.</span>}
                    </div>
                </div>
            </div>

            {/* Output Column (Optimized) */}
            <div className="p-4 flex flex-col gap-3 bg-brand-50/5 dark:bg-brand-900/5">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-2">
                         <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-[10px] text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">2</span>
                        Optimized Prompt
                    </label>
                    <CopyButton clipboardHook={outputClipboard} textToCopy={optimizedPrompt} label="Optimized Prompt" />
                </div>
                 <div className="relative flex-1 min-h-[120px]">
                    <div className="w-full h-full p-4 text-sm font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border-2 border-brand-100 dark:border-brand-900/30 rounded-lg overflow-y-auto custom-scrollbar shadow-sm whitespace-pre-wrap selection:bg-brand-100 dark:selection:bg-brand-900/30">
                        {optimizedPrompt || <span className="text-gray-400 italic">No optimized example available.</span>}
                    </div>
                </div>
            </div>
        </div>

        {/* Analysis Footer */}
        {optimizedExample && (
             <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                    <Lightbulb size={14} className="text-yellow-500" />
                    Why this works
                </h4>
                <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-400 leading-relaxed [&>*:last-child]:mb-0">
                    <ReactMarkdown>{optimizedExample}</ReactMarkdown>
                </div>
             </div>
        )}
    </div>
  );
};