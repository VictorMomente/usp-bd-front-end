import axios from 'axios'

export const getSpecificReport = async (
  userType: string,
  reportType: string,
  userId: number
): Promise<any> => {
  let response
  const customUrl = `http://localhost:3001/specificreport?userType=${userType}&reportType=${reportType}&userId=${userId}`
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
