/**
 * SentimentTag component.
 * Displays a colored badge indicating sentiment (positive, neutral, negative).
 */

import React from "react";
import { SentimentType } from "../types";
import { SENTIMENT_COLORS } from "../utils/constants";

interface SentimentTagProps {
  /** Sentiment type */
  sentiment: SentimentType;
  /** Optional confidence score to display */
  confidence?: number;
  /** Size variant */
  size?: "small" | "medium";
}

/**
 * Sentiment badge component with color coding
 *
 * @example
 * ```tsx
 * <SentimentTag sentiment="positive" />
 * <SentimentTag sentiment="negative" confidence={0.92} />
 * ```
 */
const SentimentTag: React.FC<SentimentTagProps> = ({
  sentiment,
  confidence,
  size = "medium",
}) => {
  const colors = SENTIMENT_COLORS[sentiment];
  const sizeClasses =
    size === "small" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  // Capitalize sentiment
  const displaySentiment =
    sentiment.charAt(0).toUpperCase() + sentiment.slice(1);

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium border
        ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses}
      `}
    >
      {/* Sentiment icon */}
      {sentiment === "positive" && <span>✓</span>}
      {sentiment === "negative" && <span>✗</span>}
      {sentiment === "neutral" && <span>—</span>}

      {/* Sentiment label */}
      <span>{displaySentiment}</span>

      {/* Optional confidence score */}
      {confidence !== undefined && (
        <span className="opacity-75">({Math.round(confidence * 100)}%)</span>
      )}
    </span>
  );
};

export default SentimentTag;
