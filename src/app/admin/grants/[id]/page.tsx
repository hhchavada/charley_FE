"use client"
import { API_BASE } from "@/lib/api"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2, Save, Loader2, Target } from "lucide-react"

const operators = [
  { label: "Equals", value: "equals" },
  { label: "Not Equals", value: "not_equals" },
  { label: "Greater Than", value: "greater_than" },
  { label: "Less Than", value: "less_than" },
  { label: "Contains", value: "contains" },
  { label: "Exists", value: "exists" }
]

const ruleFields = [
  "country", "industry", "businessStage", "employees", "annualRevenue",
  "manufacturesProducts", "exportProducts", "ownsFacility", "locallyManufactured",
  "developsSoftware", "usesAI", "isLaunched", "b2bOrB2c",
  "healthcareProduct", "medicallyRegulated",
  "involvedInFarming", "sustainableFarming",
  "worksInSolar", "worksInWind", "worksInBattery", "carbonReduction"
]

export default function GrantEditor() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'
  
  const [grant, setGrant] = useState<any>({
    id: `grant_${Date.now()}`,
    name: "",
    priority: 3,
    estimatedFunding: "",
    support: "",
    conditions: []
  })
  
  const [allGrants, setAllGrants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchGrants()
  }, [])

  const fetchGrants = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/grants`)
      const data = await res.json()
      setAllGrants(data)
      
      if (!isNew) {
        const found = data.find((g: any) => g.id === params.id)
        if (found) {
          if (!found.conditions) found.conditions = []
          setGrant(found)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      let updatedGrants;
      if (isNew) {
        updatedGrants = [...allGrants, grant]
      } else {
        updatedGrants = allGrants.map(g => g.id === grant.id ? grant : g)
      }

      await fetch(`${API_BASE}/admin/grants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGrants)
      })
      router.push('/admin/grants')
    } catch (err) {
      console.error(err)
      setSaving(false)
    }
  }

  const addRule = () => {
    setGrant({
      ...grant,
      conditions: [...grant.conditions, { field: "", operator: "equals", value: "", expectedMessage: "" }]
    })
  }

  const updateRule = (index: number, key: string, value: any) => {
    const newConditions = [...grant.conditions]
    newConditions[index][key] = value
    setGrant({ ...grant, conditions: newConditions })
  }

  const removeRule = (index: number) => {
    const newConditions = [...grant.conditions]
    newConditions.splice(index, 1)
    setGrant({ ...grant, conditions: newConditions })
  }

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>
  }

  return (
    <div className="max-w-5xl space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full shadow-sm">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{isNew ? "Create New Grant" : "Edit Grant"}</h1>
          <p className="text-slate-500 text-sm">Configure grant details and eligibility rules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Details */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-lg">Core Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Grant Name</Label>
                <Input value={grant.name} onChange={e => setGrant({...grant, name: e.target.value})} placeholder="e.g. AI Innovation Grant" />
              </div>
              <div className="space-y-2">
                <Label>Estimated Funding</Label>
                <Input value={grant.estimatedFunding} onChange={e => setGrant({...grant, estimatedFunding: e.target.value})} placeholder="e.g. $50,000" />
              </div>
              <div className="space-y-2">
                <Label>Priority (1 = Highest)</Label>
                <Input type="number" value={grant.priority} onChange={e => setGrant({...grant, priority: parseInt(e.target.value) || 3})} />
              </div>
              <div className="space-y-2">
                <Label>Support Details</Label>
                <Input value={grant.support} onChange={e => setGrant({...grant, support: e.target.value})} placeholder="e.g. 70% funding" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rule Engine */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg flex items-center gap-2"><Target className="w-5 h-5 text-blue-600" /> Eligibility Rules</CardTitle>
                <CardDescription>Define the exact criteria a company must meet.</CardDescription>
              </div>
              <Button size="sm" onClick={addRule} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" /> Add Rule
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {grant.conditions.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-slate-500 text-sm">No rules defined. This grant matches everyone.</p>
                </div>
              ) : (
                grant.conditions.map((rule: any, index: number) => (
                  <div key={index} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl animate-in slide-in-from-top-2 duration-300">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500 uppercase">Field</Label>
                          <Select value={rule.field} onValueChange={v => updateRule(index, "field", v)}>
                            <SelectTrigger className="bg-white"><SelectValue placeholder="Select field" /></SelectTrigger>
                            <SelectContent>
                              {ruleFields.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500 uppercase">Operator</Label>
                          <Select value={rule.operator} onValueChange={v => updateRule(index, "operator", v)}>
                            <SelectTrigger className="bg-white"><SelectValue placeholder="Operator" /></SelectTrigger>
                            <SelectContent>
                              {operators.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500 uppercase">Value</Label>
                          <Input className="bg-white" value={rule.value} onChange={e => updateRule(index, "value", e.target.value)} placeholder="e.g. Manufacturing" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-slate-500 uppercase">Success Message (Explanation)</Label>
                        <Input className="bg-white" value={rule.expectedMessage} onChange={e => updateRule(index, "expectedMessage", e.target.value)} placeholder="e.g. Industry requirement met" />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeRule(index)} className="mt-6 text-slate-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t border-slate-200 flex justify-end gap-3 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white hover:bg-slate-800">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Grant Configuration
        </Button>
      </div>
    </div>
  )
}
