"use client"
import { API_BASE } from "@/lib/api"

import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { PresentationQuestionDTO } from "@/types/grant"
import { Loader2 } from "lucide-react"

type Message = {
  id: string;
  role: 'ai' | 'user';
  text?: string;
  question?: PresentationQuestionDTO;
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(true)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_URL = API_BASE;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    const initChat = async () => {
      try {
        const storedData = localStorage.getItem("assessmentInitialData")
        const initialData = storedData ? JSON.parse(storedData) : {}

        const response = await fetch(`${API_URL}/v2/assessment/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "demo_user", initialData })
        })

        if (!response.ok) throw new Error("Failed to start assessment")
        
        const data = await response.json()
        setSessionId(data.sessionId)

        if (data.completed) {
          handleEvaluate(data.sessionId)
        } else if (data.firstQuestion) {
          setMessages([
            {
              id: Date.now().toString(),
              role: 'ai',
              question: data.firstQuestion
            }
          ])
          setIsTyping(false)
        }
      } catch (error) {
        console.error("Error initializing chat:", error)
        setIsTyping(false)
      }
    }

    initChat()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEvaluate = async (sid: string) => {
    setIsEvaluating(true)
    setIsTyping(false)
    try {
      const response = await fetch(`${API_URL}/v2/assessment/${sid}/evaluate`, {
        method: "POST"
      })
      if (!response.ok) throw new Error("Failed to evaluate")
      const result = await response.json()
      localStorage.setItem("assessmentResult", JSON.stringify(result))
      router.push('/result')
    } catch (error) {
      console.error("Error evaluating:", error)
      setIsEvaluating(false)
      setIsTyping(false)
    }
  }

  const handleAnswer = async (question: PresentationQuestionDTO, value: string, displayValue?: string) => {
    if (!sessionId) return

    // Add user message
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', text: displayValue || value }
    ])
    setIsTyping(true)
    setInputValue("")

    try {
      const fieldName = question.fieldName || question.questionId
      const response = await fetch(`${API_URL}/v2/assessment/${sessionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: { [fieldName]: value } })
      })

      if (!response.ok) throw new Error("Failed to submit answer")
      
      const data = await response.json()

      if (data.completed) {
        handleEvaluate(sessionId)
      } else if (data.nextQuestion) {
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), role: 'ai', question: data.nextQuestion }
        ])
        setIsTyping(false)
      }
    } catch (error) {
      console.error("Error answering:", error)
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F8] font-sans">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200 shrink-0">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wide text-[#1B5E45]">NovaGrant</span>
          </div>
          <nav className="hidden md:flex gap-8 text-[15px] font-medium text-neutral-600">
            <a href="#" className="hover:text-[#1B5E45] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#1B5E45] transition-colors">Partner</a>
            <a href="#" className="hover:text-[#1B5E45] transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full pt-8 px-4 sm:px-6 flex flex-col gap-6 pb-32">
        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1;
          
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#EBF5FF] text-[#13261F] px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm border border-[#D6E6F5]">
                  {msg.text}
                </div>
              </div>
            )
          }

          if (msg.role === 'ai' && msg.question) {
            const q = msg.question;
            return (
              <div key={msg.id} className="flex justify-start gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-8 h-8 rounded-full bg-[#1B5E45] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v8l9-11h-7z" /></svg>
                </div>
                <div className="flex flex-col gap-3 max-w-[85%] w-full">
                  <div className="text-[15px] leading-relaxed text-[#13261F]">
                    {q.AIContext && (
                      <span dangerouslySetInnerHTML={{ __html: q.AIContext.replace(/\n/g, '<br/>') }} />
                    )}
                    {q.AIContext && <br/>}
                    {q.title}
                  </div>
                  
                  {isLast && (
                    <div className="mt-1">
                      {q.options && q.options.length > 0 ? (
                        <div className="flex flex-wrap gap-2.5">
                          {q.options.map(opt => (
                            <button 
                              key={opt}
                              onClick={() => handleAnswer(q, opt, opt)}
                              className="px-4 py-2 bg-white border border-[#E0E0E0] hover:bg-[#F0F2F1] text-[#13261F] text-sm font-medium rounded-lg transition-colors shadow-sm text-left"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 max-w-sm mt-2">
                          <input 
                            type={q.type === 'currency' || q.type === 'number' ? 'number' : 'text'}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder={q.placeholder || "Type your answer..."}
                            className="flex-1 h-11 px-4 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E45] focus:border-transparent shadow-sm"
                            onKeyDown={e => {
                              if (e.key === 'Enter' && inputValue.trim()) {
                                handleAnswer(q, inputValue, inputValue)
                              }
                            }}
                          />
                          <button 
                            onClick={() => {
                              if (inputValue.trim()) handleAnswer(q, inputValue, inputValue)
                            }}
                            className="h-11 px-4 bg-[#1B5E45] text-white text-sm font-medium rounded-lg hover:bg-[#0F4433] transition-colors shadow-sm"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          }
          return null
        })}

        {isTyping && (
          <div className="flex justify-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-8 h-8 rounded-full bg-[#1B5E45] flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v8l9-11h-7z" /></svg>
            </div>
            <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-10">
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {isEvaluating && (
          <div className="flex justify-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-8 h-8 rounded-full bg-[#1B5E45] flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v8l9-11h-7z" /></svg>
            </div>
            <div className="bg-white border border-neutral-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 h-10">
              <Loader2 className="w-4 h-4 animate-spin text-[#1B5E45]" />
              <span className="text-sm text-neutral-600 font-medium">Generating recommendations...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#F9F9F8] via-[#F9F9F8] to-transparent pt-10 pb-4 text-center px-4">
        <p className="text-xs text-neutral-400 flex items-center justify-center gap-1.5 bg-[#F9F9F8]">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Your data stays private. We only use it to improve your experience and never sell or share it.
        </p>
      </div>
    </div>
  )
}
