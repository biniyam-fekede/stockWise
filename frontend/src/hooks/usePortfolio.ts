/**
 * React Query hook for portfolio data.
 * Manages fetching, caching, and state for portfolio information.
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { PortfolioResponse } from '../types';
import { QUERY_CONFIG } from '../utils/constants';

/**
 * Fetch portfolio data from API
 * @returns Promise with portfolio data
 */
const fetchPortfolio = async (): Promise<PortfolioResponse> => {
  const response = await axiosClient.get<PortfolioResponse>(API_ENDPOINTS.PORTFOLIO.BASE);
  return response.data;
};

/**
 * Hook to fetch and manage portfolio data
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = usePortfolio();
 * 
 * if (isLoading) return <Loader />;
 * if (error) return <Error message={error.message} />;
 * 
 * return <PortfolioCard portfolio={data} />;
 * ```
 */
export const usePortfolio = (): UseQueryResult<PortfolioResponse, Error> => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.CACHE_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Fetch portfolio symbols from API
 * @returns Promise with array of symbols
 */
const fetchPortfolioSymbols = async (): Promise<string[]> => {
  const response = await axiosClient.get<string[]>(API_ENDPOINTS.PORTFOLIO.SYMBOLS);
  return response.data;
};

/**
 * Hook to fetch portfolio symbols only
 * Useful when you only need the list of symbols without full portfolio data
 * 
 * @example
 * ```tsx
 * const { data: symbols } = usePortfolioSymbols();
 * console.log(symbols); // ['AAPL', 'TSLA', 'MSFT']
 * ```
 */
export const usePortfolioSymbols = (): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['portfolio', 'symbols'],
    queryFn: fetchPortfolioSymbols,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.CACHE_TIME,
  });
};
