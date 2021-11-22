export type userData = {
  email: string
  name: string
  username: string
  family_name: string
}

export const SET_IS_AUTH = 'SET_IS_AUTH'
type isAuthType = {
  type: typeof SET_IS_AUTH
  payload: boolean
}

export const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
type authUserDataType = {
  type: typeof SET_AUTH_USER_DATA
  payload: userData
}

export const SET_IS_AUTH_LOADING = 'SET_IS_AUTH_LOADING'
type authIsLoadingType = {
  type: typeof SET_IS_AUTH_LOADING
  payload: boolean
}

export type AuthActionTypes = isAuthType | authUserDataType | authIsLoadingType
