import React, { useMemo } from "react"
import { CheckCircle2, AlertCircle, Info, CheckSquare, Target, Lightbulb, Check } from "lucide-react"
import { RecommendationDTO } from "@/types/grant"
import { Badge } from "@/components/ui/badge"

interface Props {
  match: RecommendationDTO;
  type: "success" | "warning" | "error" | "highly-recommended";
}

export const ConsultantAnalysisCard: React.FC<Props> = React.memo(function ConsultantAnalysisCard({ match, type }) {
  const isError = type === "error"

  // SECTION 1: Executive Summary
  const executiveSummary = useMemo(() => {
    if (match.whyRecommended) return match.whyRecommended;
    if (type === 'highly-recommended') return "This programme aligns exceptionally well with your stated business objectives and merits immediate attention."
    if (type === 'success') return "Your current profile strongly satisfies the core requirements for this funding track."
    if (type === 'warning') return "This opportunity looks promising, although several important details are still missing to confirm full eligibility."
    return "Based on your current profile, this programme is not a suitable fit at this time."
  }, [type, match.whyRecommended])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-500 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden mt-4">
      
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-20"></div>

      {/* SECTION 1: Executive Summary */}
      <div className="flex gap-4">
        <div className="shrink-0 mt-1">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">Executive Summary</h4>
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">{executiveSummary}</p>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* SECTION 2 & 3: Consultant Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Recommended Actions */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-black text-emerald-700 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" /> Recommended Actions
          </h4>
          <div className="space-y-3">
            {match.recommendedActions && match.recommendedActions.length > 0 ? (
              match.recommendedActions.map((action, i) => (
                <div key={`action-${i}`} className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm font-semibold text-emerald-900">{action}</span>
                </div>
              ))
            ) : (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm font-semibold text-emerald-900">Proceed with application preparations.</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Explanation or Gaps */}
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-amber-700">
            <AlertCircle className="w-4 h-4" /> Key Considerations
          </h4>
          <div className="space-y-3">
            {match.AIExplanation ? (
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                <span className="text-sm font-semibold text-amber-900">
                  {match.AIExplanation}
                </span>
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic p-2">No critical considerations flagged.</p>
            )}
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* SECTION 6 & 7: Funding Strategy & Preparation Checklist */}
      {!isError && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
              <Target className="w-4 h-4" /> Potential Funding Strategy
            </h4>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              Based on your assessment, it may be beneficial to pursue this programme first to secure core funding before exploring complementary options. Ensure all project milestones clearly map to the grant&apos;s stated objectives.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
              <CheckSquare className="w-4 h-4" /> Suggested Preparation
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <div className="w-4 h-4 rounded border-2 border-slate-300"></div> Review company information
              </div>
              {type === 'warning' && (
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded border-2 border-slate-300 bg-white"></div> Prepare missing documentation
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <div className="w-4 h-4 rounded border-2 border-slate-300 bg-white"></div> Prepare project scope and quotations
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="border-slate-100" />

      {/* SECTION 8: Consultant Questions & SECTION 4 Recommendation */}
      <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
        <div className="space-y-4 flex-1">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Questions to Discuss with Consultant</h4>
          <ul className="space-y-2">
            <li className="text-sm font-semibold text-blue-700 bg-blue-50 inline-block px-3 py-1.5 rounded-lg border border-blue-100">
              Can this project qualify for a higher funding tier?
            </li>
            <br />
            <li className="text-sm font-semibold text-blue-700 bg-blue-50 inline-block px-3 py-1.5 rounded-lg border border-blue-100">
              Would additional documentation improve approval chances?
            </li>
          </ul>
        </div>
        
        <div className="bg-slate-900 text-white p-6 rounded-2xl sm:max-w-xs w-full shadow-lg border border-slate-800">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Final Verdict</h4>
          <p className="text-sm font-semibold leading-relaxed mb-4">
            {match.status === 'READY' ? 'Proceed with confidence.' : (isError ? 'Not suitable.' : 'Gather details and verify eligibility.')}
          </p>
          <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0 shadow-none text-xs">
            Confidence: {match.confidence.toFixed(0)}%
          </Badge>
        </div>
      </div>

      {/* SECTION 9: Confidence Explanation */}
      <div className="bg-slate-50 p-4 rounded-xl flex gap-3 items-start border border-slate-100 mt-4">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-slate-500 leading-relaxed">
          This confidence score reflects how closely your available information aligns with the known eligibility requirements. Additional verified information may improve the assessment.
        </p>
      </div>

    </div>
  )
})
