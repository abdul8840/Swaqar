import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import CredentialsStrip from './components/sections/CredentialsStrip'
import WhatIsSwaqar from './components/sections/WhatIsSwaqar'
import CorridorAtlas from './components/sections/CorridorAtlas'
import ControlPipeline from './components/sections/ControlPipeline'
import ControlGate from './components/sections/ControlGate'
import Participants from './components/sections/Participants'

const App = () => {
  return (
    <div className="bg-charcoal min-h-screen noise-texture">
      <Header />
      <main>
        <Hero />
        <CredentialsStrip />
        <WhatIsSwaqar />
        <ControlPipeline />
        <ControlGate />
        <Participants />
        <CorridorAtlas />
      </main>
      <Footer />
    </div>
  )
}

export default App