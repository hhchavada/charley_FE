"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

import { AssessmentResultDTO, RecommendationDTO } from "@/types/grant"
import { useResultsMetrics } from "@/hooks/useResultsMetrics"

import { ResultsHero } from "@/components/results/ResultsHero"
import { MetricsGrid } from "@/components/results/MetricsGrid"
import { FundingScore } from "@/components/results/FundingScore"
import { ImprovementSidebar } from "@/components/results/ImprovementSidebar"
import { PremiumGrantCard } from "@/components/results/PremiumGrantCard"
import { DisclaimerSection } from "@/components/results/DisclaimerSection"

export default function ResultPage() {
  const [results, setResults] = useState<AssessmentResultDTO["recommendations"] | null>(null)
  const [summary, setSummary] = useState<AssessmentResultDTO["summary"] | null>(null)
  const [showIneligible, setShowIneligible] = useState(false)
  const [timestamp, setTimestamp] = useState("")

  useEffect(() => {
    const data = localStorage.getItem("grantResults")
    if (data) {
      const parsed: AssessmentResultDTO = JSON.parse(data)
      const sortFn = (a: RecommendationDTO, b: RecommendationDTO) => b.recommendationScore - a.recommendationScore
      setResults({
        readyNow: (parsed.recommendations?.readyNow || []).sort(sortFn),
        needsInformation: (parsed.recommendations?.needsInformation || []).sort(sortFn),
        prepareNext: (parsed.recommendations?.prepareNext || []).sort(sortFn),
        windowClosed: (parsed.recommendations?.windowClosed || []).sort(sortFn),
        hidden: (parsed.recommendations?.hidden || []).sort(sortFn)
      })
      setSummary(parsed.summary)
    }
    setTimestamp(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])

  const metrics = useResultsMetrics(results, summary)

  if (!results || !summary) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Finalizing your report...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-24">
      
      {/* SECTION 1: Assessment Summary Hero */}
      <section className="bg-white border-b border-slate-200/60 pb-20 pt-16 px-6 relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
        
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          <ResultsHero timestamp={timestamp} />
          
          <MetricsGrid 
            totalFunding={metrics.totalFunding}
            totalEligibleCount={metrics.totalEligibleCount}
            needMoreInfoLength={results.needsInformation.length}
            confidence={metrics.confidence}
            confidenceColor={metrics.confidenceColor}
          />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* SECTION 2: Funding Opportunity Score */}
          <FundingScore score={metrics.score} missingFieldsLength={metrics.missingFields.length} />

          {/* SECTION 3: Top Recommendations */}
          {(metrics.highlyRecommended.length > 0 || metrics.justQualified.length > 0) && (
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Top Recommendations</h2>
                <p className="text-lg text-slate-500 font-medium">The most viable funding programmes based on your current profile.</p>
              </div>
              
              <div className="space-y-6">
                {metrics.highlyRecommended.map((match: RecommendationDTO) => (
                  <PremiumGrantCard key={match.grantId} match={match} type="highly-recommended" initiallyExpanded={true} />
                ))}
                {metrics.justQualified.map((match: RecommendationDTO) => (
                  <PremiumGrantCard key={match.grantId} match={match} type="success" />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 7: Need More Information */}
          {results.needsInformation.length > 0 && (
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Potential Opportunities</h2>
                <p className="text-lg text-slate-500 font-medium">You might qualify for these grants, but we need a few more details to confirm.</p>
              </div>
              <div className="space-y-6">
                {results.needsInformation.map((match: RecommendationDTO) => (
                  <PremiumGrantCard key={match.grantId} match={match} type="warning" />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 7.5: Prepare Next */}
          {results.prepareNext && results.prepareNext.length > 0 && (
            <section className="space-y-8 pt-12 border-t border-slate-200/60">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Prepare Next</h2>
                <p className="text-lg text-slate-500 font-medium">Strategic programmes to prepare for the future.</p>
              </div>
              <div className="space-y-6">
                {results.prepareNext.map((match: RecommendationDTO) => (
                  <PremiumGrantCard key={match.grantId} match={match} type="success" />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 8: Ineligible Grants */}
          {((results.windowClosed && results.windowClosed.length > 0) || (results.hidden && results.hidden.length > 0)) && (
            <section className="space-y-6 pt-12 border-t border-slate-200/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Other Assessed Programmes</h2>
                  <p className="text-slate-500 font-medium text-sm mt-1">These {(results.windowClosed?.length || 0) + (results.hidden?.length || 0)} grants are currently not suitable.</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowIneligible(!showIneligible)}
                  className="rounded-full font-bold border-slate-200 text-slate-600 hover:bg-slate-100 shrink-0"
                >
                  {showIneligible ? "Hide" : "View All"}
                  {showIneligible ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
              </div>

              {showIneligible && (
                <div className="space-y-4 mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  {results.windowClosed?.map((match: RecommendationDTO) => (
                    <PremiumGrantCard key={match.grantId} match={match} type="error" />
                  ))}
                  {results.hidden?.map((match: RecommendationDTO) => (
                    <PremiumGrantCard key={match.grantId} match={match} type="error" />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-8">
            <ImprovementSidebar missingFields={metrics.missingFields} tagsInsight={metrics.topTag} />
          </div>
        </div>
      </div>
      
      {/* SECTION 9: Disclaimer */}
      <DisclaimerSection />
    </div>
  )
}
