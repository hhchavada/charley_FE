import React from 'react'
import { Zap, Loader2, CheckCircle2 } from 'lucide-react'

interface LoadingScreenProps {
  analysisStep: number
}

export const LoadingScreen = React.memo(function LoadingScreen({ analysisStep }: LoadingScreenProps) {
  const steps = [
    "Analyzing company profile...",
    "Checking grant eligibility...",
    "Applying business rules...",
    "Calculating estimated funding...",
    "Preparing personalized recommendations..."
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative isolate overflow-hidden px-6 font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-xl w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000 ease-out">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-900/5 relative border border-slate-100">
            <Zap className="w-10 h-10 text-blue-600 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-4">
          Curating your matches
        </h2>
        <p className="text-lg text-slate-500 font-medium text-center mb-16 animate-pulse">
          {analysisStep < 5 ? "We're comparing your business with available grants." : "Almost done! Generating your dashboard..."}
        </p>

        <div className="w-full space-y-4">
          {steps.map((text, idx) => {
            const stepNum = idx + 1;
            const isActive = analysisStep === stepNum;
            const isCompleted = analysisStep > stepNum;
            const isPending = analysisStep < stepNum;

            if (isPending && analysisStep !== 0 && stepNum > analysisStep + 1) return null; 

            return (
              <div 
                key={idx} 
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-700 ease-out ${
                  isActive ? 'bg-white shadow-lg shadow-slate-200/50 border border-slate-200/60 scale-100 opacity-100' :
                  isCompleted ? 'scale-95 opacity-60' :
                  'scale-95 opacity-0 hidden' 
                }`}
                style={{
                  display: isPending && stepNum !== analysisStep + 1 ? 'none' : 'flex',
                  opacity: isPending ? 0.4 : undefined
                }}
              >
                <div className="shrink-0 flex items-center justify-center w-8 h-8">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in zoom-in duration-300" />
                  ) : isActive ? (
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  )}
                </div>
                <span className={`text-base md:text-lg font-semibold tracking-wide transition-colors duration-500 ${
                  isActive ? 'text-slate-900' :
                  isCompleted ? 'text-slate-500' :
                  'text-slate-400'
                }`}>
                  {text}
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-16 text-sm font-semibold text-slate-400 uppercase tracking-widest text-center">
          This usually takes less than 10 seconds.
        </p>
      </div>
    </div>
  )
})
