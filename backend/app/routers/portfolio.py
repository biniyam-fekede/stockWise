"""
Portfolio router - Robinhood portfolio endpoints.
Provides access to user's holdings, cash balance, and portfolio value.
"""

from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import PortfolioResponse, ErrorResponse
from app.services.robinhood_service import RobinhoodService, get_robinhood_service
from app.core.logger import logger


router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get(
    "",
    response_model=PortfolioResponse,
    summary="Get portfolio information",
    description="Fetches complete portfolio data including holdings, equity, and cash balance from Robinhood.",
    responses={
        200: {
            "description": "Portfolio data retrieved successfully",
            "content": {
                "application/json": {
                    "example": {
                        "total_equity": 25000.00,
                        "cash_balance": 5000.00,
                        "holdings": [
                            {
                                "symbol": "AAPL",
                                "quantity": 10.0,
                                "average_price": 150.00,
                                "current_price": 175.00,
                                "equity": 1750.00,
                                "percent_change": 16.67
                            },
                            {
                                "symbol": "TSLA",
                                "quantity": 5.0,
                                "average_price": 200.00,
                                "current_price": 250.00,
                                "equity": 1250.00,
                                "percent_change": 25.00
                            }
                        ]
                    }
                }
            }
        },
        401: {"description": "Authentication failed"},
        500: {"description": "Internal server error"}
    }
)
async def get_portfolio(
    service: RobinhoodService = Depends(get_robinhood_service)
) -> PortfolioResponse:
    """
    Get complete portfolio information from Robinhood.
    
    Returns:
        PortfolioResponse: Portfolio data with holdings
    """
    try:
        logger.info("Portfolio endpoint called")
        portfolio = service.get_portfolio()
        return portfolio
        
    except Exception as e:
        logger.error(f"Error in portfolio endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve portfolio: {str(e)}"
        )


@router.get(
    "/symbols",
    response_model=list[str],
    summary="Get portfolio symbols",
    description="Returns list of stock symbols currently held in the portfolio.",
    responses={
        200: {
            "description": "List of ticker symbols",
            "content": {
                "application/json": {
                    "example": ["AAPL", "TSLA", "MSFT", "GOOGL"]
                }
            }
        }
    }
)
async def get_portfolio_symbols(
    service: RobinhoodService = Depends(get_robinhood_service)
) -> list[str]:
    """
    Get list of stock symbols in the portfolio.
    
    Returns:
        list[str]: List of ticker symbols
    """
    try:
        logger.info("Portfolio symbols endpoint called")
        symbols = service.get_portfolio_symbols()
        return symbols
        
    except Exception as e:
        logger.error(f"Error in portfolio symbols endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve portfolio symbols: {str(e)}"
        )
