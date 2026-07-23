import { useEffect } from 'react'

interface UseKeyboardNavigationProps {
  onNext: () => void
  onSubmit: () => void
  isValid: boolean
  isSubmitting: boolean
  isLastStep: boolean
}

export function useKeyboardNavigation({
  onNext,
  onSubmit,
  isValid,
  isSubmitting,
  isLastStep
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isValid && !isSubmitting) {
        if (document.activeElement?.tagName === "TEXTAREA") return;
        
        e.preventDefault();
        if (!isLastStep) {
          onNext();
        } else {
          onSubmit();
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isValid, isSubmitting, isLastStep, onNext, onSubmit]);
}
