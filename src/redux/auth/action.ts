import {
  SET_IS_AUTH,
  SET_AUTH_USER_DATA,
  SET_IS_AUTH_LOADING,
  userData,
} from './types'

export const actions = {
  actionSetIsAuth: (payload: boolean) => ({
    type: SET_IS_AUTH,
    payload,
  }),
  actionSetAuthUserData: (payload: userData | null) => ({
    type: SET_AUTH_USER_DATA,
    payload,
  }),
  actionsSetAuthIsLoading: (payload: boolean) => ({
    type: SET_IS_AUTH_LOADING,
    payload,
  }),
}
