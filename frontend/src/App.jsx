import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import CredentialsStrip from './components/sections/CredentialsStrip'
import WhatIsSwaqar from './components/sections/WhatIsSwaqar'

const App = () => {
  return (
    <div className="bg-charcoal min-h-screen noise-texture">
      <Header />
      <main>
        <Hero />
        <CredentialsStrip />
        <WhatIsSwaqar />
      </main>
      <Footer />
    </div>
  )
}

export default App