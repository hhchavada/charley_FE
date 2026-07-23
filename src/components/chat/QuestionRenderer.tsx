import React from 'react';
import { Input } from '@/components/ui/input';

interface QuestionRendererProps {
  question: any;
  value: any;
  onChange: (val: any) => void;
  onImmediateSubmit?: (val: any, display: string) => void;
  disabled: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, value, onChange, onImmediateSubmit, disabled }) => {
  const t = question.type || 'text';

  const handlePillClick = (opt: string) => {
    onChange(opt);
    if (onImmediateSubmit) {
      onImmediateSubmit(opt, opt);
    }
  };

  const handleMultiSelect = (opt: string) => {
    const current = Array.isArray(value) ? value : [];
    if (current.includes(opt)) {
      onChange(current.filter(i => i !== opt));
    } else {
      onChange([...current, opt]);
    }
  };

  if (t === 'radio' || t === 'pills' || t === 'singleselect' || (t === 'dropdown' && (!question.options || question.options.length < 5))) {
    return (
      <div className="flex flex-wrap gap-2">
        {question.options?.map((opt: string) => (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => handlePillClick(opt)}
            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
              value === opt 
                ? 'bg-[#1B5E45] border-[#1B5E45] text-white shadow-sm' 
                : 'bg-white border-slate-200 text-slate-700 hover:border-[#1B5E45] hover:text-[#1B5E45]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (t === 'multiselect' || t === 'checkbox') {
    return (
      <div className="flex flex-wrap gap-2">
        {question.options?.map((opt: string) => {
          const isSelected = Array.isArray(value) && value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              disabled={disabled}
              onClick={() => handleMultiSelect(opt)}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-[#E3EDE7] border-[#1B5E45] text-[#1B5E45]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#1B5E45]'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  if (t === 'dropdown') {
    return (
      <select 
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white text-slate-800 focus:outline-none focus:border-[#1B5E45] focus:ring-1 focus:ring-[#1B5E45]"
      >
        <option value="" disabled>Select an option</option>
        {question.options?.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  // Fallback to Input for text, number, currency, percentage, date
  let inputType = 'text';
  let prefix = '';
  let suffix = '';
  let placeholder = question.placeholder || 'Type your answer...';

  if (t === 'number' || t === 'budget') {
    inputType = 'number';
  } else if (t === 'currency') {
    inputType = 'number';
    prefix = '$';
  } else if (t === 'percentage') {
    inputType = 'number';
    suffix = '%';
  } else if (t === 'date') {
    inputType = 'date';
  }

  return (
    <div className="relative flex items-center w-full">
      {prefix && <span className="absolute left-4 text-slate-500 font-medium">{prefix}</span>}
      <Input
        type={inputType}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border-slate-300 rounded-full h-12 bg-white text-slate-800 focus:outline-none focus:border-[#1B5E45] focus:ring-1 focus:ring-[#1B5E45] shadow-sm ${prefix ? 'pl-8' : 'pl-5'} ${suffix ? 'pr-8' : 'pr-5'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value !== "" && !disabled && !onImmediateSubmit) {
            e.preventDefault();
            // It will be handled by the form submit in BottomInput
          }
        }}
      />
      {suffix && <span className="absolute right-4 text-slate-500 font-medium">{suffix}</span>}
    </div>
  );
};
