import axios from 'axios'
import { Overview } from './typeOverview'

export const registerConstructors = async (
  name: string,
  nationality: string,
  url: string,
  userType: string
): Promise<Overview> => {
  let response
  const customUrl = `http://localhost:3001/register?userType=${userType}`
  console.log(customUrl)
  try {
    response = await axios({
      method: 'get',
      url: customUrl
    })
  } catch (err) {}
  console.log(response?.data)
  return response?.data
}
