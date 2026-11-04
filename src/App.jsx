import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './views/Home'
import InstituicoesEnsino from './views/InstituicoesEnsino'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/instituicoes"
            element={<InstituicoesEnsino />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App