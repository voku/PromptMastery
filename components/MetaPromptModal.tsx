import React, { useState } from 'react';
import { X, Copy, Check, Download, Sparkles, FileText, Layers } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';
import { generateMetaPrompt, generateCompactMetaPrompt, generateTechniquesSummary } from '../utils/metaPromptGenerator';

interface MetaPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PromptType = 'full' | 'compact' | 'summary';

export const MetaPromptModal: React.FC<MetaPromptModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<PromptType>('compact');
  const { copy } = useClipboard();
  const [copiedType, setCopiedType] = useState<PromptType | null>(null);

  if (!isOpen) return null;

  const handleCopy = (type: PromptType) => {
    let content = '';
    switch (type) {
      case 'full':
        content = generateMetaPrompt();
        break;
      case 'compact':
        content = generateCompactMetaPrompt();
        break;
      case 'summary':
        content = generateTechniquesSummary();
        break;
    }
    
    copy(content).then((success) => {
      if (success) {
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
      }
    });
  };

  const handleDownload = (type: PromptType) => {
    let content = '';
    let filename = '';
    switch (type) {
      case 'full':
        content = generateMetaPrompt();
        filename = 'meta-prompt-full.md';
        break;
      case 'compact':
        content = generateCompactMetaPrompt();
        filename = 'meta-prompt-compact.md';
        break;
      case 'summary':
        content = generateTechniquesSummary();
        filename = 'techniques-summary.md';
        break;
    }
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPreview = (type: PromptType) => {
    switch (type) {
      case 'full':
        return generateMetaPrompt().slice(0, 500) + '...';
      case 'compact':
        return generateCompactMetaPrompt();
      case 'summary':
        return generateTechniquesSummary().slice(0, 500) + '...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-brand-500 to-teal-400 text-white">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export Meta-Prompt Generator</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create optimized prompts for any task using all PromptMastery techniques</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Select Meta-Prompt Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Full Version */}
                <button
                  onClick={() => setSelectedType('full')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedType === 'full'
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Layers size={20} className={selectedType === 'full' ? 'text-brand-500' : 'text-gray-400'} />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">Full Meta-Prompt Generator</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All 56 techniques with examples + instructions to create optimized prompts</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">~15-20K tokens</span>
                </button>

                {/* Compact Version */}
                <button
                  onClick={() => setSelectedType('compact')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedType === 'compact'
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Sparkles size={20} className={selectedType === 'compact' ? 'text-brand-500' : 'text-gray-400'} />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">Quick Generator</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Condensed technique list with instructions for rapid prompt creation</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">~3-5K tokens</span>
                </button>

                {/* Summary Only */}
                <button
                  onClick={() => setSelectedType('summary')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedType === 'summary'
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <FileText size={20} className={selectedType === 'summary' ? 'text-brand-500' : 'text-gray-400'} />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">Techniques Summary</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Just the techniques list with examples for reference</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">~5-8K tokens</span>
                </button>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Preview
              </label>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono max-h-64 overflow-y-auto custom-scrollbar">
                  {getPreview(selectedType)}
                </pre>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                How to Use
              </h3>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                <li>Copy or download the meta-prompt generator</li>
                <li>Paste it into your AI assistant (Claude, GPT-4, etc.)</li>
                <li>Replace the placeholder with YOUR specific task (e.g., "write unit tests", "generate API docs", "refactor code")</li>
                <li>The AI will create an optimized prompt for your task using the most relevant PromptMastery techniques</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Contains {selectedType === 'full' ? '56 techniques with full details' : selectedType === 'compact' ? '56 techniques (condensed)' : '56 techniques (list only)'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleDownload(selectedType)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Download size={16} />
              Download .md
            </button>
            <button
              onClick={() => handleCopy(selectedType)}
              className="px-6 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              {copiedType === selectedType ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
