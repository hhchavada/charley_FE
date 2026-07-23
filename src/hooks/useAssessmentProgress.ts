import { useState, useCallback } from 'react'

export function useAssessmentProgress(totalSteps: number) {
  const [step, setStep] = useState(1)

  const handleNext = useCallback(() => {
    setStep(s => Math.min(totalSteps, s + 1))
  }, [totalSteps])

  const handleBack = useCallback(() => {
    setStep(s => Math.max(1, s - 1))
  }, [])

  const setStepDirectly = useCallback((newStep: number) => {
    setStep(Math.max(1, Math.min(totalSteps, newStep)))
  }, [totalSteps])

  return {
    step,
    handleNext,
    handleBack,
    setStepDirectly
  }
}
