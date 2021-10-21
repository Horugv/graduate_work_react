import {
  SET_COUNTER,
  SET_IS_ADD_POINT_SHOW_ACTION,
  GlobalActionTypes,
} from './types'

export type GlobalState = {
  count: number
  isAddPointShow: boolean
}

const initalState: GlobalState = {
  count: 0,
  isAddPointShow: false,
}

export const globalReducer = function (
  state = initalState,
  action: GlobalActionTypes
): GlobalState {
  switch (action.type) {
    case SET_COUNTER:
      return { ...state, count: action.payload }
    case SET_IS_ADD_POINT_SHOW_ACTION:
      return { ...state, isAddPointShow: action.payload }
    default:
      return state
  }
}
