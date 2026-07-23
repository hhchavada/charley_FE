import React from 'react';

interface ChatContainerProps {
  header: React.ReactNode;
  messages: React.ReactNode;
  input: React.ReactNode;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ header, messages, input }) => {
  return (
    <div className="flex flex-col h-screen bg-[#F6F4EE] relative">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        {header}
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages}
      </div>

      {/* Fixed Bottom Input */}
      <div className="sticky bottom-0 z-10 w-full bg-[#F6F4EE]">
        {input}
      </div>
    </div>
  );
};
