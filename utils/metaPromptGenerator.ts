import { TECHNIQUES } from '../constants';

/**
 * Generates a comprehensive meta-prompt that combines all prompting techniques
 * to help create optimized prompts for any task
 */
export function generateMetaPrompt(): string {
  const header = `# PromptMastery: Meta-Prompt Generator

This meta-prompt helps you create optimized prompts by combining all 56 prompting techniques from PromptMastery.

## How to Use This Meta-Prompt

1. Copy this entire meta-prompt
2. Paste it into your AI assistant (Claude, GPT-4, etc.)
3. Replace [YOUR TASK/GOAL] with your specific task description
4. The AI will generate an optimized prompt using the relevant techniques below

---

## All Prompting Techniques

Below are all 56 prompting techniques from PromptMastery. Use these as building blocks to construct the optimal prompt:

`;

  const techniquesSection = TECHNIQUES.map((tech, index) => {
    return `### ${index + 1}. ${tech.title}${tech.alsoKnownAs ? ` (${tech.alsoKnownAs.join(', ')})` : ''}

**Category:** ${tech.category}

**Description:** ${tech.shortDescription}

**When to Use:** ${tech.theoryContent.trim().split('\n').slice(0, 3).join(' ')}

**Standard Example:**
\`\`\`
${tech.playgroundPrompt || 'N/A'}
\`\`\`

**Optimized Example:**
\`\`\`
${tech.optimizedPrompt || 'N/A'}
\`\`\`

---
`;
  }).join('\n');

  const footer = `
## Your Task

**Task/Goal to create a prompt for:**
[REPLACE THIS WITH YOUR TASK DESCRIPTION - e.g., "Generate API documentation", "Write unit tests", "Refactor legacy code", "Create marketing copy", etc.]

---

## Instructions for Generating the Optimized Prompt

Based on the task above and the 56 techniques listed, create an optimized prompt that:

1. **Analyze the Task** (Chain of Thought):
   - What is the core objective?
   - What are the inputs and expected outputs?
   - What are potential failure modes or edge cases?

2. **Select Relevant Techniques**:
   - Identify which techniques from the list above are most applicable
   - Consider: Does this task need fact grounding? Verification? Multi-step reasoning? Creative ideation?

3. **Compose the Optimized Prompt**:
   - Start with a clear North Star (Goal) if applicable
   - Structure instructions using Attention Anchors (headers/sections)
   - Apply Instruction Enclosure (Sandwich) - state key constraints at start AND end
   - Include Contrastive Examples (Good vs Bad) if helpful
   - Add Intent Context (Why) to clarify reasoning
   - Use XML Delimiters (Tags) to separate different sections
   - Specify output format clearly

4. **Validate the Prompt**:
   - Does it have clear, unambiguous instructions?
   - Are edge cases and constraints specified?
   - Will it minimize hallucinations and maximize accuracy?

**Generate the optimized prompt now, clearly labeled with the techniques used.**
`;

  return header + techniquesSection + footer;
}

/**
 * Generates a shorter version for quick copy
 */
export function generateCompactMetaPrompt(): string {
  const header = `# Quick Meta-Prompt Generator

Create an optimized prompt for any task using PromptMastery techniques.

## Your Task
[DESCRIBE YOUR TASK HERE - e.g., "write unit tests", "generate API docs", "refactor code", "create marketing copy"]

## Available Techniques (56 total)

`;

  const techniques = TECHNIQUES.map((tech, i) => 
    `${i + 1}. **${tech.title}**: ${tech.shortDescription}`
  ).join('\n');

  const footer = `

## Instructions

1. Analyze the task above
2. Select 3-5 most relevant techniques from the list
3. Generate an optimized prompt that:
   - Has clear structure (use headers/sections)
   - Includes examples if helpful (good vs bad)
   - Specifies output format
   - States constraints clearly
   - Explains the "why" behind requirements
   
4. Label which techniques you applied and why

Generate the optimized prompt now.`;

  return header + techniques + footer;
}

/**
 * Generates just the techniques summary for copy-paste
 */
export function generateTechniquesSummary(): string {
  return TECHNIQUES.map((tech, index) => {
    return `${index + 1}. **${tech.title}** ${tech.alsoKnownAs ? `(aka ${tech.alsoKnownAs.join(', ')})` : ''}
   ${tech.shortDescription}
   
   Standard: ${tech.playgroundPrompt || 'N/A'}
   
   Optimized: ${tech.optimizedPrompt || 'N/A'}
`;
  }).join('\n---\n\n');
}
