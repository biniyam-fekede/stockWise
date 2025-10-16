/**
 * Combined summary TypeScript type definitions.
 * Matches the backend API schema for the unified summary endpoint.
 */

import { PortfolioResponse } from './portfolio';
import { NewsWithSentiment } from './news';

/**
 * Combined portfolio and news with sentiment
 * This is the main data structure returned by /api/summary
 */
export interface SummaryResponse {
  /** Portfolio information */
  portfolio: PortfolioResponse;
  /** News articles with sentiment analysis */
  news: NewsWithSentiment[];
}

/**
 * API error response structure
 */
export interface ErrorResponse {
  /** Error message */
  error: string;
  /** Detailed error information (optional) */
  detail?: string;
}
