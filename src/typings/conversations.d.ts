import { IMessage } from "./messages"

export interface IConversation {
  _id: string
  title: string
  messageHistory: IMessage[]
  avatar: string
  description?: string
  background?: string
  users: [
    {
      _id: string | ISingleUser
      role: string
      banned: boolean
    }
  ]
  closed?: boolean
  groupType: string
}

export interface ISingleUser {
  _id: string
  name: string
  surname: string
  email: string
  avatar: string
}

export interface IConversationStore {
  data: IConversation[]
  active: string
  users: {
    [key: string]: ISingleUser
  }
  addGroupCanvasOpen: boolean
  inviteCanvasOpen: boolean
}
