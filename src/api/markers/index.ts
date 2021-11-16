import axios from 'axios'

import {
  CreateMarkerDataType,
  EditMarkerDataType,
  GetMarkersRequest,
  GetMarkerByIdRequest,
} from './types'

const path = '/markers'

export function getMarkers(page = 1, query = '') {
  return axios.get(
    `${path}/get-markers?page=${page}${query ? '&' + query : ''}`
  )
}

export function getAllMarkers(): Promise<GetMarkersRequest> {
  return axios.get(`${path}/get-all-markers`)
}

export function getMarkerById(id: string): Promise<GetMarkerByIdRequest> {
  return axios.get(`${path}/get-marker/${id}`)
}

export function createMarker(data: CreateMarkerDataType) {
  return axios.post(`${path}/create-marker`, data)
}

export function editMarker(id: string, data: EditMarkerDataType) {
  return axios.put(`${path}/edit-marker/${id}`, data)
}

export function deletMarker(id: string) {
  return axios.delete(`${path}/delete-marker/${id}`, { data: {} })
}
