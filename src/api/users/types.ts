import { MarkerType } from 'src/api/markers/types'

export type UserType = {
  _id: string
  name: string
  family_name: string
  username: string
  email: string
  markers: MarkerType[]
}

export type GetUserByIdRequest = {
  data: {
    user: UserType
  }
}
export type GetUserByEmailRequest = {
  data: {
    user: UserType
  }
}

export type EditUserDataType = {
  name: string
  family_name: string
  username: string
  email: string
}

export type UserMetaPagerType = {
  count: number
  total: number
  per_page: number
  page: number
  pages: number
}

export type UserMetaType = {
  pager: UserMetaPagerType
}
