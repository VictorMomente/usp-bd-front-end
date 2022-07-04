import axios from 'axios'
import { Overview } from './typeOverview'

export const registerConstructors = async (
  name: string,
  nationality: string,
  url: string
): Promise<Overview> => {
  let response
  const customUrl = `http://localhost:3001/registerconstructors`
  console.log(customUrl)
  const data = {
    name,
    nationality,
    url
  }
  try {
    response = await axios({
      method: 'get',
      url: customUrl,
      data
    })
  } catch (err) {}
  console.log(response?.data)
  return response?.data
}
