import axios from 'axios'

import {
  GetUserByIdRequest,
  GetUserByEmailRequest,
  EditUserDataType,
} from './types'

const path = '/users'

export function getUsers(page = 1, query = '') {
  return axios.get(
    `${path}/?page=${page}${query ? '&' + query : ''}`
  )
}

export function getUserById(id: string): Promise<GetUserByIdRequest> {
  return axios.get(`${path}/${id}`)
}

export function getUserByEmail(email: string): Promise<GetUserByEmailRequest> {
  return axios.get(`${path}/get-user-by-email/${email}`)
}

export function editUser(id: string, data: EditUserDataType) {
  return axios.put(`${path}/${id}`, { user: { ...data } })
}

export function deletUser(id: string) {
  return axios.delete(`${path}/${id}`, { data: {} })
}
