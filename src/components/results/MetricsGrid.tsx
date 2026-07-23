import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Target, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'

interface MetricsGridProps {
  totalFunding: string
  totalEligibleCount: number
  needMoreInfoLength: number
  confidence: string
  confidenceColor: string
}

export const MetricsGrid = React.memo(function MetricsGrid({
  totalFunding,
  totalEligibleCount,
  needMoreInfoLength,
  confidence,
  confidenceColor
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
        <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Target className="w-5 h-5" /></div>
            <span className="text-xs font-bold uppercase tracking-wider">Potential Funding</span>
          </div>
          <p className="text-3xl md:text-4xl font-black text-slate-900">{totalFunding}</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
        <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><CheckCircle2 className="w-5 h-5" /></div>
            <span className="text-xs font-bold uppercase tracking-wider">Matched Grants</span>
          </div>
          <p className="text-3xl md:text-4xl font-black text-slate-900">{totalEligibleCount}</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
        <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><AlertCircle className="w-5 h-5" /></div>
            <span className="text-xs font-bold uppercase tracking-wider">Needs Info</span>
          </div>
          <p className="text-3xl md:text-4xl font-black text-slate-900">{needMoreInfoLength}</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-slate-200 shadow-sm rounded-3xl">
        <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><ShieldCheck className="w-5 h-5" /></div>
            <span className="text-xs font-bold uppercase tracking-wider">Confidence</span>
          </div>
          <p className={`text-2xl md:text-3xl font-black ${confidenceColor}`}>{confidence}</p>
        </CardContent>
      </Card>
    </div>
  )
})
