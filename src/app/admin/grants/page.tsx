"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit2, Copy, Trash2, Plus, Loader2 } from "lucide-react"

export default function GrantLibrary() {
  const [grants, setGrants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGrants()
  }, [])

  const fetchGrants = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4002/api/admin/grants')
      const data = await res.json()
      setGrants(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this grant?")) return;
    
    try {
      const newGrants = grants.filter(g => g.id !== id)
      await fetch('http://localhost:4002/api/admin/grants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGrants)
      })
      setGrants(newGrants)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDuplicate = async (grant: any) => {
    try {
      const newGrant = { ...grant, id: `grant_${Date.now()}`, name: `${grant.name} (Copy)` }
      const newGrants = [...grants, newGrant]
      await fetch('http://localhost:4002/api/admin/grants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGrants)
      })
      setGrants(newGrants)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Grant Library</h1>
          <p className="text-slate-500 mt-1">Manage grants and eligibility rules.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-slate-700 bg-white shadow-sm border-slate-200">
            Import from Excel
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Create New Grant
          </Button>
        </div>
      </div>

      <Card className="border border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[80px]">Priority</TableHead>
                <TableHead>Grant Name</TableHead>
                <TableHead>Target Industry</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" />
                  </TableCell>
                </TableRow>
              ) : grants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                    No grants found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                grants.map((grant) => (
                  <TableRow key={grant.id}>
                    <TableCell className="font-medium text-slate-900">{grant.priority}</TableCell>
                    <TableCell className="font-medium text-slate-900">{grant.name}</TableCell>
                    <TableCell>
                      {grant.conditions?.find((r:any) => r.field === 'industry')?.value || 'Any'}
                    </TableCell>
                    <TableCell className="text-slate-600">{grant.estimatedFunding}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-slate-700 hover:bg-slate-100">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
