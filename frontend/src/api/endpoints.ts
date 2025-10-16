/**
 * API endpoint constants.
 * Centralizes all API endpoint paths for easy maintenance and type safety.
 */

/**
 * Base API prefix (all endpoints are prefixed with /api)
 */
const API_PREFIX = '/api';

/**
 * API endpoints for the Finance Insight Dashboard
 */
export const API_ENDPOINTS = {
  /**
   * Portfolio endpoints
   */
  PORTFOLIO: {
    /** GET - Fetch complete portfolio data */
    BASE: `${API_PREFIX}/portfolio`,
    /** GET - Fetch list of portfolio symbols */
    SYMBOLS: `${API_PREFIX}/portfolio/symbols`,
  },

  /**
   * News endpoints
   */
  NEWS: {
    /** GET - Fetch company-specific news (requires symbols query param) */
    BASE: `${API_PREFIX}/news`,
    /** GET - Fetch general market news */
    GENERAL: `${API_PREFIX}/news/general`,
  },

  /**
   * Sentiment analysis endpoints
   */
  SENTIMENT: {
    /** POST - Analyze sentiment of provided text */
    ANALYZE: `${API_PREFIX}/sentiment/analyze`,
  },

  /**
   * Summary endpoint
   */
  SUMMARY: {
    /** GET - Fetch combined portfolio and sentiment-analyzed news */
    BASE: `${API_PREFIX}/summary`,
  },

  /**
   * Health check
   */
  HEALTH: '/health',
} as const;

/**
 * Helper function to build news URL with symbols
 * @param symbols - Array of stock ticker symbols
 * @returns Formatted URL with symbols query parameter
 * 
 * @example
 * ```ts
 * getNewsUrl(['AAPL', 'TSLA']) // '/api/news?symbols=AAPL,TSLA'
 * ```
 */
export const getNewsUrl = (symbols: string[]): string => {
  const symbolsParam = symbols.join(',');
  return `${API_ENDPOINTS.NEWS.BASE}?symbols=${symbolsParam}`;
};

/**
 * Helper function to build general news URL with category
 * @param category - News category (general, forex, crypto, merger)
 * @returns Formatted URL with category query parameter
 * 
 * @example
 * ```ts
 * getGeneralNewsUrl('general') // '/api/news/general?category=general'
 * ```
 */
export const getGeneralNewsUrl = (category: string = 'general'): string => {
  return `${API_ENDPOINTS.NEWS.GENERAL}?category=${category}`;
};
