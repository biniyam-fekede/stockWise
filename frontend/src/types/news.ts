/**
 * News-related TypeScript type definitions.
 * Matches the backend API schema for news articles.
 */

/**
 * Individual news article from Finnhub
 */
export interface NewsArticle {
  /** Related stock symbol (optional for general news) */
  symbol?: string | null;
  /** Article headline */
  title: string;
  /** Article summary/description */
  summary: string;
  /** News source (e.g., "Bloomberg", "Reuters") */
  source: string;
  /** Full article URL */
  url: string;
  /** Publication timestamp (ISO 8601 format) */
  published_at: string;
}

/**
 * News response from API
 */
export interface NewsResponse {
  /** Array of news articles */
  articles: NewsArticle[];
  /** Total number of articles returned */
  count: number;
}

/**
 * News article with sentiment analysis
 */
export interface NewsWithSentiment extends NewsArticle {
  /** Sentiment category */
  sentiment: 'positive' | 'neutral' | 'negative';
  /** Sentiment confidence score (0-1) */
  confidence: number;
}
