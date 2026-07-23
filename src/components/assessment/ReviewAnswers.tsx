import React from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { QuestionEngine } from '@/lib/QuestionEngine'
import { QuestionDef } from '@/lib/QuestionEngine'

interface ReviewAnswersProps {
  questions: QuestionDef[]
  formData: any
  setStep: (step: number) => void
}

export const ReviewAnswers = React.memo(function ReviewAnswers({
  questions,
  formData,
  setStep
}: ReviewAnswersProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
      {[1, 2, 3, 4, 5].map((s) => {
        const sectionQuestions = QuestionEngine.getVisibleQuestions(questions, formData, s);
        if (sectionQuestions.length === 0) return null;

        const sectionTitles = ["Company Profile", "Business Goals", "Financial Information (1/2)", "Financial Information (2/2)", "Dynamic Follow-up Questions"];
        const title = sectionTitles[s - 1];

        return (
          <div key={s} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">{title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setStep(s)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full font-semibold">
                <Pencil className="w-4 h-4 mr-1.5" /> Edit
              </Button>
            </div>
            <div className="space-y-6">
              {sectionQuestions.map(q => {
                const val = (q.fieldName || '').split('.').reduce((acc: any, part: string) => acc && acc[part], formData);
                if (!val || (Array.isArray(val) && val.length === 0)) return null;

                return (
                  <div key={q.questionId} className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-500">{q.title}</p>
                    <p className="text-lg font-medium text-slate-900">
                      {Array.isArray(val) ? val.join(", ") : val}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  )
})
