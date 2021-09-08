export interface IUser {
  name: string
  surname: string
  email: string
  groups: string[]
  avatar?: string
  bio?: string
  status?: string
  _id: string
}

export interface IUserStore {
  data: IUser
}
