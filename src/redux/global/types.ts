export const SET_COUNTER = 'SET_COUNTER' 
type GlobalSetCountAction = {
  type: typeof SET_COUNTER
  payload: number
}

export const SET_IS_ADD_POINT_SHOW_ACTION = 'SET_IS_ADD_POINT_SHOW_ACTION' 
type GlobalSetIsAddPointShowAction = {
  type: typeof SET_IS_ADD_POINT_SHOW_ACTION
  payload: boolean
}

export type GlobalActionTypes = GlobalSetCountAction | GlobalSetIsAddPointShowAction
