import AssessmentPage from "@/app/assessment/page"

export default function PreviewAssessment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Preview Assessment</h1>
        <p className="text-slate-500 mt-1">Test your dynamic questions and rules live. No data will be saved.</p>
      </div>
      
      <div className="border-4 border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-slate-200 flex items-center justify-center z-50">
          <div className="flex gap-1.5 absolute left-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Live Preview</span>
        </div>
        <div className="mt-8 relative h-[800px] overflow-y-auto">
          <AssessmentPage />
        </div>
      </div>
    </div>
  )
}
