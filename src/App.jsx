import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'
import Section from './pages/section'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section/:section" element={<Section />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App