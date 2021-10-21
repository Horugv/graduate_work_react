import {
  SET_IS_MODAL_FILTER_OPEN,
  SET_IS_MODAL_ADD_POINT_OPEN,
  coordType,
  ModalsActionTypes,
} from './types'

export type ModalsState = {
  isModalFilterOpen: boolean
  isModalAddPointOpen: boolean
  modalAddPointCoord: coordType | null
}

const initalState: ModalsState = {
  isModalFilterOpen: false,
  isModalAddPointOpen: false,
  modalAddPointCoord: null,
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
    default:
      return state
  }
}
