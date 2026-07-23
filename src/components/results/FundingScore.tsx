import React from 'react'

interface FundingScoreProps {
  score: number
  missingFieldsLength: number
}

export const FundingScore = React.memo(function FundingScore({ score, missingFieldsLength }: FundingScoreProps) {
  return (
    <section className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
      <div className="relative shrink-0 flex items-center justify-center w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
          <circle 
            cx="50" cy="50" r="45" fill="none" 
            stroke={score > 70 ? "#10b981" : score > 40 ? "#f59e0b" : "#3b82f6"} 
            strokeWidth="10" 
            strokeDasharray="283" 
            strokeDashoffset={283 - (283 * score) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900">{score}%</span>
        </div>
      </div>
      <div className="space-y-6 w-full">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Funding Opportunity Score</h2>
          <p className="text-slate-500 font-medium">Excellent chance after completing missing information and following the recommended action plan.</p>
        </div>
        <div className="space-y-4">
          {['Company Profile', 'Business Goals', 'Financial Information'].map((label, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>{label}</span>
                <span>{i === 2 && missingFieldsLength > 0 ? 'Incomplete' : 'Complete'}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${i === 2 && missingFieldsLength > 0 ? 'bg-amber-400 w-[60%]' : 'bg-emerald-500 w-full'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
