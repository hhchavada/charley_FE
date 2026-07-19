"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp, Zap, ShieldCheck } from "lucide-react"

type RuleResult = {
  rule: { field: string, operator: string, value: any, expectedMessage?: string }
  status: 'Matched' | 'Missing' | 'Rejected'
  message: string
}

type MatchResult = {
  grant: {
    id: string
    name: string
    priority: number
    estimatedFunding: string
    supportPercentage?: string
    description?: string
    tags?: string[]
  }
  status: 'Qualified' | 'Not Qualified' | 'Needs More Information'
  ruleResults: RuleResult[]
}

type GroupedResults = {
  eligible: MatchResult[]
  needMoreInfo: MatchResult[]
  notEligible: MatchResult[]
}

export default function ResultPage() {
  const [results, setResults] = useState<GroupedResults | null>(null)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const data = localStorage.getItem("grantResults")
    if (data) {
      const parsed = JSON.parse(data)
      const grouped: GroupedResults = {
        eligible: parsed.eligible || [],
        needMoreInfo: parsed.needMoreInfo || [],
        notEligible: parsed.notEligible || []
      }
      const sortFn = (a: MatchResult, b: MatchResult) => a.grant.priority - b.grant.priority
      grouped.eligible.sort(sortFn)
      grouped.needMoreInfo.sort(sortFn)
      grouped.notEligible.sort(sortFn)
      setResults(grouped)
    }
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    // Auto-expand Highly Recommended cards
    if (results && results.eligible) {
      const highlyRecommended = results.eligible.filter(m => m.grant.priority === 1)
      if (highlyRecommended.length > 0) {
        const initialExpanded: Record<string, boolean> = {}
        highlyRecommended.forEach(m => {
          initialExpanded[m.grant.id] = true
        })
        setExpandedCards(prev => ({ ...prev, ...initialExpanded }))
      }
    }
  }, [results])

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading your matches...</p>
      </div>
    )
  }

  // Format field names like "dynamicAnswers.equipmentProductivity" to "Equipment Productivity"
  const formatFieldName = (field: string) => {
    const clean = field.replace('dynamicAnswers.', '').replace(/([A-Z])/g, ' $1')
    return clean.charAt(0).toUpperCase() + clean.slice(1)
  }

  // Calculate estimated total funding
  const calculateTotalFunding = () => {
    let total = 0
    results.eligible.forEach(match => {
      const numMatch = match.grant.estimatedFunding.match(/\d+(?:,\d+)*(?:\.\d+)?/)
      if (numMatch) {
        total += parseInt(numMatch[0].replace(/,/g, ''), 10)
      }
    })
    return total > 0 ? `$${total.toLocaleString()}` : 'TBD'
  }

  const highlyRecommended = results.eligible.filter(m => m.grant.priority === 1)
  const justQualified = results.eligible.filter(m => m.grant.priority !== 1)

  const renderCard = (match: MatchResult, type: "success" | "warning" | "error" | "highly-recommended") => {
    const isExpanded = !!expandedCards[match.grant.id]
    const g = match.grant

    const badgeClasses = 
      type === "highly-recommended" ? "bg-purple-100 text-purple-800 border-purple-200" :
      type === "success" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
      type === "warning" ? "bg-amber-100 text-amber-800 border-amber-200" :
      "bg-rose-100 text-rose-800 border-rose-200"

    const displayStatus = type === "highly-recommended" ? "Highly Recommended" : match.status

    return (
      <Card key={g.id} className="border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col bg-white hover:-translate-y-1">
        <CardHeader className="pb-4 border-b border-slate-100 flex flex-col items-start gap-4 bg-slate-50/50">
          <div className="flex justify-between items-start w-full gap-4">
            <Badge variant="secondary" className={`font-bold shrink-0 px-3 py-1 rounded-full text-xs border ${badgeClasses}`}>
              {type === "highly-recommended" && <Zap className="w-3 h-3 mr-1 inline" />}
              {displayStatus}
            </Badge>
            <Badge variant="outline" className="text-[10px] font-bold text-slate-500 bg-white shadow-sm border-slate-200 rounded-full px-2 py-0.5">
              Priority {g.priority}
            </Badge>
          </div>

          <div className="space-y-2 w-full">
            <CardTitle className="text-xl font-extrabold text-slate-900 leading-tight">
              {g.name}
            </CardTitle>
            {g.description && (
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                {g.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            {g.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-6 flex-grow flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Support Amount</p>
              <p className="text-2xl font-black text-slate-800">{g.estimatedFunding}</p>
            </div>
            {g.supportPercentage && (
              <div className="text-right flex flex-col items-end">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-extrabold text-sm border-blue-200">
                  {g.supportPercentage}
                </Badge>
              </div>
            )}
          </div>

          <button 
            onClick={() => toggleExpand(g.id)}
            className="flex items-center justify-between w-full p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
          >
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">Why this Match?</span>
            {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />}
          </button>

          {isExpanded && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {match.ruleResults.filter(r => r.status === 'Matched').length > 0 && (
                <div className="space-y-2.5">
                  {match.ruleResults.filter(r => r.status === 'Matched').map((r, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                      <span className="text-emerald-500 font-black shrink-0">✔</span>
                      <span>{r.rule.expectedMessage || r.message}</span>
                    </div>
                  ))}
                </div>
              )}
              {match.ruleResults.filter(r => r.status === 'Rejected').length > 0 && (
                <div className="space-y-2.5 pt-2.5 border-t border-slate-200">
                  {match.ruleResults.filter(r => r.status === 'Rejected').map((r, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                      <span className="text-rose-500 font-black shrink-0">✘</span>
                      <span>{r.rule.expectedMessage ? `${r.rule.expectedMessage} not met` : r.message}</span>
                    </div>
                  ))}
                </div>
              )}
              {match.ruleResults.filter(r => r.status === 'Missing').length > 0 && (
                <div className="space-y-2.5 pt-2.5 border-t border-slate-200">
                  {match.ruleResults.filter(r => r.status === 'Missing').map((r, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                      <span className="text-amber-500 font-black shrink-0">○</span>
                      <span>Missing info: {formatFieldName(r.rule.field)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 pb-6 px-6 mt-auto">
          <Button 
            className={`w-full rounded-xl h-12 font-extrabold text-[15px] shadow-sm transition-all ${
              (type === "success" || type === "highly-recommended") 
                ? (type === "highly-recommended" ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 hover:shadow-lg" : "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-lg")
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {(type === "success" || type === "highly-recommended") ? "Apply for Grant" : "Not Eligible"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative isolate">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Your Matches</h1>
            <p className="text-lg text-slate-500 font-medium">Personalized grant recommendations based on your business profile</p>
          </div>
          <Link href="/assessment">
            <Button variant="outline" className="rounded-full h-12 px-6 bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-50 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Start Over
            </Button>
          </Link>
        </div>

        {/* SUMMARY BANNER */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Match Summary</h3>
            <div className="space-y-2 font-semibold text-slate-700">
              {highlyRecommended.length > 0 && <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span>{highlyRecommended.length} Highly Recommended {highlyRecommended.length === 1 ? 'Grant' : 'Grants'}</div>}
              {justQualified.length > 0 && <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>{justQualified.length} Qualified {justQualified.length === 1 ? 'Grant' : 'Grants'}</div>}
              {results.needMoreInfo.length > 0 && <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>{results.needMoreInfo.length} {results.needMoreInfo.length === 1 ? 'Grant needs' : 'Grants need'} additional information</div>}
            </div>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 min-w-[240px]">
            <p className="text-sm font-bold text-slate-500 mb-1">Estimated Total Potential Funding</p>
            <p className="text-3xl font-black text-slate-900">{calculateTotalFunding()}</p>
          </div>
        </div>

        {highlyRecommended.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
            <div className="flex items-center gap-3 border-b-2 border-purple-100 pb-4">
              <ShieldCheck className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-black text-slate-900">Highly Recommended</h2>
              <span className="bg-purple-100 text-purple-800 text-sm font-black px-3 py-1 rounded-full">{highlyRecommended.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlyRecommended.map(match => renderCard(match, "highly-recommended"))}
            </div>
          </section>
        )}

        {justQualified.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
            <div className="flex items-center gap-3 border-b-2 border-emerald-100 pb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <h2 className="text-2xl font-black text-slate-900">Qualified Grants</h2>
              <span className="bg-emerald-100 text-emerald-800 text-sm font-black px-3 py-1 rounded-full">{justQualified.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {justQualified.map(match => renderCard(match, "success"))}
            </div>
          </section>
        )}

        {results.needMoreInfo.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
            <div className="flex items-center gap-3 border-b-2 border-amber-100 pb-4">
              <AlertCircle className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-black text-slate-900">Needs More Information</h2>
              <span className="bg-amber-100 text-amber-800 text-sm font-black px-3 py-1 rounded-full">{results.needMoreInfo.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.needMoreInfo.map(match => renderCard(match, "warning"))}
            </div>
          </section>
        )}

        {results.notEligible.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
            <div className="flex items-center gap-3 border-b-2 border-rose-100 pb-4">
              <XCircle className="w-8 h-8 text-rose-500" />
              <h2 className="text-2xl font-black text-slate-900">Not Qualified</h2>
              <span className="bg-rose-100 text-rose-800 text-sm font-black px-3 py-1 rounded-full">{results.notEligible.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70 hover:opacity-100 grayscale-[40%] hover:grayscale-0 transition-all duration-300">
              {results.notEligible.map(match => renderCard(match, "error"))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
