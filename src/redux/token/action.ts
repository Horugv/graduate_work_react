import { SET_TOKEN, RESET_TOKEN, tokenSetTokenPayloadType } from './types'

export const actions = {
  setToken: (payload: tokenSetTokenPayloadType) => ({
    type: SET_TOKEN,
    payload,
  }),
  resetToken: () => ({ type: RESET_TOKEN }),
}
