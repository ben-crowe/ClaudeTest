export default function HeroSection() {
  return (
    <section className="pt-20 pb-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Simplify Your Business Workflows
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect 500+ tools without writing a single line of code. 
              Automate complex business processes in minutes, not months.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 py-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm text-gray-600">4.8/5 rating</span>
              </div>
              <div className="text-sm text-gray-600">
                🏢 2,000+ companies
              </div>
              <div className="text-sm text-gray-600">
                🔄 1M+ workflows automated
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="bg-techflow-green text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg">
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Visual Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-techflow-blue to-techflow-blue-dark rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Workflow Dashboard</h3>
                  <span className="text-sm text-green-600 font-medium">●  Active</span>
                </div>
                
                {/* Mock workflow visualization */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-techflow-blue rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12L15 7H5L10 12Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-techflow-green rounded-full w-3/4"></div>
                    </div>
                    <span className="text-sm text-gray-600">Slack</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-techflow-blue rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12L15 7H5L10 12Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-techflow-green rounded-full w-1/2"></div>
                    </div>
                    <span className="text-sm text-gray-600">Gmail</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-techflow-blue rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12L15 7H5L10 12Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-techflow-green rounded-full w-5/6"></div>
                    </div>
                    <span className="text-sm text-gray-600">Trello</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>247 workflows</strong> running • <strong>99.9%</strong> uptime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}