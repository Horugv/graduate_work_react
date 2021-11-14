export type CreateMarkerDataType = {
  latitude: number
  longitude: number
  name: string
  owner: string
  description?: string
}

export type EditMarkerDataType = {
  latitude?: number
  longitude?: number
  name?: string
  description?: string
}

export type MarkerType = {
  _id: string
  latitude: number
  longitude: number
  name: string
  owner: string
  description?: string
}

export type GetMarkersRequest = {
  data: {
    data: {
      markers: MarkerType[]
    }
  }
}
