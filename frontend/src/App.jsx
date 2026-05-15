import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <div className="bg-charcoal min-h-screen noise-texture">
      <Header />
      <main>
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h1 className="font-cinzel text-4xl text-[#E8E6E0] mb-8">Welcome to SWAQAR</h1>
            <p className="font-inter text-lg text-[#4B4840] leading-relaxed">
              Institutional trade infrastructure governing verified cross-border trade
              between African supply corridors and Middle Eastern demand markets.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App