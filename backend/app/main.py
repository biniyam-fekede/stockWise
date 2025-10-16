"""
FastAPI application main entry point.
Configures the application, routers, middleware, and startup/shutdown events.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.logger import logger
from app.routers import portfolio, news, sentiment, summary


# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handle application lifespan events.
    Runs on startup and shutdown.
    """
    # Startup
    settings = get_settings()
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info("Validating environment variables...")
    
    # Validate required environment variables
    try:
        if not settings.ROBIN_USER:
            logger.warning("ROBIN_USER not set in environment")
        if not settings.ROBIN_PASS:
            logger.warning("ROBIN_PASS not set in environment")
        if not settings.FINNHUB_API_KEY:
            logger.warning("FINNHUB_API_KEY not set in environment")
        
        logger.info("Environment validation complete")
    except Exception as e:
        logger.error(f"Environment validation failed: {str(e)}")
    
    # Pre-load sentiment model (optional - can be lazy loaded)
    # from app.services.sentiment_service import sentiment_service
    # logger.info("Pre-loading FinBERT model...")
    # sentiment_service.load_model()
    
    logger.info("Application startup complete")
    
    yield
    
    # Shutdown
    logger.info("Shutting down application...")
    
    # Cleanup Robinhood session
    try:
        from app.services.robinhood_service import robinhood_service
        robinhood_service.logout()
    except Exception as e:
        logger.error(f"Error during Robinhood logout: {str(e)}")
    
    logger.info("Application shutdown complete")


# Create FastAPI application
app = FastAPI(
    title="Finance Insight Dashboard API",
    description="Backend API for personal stock portfolio insights with sentiment analysis",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)


# Configure CORS
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(portfolio.router, prefix=settings.API_V1_PREFIX)
app.include_router(news.router, prefix=settings.API_V1_PREFIX)
app.include_router(sentiment.router, prefix=settings.API_V1_PREFIX)
app.include_router(summary.router, prefix=settings.API_V1_PREFIX)


# Root endpoint
@app.get("/", tags=["root"])
async def root():
    """
    Root endpoint - API information.
    
    Returns:
        dict: API metadata and available endpoints
    """
    return {
        "name": "Finance Insight Dashboard API",
        "version": "1.0.0",
        "description": "Personal stock portfolio insights with sentiment analysis",
        "endpoints": {
            "portfolio": f"{settings.API_V1_PREFIX}/portfolio",
            "news": f"{settings.API_V1_PREFIX}/news",
            "sentiment": f"{settings.API_V1_PREFIX}/sentiment/analyze",
            "summary": f"{settings.API_V1_PREFIX}/summary"
        },
        "docs": "/docs",
        "redoc": "/redoc"
    }


# Health check endpoint
@app.get("/health", tags=["health"])
async def health_check():
    """
    Health check endpoint.
    
    Returns:
        dict: Application health status
    """
    return {
        "status": "healthy",
        "version": settings.APP_VERSION
    }


if __name__ == "__main__":
    import uvicorn
    
    # Run server directly (for development)
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
