import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001
const API_KEY = process.env.NYT_API_KEY
const SECTIONS = ['home', 'world', 'technology', 'science', 'health', 'sports', 'arts']

app.get('/api/news', async (req, res) => {
  const section = req.query.section || 'home'
  if (!SECTIONS.includes(section)) {
    return res.status(400).json({ error: 'Sezione non valida' })
  }
  try {
    const r = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`)
    if (!r.ok) return res.status(r.status).json({ error: 'Errore API NYT' })
    const data = await r.json()
    res.json(data.results)
  } catch {
    res.status(500).json({ error: 'Errore server' })
  }
})

app.listen(PORT, () => console.log(`Proxy attivo sulla porta ${PORT}`))