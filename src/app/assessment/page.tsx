"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react"

const industryOptions = [
  "Manufacturing",
  "Technology / SaaS",
  "Healthcare",
  "Agriculture",
  "Renewable Energy",
  "Construction",
  "Mining",
  "Education",
  "Other"
]

const stageOptions = [
  "Idea Stage",
  "Startup",
  "Growing Business",
  "Established Business"
]

const businessGoalOptions = [
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

const fundingGoalOptions = [
  "Artificial Intelligence",
  "Business Expansion",
  "Product Development",
  "Innovation",
  "Research & Development",
  "Hiring Employees",
  "Staff Training",
  "Export Growth",
  "Automation",
  "Digital Transformation",
  "New Equipment",
  "Marketing",
  "Sustainability",
  "Opening New Location"
]

export default function AssessmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)

  const [formData, setFormData] = useState({
    // Step 1
    companyName: "",
    country: "",
    stateRegion: "",
    industry: "",
    businessStage: "",
    yearsInBusiness: "",
    annualRevenue: "",
    employees: "",
    
    // Step 2
    businessGoal: "",
    
    // Step 3
    fundingGoals: [] as string[],
    
    // Step 4
    projectBudget: "",
    projectStartDate: "",
    projectDuration: "",
    projectStarted: "",
    firstGrant: "",
    
    // Step 5
    dynamicAnswers: {} as Record<string, any>
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleFundingGoal = (goal: string) => {
    setFormData(prev => {
      const exists = prev.fundingGoals.includes(goal)
      return {
        ...prev,
        fundingGoals: exists
          ? prev.fundingGoals.filter(g => g !== goal)
          : [...prev.fundingGoals, goal]
      }
    })
  }

  const updateDynamicAnswer = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      dynamicAnswers: { ...prev.dynamicAnswers, [field]: value }
    }))
  }

  const handleNext = () => setStep(s => Math.min(5, s + 1))
  const handleBack = () => setStep(s => Math.max(1, s - 1))

  const handleSubmit = async () => {
    setAnalyzing(true)
    
    // Simulate analyzing steps
    const timer = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= 4) {
          clearInterval(timer)
          return 4
        }
        return prev + 1
      })
    }, 800)

    try {
      const payload = {
        ...formData,
        employees: Number(formData.employees),
        annualRevenue: Number(formData.annualRevenue),
        yearsInBusiness: Number(formData.yearsInBusiness),
        projectBudget: Number(formData.projectBudget)
      }

      const response = await fetch("http://168.144.181.202:4002/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      localStorage.setItem("grantResults", JSON.stringify(data))

      setTimeout(() => {
        router.push("/result")
      }, 4000)

    } catch (error) {
      console.error("Failed to fetch matches", error)
      setAnalyzing(false)
    }
  }

  // VALIDATION
  const isStep1Valid = formData.companyName && formData.country && formData.stateRegion && formData.industry && formData.businessStage && formData.yearsInBusiness && formData.annualRevenue && formData.employees
  const isStep2Valid = !!formData.businessGoal
  const isStep3Valid = formData.fundingGoals.length > 0
  const isStep4Valid = formData.projectBudget && formData.projectStartDate && formData.projectDuration && formData.projectStarted && formData.firstGrant
  const isStep5Valid = true // Dynamic fields are optional for this flow unless strictly enforced

  const renderDynamicQuestions = () => {
    const goals = formData.fundingGoals
    const ind = formData.industry
    const da = formData.dynamicAnswers

    let hasQuestions = false

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* INDUSTRY SPECIFIC */}
        {ind === "Healthcare" && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Healthcare Focus</h4>
            <div className="space-y-3">
              <Label>Are your products medically regulated?</Label>
              <Select value={da.medicallyRegulated || ""} onValueChange={v => updateDynamicAnswer("medicallyRegulated", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {ind === "Manufacturing" && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Manufacturing Operations</h4>
            <div className="space-y-3">
              <Label>Do you own a physical manufacturing facility?</Label>
              <Select value={da.ownsFacility || ""} onValueChange={v => updateDynamicAnswer("ownsFacility", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {ind === "Construction" && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Construction Projects</h4>
            <div className="space-y-3">
              <Label>Primary project type?</Label>
              <Select value={da.constructionType || ""} onValueChange={v => updateDynamicAnswer("constructionType", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Commercial">Commercial</SelectItem><SelectItem value="Residential">Residential</SelectItem><SelectItem value="Infrastructure">Infrastructure</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {ind === "Mining" && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Mining Operations</h4>
            <div className="space-y-3">
              <Label>Primary focus?</Label>
              <Select value={da.miningFocus || ""} onValueChange={v => updateDynamicAnswer("miningFocus", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Exploration">Exploration</SelectItem><SelectItem value="Extraction">Extraction</SelectItem><SelectItem value="Processing">Processing</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {ind === "Education" && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Education Focus</h4>
            <div className="space-y-3">
              <Label>What is your primary education segment?</Label>
              <Select value={da.educationSegment || ""} onValueChange={v => updateDynamicAnswer("educationSegment", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="K-12">K-12</SelectItem><SelectItem value="Higher Education">Higher Education</SelectItem><SelectItem value="Corporate Training">Corporate Training</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* FUNDING GOAL SPECIFIC */}
        {goals.includes("Artificial Intelligence") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Artificial Intelligence Integration</h4>
            <div className="space-y-3">
              <Label>How are you using AI?</Label>
              <Select value={da.aiUsage || ""} onValueChange={v => updateDynamicAnswer("aiUsage", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Building AI Products">Building AI Products</SelectItem><SelectItem value="Internal Automation">Internal Automation</SelectItem><SelectItem value="Customer Support">Customer Support</SelectItem><SelectItem value="Data Analytics">Data Analytics</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              <Label>Estimated AI investment ($)</Label>
              <Input type="number" value={da.aiInvestment || ""} onChange={e => updateDynamicAnswer("aiInvestment", e.target.value)} />
            </div>
            <div className="space-y-3 pt-2">
              <Label>What business problem will AI solve?</Label>
              <Input value={da.aiProblem || ""} onChange={e => updateDynamicAnswer("aiProblem", e.target.value)} />
            </div>
          </div>
        )}

        {goals.includes("Product Development") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Product Development</h4>
            <div className="space-y-3">
              <Label>Current stage</Label>
              <Select value={da.productStage || ""} onValueChange={v => updateDynamicAnswer("productStage", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Idea">Idea</SelectItem><SelectItem value="Prototype">Prototype</SelectItem><SelectItem value="Beta">Beta</SelectItem><SelectItem value="Market Ready">Market Ready</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              <Label>Expected Launch Date</Label>
              <Input type="date" value={da.productLaunchDate || ""} onChange={e => updateDynamicAnswer("productLaunchDate", e.target.value)} />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Do you already have customers?</Label>
              <Select value={da.productHasCustomers || ""} onValueChange={v => updateDynamicAnswer("productHasCustomers", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {goals.includes("Innovation") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Innovation</h4>
            <div className="space-y-3">
              <Label>Innovation Type</Label>
              <Select value={da.innovationType || ""} onValueChange={v => updateDynamicAnswer("innovationType", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Product">Product</SelectItem><SelectItem value="Service">Service</SelectItem><SelectItem value="Technology">Technology</SelectItem><SelectItem value="Process Improvement">Process Improvement</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              <Label>Expected Innovation Budget ($)</Label>
              <Input type="number" value={da.innovationBudget || ""} onChange={e => updateDynamicAnswer("innovationBudget", e.target.value)} />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Expected Business Impact</Label>
              <Input value={da.innovationImpact || ""} onChange={e => updateDynamicAnswer("innovationImpact", e.target.value)} />
            </div>
          </div>
        )}

        {goals.includes("Hiring Employees") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Hiring Plans</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>Employees to Hire</Label>
                <Input type="number" value={da.hiringCount || ""} onChange={e => updateDynamicAnswer("hiringCount", e.target.value)} />
              </div>
              <div className="space-y-3">
                <Label>Employment Type</Label>
                <Select value={da.hiringType || ""} onValueChange={v => updateDynamicAnswer("hiringType", v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="Full Time">Full Time</SelectItem><SelectItem value="Part Time">Part Time</SelectItem><SelectItem value="Contract">Contract</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <Label>Roles</Label>
              <Select value={da.hiringRoles || ""} onValueChange={v => updateDynamicAnswer("hiringRoles", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {goals.includes("Staff Training") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Employee Training</h4>
            <div className="space-y-3">
              <Label>Who will receive training?</Label>
              <Select value={da.trainingAudience || ""} onValueChange={v => updateDynamicAnswer("trainingAudience", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leadership">Leadership</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Digital Skills">Digital Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              <Label>Employees to train</Label>
              <Input type="number" value={da.trainingCount || ""} onChange={e => updateDynamicAnswer("trainingCount", e.target.value)} />
            </div>
          </div>
        )}

        {goals.includes("Export Growth") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Export Operations</h4>
            <div className="space-y-3">
              <Label>Already exporting?</Label>
              <Select value={da.isExporting || ""} onValueChange={v => updateDynamicAnswer("isExporting", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              <Label>Countries</Label>
              <Input value={da.exportCountries || ""} onChange={e => updateDynamicAnswer("exportCountries", e.target.value)} placeholder="e.g. USA, UK" />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Expected export revenue ($)</Label>
              <Input type="number" value={da.exportRevenue || ""} onChange={e => updateDynamicAnswer("exportRevenue", e.target.value)} />
            </div>
          </div>
        )}

        {goals.includes("New Equipment") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Equipment Procurement</h4>
            <div className="space-y-3">
              <Label>Equipment Type</Label>
              <Input value={da.equipmentType || ""} onChange={e => updateDynamicAnswer("equipmentType", e.target.value)} />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Estimated Cost ($)</Label>
              <Input type="number" value={da.equipmentCost || ""} onChange={e => updateDynamicAnswer("equipmentCost", e.target.value)} />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Will productivity improve?</Label>
              <Select value={da.equipmentProductivity || ""} onValueChange={v => updateDynamicAnswer("equipmentProductivity", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {goals.includes("Sustainability") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Sustainability Initiative</h4>
            <div className="space-y-3">
              <Label>Main Objective</Label>
              <Select value={da.sustainabilityObjective || ""} onValueChange={v => updateDynamicAnswer("sustainabilityObjective", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Carbon Reduction">Carbon Reduction</SelectItem>
                  <SelectItem value="Energy Saving">Energy Saving</SelectItem>
                  <SelectItem value="Waste Reduction">Waste Reduction</SelectItem>
                  <SelectItem value="Green Operations">Green Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {goals.includes("Business Expansion") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Expansion Plans</h4>
            <div className="space-y-3">
              <Label>Expansion Type</Label>
              <Select value={da.expansionType || ""} onValueChange={v => updateDynamicAnswer("expansionType", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Local">Local</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                  <SelectItem value="New Branch">New Branch</SelectItem>
                  <SelectItem value="Warehouse">Warehouse</SelectItem>
                  <SelectItem value="Franchise">Franchise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {goals.includes("Digital Transformation") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Digital Transformation</h4>
            <div className="space-y-3">
              <Label>Current systems being upgraded</Label>
              <Input value={da.digitalSystems || ""} onChange={e => updateDynamicAnswer("digitalSystems", e.target.value)} placeholder="e.g. Legacy ERP, Manual Processes" />
            </div>
            <div className="space-y-3 pt-2">
              <Label>Expected improvements</Label>
              <Input value={da.digitalImprovements || ""} onChange={e => updateDynamicAnswer("digitalImprovements", e.target.value)} placeholder="e.g. 50% faster processing" />
            </div>
          </div>
        )}

        {goals.includes("Research & Development") && (hasQuestions = true) && (
          <div className="space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h4 className="font-semibold text-slate-800 border-b pb-2">Research & Development</h4>
            <div className="space-y-3">
              <Label>Primary focus</Label>
              <Select value={da.rndFocus || ""} onValueChange={v => updateDynamicAnswer("rndFocus", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prototype">Prototype</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Commercialization">Commercialization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              <Label>University Collaboration?</Label>
              <Select value={da.rndUniversity || ""} onValueChange={v => updateDynamicAnswer("rndUniversity", v)}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        )}

        {!hasQuestions && (
          <div className="text-center py-10">
            <p className="text-slate-500 font-medium">Please select at least one applicable Funding Goal or Industry.</p>
          </div>
        )}
      </div>
    )
  }

  const progressPercentage = (step / 5) * 100

  if (analyzing) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center relative isolate overflow-hidden px-4">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="max-w-md w-full text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Analyzing your business profile...</h2>
            {analysisStep === 4 && <p className="text-blue-400 font-medium animate-pulse">Generating personalized recommendations...</p>}
          </div>

          <div className="space-y-6 text-left bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4 transition-all duration-500">
              {analysisStep >= 1 ? <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in" /> : <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />}
              <span className={`text-lg font-medium ${analysisStep >= 1 ? 'text-emerald-50' : 'text-slate-400'}`}>Understanding your business</span>
            </div>
            <div className="flex items-center gap-4 transition-all duration-500">
              {analysisStep >= 2 ? <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in" /> : analysisStep === 1 ? <Loader2 className="w-6 h-6 text-blue-400 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-700"></div>}
              <span className={`text-lg font-medium ${analysisStep >= 2 ? 'text-emerald-50' : analysisStep === 1 ? 'text-white' : 'text-slate-500'}`}>Reviewing funding goals</span>
            </div>
            <div className="flex items-center gap-4 transition-all duration-500">
              {analysisStep >= 3 ? <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in" /> : analysisStep === 2 ? <Loader2 className="w-6 h-6 text-blue-400 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-700"></div>}
              <span className={`text-lg font-medium ${analysisStep >= 3 ? 'text-emerald-50' : analysisStep === 2 ? 'text-white' : 'text-slate-500'}`}>Checking project eligibility</span>
            </div>
            <div className="flex items-center gap-4 transition-all duration-500">
              {analysisStep >= 4 ? <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in" /> : analysisStep === 3 ? <Loader2 className="w-6 h-6 text-blue-400 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-700"></div>}
              <span className={`text-lg font-medium ${analysisStep >= 4 ? 'text-emerald-50' : analysisStep === 3 ? 'text-white' : 'text-slate-500'}`}>Matching available grants</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="w-full max-w-3xl mb-6 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Step {step} of 5</span>
          <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}% Completed</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Card className="w-full max-w-3xl border border-slate-200/60 shadow-xl rounded-3xl overflow-hidden bg-white relative z-10">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-5">
          <CardTitle className="text-2xl font-bold text-slate-900">
            {step === 1 && "Business Information"}
            {step === 2 && "Business Goals"}
            {step === 3 && "Funding Goals"}
            {step === 4 && "Project Details"}
            {step === 5 && "Smart Follow-Up Questions"}
          </CardTitle>
          <CardDescription className="text-base text-slate-500">
            {step === 1 && "Tell us about your organization so we can build your initial profile."}
            {step === 2 && "What is the biggest challenge your business is currently facing?"}
            {step === 3 && "What specific activities are you seeking financial support for?"}
            {step === 4 && "Give us an overview of your upcoming project or initiative."}
            {step === 5 && "Just a few more specifics to accurately match you with eligible grants."}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 pb-6 min-h-[400px]">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input className="h-11" value={formData.companyName} onChange={e => updateFormData("companyName", e.target.value)} placeholder="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select value={formData.country} onValueChange={v => updateFormData("country", v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>State / Region</Label>
                <Input className="h-11" value={formData.stateRegion} onChange={e => updateFormData("stateRegion", e.target.value)} placeholder="e.g. Victoria" />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={formData.industry} onValueChange={v => updateFormData("industry", v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {industryOptions.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Business Stage</Label>
                <Select value={formData.businessStage} onValueChange={v => updateFormData("businessStage", v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select stage" /></SelectTrigger>
                  <SelectContent>
                    {stageOptions.map(stage => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Years in Business</Label>
                <Input className="h-11" type="number" value={formData.yearsInBusiness} onChange={e => updateFormData("yearsInBusiness", e.target.value)} placeholder="e.g. 5" />
              </div>
              <div className="space-y-2">
                <Label>Annual Revenue (USD)</Label>
                <Input className="h-11" type="number" value={formData.annualRevenue} onChange={e => updateFormData("annualRevenue", e.target.value)} placeholder="e.g. 1000000" />
              </div>
              <div className="space-y-2">
                <Label>Number of Employees</Label>
                <Input className="h-11" type="number" value={formData.employees} onChange={e => updateFormData("employees", e.target.value)} placeholder="e.g. 50" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-lg font-medium text-slate-800">What best describes your biggest business challenge today?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessGoalOptions.map(option => (
                  <label key={option} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.businessGoal === option ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.businessGoal === option ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                      {formData.businessGoal === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium text-slate-700">{option}</span>
                    <input type="radio" className="hidden" name="businessGoal" value={option} checked={formData.businessGoal === option} onChange={() => updateFormData("businessGoal", option)} />
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-lg font-medium text-slate-800">What are you looking for funding for? (Select all that apply)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fundingGoalOptions.map(option => {
                  const isSelected = formData.fundingGoals.includes(option)
                  return (
                    <label key={option} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                      <Checkbox checked={isSelected} onCheckedChange={() => toggleFundingGoal(option)} />
                      <span className="font-medium text-slate-700">{option}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <Label>Estimated Project Budget ($)</Label>
                <Input className="h-11" type="number" value={formData.projectBudget} onChange={e => updateFormData("projectBudget", e.target.value)} placeholder="e.g. 150000" />
              </div>
              <div className="space-y-2">
                <Label>Expected Start Date</Label>
                <Input className="h-11" type="date" value={formData.projectStartDate} onChange={e => updateFormData("projectStartDate", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Expected Project Duration</Label>
                <Select value={formData.projectDuration} onValueChange={v => updateFormData("projectDuration", v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-6 Months">0-6 Months</SelectItem>
                    <SelectItem value="6-12 Months">6-12 Months</SelectItem>
                    <SelectItem value="1-2 Years">1-2 Years</SelectItem>
                    <SelectItem value="2+ Years">2+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 pt-4">
                <Label className="text-base">Have you already started this project?</Label>
                <div className="flex gap-4 pt-2">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer ${formData.projectStarted === 'Yes' ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold' : 'hover:bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <input type="radio" className="hidden" checked={formData.projectStarted === 'Yes'} onChange={() => updateFormData("projectStarted", "Yes")} /> Yes
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer ${formData.projectStarted === 'No' ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold' : 'hover:bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <input type="radio" className="hidden" checked={formData.projectStarted === 'No'} onChange={() => updateFormData("projectStarted", "No")} /> No
                  </label>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <Label className="text-base">Is this your first grant application?</Label>
                <div className="flex gap-4 pt-2">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer ${formData.firstGrant === 'Yes' ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold' : 'hover:bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <input type="radio" className="hidden" checked={formData.firstGrant === 'Yes'} onChange={() => updateFormData("firstGrant", "Yes")} /> Yes
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer ${formData.firstGrant === 'No' ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold' : 'hover:bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <input type="radio" className="hidden" checked={formData.firstGrant === 'No'} onChange={() => updateFormData("firstGrant", "No")} /> No
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="bg-slate-50/50 p-2 sm:p-6 rounded-2xl min-h-[300px]">
               {renderDynamicQuestions()}
            </div>
          )}

        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-100 px-6 py-5 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={step === 1 || analyzing}
            className="rounded-full px-6 bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          {step < 5 ? (
            <Button 
              onClick={handleNext} 
              disabled={
                (step === 1 && !isStep1Valid) || 
                (step === 2 && !isStep2Valid) ||
                (step === 3 && !isStep3Valid) ||
                (step === 4 && !isStep4Valid)
              }
              className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-sm text-white"
            >
              Next Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isStep5Valid || analyzing}
              className="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all"
            >
              <Zap className="w-4 h-4 mr-2 text-yellow-400" /> Match Me With Grants
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
