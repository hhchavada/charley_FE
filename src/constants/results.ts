import React from 'react';
import { Target, Lightbulb, CheckSquare, Activity } from 'lucide-react';

export const RESULT_TYPES = {
  HIGHLY_RECOMMENDED: 'highly-recommended',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

export const CONSULTANT_MESSAGES = {
  EXECUTIVE_SUMMARY: {
    HIGH: "This programme aligns exceptionally well with your stated business objectives and merits immediate attention.",
    SUCCESS: "Your current profile strongly satisfies the core requirements for this funding track.",
    WARNING: "This opportunity looks promising, although several important details are still missing to confirm full eligibility.",
    ERROR: "Based on your current profile, this programme is not a suitable fit at this time."
  },
  RECOMMENDATION: {
    HIGH: "Proceed with confidence. Prioritise this application in your current funding cycle.",
    SUCCESS: "Strong candidate. Begin gathering necessary documentation for the application process.",
    WARNING: "Address the missing information gaps before proceeding with a formal application.",
    ERROR: "Focus your resources on other, more aligned funding opportunities at this time."
  }
};
