# Finance Insight Dashboard - Backend API

A complete and modular **FastAPI backend** for a personal stock insight dashboard. This backend fetches your **Robinhood portfolio**, retrieves **stock-specific news from Finnhub**, and analyzes news **sentiment using the FinBERT model** from Hugging Face.

---

## 🎯 Features

- **Portfolio Management**: Fetch Robinhood holdings, equity, and cash balance
- **News Aggregation**: Retrieve company-specific and general market news from Finnhub
- **Sentiment Analysis**: Analyze financial text sentiment using ProsusAI/finbert
- **Combined Summary**: Unified endpoint providing portfolio + sentiment-analyzed news
- **Modular Architecture**: Clean separation of concerns with services, routers, and models
- **Type Safety**: Full type hints and Pydantic validation
- **Comprehensive Logging**: Centralized logging for debugging and monitoring
- **API Documentation**: Auto-generated interactive docs with Swagger UI

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI application entry point
│   ├── core/
│   │   ├── config.py              # Environment variables & settings
│   │   └── logger.py              # Centralized logging
│   ├── routers/
│   │   ├── portfolio.py           # Robinhood portfolio endpoints
│   │   ├── news.py                # Finnhub news endpoints
│   │   ├── sentiment.py           # FinBERT sentiment analysis
│   │   └── summary.py             # Combined portfolio + news + sentiment
│   ├── services/
│   │   ├── robinhood_service.py   # Robinhood API integration
│   │   ├── news_service.py        # Finnhub API integration
│   │   └── sentiment_service.py   # FinBERT sentiment analysis
│   ├── models/
│   │   └── schemas.py             # Pydantic models for requests/responses
│   └── utils/
│       └── helpers.py             # Utility functions
├── .env                           # Environment variables (create from example)
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

---

## ⚙️ Technologies

- **Python 3.11+**
- **FastAPI** - Modern, fast web framework
- **robin_stocks** - Robinhood API wrapper
- **transformers** - Hugging Face models (FinBERT)
- **torch** - PyTorch for ML models
- **httpx** - Async HTTP client for Finnhub
- **pydantic** - Data validation and settings
- **uvicorn** - ASGI server

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11 or higher
- Robinhood account credentials
- Finnhub API key (free tier available at [finnhub.io](https://finnhub.io))

### Installation

1. **Clone the repository** (or navigate to the backend directory):

```bash
cd backend
```

2. **Create a virtual environment**:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:

```bash
pip install -r requirements.txt
```

4. **Configure environment variables**:

Create a `.env` file in the `backend/` directory:

```env
ROBIN_USER=your_email@example.com
ROBIN_PASS=your_password
FINNHUB_API_KEY=your_finnhub_api_key
```

> **⚠️ Security Note**: Never commit your `.env` file to version control. Add it to `.gitignore`.

5. **Run the application**:

```bash
uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`

---

## 📖 API Endpoints

### Root & Health

- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint

### Portfolio

- `GET /api/portfolio` - Get complete portfolio data
- `GET /api/portfolio/symbols` - Get list of portfolio symbols

**Example Response** (`/api/portfolio`):

```json
{
  "total_equity": 25000.0,
  "cash_balance": 5000.0,
  "holdings": [
    {
      "symbol": "AAPL",
      "quantity": 10.0,
      "average_price": 150.0,
      "current_price": 175.0,
      "equity": 1750.0,
      "percent_change": 16.67
    }
  ]
}
```

### News

- `GET /api/news?symbols=AAPL,TSLA` - Get company-specific news
- `GET /api/news/general?category=general` - Get general market news

**Example Response** (`/api/news?symbols=AAPL`):

```json
{
  "articles": [
    {
      "symbol": "AAPL",
      "title": "Apple Announces New Product Line",
      "summary": "Apple Inc. revealed its latest innovations...",
      "source": "Bloomberg",
      "url": "https://example.com/article",
      "published_at": "2025-10-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

### Sentiment Analysis

- `POST /api/sentiment/analyze` - Analyze text sentiment

**Example Request**:

```json
{
  "text": "Apple's quarterly earnings exceeded expectations with strong iPhone sales."
}
```

**Example Response**:

```json
{
  "text": "Apple's quarterly earnings exceeded expectations...",
  "result": {
    "sentiment": "positive",
    "confidence": 0.92
  }
}
```

### Summary (Combined)

- `GET /api/summary` - Get portfolio with sentiment-analyzed news

**Example Response**:

```json
{
  "portfolio": {
    "total_equity": 25000.00,
    "cash_balance": 5000.00,
    "holdings": [...]
  },
  "news": [
    {
      "symbol": "AAPL",
      "title": "Apple Announces New Product Line",
      "summary": "Apple Inc. revealed...",
      "source": "Bloomberg",
      "url": "https://example.com/article",
      "published_at": "2025-10-15T10:30:00Z",
      "sentiment": "positive",
      "confidence": 0.92
    }
  ]
}
```

---

## 📚 Interactive Documentation

Once the server is running, visit:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧪 Development

### Code Style

The project follows PEP8 guidelines with:

- Type hints on all functions
- Docstrings for modules, classes, and functions
- Comprehensive error handling with try/except blocks
- Centralized logging for debugging

### Testing

To test individual endpoints:

1. Start the server: `uvicorn app.main:app --reload`
2. Open Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
3. Use the "Try it out" feature to test endpoints interactively

### Logging

Logs are output to stdout with timestamps. Adjust log level in `app/core/logger.py` if needed.

---

## 🔒 Security Considerations

- **Credentials**: Store all credentials in `.env` file, never in code
- **API Keys**: Keep your Finnhub API key private
- **2FA**: If using Robinhood 2FA, you may need to handle TOTP codes
- **Production**: Use environment-specific configurations for production deployment

---

## 🐛 Troubleshooting

### Robinhood Login Issues

If you encounter login issues:

- Verify credentials in `.env` file
- Check if 2FA is enabled (may require additional setup)
- Review Robinhood's API rate limits

### FinBERT Model Loading

First-time model loading may take a few minutes:

- Model is downloaded from Hugging Face (~500MB)
- Subsequent runs will use cached model
- Use GPU for faster inference if available

### Finnhub API Rate Limits

Free tier limits:

- 60 API calls/minute
- Consider implementing caching for production use

---

## 📝 Notes

- **Mock Data**: If Robinhood credentials are unavailable, consider implementing mock data for testing
- **Caching**: For production, implement Redis caching to reduce API calls
- **Database**: Consider adding PostgreSQL for storing historical data
- **Authentication**: Add JWT authentication for multi-user support

---

## 🌟 Future Enhancements

- [ ] Add Redis caching for API responses
- [ ] Implement WebSocket for real-time updates
- [ ] Add database for historical tracking
- [ ] Support multiple portfolio providers
- [ ] Add technical analysis indicators
- [ ] Implement alert system for price changes

---

## 📄 License

This project is for personal use. Ensure compliance with Robinhood's and Finnhub's Terms of Service.

---

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

---

**Happy Trading! 📈**
