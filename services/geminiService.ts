/**
 * DEPRECATED
 * 
 * This service is no longer used in the static version of PromptMastery.
 * The application has shifted to a pre-calculated "Textbook" model to ensure
 * deterministic educational outcomes without requiring user API keys.
 * 
 * Do not import from this file.
 */

export const generateContent = async () => {
  throw new Error("This service is deprecated. Use static content from constants.ts instead.");
};

export const optimizePrompt = async () => {
  throw new Error("This service is deprecated. Use static content from constants.ts instead.");
};
