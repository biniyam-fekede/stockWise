/**
 * NewsItem component.
 * Displays a single news article with source, title, and sentiment.
 */

import React from "react";
import { NewsWithSentiment } from "../types";
import { formatRelativeTime } from "../utils/formatters";
import SentimentTag from "./SentimentTag";
import { ExternalLink } from "lucide-react";

interface NewsItemProps {
  /** News article data */
  article: NewsWithSentiment;
}

/**
 * Individual news article card with sentiment analysis
 *
 * @example
 * ```tsx
 * <NewsItem article={newsArticle} />
 * ```
 */
const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Header with symbol and time */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {article.symbol && (
            <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded text-xs font-semibold">
              {article.symbol}
            </span>
          )}
          <span className="text-xs text-gray-500">
            {formatRelativeTime(article.published_at)}
          </span>
        </div>
        <SentimentTag
          sentiment={article.sentiment}
          confidence={article.confidence}
          size="small"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {article.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {article.summary}
      </p>

      {/* Footer with source and link */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500 font-medium">
          {article.source}
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
        >
          Read more
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
