"""
Sentiment analysis service using FinBERT (ProsusAI/finbert) model.
Analyzes financial text to determine sentiment: positive, neutral, or negative.
"""

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from typing import Optional
from app.core.logger import logger
from app.models.schemas import SentimentResult


class SentimentService:
    """Service for sentiment analysis using FinBERT"""
    
    def __init__(self):
        self.model_name = "ProsusAI/finbert"
        self.tokenizer: Optional[AutoTokenizer] = None
        self.model: Optional[AutoModelForSequenceClassification] = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self._model_loaded = False
    
    def load_model(self) -> None:
        """
        Load FinBERT model and tokenizer.
        Called lazily on first use to avoid startup delay.
        """
        if self._model_loaded:
            return
        
        try:
            logger.info(f"Loading FinBERT model: {self.model_name}")
            logger.info(f"Using device: {self.device}")
            
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
            self.model.to(self.device)
            self.model.eval()  # Set to evaluation mode
            
            self._model_loaded = True
            logger.info("FinBERT model loaded successfully")
            
        except Exception as e:
            logger.error(f"Error loading FinBERT model: {str(e)}")
            raise Exception(f"Failed to load sentiment model: {str(e)}")
    
    def analyze_sentiment(self, text: str) -> SentimentResult:
        """
        Analyze sentiment of given text.
        
        Args:
            text: Text to analyze
            
        Returns:
            SentimentResult: Sentiment classification and confidence score
            
        Example:
            >>> service = SentimentService()
            >>> result = service.analyze_sentiment("Apple's earnings beat expectations")
            >>> print(result.sentiment)  # "positive"
            >>> print(result.confidence)  # 0.95
        """
        # Ensure model is loaded
        if not self._model_loaded:
            self.load_model()
        
        try:
            # Tokenize input text
            inputs = self.tokenizer(
                text,
                return_tensors="pt",
                truncation=True,
                max_length=512,
                padding=True
            )
            
            # Move inputs to device
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            # Get predictions
            with torch.no_grad():
                outputs = self.model(**inputs)
                predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
            
            # Get sentiment label and confidence
            confidence, predicted_class = torch.max(predictions, dim=1)
            
            # Map class index to sentiment label
            # FinBERT uses: 0=positive, 1=negative, 2=neutral
            sentiment_map = {0: "positive", 1: "negative", 2: "neutral"}
            sentiment = sentiment_map[predicted_class.item()]
            confidence_score = confidence.item()
            
            logger.debug(f"Analyzed text: '{text[:50]}...' -> {sentiment} ({confidence_score:.2f})")
            
            return SentimentResult(
                sentiment=sentiment,
                confidence=round(confidence_score, 4)
            )
            
        except Exception as e:
            logger.error(f"Error analyzing sentiment: {str(e)}")
            # Return neutral sentiment as fallback
            return SentimentResult(
                sentiment="neutral",
                confidence=0.33
            )
    
    def analyze_batch(self, texts: list[str]) -> list[SentimentResult]:
        """
        Analyze sentiment for multiple texts efficiently.
        
        Args:
            texts: List of texts to analyze
            
        Returns:
            list[SentimentResult]: List of sentiment results
        """
        results = []
        
        for text in texts:
            result = self.analyze_sentiment(text)
            results.append(result)
        
        return results


# Global service instance (lazy loading)
sentiment_service = SentimentService()


def get_sentiment_service() -> SentimentService:
    """
    Dependency injection function for FastAPI.
    
    Returns:
        SentimentService: Sentiment analysis service instance
    """
    return sentiment_service
