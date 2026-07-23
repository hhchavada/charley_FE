import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { QuestionRenderer } from './QuestionRenderer';
import { Button } from '@/components/ui/button';

interface BottomInputProps {
  currentQuestion: any | null;
  onAnswerSubmit: (answerValue: any, displayValue: string) => void;
  disabled: boolean;
}

export const BottomInput: React.FC<BottomInputProps> = ({ currentQuestion, onAnswerSubmit, disabled }) => {
  const [localValue, setLocalValue] = useState<any>("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled || !currentQuestion) return;

    let display = String(localValue);

    if (currentQuestion.validation?.required) {
      if (Array.isArray(localValue)) {
        if (localValue.length === 0) return; // validate at least one for array
      } else if (localValue === "" || localValue === null || localValue === undefined) {
         return; // validate not empty
      }
    }

    if (Array.isArray(localValue)) {
      display = localValue.length > 0 ? localValue.join(', ') : '';
    }

    onAnswerSubmit(localValue, display);
    setLocalValue(""); // reset
  };

  const handleImmediateSubmit = (val: any, display: string) => {
    if (disabled || !currentQuestion) return;
    onAnswerSubmit(val, display);
    setLocalValue("");
  };

  if (!currentQuestion) {
    return (
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <input
            type="text"
            disabled
            placeholder="Processing..."
            className="flex-1 border border-slate-300 rounded-full px-4 py-3 bg-slate-50 text-slate-400 focus:outline-none"
          />
        </div>
      </div>
    );
  }

  // Some types should be submitted immediately upon click (like Yes/No, Radio, Pills if single choice)
  // Text, Number, Multi-select require explicit "Send" button click.
  const isImmediateSubmit = ["radio", "pills"].includes(currentQuestion.type); // we assume yes/no is rendered as radio or pills

  return (
    <div className="p-4 border-t border-slate-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex-1">
            <QuestionRenderer 
              question={currentQuestion}
              value={localValue}
              onChange={setLocalValue}
              onImmediateSubmit={isImmediateSubmit ? handleImmediateSubmit : undefined}
              disabled={disabled}
            />
          </div>
          
          {!isImmediateSubmit && (
            <div className="flex justify-end mt-2">
              <Button 
                type="submit" 
                disabled={disabled || (currentQuestion?.validation?.required && (localValue === "" || (Array.isArray(localValue) && localValue.length === 0)))}
                className="bg-[#1B5E45] hover:bg-[#0F4433] text-white rounded-full px-6 py-2 h-11 flex items-center gap-2 font-medium transition-all"
              >
                Send <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
