import { useState, useCallback, useEffect, useRef } from 'react';

interface UseClipboardReturn {
  isCopied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

export const useClipboard = (timeout = 2000): UseClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Clear timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    reset();

    try {
      if (!text) throw new Error("No text to copy");

      // Strategy 1: Modern Clipboard API
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } 
      // Strategy 2: Fallback for Legacy/Non-Secure Contexts
      else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Ensure minimal visual disruption
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        textArea.setAttribute("readonly", "");
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) throw new Error("Clipboard copy failed (Legacy method)");
      }

      setIsCopied(true);
      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return true;
    } catch (err) {
      console.error("Clipboard Error:", err);
      setError(err instanceof Error ? err : new Error('Unknown copy error'));
      setIsCopied(false);
      return false;
    }
  }, [timeout, reset]);

  return { isCopied, error, copy, reset };
};
