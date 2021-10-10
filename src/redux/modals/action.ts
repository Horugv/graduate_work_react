import { SET_IS_MODAL_FILTER_OPEN } from './types'

export const actions = {
  actionSetIsModalFilterOpen: (payload: boolean) => ({
    type: SET_IS_MODAL_FILTER_OPEN,
    payload,
  }),
}
