import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Article from './pages/article'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App