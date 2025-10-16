/**
 * React Query hook for the combined summary endpoint.
 * Fetches portfolio data with sentiment-analyzed news in a single request.
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { SummaryResponse } from '../types';
import { QUERY_CONFIG } from '../utils/constants';

/**
 * Fetch combined summary (portfolio + sentiment-analyzed news)
 * @returns Promise with summary response
 */
const fetchSummary = async (): Promise<SummaryResponse> => {
  const response = await axiosClient.get<SummaryResponse>(API_ENDPOINTS.SUMMARY.BASE);
  return response.data;
};

/**
 * Hook to fetch combined portfolio and news summary with sentiment analysis.
 * This is the primary hook for the dashboard as it provides all data in one call.
 * 
 * @param autoRefresh - Enable automatic refetching (default: false)
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useSummary();
 * 
 * if (isLoading) return <Loader />;
 * if (error) return <ErrorDisplay error={error} />;
 * 
 * return (
 *   <>
 *     <PortfolioCard portfolio={data.portfolio} />
 *     <NewsFeed news={data.news} />
 *   </>
 * );
 * ```
 * 
 * @example With auto-refresh enabled
 * ```tsx
 * const { data } = useSummary(true); // Refreshes every 60 seconds
 * ```
 */
export const useSummary = (
  autoRefresh: boolean = false
): UseQueryResult<SummaryResponse, Error> => {
  return useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.CACHE_TIME,
    refetchInterval: autoRefresh ? QUERY_CONFIG.REFETCH_INTERVAL : false,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
