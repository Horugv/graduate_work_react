import { TokenActionTypes, RESET_TOKEN, SET_TOKEN } from './types'

export type TokenState = {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: TokenState = {
  accessToken: null,
  refreshToken: null,
}

export const tokenReducer = function (
  state = initialState,
  action: TokenActionTypes
): TokenState {
  switch (action.type) {
    case SET_TOKEN: {
      const { accessToken, refreshToken } = action.payload
      return { ...state, accessToken, refreshToken }
    }
    case RESET_TOKEN: {
      return initialState
    }
    default:
      return state
  }
}
