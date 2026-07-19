"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Save, Loader2, GripVertical, Settings2 } from "lucide-react"

const operators = [
  { label: "Equals", value: "equals" },
  { label: "Not Equals", value: "not_equals" },
  { label: "Contains", value: "contains" }
]

const ruleFields = [
  "country", "industry", "businessStage"
]

export default function QuestionBuilder() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/api/admin/questions')
      const data = await res.json()
      setQuestions(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('http://localhost:3001/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questions)
      })
      alert("Questions saved successfully!")
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, {
      id: `q_${Date.now()}`,
      label: "New Question",
      type: "dropdown",
      options: ["Yes", "No"],
      required: true,
      fieldKey: `field_${Date.now()}`,
      condition: null
    }])
  }

  const updateQuestion = (index: number, key: string, value: any) => {
    const newQ = [...questions]
    newQ[index][key] = value
    setQuestions(newQ)
  }

  const removeQuestion = (index: number) => {
    const newQ = [...questions]
    newQ.splice(index, 1)
    setQuestions(newQ)
  }

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Question Builder</h1>
          <p className="text-slate-500 mt-1">Configure dynamic assessment questions and conditional logic.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-2" /> Add Question
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white hover:bg-slate-800">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
            <Settings2 className="w-10 h-10 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No dynamic questions configured.</p>
          </div>
        ) : (
          questions.map((q, index) => (
            <Card key={q.id} className="border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-100 p-2 items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <GripVertical className="w-5 h-5 cursor-grab active:cursor-grabbing" />
                  <span className="text-sm font-semibold uppercase tracking-wider">{q.fieldKey}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)} className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 border-b pb-2">General Settings</h4>
                  
                  <div className="space-y-2">
                    <Label>Question Label</Label>
                    <Input value={q.label} onChange={e => updateQuestion(index, "label", e.target.value)} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field Key (For Rule Engine)</Label>
                      <Input value={q.fieldKey} onChange={e => updateQuestion(index, "fieldKey", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <Select value={q.type} onValueChange={v => updateQuestion(index, "type", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dropdown">Dropdown</SelectItem>
                          <SelectItem value="text">Text Input</SelectItem>
                          <SelectItem value="number">Number Input</SelectItem>
                          <SelectItem value="radio">Radio Buttons</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {(q.type === 'dropdown' || q.type === 'radio') && (
                    <div className="space-y-2">
                      <Label>Options (Comma separated)</Label>
                      <Input 
                        value={q.options ? q.options.join(", ") : ""} 
                        onChange={e => updateQuestion(index, "options", e.target.value.split(",").map(s => s.trim()))} 
                        placeholder="Yes, No"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <Label>Is Required?</Label>
                    <Switch checked={q.required} onCheckedChange={v => updateQuestion(index, "required", v)} />
                  </div>
                </div>

                {/* Conditional Logic */}
                <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="font-semibold text-slate-900">Conditional Logic</h4>
                    <Switch 
                      checked={!!q.condition} 
                      onCheckedChange={v => updateQuestion(index, "condition", v ? { field: "industry", operator: "equals", value: "" } : null)} 
                    />
                  </div>
                  
                  {!q.condition ? (
                    <p className="text-sm text-slate-500 py-4">This question will always be shown in Step 2.</p>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <p className="text-sm font-medium text-slate-700">Show this question ONLY IF:</p>
                      <div className="space-y-2">
                        <Label className="text-xs">Field</Label>
                        <Select value={q.condition.field} onValueChange={v => updateQuestion(index, "condition", { ...q.condition, field: v })}>
                          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {ruleFields.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Operator</Label>
                        <Select value={q.condition.operator} onValueChange={v => updateQuestion(index, "condition", { ...q.condition, operator: v })}>
                          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {operators.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Value</Label>
                        <Input className="bg-white" value={q.condition.value} onChange={e => updateQuestion(index, "condition", { ...q.condition, value: e.target.value })} placeholder="e.g. Technology / SaaS" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
