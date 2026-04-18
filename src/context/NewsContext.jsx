import { createContext, useContext, useState, useEffect } from 'react'
import { getTopStories } from '../services/api'

const NewsContext = createContext()

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [section, setSection] = useState('home')

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const data = await getTopStories(section)
        setArticles(data)
      } catch (err) {
        setError('Errore nel caricamento delle notizie')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [section])

  return (
    <NewsContext.Provider value={{ articles, loading, error, setSection }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)