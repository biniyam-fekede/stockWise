/**
 * News page - News feed with sentiment analysis.
 * Displays company news for portfolio holdings.
 */

import React, { useState } from "react";
import { usePortfolioSymbols } from "../hooks/usePortfolio";
import { useCompanyNews } from "../hooks/useNews";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import NewsItem from "../components/NewsItem";
import { SENTIMENT_FILTERS } from "../utils/constants";
import { NewsWithSentiment } from "../types";

/**
 * News page component with sentiment filtering
 */
const NewsPage: React.FC = () => {
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");

  // Get portfolio symbols first
  const { data: symbols, isLoading: symbolsLoading } = usePortfolioSymbols();

  // Then fetch news for those symbols
  const {
    data: newsData,
    isLoading: newsLoading,
    error,
    refetch,
  } = useCompanyNews(symbols || [], !!symbols && symbols.length > 0);

  const isLoading = symbolsLoading || newsLoading;

  // Note: This demo uses the news endpoint which doesn't include sentiment
  // In production, you'd want to either:
  // 1. Use the /api/summary endpoint and extract news
  // 2. Add sentiment analysis to news articles client-side
  // For now, we'll show the news without sentiment filtering

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Loader message="Loading news..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <ErrorDisplay
          message={error.message || "Failed to load news"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!newsData || newsData.articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">News</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No news articles available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">News Feed</h1>
        <p className="text-gray-600 mt-1">
          Latest news for your portfolio holdings
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700">
            Showing {newsData.count} article{newsData.count !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsData.articles.map((article, index) => (
            <div
              key={`${article.url}-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              {article.symbol && (
                <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded text-xs font-semibold inline-block mb-2">
                  {article.symbol}
                </span>
              )}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {article.summary}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">
                  {article.source}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
