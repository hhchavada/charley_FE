import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { ConsultantAnalysisCard } from '@/components/results/ConsultantAnalysisCard'
import { RecommendationDTO } from '@/types/grant'

const formatMoney = (val?: string | number) => {
  if (!val && val !== 0) return 'Variable'
  const str = String(val).trim()
  
  if (/^\d+$/.test(str)) {
    const num = Number(str)
    if (num < 1000) {
      return `$${num},000`
    }
    return `$${num.toLocaleString()}`
  }
  
  if (/^\d{1,3}(,\d{3})*$/.test(str)) {
    return `$${str}`
  }
  
  return str
}

export const PremiumGrantCard = React.memo(function PremiumGrantCard({ 
  match, 
  type, 
  initiallyExpanded 
}: { 
  match: RecommendationDTO; 
  type: "success" | "warning" | "error" | "highly-recommended";
  initiallyExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded || false)

  const config = {
    "highly-recommended": {
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      status: "Strong Match",
      icon: <Zap className="w-3.5 h-3.5 mr-1.5 inline text-purple-600" />,
      cta: "Proceed to Application",
      ctaClass: "bg-purple-600 hover:bg-purple-700 text-white hover:-translate-y-0.5"
    },
    "success": {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      status: "Good Match",
      icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 inline text-emerald-600" />,
      cta: "Proceed to Application",
      ctaClass: "bg-slate-900 hover:bg-slate-800 text-white hover:-translate-y-0.5"
    },
    "warning": {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      status: "Possible Match",
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1.5 inline text-amber-600" />,
      cta: "Provide Missing Details",
      ctaClass: "bg-amber-100 text-amber-800 hover:bg-amber-200 hover:-translate-y-0.5"
    },
    "error": {
      badge: "bg-slate-100 text-slate-600 border-slate-200",
      status: "Currently not suitable",
      icon: <XCircle className="w-3.5 h-3.5 mr-1.5 inline text-slate-500" />,
      cta: "Not Eligible",
      ctaClass: "bg-slate-100 text-slate-400 cursor-not-allowed"
    }
  }

  const activeConfig = config[type]
  const isError = type === "error"

  return (
    <Card className={`border shadow-sm transition-all duration-300 rounded-3xl overflow-hidden flex flex-col bg-white hover:shadow-xl ${isError ? 'border-slate-100 opacity-70 hover:opacity-100' : 'border-slate-200 hover:border-slate-300 hover:-translate-y-1'}`}>
      <CardHeader className="pb-5 border-b border-slate-100/60 flex flex-col items-start gap-4">
        <div className="flex justify-between items-start w-full gap-4">
          <Badge variant="secondary" className={`font-semibold shrink-0 px-3 py-1 rounded-full text-xs border ${activeConfig.badge}`}>
            {activeConfig.icon}
            {activeConfig.status}
          </Badge>
          {/* Priority badge removed for production */}
        </div>

        <div className="space-y-2 w-full">
          <CardTitle className={`text-xl sm:text-2xl font-black leading-tight tracking-tight ${isError ? 'text-slate-600' : 'text-slate-900'}`}>
            {match.title}
          </CardTitle>
          {(match.headline || match.subHeadline) && (
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
              {match.headline || match.subHeadline}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6 flex-grow flex flex-col gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="flex flex-col justify-center bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Typical Funding</p>
            <p className={`text-lg sm:text-xl font-black ${isError ? 'text-slate-400' : 'text-slate-900'}`}>
              {isError ? '$0' : formatMoney(match.typicalFunding)}
            </p>
          </div>
          
          <div className="flex flex-col justify-center bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Max Funding</p>
            <p className={`text-lg sm:text-xl font-black ${isError ? 'text-slate-400' : 'text-slate-900'}`}>
              {isError ? '$0' : formatMoney(match.maximumFunding)}
            </p>
          </div>

          <div className="flex flex-col justify-center bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Support %</p>
            <div>
              {isError ? (
                <span className="text-slate-400 font-bold">-</span>
              ) : match.supportPercentage ? (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-black text-sm border-blue-100 px-2 py-0.5">
                  {match.supportPercentage}
                </Badge>
              ) : (
                <span className="text-slate-600 font-bold">Varies</span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Processing Time</p>
            <p className={`text-sm sm:text-base font-bold ${isError ? 'text-slate-400' : 'text-slate-700'}`}>
              {isError ? '-' : (match.processingTime || 'Varies')}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group focus:outline-none"
        >
          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
            {isError ? "Why is this not suitable?" : "Consultant Analysis"}
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />}
        </button>

        {isExpanded && (
          <ConsultantAnalysisCard match={match} type={type} />
        )}
      </CardContent>
    </Card>
  )
})
