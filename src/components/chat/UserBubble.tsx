import React from 'react';

interface UserBubbleProps {
  content: string;
}

export const UserBubble: React.FC<UserBubbleProps> = ({ content }) => {
  return (
    <div className="flex w-full justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-[#1B5E45] text-white p-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%] text-[15px] leading-relaxed break-words">
        {content}
      </div>
    </div>
  );
};
