/**
 * Application constants.
 * Centralized configuration values used throughout the app.
 */

import { SentimentType } from '../types';

/**
 * React Query cache configuration
 */
export const QUERY_CONFIG = {
  /** Default stale time for queries (5 minutes) */
  STALE_TIME: 1000 * 60 * 5,
  /** Cache time for inactive queries (10 minutes) */
  CACHE_TIME: 1000 * 60 * 10,
  /** Auto-refresh interval (60 seconds) */
  REFETCH_INTERVAL: 1000 * 60,
} as const;

/**
 * Sentiment color mappings for UI
 */
export const SENTIMENT_COLORS: Record<SentimentType, { bg: string; text: string; border: string }> = {
  positive: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
  },
  neutral: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
  negative: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
  },
} as const;

/**
 * Chart colors for Recharts
 */
export const CHART_COLORS = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

/**
 * Navigation menu items
 */
export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'News', path: '/news' },
] as const;

/**
 * Default date range for news queries (in days)
 */
export const DEFAULT_NEWS_DAYS = 30;

/**
 * Maximum number of news articles to display
 */
export const MAX_NEWS_ITEMS = 20;

/**
 * Sentiment filter options
 */
export const SENTIMENT_FILTERS = [
  { value: 'all', label: 'All Sentiment' },
  { value: 'positive', label: 'Positive' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negative' },
] as const;
