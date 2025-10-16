/**
 * Portfolio-related TypeScript type definitions.
 * Matches the backend API schema for portfolio data.
 */

/**
 * Individual stock holding in the portfolio
 */
export interface Holding {
  /** Stock ticker symbol (e.g., "AAPL") */
  symbol: string;
  /** Number of shares owned */
  quantity: number;
  /** Average cost per share */
  average_price: number;
  /** Current market price per share */
  current_price: number;
  /** Total value of this holding (quantity * current_price) */
  equity: number;
  /** Percentage change from purchase price */
  percent_change: number;
}

/**
 * Complete portfolio response from API
 */
export interface PortfolioResponse {
  /** Total portfolio value including all holdings */
  total_equity: number;
  /** Available cash balance */
  cash_balance: number;
  /** Array of stock holdings */
  holdings: Holding[];
}

/**
 * Portfolio statistics derived from holdings
 */
export interface PortfolioStats {
  /** Total number of positions */
  positionCount: number;
  /** Total invested amount */
  totalInvested: number;
  /** Total current value */
  totalValue: number;
  /** Overall profit/loss */
  totalProfitLoss: number;
  /** Overall percentage return */
  totalReturn: number;
}
