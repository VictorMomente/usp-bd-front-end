import axios from 'axios'
import { Overview } from './typeOverview'

export const registerDrivers = async (
  number: number,
  code: string,
  forename: string,
  surname: string,
  date: string,
  nationality: string
): Promise<Overview> => {
  let response
  const customUrl = `http://localhost:3001/registerdrivers`
  console.log(customUrl)
  const data = {
    number,
    code,
    forename,
    surname,
    date,
    nationality
  }
  try {
    response = await axios({
      method: 'post',
      url: customUrl,
      data
    })
  } catch (err) {}
  console.log(response?.data)
  return response?.data
}
