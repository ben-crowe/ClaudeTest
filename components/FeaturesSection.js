export default function FeaturesSection() {
  const features = [
    {
      icon: 'workflow',
      title: 'No-Code Automation',
      description: 'Build complex workflows without writing a single line of code. Drag, drop, and connect your favorite tools.'
    },
    {
      icon: 'analytics',
      title: 'Real-Time Analytics',
      description: 'Monitor your automated processes with live dashboards and get insights that actually matter.'
    },
    {
      icon: 'security',
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 compliance, end-to-end encryption, and granular access controls.'
    },
    {
      icon: 'workflow',
      title: '500+ Integrations',
      description: 'Connect with all your favorite tools - from Slack and Gmail to Salesforce and beyond.'
    },
    {
      icon: 'analytics',
      title: 'Smart Notifications',
      description: 'Get notified when it matters with intelligent alerts and customizable notification rules.'
    },
    {
      icon: 'security',
      title: '24/7 Support',
      description: 'Our expert team is available around the clock to help you succeed with your automation journey.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Automate
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make business automation simple, 
            secure, and scalable for teams of any size.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {/* Icon */}
              <div className="w-12 h-12 bg-techflow-blue bg-opacity-10 rounded-lg mb-6 flex items-center justify-center">
                <img 
                  src={`/assets/icons/${feature.icon}.svg`} 
                  alt={feature.title} 
                  className="w-6 h-6"
                />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of companies already automating their business processes with TechFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-techflow-blue text-white px-8 py-3 rounded-lg hover:bg-techflow-blue-dark transition-colors font-medium">
                Start Free Trial
              </button>
              <button className="border-2 border-techflow-blue text-techflow-blue px-8 py-3 rounded-lg hover:bg-techflow-blue hover:text-white transition-colors font-medium">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}