"""
News service for fetching stock-related news from Finnhub API.
Supports both general market news and company-specific news.
"""

import httpx
from typing import Optional
from datetime import datetime
from app.core.logger import logger
from app.core.config import get_settings
from app.models.schemas import NewsArticle, NewsResponse


class NewsService:
    """Service for fetching news from Finnhub API"""
    
    def __init__(self):
        self.settings = get_settings()
        self.base_url = "https://finnhub.io/api/v1"
        self.api_key = self.settings.FINNHUB_API_KEY
    
    async def get_company_news(
        self, 
        symbols: list[str], 
        from_date: Optional[str] = None,
        to_date: Optional[str] = None
    ) -> NewsResponse:
        """
        Fetch company-specific news for given stock symbols.
        
        Args:
            symbols: List of stock ticker symbols
            from_date: Start date in YYYY-MM-DD format (default: 30 days ago)
            to_date: End date in YYYY-MM-DD format (default: today)
            
        Returns:
            NewsResponse: Collection of news articles
        """
        # Set default date range if not provided
        if not to_date:
            to_date = datetime.now().strftime("%Y-%m-%d")
        if not from_date:
            # Default to 30 days ago
            from datetime import timedelta
            from_dt = datetime.now() - timedelta(days=30)
            from_date = from_dt.strftime("%Y-%m-%d")
        
        all_articles = []
        
        async with httpx.AsyncClient() as client:
            for symbol in symbols:
                try:
                    logger.info(f"Fetching news for {symbol}...")
                    
                    url = f"{self.base_url}/company-news"
                    params = {
                        "symbol": symbol,
                        "from": from_date,
                        "to": to_date,
                        "token": self.api_key
                    }
                    
                    response = await client.get(url, params=params, timeout=10.0)
                    response.raise_for_status()
                    
                    news_data = response.json()
                    
                    # Parse and transform news articles
                    for item in news_data[:5]:  # Limit to 5 articles per symbol
                        try:
                            article = NewsArticle(
                                symbol=symbol,
                                title=item.get("headline", "No title"),
                                summary=item.get("summary", "No summary available"),
                                source=item.get("source", "Unknown"),
                                url=item.get("url", ""),
                                published_at=datetime.fromtimestamp(item.get("datetime", 0))
                            )
                            all_articles.append(article)
                        except Exception as e:
                            logger.error(f"Error parsing article: {str(e)}")
                            continue
                    
                    logger.info(f"Fetched {len(news_data)} articles for {symbol}")
                    
                except httpx.HTTPError as e:
                    logger.error(f"HTTP error fetching news for {symbol}: {str(e)}")
                except Exception as e:
                    logger.error(f"Error fetching news for {symbol}: {str(e)}")
                    continue
        
        return NewsResponse(articles=all_articles, count=len(all_articles))
    
    async def get_general_news(self, category: str = "general") -> NewsResponse:
        """
        Fetch general market news.
        
        Args:
            category: News category (general, forex, crypto, merger)
            
        Returns:
            NewsResponse: Collection of news articles
        """
        try:
            logger.info(f"Fetching general news for category: {category}")
            
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/news"
                params = {
                    "category": category,
                    "token": self.api_key
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                response.raise_for_status()
                
                news_data = response.json()
                articles = []
                
                # Parse articles
                for item in news_data[:20]:  # Limit to 20 articles
                    try:
                        article = NewsArticle(
                            symbol=None,
                            title=item.get("headline", "No title"),
                            summary=item.get("summary", "No summary available"),
                            source=item.get("source", "Unknown"),
                            url=item.get("url", ""),
                            published_at=datetime.fromtimestamp(item.get("datetime", 0))
                        )
                        articles.append(article)
                    except Exception as e:
                        logger.error(f"Error parsing article: {str(e)}")
                        continue
                
                logger.info(f"Fetched {len(articles)} general news articles")
                return NewsResponse(articles=articles, count=len(articles))
                
        except httpx.HTTPError as e:
            logger.error(f"HTTP error fetching general news: {str(e)}")
            raise Exception(f"Failed to fetch news: {str(e)}")
        except Exception as e:
            logger.error(f"Error fetching general news: {str(e)}")
            raise Exception(f"Failed to fetch news: {str(e)}")


# Global service instance
news_service = NewsService()


def get_news_service() -> NewsService:
    """
    Dependency injection function for FastAPI.
    
    Returns:
        NewsService: News service instance
    """
    return news_service
