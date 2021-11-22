import {
  SET_IS_AUTH,
  SET_AUTH_USER_DATA,
  SET_IS_AUTH_LOADING,
  userData,
  AuthActionTypes,
} from './types'

export type AuthState = {
  isAuth: boolean
  userInfo: userData | null
  isLoading: boolean
}

const initalState: AuthState = {
  isAuth: false,
  userInfo: null,
  isLoading: false,
}

export const authReducer = function (
  state = initalState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        userInfo: action.payload,
      }
    case SET_IS_AUTH_LOADING:
      return { ...state, isLoading: action.payload }

    default:
      return state
  }
}
