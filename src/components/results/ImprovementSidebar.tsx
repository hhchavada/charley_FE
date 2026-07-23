import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, Lightbulb, Clock } from 'lucide-react'
import { formatFieldName } from '@/lib/utils'

interface ImprovementSidebarProps {
  missingFields: { field: string; count: number }[]
  tagsInsight: string | null
}

export const ImprovementSidebar = React.memo(function ImprovementSidebar({ missingFields, tagsInsight }: ImprovementSidebarProps) {
  return (
    <div className="space-y-6">
      {missingFields.length > 0 && (
        <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-100 p-5">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> Improvement Opportunities
            </h3>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {missingFields.slice(0, 3).map((f, i) => (
                <div key={i} className="p-5 space-y-3 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{formatFieldName(f.field)}</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 font-bold border-0 text-[10px] uppercase">High Impact</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Providing this may unlock {f.count} additional grant(s) and improve matching accuracy.
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <Link href="/assessment">
                <Button className="w-full rounded-xl font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm">
                  Complete Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="p-5 border-b border-slate-100/50">
          <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" /> Consultant Insights
          </h3>
        </div>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {tagsInsight ? `You appear most suited for ${tagsInsight}-focused grants based on your intent.` : 'Your profile indicates a strong foundation for standard business expansion grants.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Providing detailed financial projections will significantly increase assessment confidence.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-5">
          <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" /> Recommended Next Steps
          </h3>
        </div>
        <CardContent className="p-8">
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
    </div>
  )
})
