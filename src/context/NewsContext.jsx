import { createContext, useContext, useState, useEffect } from 'react'
import { getTopStories } from '../services/api'

const NewsContext = createContext()

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getTopStories('home')
        setArticles(data)
      } catch (err) {
        setError('Errore nel caricamento delle notizie')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  return (
    <NewsContext.Provider value={{ articles, loading, error }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)