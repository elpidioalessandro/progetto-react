import { useNavigate } from 'react-router-dom'

const sections = ['home', 'world', 'technology', 'science', 'health', 'arts']

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="nav" style={{
      borderBottom: '1px solid #e0e0e0',
      padding: '10px 20px',
      display: 'flex',
      gap: '20px',
      overflowX: 'auto'
    }}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => section === 'home' ? navigate('/') : navigate(`/section/${section}`)}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '5px 0'
          }}
        >
          {section}
        </button>
      ))}
    </nav>
  )
}

export default Navbar