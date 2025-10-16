"""
Utility helper functions.
Provides reusable utilities for caching, formatting, and data processing.
"""

from functools import lru_cache
from typing import Any, Optional
from datetime import datetime, timedelta


def format_currency(amount: float) -> str:
    """
    Format number as currency string.
    
    Args:
        amount: Numeric amount
        
    Returns:
        str: Formatted currency string
        
    Example:
        >>> format_currency(1234.56)
        '$1,234.56'
    """
    return f"${amount:,.2f}"


def format_percentage(value: float) -> str:
    """
    Format number as percentage string.
    
    Args:
        value: Numeric value
        
    Returns:
        str: Formatted percentage string
        
    Example:
        >>> format_percentage(12.345)
        '12.35%'
    """
    return f"{value:.2f}%"


def get_date_range(days_ago: int = 30) -> tuple[str, str]:
    """
    Get date range for news queries.
    
    Args:
        days_ago: Number of days to look back (default: 30)
        
    Returns:
        tuple[str, str]: (from_date, to_date) in YYYY-MM-DD format
        
    Example:
        >>> get_date_range(7)
        ('2025-10-08', '2025-10-15')
    """
    to_date = datetime.now()
    from_date = to_date - timedelta(days=days_ago)
    
    return (
        from_date.strftime("%Y-%m-%d"),
        to_date.strftime("%Y-%m-%d")
    )


def truncate_text(text: str, max_length: int = 100) -> str:
    """
    Truncate text to specified length.
    
    Args:
        text: Text to truncate
        max_length: Maximum length (default: 100)
        
    Returns:
        str: Truncated text with ellipsis if needed
        
    Example:
        >>> truncate_text("This is a very long text...", 10)
        'This is...'
    """
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + "..."


def safe_float(value: Any, default: float = 0.0) -> float:
    """
    Safely convert value to float with fallback.
    
    Args:
        value: Value to convert
        default: Default value if conversion fails
        
    Returns:
        float: Converted value or default
        
    Example:
        >>> safe_float("123.45")
        123.45
        >>> safe_float("invalid", 0.0)
        0.0
    """
    try:
        return float(value)
    except (ValueError, TypeError):
        return default


@lru_cache(maxsize=128)
def normalize_symbol(symbol: str) -> str:
    """
    Normalize stock symbol to uppercase and remove whitespace.
    Cached for performance.
    
    Args:
        symbol: Stock ticker symbol
        
    Returns:
        str: Normalized symbol
        
    Example:
        >>> normalize_symbol(" aapl ")
        'AAPL'
    """
    return symbol.strip().upper()


def calculate_profit_loss(
    quantity: float,
    average_price: float,
    current_price: float
) -> dict[str, float]:
    """
    Calculate profit/loss metrics for a position.
    
    Args:
        quantity: Number of shares
        average_price: Average cost per share
        current_price: Current market price
        
    Returns:
        dict: Dictionary with profit_loss, percent_change, and total_value
        
    Example:
        >>> calculate_profit_loss(10, 100.0, 120.0)
        {'profit_loss': 200.0, 'percent_change': 20.0, 'total_value': 1200.0}
    """
    total_cost = quantity * average_price
    total_value = quantity * current_price
    profit_loss = total_value - total_cost
    percent_change = ((current_price - average_price) / average_price * 100) if average_price > 0 else 0.0
    
    return {
        "profit_loss": round(profit_loss, 2),
        "percent_change": round(percent_change, 2),
        "total_value": round(total_value, 2)
    }
