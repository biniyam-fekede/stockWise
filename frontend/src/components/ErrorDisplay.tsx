/**
 * ErrorDisplay component.
 * Displays error messages with optional retry action.
 */

import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  /** Error message to display */
  message?: string;
  /** Optional retry callback */
  onRetry?: () => void;
}

/**
 * Error display component for API failures
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   message="Failed to load portfolio"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message = "An error occurred",
  onRetry,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
      <p className="text-red-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
