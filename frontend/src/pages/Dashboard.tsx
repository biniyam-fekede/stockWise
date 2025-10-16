/**
 * Dashboard page - Main view combining portfolio and news.
 * Uses the /api/summary endpoint for unified data fetching.
 */

import React, { useState } from "react";
import { useSummary } from "../hooks/useSummary";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import PortfolioCard from "../components/PortfolioCard";
import NewsItem from "../components/NewsItem";
import ChartCard from "../components/ChartCard";
import { RefreshCw } from "lucide-react";
import { SENTIMENT_FILTERS } from "../utils/constants";
import { SentimentType } from "../types";

/**
 * Main Dashboard page component
 *
 * Features:
 * - Portfolio summary
 * - Sentiment-analyzed news feed
 * - Auto-refresh toggle
 * - Sentiment filter
 */
const Dashboard: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");

  const { data, isLoading, error, refetch, isFetching } =
    useSummary(autoRefresh);

  // Filter news by sentiment
  const filteredNews = React.useMemo(() => {
    if (!data?.news) return [];
    if (sentimentFilter === "all") return data.news;
    return data.news.filter((article) => article.sentiment === sentimentFilter);
  }, [data?.news, sentimentFilter]);

  // Mock chart data (in real app, this would come from historical API)
  const chartData = React.useMemo(() => {
    if (!data?.portfolio) return [];
    // Generate mock historical data for demonstration
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(
        today.getTime() - (29 - i) * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: data.portfolio.total_equity * (0.95 + Math.random() * 0.1),
    }));
  }, [data?.portfolio]);

  if (isLoading) {
    return <Loader message="Loading dashboard..." size="large" />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <ErrorDisplay
          message={error.message || "Failed to load dashboard data"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <ErrorDisplay message="No data available" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Your portfolio insights at a glance
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Auto-refresh toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Auto-refresh (60s)
            </span>
          </label>

          {/* Manual refresh button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Portfolio section */}
      <PortfolioCard portfolio={data.portfolio} />

      {/* Chart section */}
      <ChartCard
        title="Portfolio Value (Last 30 Days)"
        data={chartData}
        valueLabel="Portfolio Value"
      />

      {/* News section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Latest News with Sentiment
          </h2>

          {/* Sentiment filter */}
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {SENTIMENT_FILTERS.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {filteredNews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No news articles found
            {sentimentFilter !== "all" && ` with ${sentimentFilter} sentiment`}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.map((article, index) => (
              <NewsItem key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
