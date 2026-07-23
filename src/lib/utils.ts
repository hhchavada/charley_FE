import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatFieldName = (field: string) => {
  const clean = field.replace('dynamicAnswers.', '').replace(/([A-Z])/g, ' $1')
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}
