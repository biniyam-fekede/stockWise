# Finance Insight Dashboard - Frontend

A modern, responsive **React + TypeScript** frontend for the Finance Insight Dashboard. Built with React Query for state management, Tailwind CSS for styling, and Recharts for data visualization.

---

## 🎯 Features

- **📊 Portfolio Dashboard**: Real-time portfolio summary with holdings and performance metrics
- **📈 Interactive Charts**: Visual representation of portfolio value over time
- **📰 News Feed**: Latest stock news with AI-powered sentiment analysis
- **🎨 Modern UI**: Clean, responsive design built with Tailwind CSS
- **⚡ Real-time Updates**: Auto-refresh capability with manual refresh option
- **🔍 Smart Filtering**: Filter news by sentiment (positive, neutral, negative)
- **💪 Type-Safe**: Full TypeScript implementation
- **🚀 Optimized**: React Query for efficient data caching and state management

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query (TanStack Query)** - Server state management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

---

## 📂 Project Structure

```
src/
├── api/
│   ├── axiosClient.ts          # Configured Axios instance
│   └── endpoints.ts            # API endpoint constants
├── components/
│   ├── ChartCard.tsx           # Portfolio value chart
│   ├── ErrorDisplay.tsx        # Error handling component
│   ├── Loader.tsx              # Loading spinner
│   ├── NewsItem.tsx            # News article card
│   ├── PortfolioCard.tsx       # Portfolio summary card
│   └── SentimentTag.tsx        # Sentiment badge
├── context/
│   └── QueryProvider.tsx       # React Query provider
├── hooks/
│   ├── useNews.ts              # News data hooks
│   ├── usePortfolio.ts         # Portfolio data hooks
│   └── useSummary.ts           # Combined summary hook
├── pages/
│   ├── Dashboard.tsx           # Main dashboard page
│   ├── NewsPage.tsx            # News feed page
│   └── PortfolioPage.tsx       # Portfolio details page
├── types/
│   ├── index.ts                # Type exports
│   ├── news.ts                 # News types
│   ├── portfolio.ts            # Portfolio types
│   ├── sentiment.ts            # Sentiment types
│   └── summary.ts              # Summary types
├── utils/
│   ├── constants.ts            # App constants
│   └── formatters.ts           # Formatting utilities
├── App.tsx                     # Main app component
├── main.tsx                    # App entry point
└── index.css                   # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment** (optional):

   Edit `.env` if your backend is on a different URL:

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open in browser**:
   ```
   http://localhost:3000
   ```

---

## 📖 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🎨 Pages

### Dashboard (`/`)

- Portfolio summary with key metrics
- Portfolio value chart (30-day view)
- Latest news with sentiment analysis
- Auto-refresh toggle
- Sentiment filter

### Portfolio (`/portfolio`)

- Detailed holdings table
- Individual stock performance
- Total equity and cash balance

### News (`/news`)

- Company-specific news feed
- News for portfolio holdings
- Direct links to full articles

---

## 🔌 API Integration

The frontend connects to these backend endpoints:

- `GET /api/portfolio` - Portfolio data
- `GET /api/portfolio/symbols` - Portfolio symbols
- `GET /api/news?symbols=AAPL,TSLA` - Company news
- `GET /api/summary` - Combined portfolio + sentiment news

All API calls are handled through:

- **Axios client** with interceptors
- **React Query hooks** for caching
- **TypeScript types** for safety

---

## 💡 Key Features Explained

### React Query Integration

Data fetching is managed with React Query for:

- Automatic caching
- Background refetching
- Loading and error states
- Optimistic updates

Example:

```tsx
const { data, isLoading, error } = useSummary();
```

### Auto-Refresh

Enable automatic data refreshing:

```tsx
const { data } = useSummary(true); // Refreshes every 60s
```

### Sentiment Filtering

Filter news by sentiment category:

- **All** - Show all articles
- **Positive** - Show only positive sentiment
- **Neutral** - Show only neutral sentiment
- **Negative** - Show only negative sentiment

---

## 🎨 Styling

Built with Tailwind CSS for:

- Responsive design (mobile-first)
- Consistent color palette
- Utility-first approach
- Dark mode ready (can be extended)

Custom theme colors:

- **Primary**: Blue (`#0ea5e9`)
- **Success**: Green
- **Danger**: Red
- **Neutral**: Gray

---

## 🔧 Configuration

### Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL

### Vite Configuration

Vite is configured with:

- React plugin for Fast Refresh
- Proxy for API requests
- Port 3000 for dev server

---

## 📱 Responsive Design

The dashboard is fully responsive:

- **Mobile**: Stacked card layout
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid for news

---

## 🐛 Error Handling

Comprehensive error handling with:

- Error boundaries
- Retry mechanisms
- User-friendly error messages
- Manual retry buttons

---

## 🚀 Production Build

Build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

Preview production build:

```bash
npm run preview
```

---

## 📝 Type Safety

Full TypeScript coverage with:

- Strict mode enabled
- Interface definitions for all data
- Type-safe API calls
- Props validation

---

## 🌟 Future Enhancements

Potential improvements:

- [ ] Dark mode toggle
- [ ] WebSocket for real-time updates
- [ ] Historical portfolio tracking
- [ ] Advanced charting (candlesticks, indicators)
- [ ] Watchlist feature
- [ ] Export data to CSV
- [ ] Price alerts
- [ ] Mobile app (React Native)

---

## 🤝 Integration with Backend

Ensure the backend is running before starting the frontend:

1. Start backend:

   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📄 License

This project is for personal use. Ensure compliance with data provider terms of service.

---

**Happy Trading! 📈**
