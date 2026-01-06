export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TradeOffs {
  pros: string[];
  cons: string[];
  compatibleWith: string[]; // IDs of other techniques
  incompatibleWith: string[]; // IDs of other techniques
}

export interface RelatedLink {
  title: string;
  url: string;
  description?: string;
}

export interface Technique {
  id: string;
  title: string;
  shortDescription: string;
  icon: string; // Lucide icon name
  category: 'Agentic Architecture' | 'Reliability Engineering' | 'High-Performance Optimization';
  
  alsoKnownAs?: string[]; // Aliases / Alternative names

  // Content Sections
  theoryContent: string;
  technologyContent: string; // Explanation of under-the-hood tech
  codeExample: string; // The specific code requirement (Python)
  
  // New Engineering Context
  tradeOffs?: TradeOffs;

  // Interactive Elements
  playgroundPrompt?: string; // Default prompt for playground
  playgroundTask?: string; // Instructions for the user
  optimizedExample?: string; // Pre-calculated optimization result (Analysis + Prompt)
  optimizedPrompt?: string; // NEW: The clean optimized prompt text for copying
  
  // Related Resources
  relatedLinks?: RelatedLink[]; // External learning resources
  
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedTechniques: string[]; // IDs
  quizScores: Record<string, number>; // techniqueId -> score (0-100)
  bookmarks: string[];
}

export type Theme = 'light' | 'dark';