/**
 * Sentiment analysis TypeScript type definitions.
 * Matches the backend API schema for sentiment analysis.
 */

/**
 * Sentiment category types
 */
export type SentimentType = 'positive' | 'neutral' | 'negative';

/**
 * Sentiment analysis result
 */
export interface SentimentResult {
  /** Sentiment category: positive, neutral, or negative */
  sentiment: SentimentType;
  /** Confidence score (0-1) */
  confidence: number;
}

/**
 * Request body for sentiment analysis
 */
export interface SentimentRequest {
  /** Text to analyze */
  text: string;
}

/**
 * Response from sentiment analysis endpoint
 */
export interface SentimentResponse {
  /** Original text that was analyzed */
  text: string;
  /** Sentiment analysis result */
  result: SentimentResult;
}

/**
 * Sentiment statistics for a collection of news
 */
export interface SentimentStats {
  /** Number of positive articles */
  positive: number;
  /** Number of neutral articles */
  neutral: number;
  /** Number of negative articles */
  negative: number;
  /** Total articles analyzed */
  total: number;
  /** Percentage of positive sentiment */
  positivePercentage: number;
}
