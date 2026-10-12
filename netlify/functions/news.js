const SECTIONS = ['home', 'world', 'technology', 'science', 'health', 'sports', 'arts']

export default async (req) => {
  const section = new URL(req.url).searchParams.get('section') || 'home'
  if (!SECTIONS.includes(section)) {
    return Response.json({ error: 'Sezione non valida' }, { status: 400 })
  }
  const r = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.NYT_API_KEY}`)
  if (!r.ok) return Response.json({ error: 'Errore API NYT' }, { status: r.status })
  const data = await r.json()
  return Response.json(data.results)
}

export const config = { path: '/api/news' }