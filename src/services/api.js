import axios from 'axios'

export const getTopStories = async (section = 'home') => {
  const response = await axios.get(`/api/news?section=${section}`)
  return response.data
}
const variabileInutile = 42