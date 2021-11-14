export const SET_TOKEN = 'SET_TOKEN'
export type tokenSetTokenPayloadType = {
  accessToken: string
  refreshToken: string
}
type TokenSetTokenAction = {
  type: typeof SET_TOKEN
  payload: tokenSetTokenPayloadType
}

export const RESET_TOKEN = 'RESET_TOKEN'
type TokenResetTokenAction = {
  type: typeof RESET_TOKEN
}

export type TokenActionTypes = TokenSetTokenAction | TokenResetTokenAction
