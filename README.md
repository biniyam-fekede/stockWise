# Finance Insight Dashboard 📈

[Watch the demo on YouTube](https://youtu.be/Q_cWvxIbufg)

A full‑stack personal stock insight dashboard that merges your Robinhood portfolio with AI‑powered sentiment analysis on related news articles — giving you realtime, actionable insights.

---

<!-- Badges (optional) -->
[![Backend Python](https://img.shields.io/badge/backend-FastAPI-blue)](#)
[![Frontend React](https://img.shields.io/badge/frontend-React%2BTypeScript-61DAFB)](#)
[![Model FinBERT](https://img.shields.io/badge/model-FinBERT-ff69b4)](#)

---

Table of contents
- [Overview](#overview)
- [Highlights](#highlights)
- [Project structure](#project-structure)
- [Quick start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Future enhancements](#future-enhancements)
- [Contributing & License](#contributing--license)

---

## Overview

Finance Insight Dashboard combines:
- Robinhood portfolio data
- Finnhub news for portfolio symbols
- FinBERT sentiment classification on news articles

The backend aggregates and analyzes the data; the frontend visualizes portfolio metrics, news and sentiment in a responsive dashboard.

---

## Highlights

- ✅ Robinhood integration for portfolio and holdings  
- ✅ Finnhub for company and market news  
- ✅ FinBERT (Hugging Face) for positive / neutral / negative sentiment  
- ✅ Unified summary endpoint combining portfolio + analyzed news  
- ✅ Type‑safe APIs (Pydantic + TypeScript) and modular architecture  
- ✅ Interactive, responsive frontend with charts and filters

---

## Project structure

finance-insight/
├── backend/ — FastAPI app (portfolio, news, sentiment)  
└── frontend/ — React + TypeScript dashboard (charts, news feed)

Backend key folders:
- app/main.py — FastAPI app entry
- app/core — config, logging
- app/routers — portfolio, news, sentiment, summary
- app/services — API wrappers and model inference
- app/models — Pydantic schemas

Frontend key folders:
- src/api — HTTP client
- src/components — reusable UI
- src/hooks — React Query hooks
- src/pages — page views
- src/types — TS types

---

## Quick start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Robinhood account (credentials)
- Finnhub API key

### Backend
1. Change to backend folder:
```bash
cd backend
```

2. Create & activate virtual environment:
```bash
python -m venv venv
# On macOS / Linux
source venv/bin/activate
# On Windows (PowerShell)
venv\Scripts\Activate.ps1
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Edit backend/.env (example):
```env
ROBIN_USER=your_email@example.com
ROBIN_PASS=your_password
FINNHUB_API_KEY=your_finnhub_api_key
```

5. Run development server:
```bash
uvicorn app.main:app --reload --port 8000
```
Swagger UI: http://localhost:8000/docs  
ReDoc: http://localhost:8000/redoc

### Frontend
1. Change to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```
App will be available at http://localhost:3000 (or the port Vite prints)

Set VITE_API_BASE_URL in frontend .env to point to your backend (e.g. http://localhost:8000)

---

## API endpoints (selected)

Portfolio
- GET /api/portfolio — full portfolio data
- GET /api/portfolio/symbols — list of portfolio symbols

News
- GET /api/news?symbols=AAPL,TSLA — company-specific news
- GET /api/news/general — market news

Sentiment
- POST /api/sentiment/analyze — analyze text (returns positive / neutral / negative)

Summary (main)
- GET /api/summary — portfolio + sentiment-analyzed news combined

---

## Troubleshooting

Backend
- Robinhood login fails:
  - Verify credentials in .env and whether 2FA is required.
  - Check API rate limits and network access.
- FinBERT model slow to load:
  - First download ≈ 500 MB — subsequent loads use cache.
  - Consider pre-loading model on startup for production.

Finnhub
- Check API key validity and rate limits (free tier limits).

Frontend
- API connection errors:
  - Ensure backend is running and CORS is configured.
  - Confirm VITE_API_BASE_URL in frontend .env.

Common fixes:
```bash
# Clear node modules and reinstall (frontend)
rm -rf node_modules package-lock.json
npm install
```

---

## Production deployment

Backend (examples)
- gunicorn:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```
- Docker:
```bash
docker build -t finance-insight-backend .
docker run -p 8000:8000 finance-insight-backend
```

Frontend
- Build:
```bash
npm run build
```
- Deploy dist/ to Vercel, Netlify, or any static host.

---

## Future enhancements (ideas)
- Historical portfolio tracking & analytics
- Price alerts & notifications
- Watchlist across multiple brokerage providers
- Dark mode
- CSV / PDF export
- WebSocket for realtime updates
- Mobile app (React Native)
- Email digests & AI trade suggestions

---

## Development notes

Tests
- Backend (to be implemented): pytest
- Frontend (to be implemented): npm test

Linting
- Backend: flake8 app/
- Frontend: npm run lint

---

## Contributing

This is a personal project but contributions and suggestions are welcome:
1. Fork the repo
2. Create a feature branch
3. Make changes & tests
4. Open a pull request describing the change

Please ensure compliance with:
- Robinhood Terms of Service
- Finnhub Terms of Service
- Hugging Face model licenses

---

## License & Support

This project is for personal use. Check the third‑party service terms before using in production.

For questions:
- Check README files in backend/ and frontend/
- Inspect API docs at /docs
- Review console logs for errors
- Open an issue in the repository

---

If you'd like, I can:
- Apply this updated README to the repo and open a PR for you, or
- Further shorten it into a one‑page quick summary for GitHub preview only.

Which would you prefer next?
