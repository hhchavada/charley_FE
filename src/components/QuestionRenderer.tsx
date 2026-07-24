import React, { useState, useEffect, useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Package, TrendingUp, Banknote, ReceiptText, Store, Briefcase, MoreHorizontal, Users, Laptop, Cpu, Lightbulb, Globe, TrendingDown, Leaf, Zap } from "lucide-react";
import { PresentationQuestionDTO as QuestionDef } from "@/types/grant";
import { QuestionEngine } from "../lib/QuestionEngine";

interface QuestionRendererProps {
  question: QuestionDef;
  formData: Record<string, any>;
  onChange: (fieldName: string, value: any) => void;
}

export const QuestionRenderer = React.memo(function QuestionRenderer({ question, formData, onChange }: QuestionRendererProps) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const value = (question.fieldName || '').split('.').reduce((acc, part) => acc && acc[part], formData) || "";

  const handleChange = (val: any) => {
    if (question.fieldName) {
      onChange(question.fieldName, val);
    }

    if (question.questionId === 'q_company_name' && !formData.companyUen) {
      if (val && typeof val === 'string' && val.length > 1) {
        setShowDropdown(true);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(async () => {
          setIsSearching(true);
          try {
            const res = await fetch(`/api/companies/search?q=${encodeURIComponent(val)}`);
            const data = await res.json();
            if (Array.isArray(data)) {
              setSearchResults(data);
            } else {
              setSearchResults([]);
            }
          } catch (e) {
            console.error(e);
          } finally {
            setIsSearching(false);
          }
        }, 300);
      } else {
        setShowDropdown(false);
        setSearchResults([]);
      }
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
      case 'number':
      case 'currency': {
        const isCurrency = question.type === 'currency';
        let IconName = 'Store';
        if (question.questionId === 'q_monthly_revenue' || question.questionId === 'q_retained_earnings' || question.questionId === 'q_desired_funding') IconName = 'DollarSign';
        if (question.questionId === 'q_company_name') IconName = 'Store';
        if (question.questionId === 'q_company_uen') IconName = 'BadgeCheck';
        const isCompanySelected = !!formData.companyUen;
        const isReadonly = ['q_company_uen', 'q_company_type', 'q_operating_since'].includes(question.questionId) || (question.questionId === 'q_company_name' && isCompanySelected);
        
        return (
          <div ref={question.questionId === 'q_company_name' ? dropdownContainerRef : null} className={`relative ${question.questionId === 'q_company_name' ? 'z-50' : 'z-0'}`}>
            <div className="relative flex items-center gap-2">
               {isCurrency && IconName === 'DollarSign' ? (
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               ) : IconName === 'Store' ? (
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
               ) : IconName === 'BadgeCheck' ? (
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
               ) : (
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               )}
              <input 
                type={question.type === 'number' ? 'number' : 'text'}
                placeholder={question.placeholder} 
                value={isCurrency && value ? Number(String(value).replace(/,/g, '')).toLocaleString() : ((value as unknown as string | number) || "")} 
                onChange={(e) => {
                  let val = e.target.value;
                  if (isCurrency) {
                    val = val.replace(/,/g, '');
                    if (val === '' || /^\d+$/.test(val)) {
                       handleChange(val ? Number(val) : '');
                    }
                  } else {
                    handleChange(val);
                  }
                }}
                required={question.validation?.required}
                min={question.validation?.min}
                max={question.validation?.max}
                readOnly={isReadonly}
                className={`flex-1 w-full h-11 rounded-lg border border-neutral-200 bg-[#FBFAF6] pl-10 pr-3 text-sm focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 disabled:cursor-not-allowed disabled:opacity-50 ${isReadonly ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`}
              />
              {question.questionId === 'q_company_name' && isCompanySelected && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('companyName', '');
                    onChange('companyUen', '');
                    onChange('companyType', '');
                    onChange('operatingSince', '');
                  }}
                  className="shrink-0 h-11 px-3 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  Clear
                </button>
              )}
              {question.questionId === 'q_company_name' && showDropdown && !isCompanySelected && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-neutral-200 rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-3 text-sm text-neutral-500 text-center">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, idx) => (
                      <div 
                        key={idx} 
                        className="px-4 py-2.5 hover:bg-forest/5 cursor-pointer border-b border-neutral-100 last:border-0"
                        onClick={() => {
                          let cType = result.company_type_description;
                          if (!cType || cType.toLowerCase() === 'na') cType = result.business_constitution_description;
                          if (!cType || cType.toLowerCase() === 'na') cType = result.entity_type_description;

                          onChange('companyName', result.entity_name);
                          onChange('companyUen', result.uen);
                          onChange('companyType', cType);
                          onChange('operatingSince', result.registration_incorporation_date);
                          setShowDropdown(false);
                        }}
                      >
                        <div className="text-sm font-semibold text-neutral-800">{result.entity_name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">UEN: {result.uen}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-neutral-500 text-center">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }
      
      case 'phone': {
        const valStr = (value as unknown as string) || "";
        let cCode = "+65";
        let pNum = valStr;
        if (valStr.includes(" ")) {
           const parts = valStr.split(" ");
           if (parts[0].startsWith("+")) {
             cCode = parts[0];
             pNum = parts.slice(1).join(" ");
           }
        } else if (valStr.length === 0) {
           pNum = "";
        }
        
        const countryCodes = ["+65", "+60", "+62", "+66", "+63", "+1", "+44", "+61", "+86", "+852", "+886", "+81", "+82", "+91"];
        
        return (
          <div className="flex z-0 relative rounded-lg border border-neutral-200 bg-[#FBFAF6] focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/15 transition-all overflow-visible" ref={dropdownContainerRef}>
            <div className="relative flex items-center border-r border-neutral-200 bg-white rounded-l-lg">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1.5 h-11 pl-3 pr-2.5 bg-transparent text-sm text-neutral-700 focus:outline-none cursor-pointer rounded-l-lg"
              >
                <span>{cCode}</span>
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {showDropdown && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-32 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto p-1">
                  {countryCodes.map(code => {
                    const isSelected = cCode === code;
                    return (
                      <div
                        key={code}
                        className={`px-3 py-2 cursor-pointer rounded-md transition-colors text-sm ${isSelected ? 'bg-forest/10 font-medium text-forest' : 'hover:bg-neutral-50 text-neutral-700'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleChange(`${code} ${pNum}`);
                          setShowDropdown(false);
                        }}
                      >
                        {code}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <input
              type="tel"
              placeholder={question.placeholder}
              value={pNum}
              onChange={(e) => handleChange(`${cCode} ${e.target.value}`)}
              required={question.validation?.required}
              className="flex-1 w-full h-11 bg-transparent px-3 text-sm focus:outline-none"
            />
          </div>
        );
      }

      case 'dropdown':
        return (
          <Select value={(value as unknown as string) || ""} onValueChange={handleChange}>
            <SelectTrigger className="h-11 px-3 bg-white text-sm rounded-lg border border-neutral-200 focus:ring-4 focus:ring-forest/15 transition-all duration-300">
              <SelectValue placeholder={question.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-neutral-200 shadow-lg overflow-hidden z-50 bg-white">
              {question.options?.map(opt => (
                <SelectItem key={opt} value={opt} className="text-sm py-2 px-3 cursor-pointer hover:bg-neutral-50 transition-colors">{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multidropdown': {
        const selectedArray = Array.isArray(value) ? value : [];
        return (
          <div className="relative" ref={dropdownContainerRef}>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between w-full h-11 px-3 bg-white text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-forest/15 transition-all duration-300"
            >
              <span className={selectedArray.length === 0 ? "text-neutral-500" : "text-neutral-900 truncate pr-4"}>
                {selectedArray.length === 0 ? (question.placeholder || "Select options...") : 
                  selectedArray.map((val: string) => {
                    const optObj = question.options?.find(o => typeof o === 'object' && o !== null && (o as any).id === val);
                    return optObj ? (optObj as any).label : val;
                  }).join(", ")}
              </span>
              <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showDropdown && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto p-1">
                {question.options?.map(optRaw => {
                  const opt = typeof optRaw === 'object' && optRaw !== null ? (optRaw as any).id : optRaw;
                  const label = typeof optRaw === 'object' && optRaw !== null ? (optRaw as any).label : optRaw;
                  const isSelected = selectedArray.includes(opt);
                  return (
                    <label
                      key={opt}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-forest/5 rounded-md transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        if (isSelected) {
                          handleChange(selectedArray.filter((item: string) => item !== opt));
                        } else {
                          handleChange([...selectedArray, opt]);
                        }
                      }}
                    >
                      <div className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-forest border-forest' : 'border-neutral-300 bg-white'}`}>
                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm ${isSelected ? 'font-medium text-neutral-900' : 'text-neutral-700'}`}>{label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      case 'radio':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-labelledby={`label-${question.questionId}`}>
            {question.options?.map(optRaw => {
              const opt = typeof optRaw === 'object' && optRaw !== null ? (optRaw as any).id : optRaw;
              const label = typeof optRaw === 'object' && optRaw !== null ? (optRaw as any).label : optRaw;
              const isSelected = (value as unknown) === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleChange(opt)}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`group relative flex flex-col text-left p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 active:scale-[0.98] ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm shadow-blue-900/5 -translate-y-0.5' 
                      : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className={`text-sm font-medium leading-5 ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                      {label}
                    </span>
                    <div className={`mt-0.5 ml-3 flex-shrink-0 w-4 h-4 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
                      isSelected ? 'border-blue-600' : 'border-slate-300 group-hover:border-slate-400'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'multiselect':
      case 'checkbox':
        const selectedArray = Array.isArray(value) ? value : [];
        const isPurpose = question.questionId === 'q_purpose_of_funds' || question.questionId === 'q_purpose';
        
        const getPurposeIcon = (opt: string) => {
          switch (opt) {
            case 'Business Growth': return <TrendingUp className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Finding Skilled Employees': return <Users className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Digital Transformation': return <Laptop className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Technology Adoption': return <Cpu className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Developing New Products': return <Lightbulb className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Entering New Markets': return <Globe className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'High Operating Costs': return <TrendingDown className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Sustainability': return <Leaf className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            case 'Improving Productivity': return <Zap className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
            default: return <MoreHorizontal className="w-4 h-4 mb-1.5 text-neutral-500 group-hover:text-[#1B5E45] transition-colors" />;
          }
        };

        return (
          <div className={`grid ${isPurpose ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'} gap-2.5`} role="group" aria-labelledby={`label-${question.questionId}`}>
            {question.options?.map(optRaw => {
              const opt = typeof optRaw === 'object' && optRaw !== null ? (optRaw as any).id : optRaw;
              const label = typeof optRaw === 'object' && optRaw !== null ? (optRaw as any).label : optRaw;
              const isSelected = selectedArray.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (isSelected) {
                      handleChange(selectedArray.filter((item: string) => item !== opt));
                    } else {
                      handleChange([...selectedArray, opt]);
                    }
                  }}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  className={`group relative flex flex-col text-left rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1B5E45]/30 active:scale-[0.98] ${
                    isSelected 
                      ? 'border-[#1B5E45] bg-[#1B5E45]/5 shadow-sm shadow-[#1B5E45]/5 -translate-y-0.5' 
                      : 'border-slate-200/80 hover:border-[#1B5E45]/50 hover:bg-slate-50 bg-white shadow-sm'
                  } ${isPurpose ? 'p-2 h-[76px] items-center justify-center text-center' : 'p-4'}`}
                >
                  {isPurpose && isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-[#1B5E45] rounded-full p-0.5 animate-in zoom-in duration-200 shadow-sm">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {isPurpose && getPurposeIcon(opt)}
                  <div className={`flex items-center justify-between w-full ${isPurpose ? 'justify-center' : ''}`}>
                    <span className={`font-semibold transition-colors duration-200 ${isSelected ? 'text-[#1B5E45]' : 'text-slate-700 group-hover:text-slate-900'} ${isPurpose ? 'text-[12px] leading-tight px-1' : 'text-sm leading-snug'}`}>{label}</span>
                    {!isPurpose && (
                      <div className={`mt-0.5 ml-3 shrink-0 w-4 h-4 rounded-[0.2rem] border flex items-center justify-center transition-colors duration-200 ${
                        isSelected ? 'border-[#1B5E45] bg-[#1B5E45]' : 'border-slate-300 bg-slate-50 group-hover:border-slate-400'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white animate-in zoom-in duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        );

      default:
        return <div>Unsupported question type: {question.type}</div>;
    }
  };

  return (
    <div className="space-y-1.5">
      <Label id={`label-${question.questionId}`} className="block text-xs font-semibold text-neutral-600 mb-1.5">
        {question.title}
      </Label>
      {question.description && (
        <p className="text-xs text-slate-500 font-medium max-w-xl pb-1">{question.description}</p>
      )}
      
      <div className="pt-0.5">
        {renderInput()}
      </div>
    </div>
  );
});
