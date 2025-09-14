import {
  TrendingUp,
  Brain,
  BarChart3,
  Bell,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Activity,
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">StockWise</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#technology"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Technology
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-gray-100/25 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="h-4 w-4" />
              <span>AI-Powered Investment Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Make Smarter
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Investment Decisions
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Harness the power of AI-driven sentiment analysis and real-time
              market intelligence to reduce decision-making time by 40% with
              personalized automated alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() =>
                  window.open(
                    "mailto:biniyamgebreyohannes@gmail.com?subject=StockWise Demo Request&body=Hi,%0D%0A%0D%0AI would like to request a demo of the StockWise AI-powered investment platform.%0D%0A%0D%0APlease let me know your availability for a demonstration of the following features:%0D%0A- AI sentiment analysis%0D%0A- Real-time portfolio tracking%0D%0A- Personalized automated alerts%0D%0A- Market intelligence dashboard%0D%0A%0D%0AThank you,%0D%0A[Your Name]"
                  )
                }
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all hover:scale-105 flex items-center space-x-2 cursor-pointer"
              >
                <span>Request Demo</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  window.open(
                    "mailto:biniyamgebreyohannes@gmail.com?subject=StockWise Inquiry&body=Hi,%0D%0A%0D%0AI am interested in learning more about StockWise.%0D%0A%0D%0APlease contact me to discuss further.%0D%0A%0D%0AThank you,%0D%0A[Your Name]"
                  )
                }
                className="text-gray-600 px-8 py-4 rounded-lg text-lg font-semibold hover:text-gray-900 transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold text-green-400 mb-2">40%</div>
              <div className="text-gray-300">Faster Decision Making</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                99.9%
              </div>
              <div className="text-gray-300">Platform Uptime</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold text-green-300 mb-2">
                Real-time
              </div>
              <div className="text-gray-300">Market Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See StockWise in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our AI-powered platform transforms investment
              decision-making with real-time sentiment analysis and intelligent
              portfolio tracking.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Platform Demo Video
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Coming Soon - Interactive Demo
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        "mailto:biniyamgebreyohannes@gmail.com?subject=StockWise Demo Request&body=Hi,%0D%0A%0D%0AI would like to request a live demo of the StockWise platform.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you,%0D%0A[Your Name]"
                      )
                    }
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Request Live Demo
                  </button>
                </div>
              </div>

              {/* Video placeholder overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Intelligent Investment Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology meets sophisticated portfolio management to
              deliver actionable insights for modern investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Sentiment Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by LLaMA, our AI processes real-time financial news to
                provide accurate market sentiment analysis and investment
                signals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-emerald-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Portfolio Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Seamlessly integrated with Robinhood API for comprehensive
                portfolio monitoring and performance analytics in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-lime-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Alerts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized automated alerts based on your investment
                preferences and market conditions to never miss an opportunity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-emerald-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Processing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lightning-fast data ingestion and classification using Java and
                Python for instant market insights and recommendations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-teal-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enterprise Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-grade security with automated CI/CD pipelines ensuring
                99.9% uptime and complete data protection.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-100 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Performance Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive performance tracking and analytics to optimize
                your investment strategy with data-driven insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scalable architecture designed and developed by a team of expert
              engineers using cutting-edge technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    AI & Machine Learning
                  </h3>
                  <p className="text-gray-600">
                    LLaMA integration for advanced sentiment analysis and market
                    prediction
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 rounded-lg p-3">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Data Processing
                  </h3>
                  <p className="text-gray-600">
                    Java and Python backend for robust data ingestion and
                    classification
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Frontend Excellence
                  </h3>
                  <p className="text-gray-600">
                    React.js + TypeScript for a scalable, type-safe user
                    experience
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 rounded-lg p-3">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    DevOps & Infrastructure
                  </h3>
                  <p className="text-gray-600">
                    Automated CI/CD pipelines ensuring reliable deployment and
                    monitoring
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Platform Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>4-person engineering team leadership</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>99.9% platform uptime achieved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>40% reduction in decision-making time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Real-time Robinhood API integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Enterprise-grade security standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Investment Strategy?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Experience the power of AI-driven investment intelligence and join
            the future of smart trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                window.open(
                  "mailto:biniyamgebreyohannes@gmail.com?subject=StockWise Demo Request&body=Hi,%0D%0A%0D%0AI would like to schedule a demo of the StockWise AI-powered investment platform.%0D%0A%0D%0APlease let me know your availability for a demonstration.%0D%0A%0D%0AThank you,%0D%0A[Your Name]"
                )
              }
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Schedule Demo</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                window.open(
                  "mailto:biniyamgebreyohannes@gmail.com?subject=StockWise Contact Request&body=Hi,%0D%0A%0D%0AI am interested in StockWise and would like to get in touch with your team.%0D%0A%0D%0APlease contact me to discuss further.%0D%0A%0D%0AThank you,%0D%0A[Your Name]"
                )
              }
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-all cursor-pointer"
            >
              Contact Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <span className="text-xl font-bold">StockWise</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                AI-powered investment platform delivering intelligent market
                insights and automated portfolio management for modern
                investors.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 StockWise. Built with precision by expert engineers.
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Request Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
