"""
Robinhood service for portfolio data retrieval.
Handles authentication and fetching portfolio information using robin_stocks.
"""

import robin_stocks.robinhood as rh
from typing import Optional
from app.core.logger import logger
from app.core.config import get_settings
from app.models.schemas import PortfolioResponse, Holding


class RobinhoodService:
    """Service for interacting with Robinhood API"""
    
    def __init__(self):
        self.settings = get_settings()
        self._logged_in = False
    
    def login(self) -> bool:
        """
        Authenticate with Robinhood using credentials from environment.
        
        Returns:
            bool: True if login successful, False otherwise
        """
        try:
            logger.info("Attempting Robinhood login...")
            login_result = rh.login(
                username=self.settings.ROBIN_USER,
                password=self.settings.ROBIN_PASS,
                store_session=True
            )
            
            if login_result:
                self._logged_in = True
                logger.info("Robinhood login successful")
                return True
            else:
                logger.error("Robinhood login failed")
                return False
                
        except Exception as e:
            logger.error(f"Robinhood login error: {str(e)}")
            self._logged_in = False
            return False
    
    def logout(self) -> None:
        """Logout from Robinhood session"""
        try:
            rh.logout()
            self._logged_in = False
            logger.info("Logged out from Robinhood")
        except Exception as e:
            logger.error(f"Error during logout: {str(e)}")
    
    def get_portfolio(self) -> PortfolioResponse:
        """
        Fetch complete portfolio information including holdings and cash balance.
        
        Returns:
            PortfolioResponse: Portfolio data with holdings
            
        Raises:
            Exception: If not logged in or API call fails
        """
        if not self._logged_in:
            if not self.login():
                raise Exception("Failed to authenticate with Robinhood")
        
        try:
            logger.info("Fetching portfolio data...")
            
            # Get portfolio value
            total_equity = 0.0
            cash_balance = 0.0
            
            # Try to get portfolio profile
            try:
                profile = rh.load_portfolio_profile()
                if profile and isinstance(profile, dict):
                    total_equity = float(profile.get('equity', 0) or 0)
                    logger.info(f"Portfolio equity from profile: ${total_equity}")
                else:
                    logger.warning("Portfolio profile returned None or invalid data")
            except Exception as e:
                logger.warning(f"Could not load portfolio profile: {str(e)}")
            
            # Try to get cash balance
            try:
                account_info = rh.load_account_profile()
                if account_info and isinstance(account_info, dict):
                    cash_balance = float(account_info.get('cash', 0) or 0)
                    logger.info(f"Cash balance: ${cash_balance}")
                else:
                    logger.warning("Account profile returned None or invalid data")
            except Exception as e:
                logger.warning(f"Could not load account profile: {str(e)}")
                # Try alternative method for cash
                try:
                    cash_data = rh.account.build_user_profile()
                    if cash_data and isinstance(cash_data, dict):
                        cash_balance = float(cash_data.get('cash', 0) or 0)
                except:
                    logger.warning("Could not get cash balance from alternative method")
            
            # Get holdings
            holdings_list = []
            try:
                positions = rh.get_open_stock_positions()
                
                if not positions:
                    logger.info("No open positions found")
                else:
                    logger.info(f"Processing {len(positions)} positions")
                
                for position in positions:
                    try:
                        # Ensure position is a dict
                        if not isinstance(position, dict):
                            logger.warning(f"Invalid position data: {position}")
                            continue
                        
                        # Get symbol
                        instrument_url = position.get('instrument')
                        if not instrument_url:
                            logger.warning("Position missing instrument URL")
                            continue
                        
                        symbol = rh.get_symbol_by_url(instrument_url)
                        if not symbol:
                            logger.warning(f"Could not get symbol for instrument: {instrument_url}")
                            continue
                        
                        quantity = float(position.get('quantity', 0) or 0)
                        average_price = float(position.get('average_buy_price', 0) or 0)
                        
                        # Get current price
                        current_price = 0.0
                        try:
                            quote = rh.get_latest_price(symbol)
                            if quote and len(quote) > 0 and quote[0]:
                                current_price = float(quote[0])
                        except Exception as e:
                            logger.warning(f"Could not get price for {symbol}: {str(e)}")
                        
                        equity = quantity * current_price
                        
                        # Calculate percent change
                        percent_change = 0.0
                        if average_price > 0:
                            percent_change = ((current_price - average_price) / average_price) * 100
                        
                        holding = Holding(
                            symbol=symbol,
                            quantity=quantity,
                            average_price=average_price,
                            current_price=current_price,
                            equity=equity,
                            percent_change=round(percent_change, 2)
                        )
                        holdings_list.append(holding)
                        logger.info(f"Added holding: {symbol} - {quantity} shares @ ${current_price}")
                        
                    except Exception as e:
                        logger.error(f"Error processing position: {str(e)}")
                        continue
                        
            except Exception as e:
                logger.error(f"Error fetching positions: {str(e)}")
            
            # Calculate total equity from holdings if not available from profile
            if total_equity == 0.0 and holdings_list:
                total_equity = sum(h.equity for h in holdings_list) + cash_balance
                logger.info(f"Calculated total equity from holdings: ${total_equity}")
            
            logger.info(f"Successfully fetched {len(holdings_list)} holdings")
            
            return PortfolioResponse(
                total_equity=round(total_equity, 2),
                cash_balance=round(cash_balance, 2),
                holdings=holdings_list
            )
            
        except Exception as e:
            logger.error(f"Error fetching portfolio: {str(e)}")
            raise Exception(f"Failed to fetch portfolio data: {str(e)}")
    
    def get_portfolio_symbols(self) -> list[str]:
        """
        Get list of stock symbols in the portfolio.
        
        Returns:
            list[str]: List of ticker symbols
        """
        try:
            portfolio = self.get_portfolio()
            return [holding.symbol for holding in portfolio.holdings]
        except Exception as e:
            logger.error(f"Error fetching portfolio symbols: {str(e)}")
            return []


# Global service instance
robinhood_service = RobinhoodService()


def get_robinhood_service() -> RobinhoodService:
    """
    Dependency injection function for FastAPI.
    
    Returns:
        RobinhoodService: Robinhood service instance
    """
    return robinhood_service
