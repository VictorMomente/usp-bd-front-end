import axios from 'axios'

export const getDriversByConstructors = async (
  IdOriginal: any
): Promise<any> => {
  let response
  const customUrl = `http://localhost:3001/driversbyconstructor?constructorId=${IdOriginal}`
  console.log(customUrl)
  try {
    response = await axios({
      method: 'get',
      url: customUrl
    })
  } catch (err) {}
  return response?.data.forenames
}
