import { SET_IS_MODAL_FILTER_OPEN, SET_IS_MODAL_ADD_POINT_OPEN, modalAddPointPayloadType } from './types'

export const actions = {
  actionSetIsModalFilterOpen: (payload: boolean) => ({
    type: SET_IS_MODAL_FILTER_OPEN,
    payload,
  }),
  actionSetIsModalAddPointOpen: (payload: modalAddPointPayloadType) => ({
    type: SET_IS_MODAL_ADD_POINT_OPEN,
    payload,
  }),
}
