export type coordType = {
  lat?: number
  lng?: number
}

export const SET_IS_MODAL_FILTER_OPEN = 'SET_IS_MODAL_FILTER_OPEN'
type IsModalFilterOpen = {
  type: typeof SET_IS_MODAL_FILTER_OPEN
  payload: boolean
}

export const SET_IS_MODAL_ADD_POINT_OPEN = 'SET_IS_MODAL_ADD_POINT_OPEN'
export type modalAddPointPayloadType = {
  isOpen: boolean
  coord: coordType | null
}
type IsModalAddPointOpen = {
  type: typeof SET_IS_MODAL_ADD_POINT_OPEN
  payload: modalAddPointPayloadType
}

export const SET_IS_MODAL_SIGNIN_OPEN = 'SET_IS_MODAL_SIGNIN_OPEN'
type IsModalSigninOpen = {
  type: typeof SET_IS_MODAL_SIGNIN_OPEN
  payload: boolean
}

export const SET_IS_MODAL_SIGNUP_OPEN = 'SET_IS_MODAL_SIGNUP_OPEN'
type IsModalSignupOpen = {
  type: typeof SET_IS_MODAL_SIGNUP_OPEN
  payload: boolean
}

export const SET_IS_MODAL_PERSONAL_INFORMATION_OPEN = 'SET_IS_MODAL_PERSONAL_INFORMATION_OPEN'
type IsModalPersonalInformationOpen = {
  type: typeof SET_IS_MODAL_PERSONAL_INFORMATION_OPEN
  payload: boolean
}


export type ModalsActionTypes =
  | IsModalFilterOpen
  | IsModalAddPointOpen
  | IsModalSigninOpen
  | IsModalSignupOpen
  | IsModalPersonalInformationOpen
