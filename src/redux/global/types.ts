export const SET_COUNTER = 'SET_COUNTER' 
type GlobalSetCountAction = {
  type: typeof SET_COUNTER
  payload: number
}

export type GlobalActionTypes = GlobalSetCountAction
