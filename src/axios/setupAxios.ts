import { AxiosInstance, AxiosRequestConfig } from 'axios'

import { projectConfig } from 'src/config'

export default function setupAxios(axios: AxiosInstance) {
  axios.defaults.baseURL = `${projectConfig?.apiPath}`
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers = {
        'Content-Type': 'application/json',
        'Accept-Language': 'uk',
        Accept: 'application/json',
      }
      config.data = config.data ? config.data : null
      return config
    },
    (err) => Promise.reject(err)
  )
}
