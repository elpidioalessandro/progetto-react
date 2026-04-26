import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Navbar from '../components/navbar'
import { getTopStories } from '../services/api'

const Section = () => {
  const { section } = useParams()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const data = await getTopStories(section)
      setArticles(data || [])
      setLoading(false)
    }
    fetch()
  }, [section]) 

  if (loading) return <p>Caricamento...</p>

  return (
    <div>
      <Header />
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: '20px', textTransform: 'capitalize' }}>
          {section}
        </h2>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {articles.map((article) => (
            <div
              key={article.url}
              onClick={() => navigate(`/article/${encodeURIComponent(article.uri)}`, { state: { article } })}
              style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '20px', cursor: 'pointer' }}
            >
              {article.multimedia?.[0] && (
                <img src={article.multimedia[0].url} alt={article.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              )}
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', margin: '10px 0' }}>
                {article.title}
              </h2>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.9rem', color: '#333' }}>
                {article.abstract}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Section