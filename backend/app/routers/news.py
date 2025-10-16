"""
News router - Finnhub news endpoints.
Provides access to company-specific and general market news.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from app.models.schemas import NewsResponse
from app.services.news_service import NewsService, get_news_service
from app.core.logger import logger


router = APIRouter(prefix="/news", tags=["news"])


@router.get(
    "",
    response_model=NewsResponse,
    summary="Get stock news",
    description="Fetches news articles for specified stock symbols from Finnhub.",
    responses={
        200: {
            "description": "News articles retrieved successfully",
            "content": {
                "application/json": {
                    "example": {
                        "articles": [
                            {
                                "symbol": "AAPL",
                                "title": "Apple Announces New Product Line",
                                "summary": "Apple Inc. revealed its latest innovations in a special event...",
                                "source": "Bloomberg",
                                "url": "https://example.com/article",
                                "published_at": "2025-10-15T10:30:00Z"
                            }
                        ],
                        "count": 1
                    }
                }
            }
        }
    }
)
async def get_news(
    symbols: str = Query(
        ...,
        description="Comma-separated list of stock symbols (e.g., AAPL,TSLA,MSFT)",
        example="AAPL,TSLA"
    ),
    from_date: Optional[str] = Query(
        None,
        description="Start date in YYYY-MM-DD format",
        example="2025-09-15"
    ),
    to_date: Optional[str] = Query(
        None,
        description="End date in YYYY-MM-DD format",
        example="2025-10-15"
    ),
    service: NewsService = Depends(get_news_service)
) -> NewsResponse:
    """
    Get news articles for specified stock symbols.
    
    Args:
        symbols: Comma-separated stock ticker symbols
        from_date: Optional start date (YYYY-MM-DD)
        to_date: Optional end date (YYYY-MM-DD)
        
    Returns:
        NewsResponse: Collection of news articles
    """
    try:
        logger.info(f"News endpoint called with symbols: {symbols}")
        
        # Parse symbols
        symbol_list = [s.strip().upper() for s in symbols.split(",")]
        
        if not symbol_list:
            raise HTTPException(status_code=400, detail="No symbols provided")
        
        # Fetch news
        news = await service.get_company_news(
            symbols=symbol_list,
            from_date=from_date,
            to_date=to_date
        )
        
        return news
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in news endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve news: {str(e)}"
        )


@router.get(
    "/general",
    response_model=NewsResponse,
    summary="Get general market news",
    description="Fetches general market news from Finnhub.",
    responses={
        200: {
            "description": "General news articles retrieved successfully",
            "content": {
                "application/json": {
                    "example": {
                        "articles": [
                            {
                                "symbol": None,
                                "title": "Market Rally Continues",
                                "summary": "Stock markets reached new highs today...",
                                "source": "Reuters",
                                "url": "https://example.com/article",
                                "published_at": "2025-10-15T14:00:00Z"
                            }
                        ],
                        "count": 1
                    }
                }
            }
        }
    }
)
async def get_general_news(
    category: str = Query(
        "general",
        description="News category",
        example="general"
    ),
    service: NewsService = Depends(get_news_service)
) -> NewsResponse:
    """
    Get general market news.
    
    Args:
        category: News category (general, forex, crypto, merger)
        
    Returns:
        NewsResponse: Collection of news articles
    """
    try:
        logger.info(f"General news endpoint called with category: {category}")
        news = await service.get_general_news(category=category)
        return news
        
    except Exception as e:
        logger.error(f"Error in general news endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve general news: {str(e)}"
        )
