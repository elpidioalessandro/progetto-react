import { useNews } from '../context/NewsContext'

const sections = ['home', 'world', 'technology', 'science', 'health', 'sports', 'arts']

const Navbar = () => {
  const { setSection } = useNews()

  return (
    <nav style={{
      borderBottom: '1px solid #e0e0e0',
      padding: '10px 20px',
      display: 'flex',
      gap: '20px',
      overflowX: 'auto'
    }}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setSection(section)}
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