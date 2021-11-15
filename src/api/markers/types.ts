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

export type MarkerOwnerType = {
  _id: string
  email: string
  name: string
  family_name: string
  username: string
}

export type MarkerType = {
  _id: string
  latitude: number
  longitude: number
  name: string
  owner: MarkerOwnerType
  description?: string
}

export type GetMarkersRequest = {
  data: {
    data: {
      markers: MarkerType[]
    }
  }
}

export type MarkerMetaPagerType = {
  count: number
  total: number
  per_page: number
  page: number
  pages: number
}

export type MarkerMetaType = {
  pager: MarkerMetaPagerType
}
