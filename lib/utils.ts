import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert English numbers to Bangla numbers
const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(num: number | string): string {
  return String(num)
    .split('')
    .map((digit) => (banglaDigits[parseInt(digit)] ?? digit))
    .join('');
}

// Format currency in BDT
export function formatBDT(amount: number, locale: 'en' | 'bn' = 'bn'): string {
  const formatted = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  if (locale === 'bn') {
    return formatted.replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]).replace('BDT', '৳');
  }
  
  return formatted;
}

// Generate a random slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
