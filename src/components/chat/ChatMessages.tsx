import React, { useEffect, useRef } from 'react';
import { AssistantBubble } from './AssistantBubble';
import { UserBubble } from './UserBubble';
import { TypingIndicator } from './TypingIndicator';

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  content: string | React.ReactNode;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col gap-6 py-6 px-4 max-w-4xl mx-auto w-full">
      {messages.map((msg) => (
        <React.Fragment key={msg.id}>
          {msg.sender === 'assistant' ? (
            <AssistantBubble content={msg.content} />
          ) : (
            <UserBubble content={msg.content as string} />
          )}
        </React.Fragment>
      ))}
      
      {isTyping && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <TypingIndicator />
        </div>
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};
