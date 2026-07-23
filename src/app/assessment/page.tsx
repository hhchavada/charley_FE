"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { QuestionDef } from "@/lib/QuestionEngine"
import { QuestionRenderer } from "@/components/QuestionRenderer"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function AssessmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [analyzing, setAnalyzing] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({
    companyUen: "",
    companyName: "",
    companyType: "",
    operatingSince: "",
    monthlyRevenue: "",
    retainedEarnings: "",
    desiredFundingAmount: "",
    purpose: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    purposeOfFunds: []
  })

  const questions: QuestionDef[] = [
    {
      questionId: "q_company_name",
      title: "Business Name",
      type: "text",
      placeholder: "Search for your business name...",
      validation: { required: true },
      fieldName: "companyName"
    },
    {
      questionId: "q_company_uen",
      title: "Unique Entity Number (UEN)",
      type: "text",
      placeholder: "Auto-populated",
      validation: { required: true },
      fieldName: "companyUen"
    },
    {
      questionId: "q_company_type",
      title: "Company Type",
      type: "text",
      placeholder: "Auto-populated",
      fieldName: "companyType"
    },
    {
      questionId: "q_operating_since",
      title: "Operating Since",
      type: "text",
      placeholder: "Auto-populated",
      fieldName: "operatingSince"
    },
    {
      questionId: "q_monthly_revenue",
      title: "Annual Revenue",
      type: "currency",
      placeholder: "Enter annual revenue",
      validation: { required: true },
      fieldName: "monthlyRevenue"
    },
    {
      questionId: "q_retained_earnings",
      title: "Retained Earnings",
      type: "currency",
      placeholder: "Enter retained earnings",
      validation: { required: true },
      fieldName: "retainedEarnings"
    },
    {
      questionId: "q_desired_funding",
      title: "Desired Funding Amount",
      type: "currency",
      placeholder: "Enter desired funding amount",
      validation: { required: true },
      fieldName: "desiredFundingAmount"
    },
    {
      questionId: "q_purpose",
      title: "Primary Business Goal",
      type: "multidropdown",
      validation: { required: true },
      fieldName: "purpose",
      options: [
        "Business Growth",
        "Finding Skilled Employees",
        "Digital Transformation",
        "Technology Adoption",
        "Developing New Products",
        "Entering New Markets",
        "High Operating Costs",
        "Sustainability",
        "Improving Productivity",
        "Other"
      ]
    },
    {
      questionId: "q_contact_name",
      title: "Contact Name",
      type: "text",
      placeholder: "Enter your full name",
      validation: { required: true },
      fieldName: "contactName"
    },
    {
      questionId: "q_contact_email",
      title: "Email Address",
      type: "text",
      placeholder: "Enter your email",
      validation: { required: true },
      fieldName: "contactEmail"
    },
    {
      questionId: "q_contact_phone",
      title: "Phone Number",
      type: "phone",
      placeholder: "Enter your phone number",
      validation: { required: true },
      fieldName: "contactPhone"
    },
    {
      questionId: "q_purpose_of_funds",
      title: "Purpose of funds",
      description: "Select all that apply",
      type: "multiselect",
      validation: { required: true },
      fieldName: "purposeOfFunds",
      options: [
        "Equipment", "Inventory", "Working Capital", "Growth",
        "Cashflow", "Pay off debt", "Renovation", "Other"
      ]
    }
  ]

  const handleChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
  }

  const isStep1Valid = !!formData.companyName && !!formData.monthlyRevenue && !!formData.retainedEarnings && !!formData.desiredFundingAmount;
  const isStep2Valid = !!formData.purpose && !!formData.contactName && !!formData.contactEmail && !!formData.contactPhone && formData.purposeOfFunds.length > 0;

  const handleSubmit = async () => {
    localStorage.setItem("assessmentInitialData", JSON.stringify(formData));
    router.push('/assessment/chat');
  }

  return (
    <div className="min-h-screen bg-[#F6F4EE] selection:bg-[#E3EDE7] selection:text-[#1B5E45] font-sans flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wide text-[#1B5E45]">NovaGrant</span>
          </div>
          <nav className="hidden md:flex gap-8 text-[15px] font-medium text-neutral-600">
            <a href="#" className="hover:text-[#1B5E45] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#1B5E45] transition-colors">Partner</a>
            <a href="#" className="hover:text-[#1B5E45] transition-colors">About</a>
            <a href="#" className="hover:text-[#1B5E45] transition-colors flex items-center gap-1">Insights <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></a>
          </nav>
        </div>
      </header>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#F6F4EE]"></div>

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center px-6 md:px-12 py-4 md:py-6 lg:pt-4 gap-6 lg:gap-16">
          
          {/* Left Side */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center relative">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700 ease-out fill-mode-both">
            <div className="bg-[#E3EDE7] text-[#1B5E45] text-xs font-semibold rounded-full px-3 py-1.5 inline-flex items-center gap-1.5 mb-6">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              Assessment in under a minute
            </div>

            <h1 className="font-display text-4xl md:text-[46px] font-semibold leading-[1.1] text-[#13261F] mb-6">
              {step === 1 ? (
                <>Let's get to know<br/>your business</>
              ) : (
                "Business Details Verified"
              )}
            </h1>
            
            <p className="text-[15px] leading-relaxed text-neutral-600 max-w-[36ch] mb-8">
              {step === 1 
                ? "We'll start by verifying your company details. After that, our AI consultant will ask a few personalised questions to identify the government grants that best match your business."
                : "We've securely verified your registered business information. Review the details below and tell us how you'd like to use the funding."}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E3EDE7] text-[#1B5E45] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium text-neutral-700">Verified against official Singapore business records</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E3EDE7] text-[#1B5E45] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium text-neutral-700">Matched with multiple partner lenders in real time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[60%] relative">
          <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 p-6 md:p-8 relative z-10 animate-in fade-in slide-in-from-right-4 duration-700 ease-out fill-mode-both">
            
            <div className="flex items-center justify-between mb-8">
              <div className="text-sm font-semibold text-[#1B5E45]">Step {step} of 2</div>
              <div className="text-sm font-medium text-neutral-400">{step === 1 ? 'Business details' : 'Contact details'}</div>
            </div>

            <div className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="col-span-2">
                    <QuestionRenderer 
                      question={questions[0]} 
                      onChange={handleChange} 
                      formData={formData}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {questions.slice(1, 4).map((q, idx) => (
                      <div key={q.questionId} className={`${q.questionId === 'q_company_uen' ? 'col-span-2' : 'col-span-1'}`}>
                        <QuestionRenderer 
                          question={q} 
                          onChange={handleChange} 
                          formData={formData}
                        />
                      </div>
                    ))}
                  </div>
                  {questions.slice(4, 7).map((q, idx) => (
                    <div key={q.questionId} className="col-span-2">
                      <QuestionRenderer 
                        question={q} 
                        onChange={handleChange} 
                        formData={formData}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="col-span-2">
                    <QuestionRenderer 
                      question={questions[7]} 
                      onChange={handleChange} 
                      formData={formData}
                    />
                  </div>
                  {questions.slice(8, 11).map((q, idx) => (
                    <div key={q.questionId} className="col-span-2">
                      <QuestionRenderer 
                        question={q} 
                        onChange={handleChange} 
                        formData={formData}
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <QuestionRenderer 
                      question={questions[11]} 
                      onChange={handleChange} 
                      formData={formData}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-8">
              {step === 1 ? (
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!isStep1Valid}
                  className="w-full bg-[#1B5E45] hover:bg-[#0F4433] text-white rounded-lg h-12 text-[15px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setStep(1)} 
                    className="w-1/3 bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-lg h-12 text-[15px] font-semibold transition-colors"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!isStep2Valid || analyzing}
                    className="w-2/3 bg-[#1B5E45] hover:bg-[#0F4433] text-white rounded-lg h-12 text-[15px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "See your match"}
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
