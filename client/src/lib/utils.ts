import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind's class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a percentage
 */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

/**
 * Truncate a string to the specified length
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Map importance level (1-5) to text representation
 */
export function importanceToText(importance: number): string {
  const map: Record<number, string> = {
    1: 'Very Low',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Very High'
  };
  return map[importance] || 'Unknown';
}

/**
 * Convert a match score to a color class
 */
export function matchScoreToColorClass(score: number): string {
  if (score >= 90) return 'bg-primary text-primary-foreground';
  if (score >= 70) return 'bg-primary text-primary-foreground';
  return 'bg-slate-500 text-white';
}

/**
 * Get badge color classes based on tech name
 */
export function getTechBadgeColor(techName: string): string {
  const techColorMap: Record<string, string> = {
    'Python': 'bg-blue-50 text-blue-700',
    'TensorFlow': 'bg-purple-50 text-purple-700',
    'PyTorch': 'bg-purple-50 text-purple-700',
    'AWS': 'bg-green-50 text-green-700',
    'GCP': 'bg-green-50 text-green-700',
    'Azure': 'bg-blue-50 text-blue-700',
    'LangChain': 'bg-orange-50 text-orange-700',
    'LlamaIndex': 'bg-orange-50 text-orange-700',
    'Spark': 'bg-pink-50 text-pink-700',
    'Kafka': 'bg-pink-50 text-pink-700',
    'Airflow': 'bg-orange-50 text-orange-700',
    'Snowflake': 'bg-pink-50 text-pink-700',
    'Scala': 'bg-purple-50 text-purple-700',
    'Java': 'bg-red-50 text-red-700',
    'JavaScript': 'bg-yellow-50 text-yellow-700',
    'TypeScript': 'bg-blue-50 text-blue-700',
  };
  
  return techColorMap[techName] || 'bg-gray-50 text-gray-700';
}
