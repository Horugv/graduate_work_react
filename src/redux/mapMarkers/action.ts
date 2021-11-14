import { Dispatch } from 'redux'

import { MarkerType } from 'src/api/markers/types'
import {
  SET_MAP_MARKERS_IS_LOADING,
  SET_MAP_MARKERS_DATA_LIST,
} from './types'
import { getAllMarkers } from 'src/api/markers'

export const actions = {
  actionSetIsLoading: (payload: boolean) => ({
    type: SET_MAP_MARKERS_IS_LOADING,
    payload,
  }),
  actionSetDataList: (payload: MarkerType[] | null) => ({
    type: SET_MAP_MARKERS_DATA_LIST,
    payload,
  }),
  actionGetDataList: () => async (dispatch: Dispatch) => {
    dispatch(actions.actionSetIsLoading(true))
    await getAllMarkers()
      .then((res) => {
        dispatch(actions.actionSetDataList(res?.data?.data?.markers || null))
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(actions.actionSetIsLoading(false)))
  },
}
