import Head from 'next/head'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>TechFlow Solutions - Simplify Your Business Workflows</title>
        <meta name="description" content="Connect 500+ tools without writing code. Automate complex business processes in minutes with TechFlow Solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </main>
    </>
  )
}