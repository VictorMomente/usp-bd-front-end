import axios from 'axios'

export const consultDrivers = async (
  name: string,
  IdOriginal: any
): Promise<any> => {
  let response
  const customUrl = `http://localhost:3001/consultdrivers?name=${name}&constructorId=${IdOriginal}`
  console.log(customUrl)
  try {
    response = await axios({
      method: 'get',
      url: customUrl
    })
  } catch (err) {}
  return response?.data
}
