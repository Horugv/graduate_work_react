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

export type ModalsActionTypes = IsModalFilterOpen | IsModalAddPointOpen
