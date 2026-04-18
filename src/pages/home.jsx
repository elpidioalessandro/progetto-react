import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Navbar from '../components/navbar'
import { useNews } from '../context/NewsContext'

const Home = () => {
  const { articles, loading, error } = useNews()
  const navigate = useNavigate()

  if (loading) return <p>Caricamento...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <Header />
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {articles.map((article) => (
            <div
              key={article.url}
              onClick={() => navigate('/article', { state: { article } })}
              style={{
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '20px',
                cursor: 'pointer'
              }}
            >
              {article.multimedia?.[0] && (
                <img
                  src={article.multimedia[0].url}
                  alt={article.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                margin: '10px 0'
              }}>
                {article.title}
              </h2>
              <p style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '0.9rem',
                color: '#333'
              }}>
                {article.abstract}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home