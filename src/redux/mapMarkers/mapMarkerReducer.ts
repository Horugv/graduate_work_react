import { MarkerType } from 'src/api/markers/types'
import {
  SET_MAP_MARKERS_IS_LOADING,
  SET_MAP_MARKERS_DATA_LIST,
  MapMarkersActionTypes,
} from './types'

export type MapMarkersState = {
  isLoading: boolean
  dataList: MarkerType[]
}

const initalState: MapMarkersState = {
  isLoading: false,
  dataList: [],
}

export const mapMarkersReducer = function (
  state = initalState,
  action: MapMarkersActionTypes
): MapMarkersState {
  switch (action.type) {
    case SET_MAP_MARKERS_IS_LOADING:
      return { ...state, isLoading: action.payload }
    case SET_MAP_MARKERS_DATA_LIST:
      return {
        ...state,
        dataList: action.payload,
      }
    default:
      return state
  }
}
