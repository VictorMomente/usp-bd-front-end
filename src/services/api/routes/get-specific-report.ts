import axios from 'axios'

export const getSpecificReport = async (
  userType: string,
  reportType: string,
  userId: number,
  city?: string
): Promise<any> => {
  let response
  let customUrl = `http://localhost:3001/specificreport?userType=${userType}&reportType=${reportType}&userId=${userId}`
  if (city) customUrl += `&city=${city}`
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
