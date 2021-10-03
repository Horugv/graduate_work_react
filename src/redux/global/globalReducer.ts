import { SET_COUNTER, GlobalActionTypes } from './types'

export type GlobalState = {
  count: number
}

const initalState: GlobalState = {
  count: 0,
}

export const globalReducer = function (
  state = initalState,
  action: GlobalActionTypes
): GlobalState {
  switch (action.type) {
    case SET_COUNTER:
      return { ...state, count: action.payload }
    default:
      return state
  }
}
