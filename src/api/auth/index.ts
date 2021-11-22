import axios from 'axios'

import { SignUpDataType, SignInDataType } from './types'

const path = '/auth'

export function signUp(data: SignUpDataType) {
  return axios.post(`${path}/sign-up`, data)
}

export function signIn(data: SignInDataType) {
  return axios.post(`${path}/sign-in`, data)
}
