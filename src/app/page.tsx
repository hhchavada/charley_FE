import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-900">GrantMatch AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Solutions</Link>
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Resources</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/assessment">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-full px-7 h-11 cursor-pointer">
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 relative isolate overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          
          <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-block rounded-full bg-blue-100/80 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-8 border border-blue-200">
              Grant Eligibility Assessment
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-7xl">
              Unlock Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Potential</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
              Find the grants your business may qualify for in minutes. Our AI-driven Rule Matching Engine analyzes your profile instantly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/assessment">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-base shadow-lg shadow-blue-200 transition-transform hover:-translate-y-1 cursor-pointer">
                  Start Your Assessment
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-base border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer">
                View All Grants
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white border-t border-slate-100">
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border border-slate-200/60 shadow-sm bg-white rounded-2xl hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Zap className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">Dynamic Questionnaire</CardTitle>
                  <CardDescription className="text-base mt-2 text-slate-500 leading-relaxed">
                    Our smart form adapts to your answers, only asking what is strictly necessary.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-slate-200/60 shadow-sm bg-white rounded-2xl hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <CheckCircle2 className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">Rule Matching Engine</CardTitle>
                  <CardDescription className="text-base mt-2 text-slate-500 leading-relaxed">
                    Evaluates hundreds of eligibility criteria in milliseconds against your profile.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-slate-200/60 shadow-sm bg-white rounded-2xl hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <ShieldCheck className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">Funding Recommendations</CardTitle>
                  <CardDescription className="text-base mt-2 text-slate-500 leading-relaxed">
                    Receive a tailored report of eligible grants, complete with next steps.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
