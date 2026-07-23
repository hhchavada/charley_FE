import Link from "next/link"
import { LayoutDashboard, Library } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="font-bold text-lg text-slate-900 tracking-tight">GrantMatch Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <LayoutDashboard className="w-5 h-5 text-slate-500" />
            Dashboard
          </Link>
          <Link href="/admin/grants" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <Library className="w-5 h-5 text-slate-500" />
            Grant Library
          </Link>
          {/* Question Builder hidden as requested
          <Link href="/admin/questions" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <FileQuestion className="w-5 h-5 text-slate-500" />
            Question Builder
          </Link>
          */}
          {/* Hidden as requested
          <Link href="/admin/preview" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            <Workflow className="w-5 h-5 text-slate-500" />
            Preview Assessment
          </Link>
          <div className="pt-4 mt-4 border-t border-slate-200">
            <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900">
              <ExternalLink className="w-5 h-5 text-slate-400" />
              Live Site
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900">
              <Settings className="w-5 h-5 text-slate-400" />
              Settings
            </Link>
          </div>
          */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 md:hidden">
           <span className="font-bold text-lg text-slate-900">GrantMatch Admin</span>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
