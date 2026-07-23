import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export const RecommendationTimeline = React.memo(function RecommendationTimeline() {
  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-3xl sticky top-24">
      <CardContent className="p-8">
        <h3 className="text-xl font-black text-slate-900 mb-6">Recommended Action Plan</h3>
        <div className="relative pl-6 space-y-8 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-slate-100">
          
          <div className="relative">
            <div className="absolute -left-[30px] w-4 h-4 bg-emerald-500 border-4 border-white rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-slate-900">Review eligibility</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">Completed via this assessment.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[30px] w-4 h-4 bg-blue-500 border-4 border-white rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-slate-900">Prepare missing information</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">Fill in the gaps identified in the report.</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[30px] w-4 h-4 bg-slate-200 border-4 border-white rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-slate-400">Collect supporting documents</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Financials, ACRA, and project proposals.</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[30px] w-4 h-4 bg-slate-200 border-4 border-white rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-slate-400">Speak with consultant</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Review the strategy and finalise.</p>
          </div>

        </div>
      </CardContent>
    </Card>
  )
})
