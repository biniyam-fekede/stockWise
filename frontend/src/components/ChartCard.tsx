/**
 * ChartCard component.
 * Displays portfolio value over time using Recharts.
 */

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "../utils/constants";

interface ChartDataPoint {
  date: string;
  value: number;
}

interface ChartCardProps {
  /** Chart title */
  title: string;
  /** Chart data points */
  data: ChartDataPoint[];
  /** Value label (e.g., "Portfolio Value") */
  valueLabel?: string;
}

/**
 * Portfolio value chart card
 *
 * @example
 * ```tsx
 * const data = [
 *   { date: '2025-01-01', value: 10000 },
 *   { date: '2025-02-01', value: 12000 },
 * ];
 * <ChartCard title="Portfolio Value" data={data} />
 * ```
 */
const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  valueLabel = "Value",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No chart data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                valueLabel,
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS.primary, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartCard;
