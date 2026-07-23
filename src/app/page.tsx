import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EE] selection:bg-[#E3EDE7] selection:text-[#1B5E45] font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-md">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wide text-[#1B5E45]">NovaGrant</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium text-neutral-600 hover:text-[#1B5E45] transition-colors">Solutions</Link>
            <Link href="#" className="text-sm font-medium text-neutral-600 hover:text-[#1B5E45] transition-colors">Partner</Link>
            <Link href="#" className="text-sm font-medium text-neutral-600 hover:text-[#1B5E45] transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/assessment">
              <Button className="bg-[#1B5E45] hover:bg-[#0F4433] text-white rounded-md px-7 h-10 font-semibold transition-colors cursor-pointer">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 relative isolate overflow-hidden">
          <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#E3EDE7] text-[#1B5E45] text-xs font-semibold rounded-full px-4 py-2 mb-8">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              Assessment in under a minute
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-[#13261F] sm:text-6xl md:text-7xl font-display leading-[1.1]">
              Unlock Your Business <span className="text-[#1B5E45]">Potential</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
              Find the grants your business may qualify for in minutes. Our AI-driven consultant evaluates your profile instantly against official Singapore business records.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/assessment">
                <Button size="lg" className="w-full sm:w-auto bg-[#1B5E45] hover:bg-[#0F4433] text-white rounded-md px-8 h-12 text-sm font-semibold transition-colors cursor-pointer">
                  Start Your Assessment
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-md px-8 h-12 text-sm font-semibold border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:text-[#13261F] transition-colors cursor-pointer">
                View All Grants
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white border-t border-neutral-200">
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border border-neutral-200/60 shadow-sm bg-white rounded-2xl hover:shadow-lg hover:border-[#1B5E45]/30 transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-[#E3EDE7] flex items-center justify-center mb-4 group-hover:bg-[#1B5E45] transition-colors duration-300">
                    <Zap className="h-5 w-5 text-[#1B5E45] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#13261F]">Dynamic Questionnaire</CardTitle>
                  <CardDescription className="text-[15px] mt-2 text-neutral-500 leading-relaxed">
                    Our smart form adapts to your answers, asking only what is strictly necessary.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-neutral-200/60 shadow-sm bg-white rounded-2xl hover:shadow-lg hover:border-[#1B5E45]/30 transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-[#E3EDE7] flex items-center justify-center mb-4 group-hover:bg-[#1B5E45] transition-colors duration-300">
                    <CheckCircle2 className="h-5 w-5 text-[#1B5E45] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#13261F]">Verified ACRA Data</CardTitle>
                  <CardDescription className="text-[15px] mt-2 text-neutral-500 leading-relaxed">
                    Securely verify your registered business information with instant ACRA search.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-neutral-200/60 shadow-sm bg-white rounded-2xl hover:shadow-lg hover:border-[#1B5E45]/30 transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-[#E3EDE7] flex items-center justify-center mb-4 group-hover:bg-[#1B5E45] transition-colors duration-300">
                    <ShieldCheck className="h-5 w-5 text-[#1B5E45] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#13261F]">Funding Recommendations</CardTitle>
                  <CardDescription className="text-[15px] mt-2 text-neutral-500 leading-relaxed">
                    Receive a tailored report of eligible grants matched with multiple partner lenders.
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
