export type UserType = {
  name: string
  family_name: string
  username: string
  email: string
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
