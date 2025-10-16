/**
 * Formatting utilities for numbers, dates, and currency.
 * Provides consistent formatting across the application.
 */

/**
 * Format a number as USD currency
 * @param value - Numeric value to format
 * @returns Formatted currency string
 * 
 * @example
 * ```ts
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(-500) // "-$500.00"
 * ```
 */
export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};

/**
 * Format a number as percentage
 * @param value - Numeric value to format (e.g., 15.5 for 15.5%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 * 
 * @example
 * ```ts
 * formatPercentage(15.5) // "+15.50%"
 * formatPercentage(-3.2) // "-3.20%"
 * ```
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Format a date string to readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate('2025-10-15T10:30:00Z') // "Oct 15, 2025"
 * ```
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date string to relative time (e.g., "2 hours ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 * 
 * @example
 * ```ts
 * formatRelativeTime('2025-10-15T10:30:00Z') // "2 hours ago"
 * ```
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(dateString);
};

/**
 * Format large numbers with abbreviations (K, M, B)
 * @param value - Numeric value
 * @returns Abbreviated number string
 * 
 * @example
 * ```ts
 * formatLargeNumber(1234) // "1.23K"
 * formatLargeNumber(1234567) // "1.23M"
 * ```
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toFixed(2);
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 * 
 * @example
 * ```ts
 * truncateText('This is a very long text', 10) // "This is..."
 * ```
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Get color class based on value (positive/negative)
 * @param value - Numeric value
 * @returns Tailwind color class
 * 
 * @example
 * ```ts
 * getValueColor(15.5) // "text-green-600"
 * getValueColor(-3.2) // "text-red-600"
 * ```
 */
export const getValueColor = (value: number): string => {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};
