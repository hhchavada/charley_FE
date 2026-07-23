import React from 'react'
import { Zap } from 'lucide-react'

interface ProgressHeaderProps {
  step: number
  totalSteps: number
}

export const ProgressHeader = React.memo(function ProgressHeader({ step, totalSteps }: ProgressHeaderProps) {
  const progressPercentage = (step / totalSteps) * 100

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between transition-all gap-4 sm:gap-0 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm shadow-blue-200">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold tracking-tight text-slate-900 hidden sm:inline text-lg">GrantMatch AI</span>
      </div>
      
      <div className="flex flex-col flex-1 max-w-md w-full sm:w-auto items-end">
        <div className="flex items-center justify-between w-full mb-1.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {step === 1 && "Let's go!"}
            {step === 2 && "Great progress!"}
            {step === 3 && "Halfway there."}
            {step === 4 && "Almost done."}
            {step === 5 && "Final step!"}
            {step === 6 && "Review & Generate"}
          </span>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span aria-live="polite">Step {step} of {totalSteps}</span>
            <span className="text-slate-300">•</span>
            <span>{step === 6 ? "Ready" : `~${7 - step} min left`}</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" 
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </header>
  )
})
