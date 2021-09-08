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
      _id: string
      role: string
      banned: boolean
    }
  ]
  closed?: boolean
  groupType: string
}

export interface IConversationStore {
  data: IConversation[]
  active: string
}

// export interface IActiveConversationStore {
//   data: IConversation | null
// }
