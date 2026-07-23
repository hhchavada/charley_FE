import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

interface ResultsHeroProps {
  timestamp: string;
}

export const ResultsHero = React.memo(function ResultsHero({ timestamp }: ResultsHeroProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-100 text-blue-700 p-1 rounded-md">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">Assessment Complete • {timestamp}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
          Your Funding Assessment is Ready.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
          We analysed your company profile, business goals and eligibility against available funding programmes.
        </p>
      </div>
      
      <div className="shrink-0 pb-2">
        <Link href="/assessment">
          <Button variant="outline" className="rounded-full h-12 px-6 bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Start Over
          </Button>
        </Link>
      </div>
    </div>
  )
})
