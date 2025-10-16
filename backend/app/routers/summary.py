"""
Summary router - Combined portfolio and news with sentiment.
Provides a unified endpoint that combines portfolio data with sentiment-analyzed news.
"""

from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import SummaryResponse, NewsWithSentiment
from app.services.robinhood_service import RobinhoodService, get_robinhood_service
from app.services.news_service import NewsService, get_news_service
from app.services.sentiment_service import SentimentService, get_sentiment_service
from app.core.logger import logger


router = APIRouter(prefix="/summary", tags=["summary"])


@router.get(
    "",
    response_model=SummaryResponse,
    summary="Get portfolio summary with sentiment-analyzed news",
    description="Fetches portfolio data and related news with sentiment analysis. Combines all data into a unified response.",
    responses={
        200: {
            "description": "Summary retrieved successfully",
            "content": {
                "application/json": {
                    "example": {
                        "portfolio": {
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
                                }
                            ]
                        },
                        "news": [
                            {
                                "symbol": "AAPL",
                                "title": "Apple Announces New Product Line",
                                "summary": "Apple Inc. revealed its latest innovations...",
                                "source": "Bloomberg",
                                "url": "https://example.com/article",
                                "published_at": "2025-10-15T10:30:00Z",
                                "sentiment": "positive",
                                "confidence": 0.92
                            }
                        ]
                    }
                }
            }
        }
    }
)
async def get_summary(
    robinhood_service: RobinhoodService = Depends(get_robinhood_service),
    news_service: NewsService = Depends(get_news_service),
    sentiment_service: SentimentService = Depends(get_sentiment_service)
) -> SummaryResponse:
    """
    Get unified summary of portfolio with sentiment-analyzed news.
    
    This endpoint:
    1. Fetches your Robinhood portfolio
    2. Retrieves news for your holdings
    3. Analyzes sentiment for each news article
    4. Returns combined data
    
    Returns:
        SummaryResponse: Combined portfolio and news with sentiment
    """
    try:
        logger.info("Summary endpoint called")
        
        # Step 1: Get portfolio data
        logger.info("Fetching portfolio data...")
        portfolio = robinhood_service.get_portfolio()
        
        # Step 2: Get symbols from portfolio
        symbols = [holding.symbol for holding in portfolio.holdings]
        
        if not symbols:
            logger.warning("No holdings found in portfolio")
            return SummaryResponse(portfolio=portfolio, news=[])
        
        logger.info(f"Found {len(symbols)} symbols in portfolio: {symbols}")
        
        # Step 3: Fetch news for portfolio symbols
        logger.info("Fetching news for portfolio symbols...")
        news_response = await news_service.get_company_news(symbols=symbols)
        
        # Step 4: Analyze sentiment for each article
        logger.info(f"Analyzing sentiment for {len(news_response.articles)} articles...")
        news_with_sentiment = []
        
        for article in news_response.articles:
            # Analyze sentiment on title + summary
            text_to_analyze = f"{article.title}. {article.summary}"
            sentiment_result = sentiment_service.analyze_sentiment(text_to_analyze)
            
            # Create NewsWithSentiment object
            news_item = NewsWithSentiment(
                symbol=article.symbol,
                title=article.title,
                summary=article.summary,
                source=article.source,
                url=article.url,
                published_at=article.published_at,
                sentiment=sentiment_result.sentiment,
                confidence=sentiment_result.confidence
            )
            news_with_sentiment.append(news_item)
        
        logger.info(f"Successfully processed {len(news_with_sentiment)} articles with sentiment")
        
        # Step 5: Return combined response
        return SummaryResponse(
            portfolio=portfolio,
            news=news_with_sentiment
        )
        
    except Exception as e:
        logger.error(f"Error in summary endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate summary: {str(e)}"
        )
