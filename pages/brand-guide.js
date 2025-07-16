import Head from 'next/head'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function BrandGuide() {
  const [copiedColor, setCopiedColor] = useState(null)

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(type)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const colors = [
    { name: 'Primary Blue', hex: '#0066CC', rgb: 'rgb(0, 102, 204)', usage: 'Primary brand color, headers, CTAs' },
    { name: 'Secondary Blue', hex: '#0052A3', rgb: 'rgb(0, 82, 163)', usage: 'Gradients, hover states, accents' },
    { name: 'Light Blue', hex: '#E6F2FF', rgb: 'rgb(230, 242, 255)', usage: 'Backgrounds, subtle sections' },
    { name: 'Success Green', hex: '#00AA44', rgb: 'rgb(0, 170, 68)', usage: 'Success states, positive actions' },
    { name: 'Professional Gray', hex: '#4A4A4A', rgb: 'rgb(74, 74, 74)', usage: 'Body text, secondary information' },
    { name: 'Light Gray', hex: '#F8F9FA', rgb: 'rgb(248, 249, 250)', usage: 'Backgrounds, dividers' }
  ]

  return (
    <>
      <Head>
        <title>Brand Guide - TechFlow Solutions</title>
        <meta name="description" content="Complete brand guidelines for TechFlow Solutions including colors, typography, logos, and usage guidelines." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                TechFlow Solutions Brand Guide
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Complete brand guidelines, assets, and usage instructions for maintaining 
                consistent brand identity across all touchpoints.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-techflow-blue text-white px-6 py-3 rounded-lg hover:bg-techflow-blue-dark transition-colors">
                  Download Brand Kit
                </button>
                <button className="border-2 border-techflow-blue text-techflow-blue px-6 py-3 rounded-lg hover:bg-techflow-blue hover:text-white transition-colors">
                  Contact Brand Team
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Brand Overview</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Mission</h3>
                  <p className="text-gray-600">
                    Simplifying business complexity through intelligent automation that empowers teams to focus on what matters most.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Vision</h3>
                  <p className="text-gray-600">
                    A world where every business process is intelligently automated, freeing human potential for innovation.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Values</h3>
                  <p className="text-gray-600">
                    Innovation, Reliability, Simplicity, Transparency, and Customer Success drive everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Logo & Brand Mark</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Primary Logo</h3>
                  <div className="bg-gray-50 p-8 rounded-lg mb-4 flex items-center justify-center">
                    <img src="/assets/logo/techflow-logo.svg" alt="TechFlow Logo" className="h-16" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Use this primary logo for most applications. Minimum size: 120px wide.
                  </p>
                  <button className="bg-techflow-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-techflow-blue-dark transition-colors">
                    Download SVG
                  </button>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Logo on Dark</h3>
                  <div className="bg-gray-900 p-8 rounded-lg mb-4 flex items-center justify-center">
                    <img src="/assets/logo/techflow-logo.svg" alt="TechFlow Logo" className="h-16 filter brightness-0 invert" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Use white/inverted logo on dark backgrounds. Maintain contrast ratios.
                  </p>
                  <button className="bg-techflow-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-techflow-blue-dark transition-colors">
                    Download SVG
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Logo Usage Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">✓ Do</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Maintain clear space around the logo</li>
                      <li>• Use approved color variations only</li>
                      <li>• Ensure proper contrast on backgrounds</li>
                      <li>• Scale proportionally</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">✗ Don't</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Stretch or distort the logo</li>
                      <li>• Change colors or add effects</li>
                      <li>• Place on busy backgrounds</li>
                      <li>• Use below minimum size</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Color Palette</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {colors.map((color, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div 
                      className="h-24 w-full cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    ></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{color.name}</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">HEX</span>
                          <button 
                            onClick={() => copyToClipboard(color.hex, color.name)}
                            className="font-mono text-gray-900 hover:text-techflow-blue transition-colors"
                          >
                            {color.hex}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">RGB</span>
                          <button 
                            onClick={() => copyToClipboard(color.rgb, color.name)}
                            className="font-mono text-gray-900 hover:text-techflow-blue transition-colors text-xs"
                          >
                            {color.rgb}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{color.usage}</p>
                      {copiedColor === color.name && (
                        <span className="text-xs text-green-600 mt-1 block">Copied!</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Typography</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Primary Font: Inter</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-4xl font-bold text-gray-900 mb-1">Heading 1</h4>
                      <p className="text-sm text-gray-600">Inter Bold, 36px</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-gray-900 mb-1">Heading 2</h4>
                      <p className="text-sm text-gray-600">Inter Semibold, 24px</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-900 mb-1">Heading 3</h4>
                      <p className="text-sm text-gray-600">Inter Medium, 20px</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-900 mb-1">Body Text</p>
                      <p className="text-sm text-gray-600">Inter Regular, 16px</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Small Text</p>
                      <p className="text-xs text-gray-600">Inter Regular, 14px</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Font Weights & Usage</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="font-light text-gray-900 text-lg">Light (300)</span>
                      <p className="text-sm text-gray-600">Rarely used, for special applications</p>
                    </div>
                    <div>
                      <span className="font-normal text-gray-900 text-lg">Regular (400)</span>
                      <p className="text-sm text-gray-600">Body text, paragraphs, descriptions</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 text-lg">Medium (500)</span>
                      <p className="text-sm text-gray-600">Sub-headings, navigation, buttons</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">Semibold (600)</span>
                      <p className="text-sm text-gray-600">Section headings, important text</p>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-lg">Bold (700)</span>
                      <p className="text-sm text-gray-600">Main headings, emphasis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icons & Assets */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Icons & Visual Assets</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-techflow-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                    <img src="/assets/icons/workflow.svg" alt="Workflow" className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Workflow</h3>
                  <p className="text-sm text-gray-600">Interconnected processes</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-techflow-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                    <img src="/assets/icons/analytics.svg" alt="Analytics" className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">Data and insights</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-techflow-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                    <img src="/assets/icons/security.svg" alt="Security" className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                  <p className="text-sm text-gray-600">Protection and compliance</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Icon Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Style</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Outlined style, not filled</li>
                      <li>• 2px stroke weight</li>
                      <li>• Minimal, clean aesthetic</li>
                      <li>• 24x24px standard size</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Usage</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Use primary blue (#0066CC) for active states</li>
                      <li>• Gray (#4A4A4A) for inactive/secondary</li>
                      <li>• Maintain consistent sizing</li>
                      <li>• Ensure proper contrast</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16 bg-techflow-blue">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Download Brand Assets</h2>
              <p className="text-xl text-blue-100 mb-8">
                Get all logos, icons, and brand assets in multiple formats for your projects.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                  <h3 className="font-semibold text-white mb-3">Logo Package</h3>
                  <p className="text-blue-100 text-sm mb-4">SVG, PNG, PDF formats</p>
                  <button className="bg-white text-techflow-blue px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Download
                  </button>
                </div>
                
                <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                  <h3 className="font-semibold text-white mb-3">Icon Set</h3>
                  <p className="text-blue-100 text-sm mb-4">Complete SVG icon collection</p>
                  <button className="bg-white text-techflow-blue px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Download
                  </button>
                </div>
                
                <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                  <h3 className="font-semibold text-white mb-3">Brand Kit</h3>
                  <p className="text-blue-100 text-sm mb-4">Complete brand package</p>
                  <button className="bg-white text-techflow-blue px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}