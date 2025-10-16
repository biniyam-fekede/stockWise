/**
 * PortfolioCard component.
 * Displays portfolio summary with total equity, cash, and holdings.
 */

import React from "react";
import { PortfolioResponse } from "../types";
import {
  formatCurrency,
  formatPercentage,
  getValueColor,
} from "../utils/formatters";
import { TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";

interface PortfolioCardProps {
  /** Portfolio data from API */
  portfolio: PortfolioResponse;
}

/**
 * Portfolio summary card with key metrics
 *
 * @example
 * ```tsx
 * <PortfolioCard portfolio={portfolioData} />
 * ```
 */
const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  // Calculate total invested
  const totalInvested = portfolio.holdings.reduce(
    (sum, holding) => sum + holding.quantity * holding.average_price,
    0
  );

  // Calculate total return
  const totalReturn = portfolio.holdings.reduce(
    (sum, holding) =>
      sum + (holding.equity - holding.quantity * holding.average_price),
    0
  );

  const returnPercentage =
    totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Portfolio Summary
      </h2>

      {/* Key metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Equity */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-700">
              Total Value
            </span>
            <DollarSign className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-primary-900">
            {formatCurrency(portfolio.total_equity)}
          </p>
        </div>

        {/* Cash Balance */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Cash</span>
            <Wallet className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">
            {formatCurrency(portfolio.cash_balance)}
          </p>
        </div>

        {/* Total Return */}
        <div
          className={`bg-gradient-to-br ${
            totalReturn >= 0
              ? "from-green-50 to-green-100"
              : "from-red-50 to-red-100"
          } rounded-lg p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-medium ${
                totalReturn >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              Total Return
            </span>
            {totalReturn >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
          </div>
          <p
            className={`text-2xl font-bold ${
              totalReturn >= 0 ? "text-green-900" : "text-red-900"
            }`}
          >
            {formatCurrency(totalReturn)}
          </p>
        </div>

        {/* Return Percentage */}
        <div
          className={`bg-gradient-to-br ${
            returnPercentage >= 0
              ? "from-green-50 to-green-100"
              : "from-red-50 to-red-100"
          } rounded-lg p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-medium ${
                returnPercentage >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              Return %
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              returnPercentage >= 0 ? "text-green-900" : "text-red-900"
            }`}
          >
            {formatPercentage(returnPercentage)}
          </p>
        </div>
      </div>

      {/* Holdings table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Holdings</h3>
        {portfolio.holdings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No holdings found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">
                    Symbol
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">
                    Shares
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">
                    Avg Price
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">
                    Current
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">
                    Value
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding) => (
                  <tr
                    key={holding.symbol}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-3 font-semibold text-gray-900">
                      {holding.symbol}
                    </td>
                    <td className="text-right py-3 px-3 text-gray-700">
                      {holding.quantity.toFixed(2)}
                    </td>
                    <td className="text-right py-3 px-3 text-gray-700">
                      {formatCurrency(holding.average_price)}
                    </td>
                    <td className="text-right py-3 px-3 text-gray-700">
                      {formatCurrency(holding.current_price)}
                    </td>
                    <td className="text-right py-3 px-3 font-semibold text-gray-900">
                      {formatCurrency(holding.equity)}
                    </td>
                    <td
                      className={`text-right py-3 px-3 font-semibold ${getValueColor(
                        holding.percent_change
                      )}`}
                    >
                      {formatPercentage(holding.percent_change)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
