"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h2>
              <p className="text-slate-500 font-medium text-sm">
                We encountered an unexpected error while rendering this page.
              </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100 overflow-x-auto">
              <p className="text-xs font-mono text-slate-600 truncate">
                {this.state.error?.message || "Unknown error"}
              </p>
            </div>

            <Button 
              onClick={() => window.location.reload()}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
