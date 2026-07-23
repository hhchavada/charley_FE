import React from 'react'
import { Info } from 'lucide-react'

export const DisclaimerSection = React.memo(function DisclaimerSection() {
  return (
    <footer className="max-w-4xl mx-auto mt-24 text-center px-6">
      <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200/60">
        <Info className="w-6 h-6 text-slate-400 mx-auto mb-4" />
        <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed max-w-2xl mx-auto">
          This assessment is a preliminary recommendation based purely on the information provided in the frontend form. 
          Final eligibility and grant amounts are subject to official agency approval and formal consultant review. 
          No guarantee of approval is implied.
        </p>
      </div>
    </footer>
  )
})
