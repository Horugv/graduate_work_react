import { SET_IS_MODAL_FILTER_OPEN, ModalsActionTypes } from './types'

export type ModalsState = {
  isModalFilterOpen: boolean
}

const initalState: ModalsState = {
  isModalFilterOpen: false,
}

export const modalsReducer = function (
  state = initalState,
  action: ModalsActionTypes
): ModalsState {
  switch (action.type) {
    case SET_IS_MODAL_FILTER_OPEN:
      return { ...state, isModalFilterOpen: action.payload }
    default:
      return state
  }
}
