import axios from 'axios'

interface IData {
  grant_type: string
  refresh_token: string
}

export const requestTokenRefresh = (data: IData): Promise<any> => {
  // TODO change url when API will be ready
  return axios.post('/auth/token/refresh', data)
}
