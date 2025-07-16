import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/assets/logo/techflow-logo.svg" 
              alt="TechFlow Solutions" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-gray-700 hover:text-techflow-blue transition-colors">Products</a>
            <a href="#pricing" className="text-gray-700 hover:text-techflow-blue transition-colors">Pricing</a>
            <a href="/brand-guide" className="text-gray-700 hover:text-techflow-blue transition-colors">Brand Guide</a>
            <a href="#blog" className="text-gray-700 hover:text-techflow-blue transition-colors">Blog</a>
            <a href="#docs" className="text-gray-700 hover:text-techflow-blue transition-colors">Docs</a>
            <a href="#contact" className="text-gray-700 hover:text-techflow-blue transition-colors">Contact</a>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-techflow-blue text-white px-6 py-2.5 rounded-lg hover:bg-techflow-blue-dark transition-colors font-medium">
              Request Demo
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-techflow-blue"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#products" className="text-gray-700 hover:text-techflow-blue block px-3 py-2 transition-colors">Products</a>
              <a href="#pricing" className="text-gray-700 hover:text-techflow-blue block px-3 py-2 transition-colors">Pricing</a>
              <a href="/brand-guide" className="text-gray-700 hover:text-techflow-blue block px-3 py-2 transition-colors">Brand Guide</a>
              <a href="#blog" className="text-gray-700 hover:text-techflow-blue block px-3 py-2 transition-colors">Blog</a>
              <a href="#docs" className="text-gray-700 hover:text-techflow-blue block px-3 py-2 transition-colors">Docs</a>
              <a href="#contact" className="text-gray-700 hover:text-techflow-blue block px-3 py-2 transition-colors">Contact</a>
              <button className="bg-techflow-blue text-white px-6 py-2.5 rounded-lg hover:bg-techflow-blue-dark transition-colors font-medium w-full mt-4">
                Request Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}