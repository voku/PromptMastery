import { TECHNIQUES } from '../constants';

/**
 * Generates a comprehensive meta-prompt that combines all prompting techniques
 * with a system prompt template for generating documentation
 */
export function generateMetaPrompt(): string {
  const header = `# PromptMastery: Meta-Prompt for Documentation Generation

This meta-prompt combines all prompting techniques from PromptMastery to help you generate high-quality, developer-focused documentation for any codebase.

## How to Use This Meta-Prompt

1. Copy this entire meta-prompt
2. Paste it into your AI assistant (Claude, GPT-4, etc.)
3. Replace [YOUR_CODE_FILES] with your actual code files or descriptions
4. The AI will generate comprehensive documentation using the techniques below

---

## SYSTEM PROMPT: Documentation Generator

You are a senior software engineer + technical writer.

**NORTH STAR:** Truth > Speed. Use ONLY the provided code files as source of truth. No guessing.
If something is unclear or not present in the code, label it explicitly as UNKNOWN and propose what to inspect next (without inventing details).

**STYLE TARGET:**
Write documentation "a bit like jQuery docs":
- Practical, dev-facing, example-heavy
- Clear "Signature / Parameters / Returns / Examples / Notes / Best Practices / Pitfalls"
- Small runnable snippets over theory
- Explicit error cases + edge cases
- Security notes (OWASP-ish) when relevant
- Cross-links between related functions/classes inside the provided files

**OUTPUT FORMAT (strict):**

# <Module/Package Name inferred from code> Documentation

## 0. Quick Start
- What this file/class solves (1–3 bullets)
- Minimal example (copy-paste ready)
- Typical flow diagram (ASCII art acceptable)

## 1. API Index
List all public classes/functions/methods with 1-line summary each.
Example:
- Class Foo\\Bar
  - __construct(...) - Initialize the object
  - doThing(...) → returns ... - Perform the main action

## 2. Detailed Reference
For EACH public class/function/method, generate a section:

### <Name>
**Signature**
\`\`\`
...exact signature as in code...
\`\`\`

**Parameters**
- \`param1\` (type) - Description
- \`param2\` (type, optional) - Description

**Returns**
- (type) - Description

**Description**
Clear explanation of what it does and why you'd use it.

**Examples**
\`\`\`
// Example 1: Basic usage
...runnable code...

// Example 2: Edge case
...runnable code...
\`\`\`

**Best Practices**
- Do this...
- Avoid that...

**Common Pitfalls**
- Watch out for X because...
- Remember that Y will...

**Security Notes** (if applicable)
- Validate inputs to prevent...
- Use sanitization for...

**See Also**
- Related function/class names from the same codebase

---

## Prompting Techniques Reference

Below are all the prompting techniques from PromptMastery that inform how this documentation should be generated:

`;

  const techniquesSection = TECHNIQUES.map((tech, index) => {
    return `### ${index + 1}. ${tech.title}${tech.alsoKnownAs ? ` (${tech.alsoKnownAs.join(', ')})` : ''}

**Category:** ${tech.category}

**Short Description:** ${tech.shortDescription}

**Standard Prompt Example:**
${tech.playgroundPrompt || 'N/A'}

**Optimized Prompt Example:**
${tech.optimizedPrompt || 'N/A'}

**Key Principles:**
${tech.theoryContent.trim()}

---
`;
  }).join('\n');

  const footer = `
## Now, Generate Documentation

Using ALL the techniques above, generate comprehensive documentation for the following code:

**[REPLACE THIS SECTION WITH YOUR CODE FILES OR FILE DESCRIPTIONS]**

---

**Instructions for AI:**
1. Apply Chain of Thought (CoT) - First analyze the code structure, then plan the documentation structure, then write it
2. Use Fact Grounding (Source) - Only document what's actually in the code
3. Apply Verification Protocol (VP) - Check that all documented features actually exist in the code
4. Use Contrastive Examples (Diff) - Show both good and bad usage examples
5. Apply Intent Context (Why) - Explain WHY certain patterns are used, not just WHAT they do
6. Use Attention Anchors (Attn) - Structure output with clear markdown headers as specified above
7. Apply North Star (Goal) - Never hallucinate features that don't exist
8. Use Instruction Enclosure (Sandwich) - Remember: Truth > Speed, source code is the only truth

**Begin documentation generation now.**
`;

  return header + techniquesSection + footer;
}

/**
 * Generates a shorter version for quick copy
 */
export function generateCompactMetaPrompt(): string {
  const header = `# Quick Meta-Prompt: Documentation Generator

SYSTEM: You are a senior software engineer + technical writer.
NORTH STAR: Truth > Speed. Use ONLY provided code as source. Never hallucinate.

STYLE: jQuery-style docs (practical, example-heavy, dev-focused)

OUTPUT FORMAT:
# [Module Name]
## 0. Quick Start (what it solves, minimal example, flow)
## 1. API Index (all public methods, 1-line each)
## 2. Detailed Reference (for each: Signature, Parameters, Returns, Examples, Best Practices, Pitfalls, Security)

TECHNIQUES TO APPLY:
`;

  const techniques = TECHNIQUES.map((tech, i) => 
    `${i + 1}. ${tech.title}: ${tech.shortDescription}`
  ).join('\n');

  const footer = `

CODE TO DOCUMENT:
[PASTE YOUR CODE HERE]

Instructions: Apply CoT (analyze→plan→write), Fact Grounding (code only), Verification (check features exist), show good/bad examples, explain WHY not just WHAT, use clear markdown structure.`;

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
