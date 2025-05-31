import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home"
import NotFound from './pages/404/404'
import Redirect from './pages/Redirect/Redirect'
import Transfer from './routes/Transfer'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/auth/google/callback" element={<Transfer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App