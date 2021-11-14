import { MarkerType } from 'src/api/markers/types'

export const SET_MAP_MARKERS_IS_LOADING = 'SET_MAP_MARKERS_IS_LOADING'
type mapMarkersIsLoading = {
  type: typeof SET_MAP_MARKERS_IS_LOADING
  payload: boolean
}

export const SET_MAP_MARKERS_DATA_LIST = 'SET_MAP_MARKERS_DATA_LIST'
type mapMarkersSetDataList = {
  type: typeof SET_MAP_MARKERS_DATA_LIST
  payload: MarkerType[]
}

export type MapMarkersActionTypes = mapMarkersIsLoading | mapMarkersSetDataList

