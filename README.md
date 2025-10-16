Here is the Demo on youtube https://youtu.be/Q_cWvxIbufg 

Finance Insight Dashboard 📈

A full-stack personal stock insight dashboard that combines your Robinhood portfolio with AI-powered sentiment analysis on related news articles. Get real-time insights into your investments with beautiful visualizations and intelligent news filtering.

Project Overview
This project consists of:

Backend (FastAPI) - Fetches portfolio data from Robinhood, retrieves stock news from Finnhub, and analyzes sentiment using FinBERT
Frontend (React + TypeScript) - Modern, responsive dashboard for visualizing portfolio and news insights

Key Features
Backend Features
✅ Robinhood Integration - Fetch real-time portfolio data, holdings, and performance
✅ Finnhub News API - Retrieve company-specific and market news
✅ FinBERT Sentiment Analysis - AI-powered sentiment classification (positive/neutral/negative)
✅ Unified Summary Endpoint - Combined portfolio + sentiment-analyzed news
✅ Modular Architecture - Clean separation of routers, services, and models
✅ Comprehensive Logging - Detailed logging for debugging
✅ Type-Safe - Pydantic models for request/response validation
Frontend Features
✅ Interactive Dashboard - Real-time portfolio summary with key metrics
✅ News Feed - Latest stock news with sentiment badges
✅ Portfolio Charts - Visual representation of portfolio value
✅ Auto-Refresh - Optional automatic data refreshing
✅ Sentiment Filtering - Filter news by positive, neutral, or negative sentiment
✅ Responsive Design - Works on desktop, tablet, and mobile
✅ Type-Safe - Full TypeScript implementation
✅ Optimized State - React Query for efficient data management
📁 Project Structure
finance-insight/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app
│   │   ├── core/
│   │   │   ├── config.py           # Environment settings
│   │   │   └── logger.py           # Logging configuration
│   │   ├── routers/
│   │   │   ├── portfolio.py        # Portfolio endpoints
│   │   │   ├── news.py             # News endpoints
│   │   │   ├── sentiment.py        # Sentiment analysis
│   │   │   └── summary.py          # Combined summary
│   │   ├── services/
│   │   │   ├── robinhood_service.py
│   │   │   ├── news_service.py
│   │   │   └── sentiment_service.py
│   │   ├── models/
│   │   │   └── schemas.py          # Pydantic models
│   │   └── utils/
│   │       └── helpers.py          # Utility functions
│   ├── .env                        # Environment variables
│   ├── requirements.txt            # Python dependencies
│   └── README.md                   # Backend documentation
│
└── frontend/
    ├── src/
    │   ├── api/                    # API client setup
    │   ├── components/             # Reusable components
    │   ├── context/                # React Query provider
    │   ├── hooks/                  # Custom React Query hooks
    │   ├── pages/                  # Page components
    │   ├── types/                  # TypeScript definitions
    │   ├── utils/                  # Utilities and constants
    │   ├── App.tsx                 # Main app component
    │   └── main.tsx                # Entry point
    ├── package.json                # NPM dependencies
    ├── vite.config.ts              # Vite configuration
    ├── tailwind.config.js          # Tailwind CSS config
    └── README.md                   # Frontend documentation

Quick Start

Prerequisites
Python 3.11+
Node.js 18+
Robinhood Account (with credentials)
Finnhub API Key (Get free key)
Backend Setup
Navigate to backend directory:

cd backend
Create virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

pip install -r requirements.txt
Configure environment variables:

Edit backend/.env:

ROBIN_USER=your_email@example.com
ROBIN_PASS=your_password
FINNHUB_API_KEY=your_finnhub_api_key
Run the backend:

uvicorn app.main:app --reload
Backend will be available at: http://localhost:8000

Frontend Setup
Navigate to frontend directory:

cd frontend
Install dependencies:

npm install
Start development server:

npm run dev
Frontend will be available at: http://localhost:3000

API Endpoints

Portfolio
GET /api/portfolio - Get complete portfolio data
GET /api/portfolio/symbols - Get list of portfolio symbols
News
GET /api/news?symbols=AAPL,TSLA - Get company-specific news
GET /api/news/general - Get general market news
Sentiment
POST /api/sentiment/analyze - Analyze text sentiment
Summary (Main Endpoint)
GET /api/summary - Get portfolio + sentiment-analyzed news
Documentation
/docs - Interactive API documentation (Swagger UI)
/redoc - Alternative API documentation (ReDoc)

Technology Stack

Backend
Technology	Purpose
FastAPI	Modern Python web framework
robin_stocks	Robinhood API wrapper
transformers	Hugging Face FinBERT model
torch	PyTorch for ML inference
httpx	Async HTTP client
pydantic	Data validation
uvicorn	ASGI server
Frontend
Technology	Purpose
React 18	UI library
TypeScript	Type safety
Vite	Build tool
React Query	State management
React Router	Routing
Axios	HTTP client
Recharts	Data visualization
Tailwind CSS	Styling
Lucide React	Icons

Data Flow
1. User opens dashboard
   ↓
2. Frontend calls /api/summary
   ↓
3. Backend authenticates with Robinhood
   ↓
4. Backend fetches portfolio holdings
   ↓
5. Backend retrieves news for each symbol (Finnhub)
   ↓
6. Backend analyzes sentiment for each article (FinBERT)
   ↓
7. Backend returns combined data
   ↓
8. Frontend displays with charts and filters

Troubleshooting

Backend Issues
Robinhood Login Fails:

Verify credentials in .env
Check if 2FA is enabled (may require additional configuration)
Review Robinhood API rate limits
FinBERT Model Loading Slow:

First-time download is ~500MB
Subsequent loads use cached model
Consider pre-loading on startup for production
Finnhub API Errors:

Check API key validity
Free tier: 60 calls/minute limit
Consider implementing caching
Frontend Issues
API Connection Errors:

Ensure backend is running on port 8000
Check CORS settings in backend
Verify VITE_API_BASE_URL in frontend .env
Dependencies Installation:

# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install

Production Deployment

Backend Deployment
# Use production ASGI server
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker

# Or with Docker
docker build -t finance-insight-backend .
docker run -p 8000:8000 finance-insight-backend
Frontend Deployment
# Build for production
npm run build

# Serve static files
# Deploy dist/ folder to Vercel, Netlify, or any static host

Future Enhancements

Potential Features
 Historical portfolio tracking and analytics
 Price alerts and notifications
 Watchlist functionality
 Multiple portfolio providers (E-Trade, TD Ameritrade)
 Dark mode UI
 Export data to CSV/PDF
 Technical analysis indicators
 WebSocket for real-time updates
 Mobile app (React Native)
 Email digests
 AI-powered trade recommendations


Development Notes

Running Tests
# Backend (to be implemented)
pytest

# Frontend (to be implemented)
npm test
Code Quality
# Backend linting
flake8 app/

# Frontend linting
npm run lint

License

This project is for personal use only. Ensure compliance with:

Robinhood Terms of Service
Finnhub Terms of Service
Hugging Face Model Licenses

🤝 Contributing
This is a personal project, but suggestions and improvements are welcome!

Fork the repository
Create a feature branch
Make your changes
Submit a pull request

📧 Support
For issues or questions:

Check the README files in backend/ and frontend/ directories
Review API documentation at /docs
Check console logs for error messages
