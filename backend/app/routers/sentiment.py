"""
Sentiment router - FinBERT sentiment analysis endpoints.
Provides sentiment analysis for financial text using the FinBERT model.
"""

from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import SentimentRequest, SentimentResponse
from app.services.sentiment_service import SentimentService, get_sentiment_service
from app.core.logger import logger


router = APIRouter(prefix="/sentiment", tags=["sentiment"])


@router.post(
    "/analyze",
    response_model=SentimentResponse,
    summary="Analyze text sentiment",
    description="Analyzes sentiment of financial text using FinBERT model. Returns sentiment (positive/neutral/negative) and confidence score.",
    responses={
        200: {
            "description": "Sentiment analysis completed successfully",
            "content": {
                "application/json": {
                    "example": {
                        "text": "Apple's quarterly earnings exceeded expectations with strong iPhone sales.",
                        "result": {
                            "sentiment": "positive",
                            "confidence": 0.92
                        }
                    }
                }
            }
        }
    }
)
async def analyze_sentiment(
    request: SentimentRequest,
    service: SentimentService = Depends(get_sentiment_service)
) -> SentimentResponse:
    """
    Analyze sentiment of provided text.
    
    Args:
        request: SentimentRequest containing text to analyze
        
    Returns:
        SentimentResponse: Sentiment analysis result
        
    Example request body:
        {
            "text": "Apple's quarterly earnings exceeded expectations with strong iPhone sales."
        }
        
    Example response:
        {
            "text": "Apple's quarterly earnings exceeded expectations with strong iPhone sales.",
            "result": {
                "sentiment": "positive",
                "confidence": 0.92
            }
        }
    """
    try:
        logger.info("Sentiment analysis endpoint called")
        
        # Analyze sentiment
        result = service.analyze_sentiment(request.text)
        
        return SentimentResponse(
            text=request.text,
            result=result
        )
        
    except Exception as e:
        logger.error(f"Error in sentiment analysis endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze sentiment: {str(e)}"
        )
