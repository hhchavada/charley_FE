import React from 'react';
import { Bot } from 'lucide-react';

interface AssistantBubbleProps {
  content?: string | React.ReactNode;
}

export const AssistantBubble: React.FC<AssistantBubbleProps> = ({ content }) => {
  return (
    <div className="flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 rounded-full bg-[#1B5E45] flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-[85%]">
        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 text-slate-800 text-[15px] leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
