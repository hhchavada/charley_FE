import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'

interface StickyFooterProps {
  step: number
  totalSteps: number
  analyzing: boolean
  isCurrentStepValid: boolean
  handleBack: () => void
  handleNext: () => void
  handleSubmit: () => void
}

export const StickyFooter = React.memo(function StickyFooter({
  step,
  totalSteps,
  analyzing,
  isCurrentStepValid,
  handleBack,
  handleNext,
  handleSubmit
}: StickyFooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-2xl border-t border-slate-200/50 p-4 z-50 transition-all pb-safe shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between lg:pl-16 lg:pr-16">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          disabled={step === 1 || analyzing} 
          className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 px-4 h-10 rounded-lg font-semibold transition-all duration-300 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Back</span>
        </Button>

        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center text-xs text-slate-400 font-medium tracking-wide">
            Press <kbd className="font-sans font-bold bg-slate-100/80 border border-slate-200 px-2 py-1 rounded-md text-slate-600 mx-2 shadow-sm text-[10px] uppercase tracking-widest">Enter ↵</kbd>
          </span>
          <Button 
            onClick={step < totalSteps ? handleNext : handleSubmit}
            disabled={!isCurrentStepValid || analyzing}
            className={`rounded-lg px-8 h-10 text-sm font-bold shadow-sm transition-all duration-300 active:scale-95 ${
              isCurrentStepValid 
                ? 'bg-slate-900 hover:bg-black text-white shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5' 
                : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed border border-slate-200/50'
            }`}
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
              </>
            ) : step < totalSteps - 1 ? (
              "Continue"
            ) : step === totalSteps - 1 ? (
              "Review Answers"
            ) : (
              "Generate Assessment"
            )}
          </Button>
        </div>
      </div>
    </footer>
  )
})
