import axios from 'axios'
import { Overview } from './typeOverview'

export const getOverview = async (
  userType: string,
  userId?: number
): Promise<Overview> => {
  let response
  let customUrl = `http://localhost:3001/overview?userType=${userType}`
  if (userId) customUrl += `&userId=${userId}`
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
