import {
  SET_IS_MODAL_FILTER_OPEN,
  SET_IS_MODAL_ADD_POINT_OPEN,
  SET_IS_MODAL_SIGNIN_OPEN,
  SET_IS_MODAL_SIGNUP_OPEN,
  SET_IS_MODAL_PERSONAL_INFORMATION_OPEN,
  coordType,
  ModalsActionTypes,
} from './types'

export type ModalsState = {
  isModalFilterOpen: boolean
  isModalAddPointOpen: boolean
  modalAddPointCoord: coordType | null
  isModalSigninOpen: boolean
  isModalSignupOpen: boolean
  isModalPersonalInformationOpen: boolean
}

const initalState: ModalsState = {
  isModalFilterOpen: false,
  isModalAddPointOpen: false,
  modalAddPointCoord: null,
  isModalSigninOpen: false,
  isModalSignupOpen: false,
  isModalPersonalInformationOpen: false,
}

export const modalsReducer = function (
  state = initalState,
  action: ModalsActionTypes
): ModalsState {
  switch (action.type) {
    case SET_IS_MODAL_FILTER_OPEN:
      return { ...state, isModalFilterOpen: action.payload }
    case SET_IS_MODAL_ADD_POINT_OPEN:
      return {
        ...state,
        isModalAddPointOpen: action.payload.isOpen,
        modalAddPointCoord: action.payload.coord,
      }
    case SET_IS_MODAL_SIGNIN_OPEN:
      return {
        ...state,
        isModalSigninOpen: action.payload,
      }
    case SET_IS_MODAL_SIGNUP_OPEN:
      return {
        ...state,
        isModalSignupOpen: action.payload,
      }
    case SET_IS_MODAL_PERSONAL_INFORMATION_OPEN:
      return {
        ...state,
        isModalPersonalInformationOpen: action.payload,
      }
    default:
      return state
  }
}
