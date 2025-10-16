/**
 * React Query hooks for news data.
 * Manages fetching, caching, and state for news articles.
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';
import { API_ENDPOINTS, getNewsUrl, getGeneralNewsUrl } from '../api/endpoints';
import { NewsResponse } from '../types';
import { QUERY_CONFIG } from '../utils/constants';

/**
 * Fetch company news for specific symbols
 * @param symbols - Array of stock ticker symbols
 * @returns Promise with news response
 */
const fetchCompanyNews = async (symbols: string[]): Promise<NewsResponse> => {
  const url = getNewsUrl(symbols);
  const response = await axiosClient.get<NewsResponse>(url);
  return response.data;
};

/**
 * Hook to fetch company-specific news for given symbols
 * 
 * @param symbols - Array of stock symbols
 * @param enabled - Whether the query should execute (default: true)
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useCompanyNews(['AAPL', 'TSLA']);
 * 
 * return (
 *   <div>
 *     {data?.articles.map(article => (
 *       <NewsItem key={article.url} article={article} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useCompanyNews = (
  symbols: string[],
  enabled: boolean = true
): UseQueryResult<NewsResponse, Error> => {
  return useQuery({
    queryKey: ['news', 'company', symbols],
    queryFn: () => fetchCompanyNews(symbols),
    enabled: enabled && symbols.length > 0,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.CACHE_TIME,
    retry: 2,
  });
};

/**
 * Fetch general market news
 * @param category - News category (general, forex, crypto, merger)
 * @returns Promise with news response
 */
const fetchGeneralNews = async (category: string = 'general'): Promise<NewsResponse> => {
  const url = getGeneralNewsUrl(category);
  const response = await axiosClient.get<NewsResponse>(url);
  return response.data;
};

/**
 * Hook to fetch general market news
 * 
 * @param category - News category (default: 'general')
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useGeneralNews('general');
 * ```
 */
export const useGeneralNews = (
  category: string = 'general'
): UseQueryResult<NewsResponse, Error> => {
  return useQuery({
    queryKey: ['news', 'general', category],
    queryFn: () => fetchGeneralNews(category),
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.CACHE_TIME,
    retry: 2,
  });
};
