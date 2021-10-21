import { Dispatch } from 'redux'

import { SET_COUNTER, SET_IS_ADD_POINT_SHOW_ACTION } from './types'
import { IRootState } from '../store'

export const actions = {
  actionSetCounter: (payload: number) => ({
    type: SET_COUNTER,
    payload,
  }),
  actionIncrement: () => (dispatch: Dispatch, getState: () => IRootState) => {
    const { count } = getState().global
    dispatch(actions.actionSetCounter(count + 1))
  },
  actionDecrement: () => (dispatch: Dispatch, getState: () => IRootState) => {
    const { count } = getState().global
    dispatch(actions.actionSetCounter(count - 1))
  },
  actionSetIsAddPointShowAction: (payload: boolean) => ({
    type: SET_IS_ADD_POINT_SHOW_ACTION,
    payload,
  }),
}
