import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Navbar from '../components/navbar'

const Article = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const article = state?.article

  if (!article) return <p>Articolo non trovato</p>

  return (
    <div>
      <Header />
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}
        >
          ← Torna indietro
        </button>
        {article.multimedia?.[0] && (
          <img
            src={article.multimedia[0].url}
            alt={article.title}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        )}
        <h1 style={{ fontFamily: 'Georgia, serif', margin: '20px 0' }}>
          {article.title}
        </h1>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.1rem', color: '#333' }}>
          {article.abstract}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: 'Arial, sans-serif', color: 'black' }}
        >
          Leggi l'articolo completo sul NYT &rarr;
        </a>
      </main>
    </div>
  )
}

export default Article