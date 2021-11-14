import { AxiosInstance, AxiosRequestConfig } from 'axios'

import { projectConfig } from 'src/config'
import { actions } from 'src/redux/token/action'
import { requestTokenRefresh } from './refreshToken'

let isAlreadyFetchingAccessToken = false
let subscribers: Array<(accessToken: string) => void> = []

const onAccessTokenFetched = (accessToken: string) => {
  subscribers = subscribers.filter((callback) => callback(accessToken))
}

const addSubscriber = (callback: (accessToken: string) => void) => {
  subscribers.push(callback)
}

export default function setupAxios(axios: AxiosInstance, store: any) {
  axios.defaults.baseURL = `${projectConfig?.apiPath}`
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const {
        token: { accessToken },
      } = store.getState()
      config.headers = {
        'Content-Type': 'application/json',
        'Accept-Language': 'uk',
        Accept: 'application/json',
      }
      config.data = config.data ? config.data : null
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (err) => Promise.reject(err)
  )
  axios.interceptors.response.use(
    function (response) {
      console.log('response', response)
      return response
    },
    function (error) {
      const {
        token: { refreshToken },
      } = store.getState()
      const { config, response } = error
      const originalRequest = config
      if (
        response?.status === 401 &&
        refreshToken &&
        originalRequest?.url !== '/auth/token/refresh'
      ) {
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((accessToken) => {
            originalRequest.headers.Authorization = 'Bearer ' + accessToken
            return resolve(axios(originalRequest))
          })
        })
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          requestTokenRefresh({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          })
            .then((res) => {
              store.dispatch(
                actions.setToken({
                  accessToken: res.data.access_token,
                  refreshToken: res.data.refresh_token,
                })
              )
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(res.data.access_token)
            })
            .catch((er) => {
              store.dispatch(actions.resetToken())
            })
        }
        return retryOriginalRequest
      }
      return Promise.reject(error)
    }
  )
}
