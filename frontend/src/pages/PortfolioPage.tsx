/**
 * Portfolio page - Detailed portfolio view.
 * Shows portfolio holdings with detailed information.
 */

import React from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import PortfolioCard from "../components/PortfolioCard";

/**
 * Portfolio page component
 */
const PortfolioPage: React.FC = () => {
  const { data, isLoading, error, refetch } = usePortfolio();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Loader message="Loading portfolio..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <ErrorDisplay
          message={error.message || "Failed to load portfolio"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <ErrorDisplay message="No portfolio data available" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <p className="text-gray-600 mt-1">Detailed view of your holdings</p>
      </div>

      <PortfolioCard portfolio={data} />
    </div>
  );
};

export default PortfolioPage;
