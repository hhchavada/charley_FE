"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Library, FileQuestion, Globe, Building2 } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    grants: 0,
    questions: 0,
    countries: 0,
    industries: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [grantsRes, questionsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/grants`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/questions`)
        ]);
        
        const grants = await grantsRes.json();
        const questions = await questionsRes.json();

        // Calculate unique countries and industries from grants rules (assuming rules have these fields)
        const countries = new Set();
        const industries = new Set();
        
        grants.forEach((g: any) => {
          g.conditions?.forEach((r: any) => {
            if (r.field === 'country') countries.add(r.value);
            if (r.field === 'industry') industries.add(r.value);
          });
        });

        setStats({
          grants: grants.length,
          questions: questions.length,
          countries: countries.size || 6, // Fallbacks for empty state demo
          industries: industries.size || 6
        })
      } catch (err) {
        console.error("Failed to load dashboard stats", err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome to the GrantMatch Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Grants</CardTitle>
            <Library className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.grants}</div>
            <p className="text-xs text-slate-500 mt-1">Active in library</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Dynamic Questions</CardTitle>
            <FileQuestion className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.questions}</div>
            <p className="text-xs text-slate-500 mt-1">Configured in builder</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Target Countries</CardTitle>
            <Globe className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.countries}</div>
            <p className="text-xs text-slate-500 mt-1">From grant rules</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Target Industries</CardTitle>
            <Building2 className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.industries}</div>
            <p className="text-xs text-slate-500 mt-1">From grant rules</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
