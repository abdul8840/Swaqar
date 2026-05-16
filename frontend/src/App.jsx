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
import TransactionLifecycle from './components/sections/TransactionLifecycle'
import Governance from './components/sections/Governance'
import GeographyCorridor from './components/sections/GeographyCorridor'
import ComparisonTable from './components/sections/ComparisonTable'
import DoesDoesNot from './components/sections/DoesDoesNot'
import IntakeForm from './components/sections/IntakeForm'

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
        <TransactionLifecycle />
        <Governance />
        <GeographyCorridor />
        <ComparisonTable />
        <DoesDoesNot />
        <IntakeForm />

      </main>
      <Footer />
    </div>
  )
}

export default App