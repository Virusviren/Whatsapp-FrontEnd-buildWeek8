import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend/backend"
import { socket } from "../../components/Dashboard/Dashboard"
import { IConversation, IConversationStore } from "../../typings/conversations"
import { IMessage } from "../../typings/messages"
import { IUser } from "../../typings/users"

import { RootState } from "../app/store"

const initialState: IConversationStore = {
  data: [],
  users: {},
  active: "",
  addGroupCanvasOpen: false,
  inviteCanvasOpen: false,
}

export const fetchUserConversations = createAsyncThunk(
  "conversations/fetchUserConversations",
  async () => {
    const { data }: AxiosResponse<IConversation[]> = await backend.get("/users/me/chats")

    socket.emit(
      "joinGroups",
      data.map((group) => group._id)
    )
    return data
  }
)

export const fetchHistory = createAsyncThunk(
  "conversations/fetchHistory",
  async (conversationId: string) => {
    const { data }: AxiosResponse<IMessage[]> = await backend.get(
      `groups/${conversationId}/history`
    )
    return { conversationId, data }
  }
)

export const newGroup = createAsyncThunk(
  "conversations/newGroup",
  async (payload: any) => {
    const { data }: AxiosResponse<IConversation> = await backend.post(
      "/groups/new",
      payload
    )
    return data
  }
)

export const newPrivateGroup = createAsyncThunk(
  "conversations/newPrivateGroup",
  async (payload: any) => {
    const { data }: AxiosResponse<IConversation> = await backend.post("/groups/new", {
      user: payload.user,
    })
    return { data, me: payload.me }
  }
)

export const invitePeople = createAsyncThunk(
  "conversations/invitePeople",
  async ({
    users,
    groupId,
    myId,
  }: {
    users: { [key: string]: IUser }
    groupId: string
    myId: string
  }) => {
    const { data }: AxiosResponse<{ addedUsers: string[]; updatedGroup: IConversation }> =
      await backend.post(`/groups/${groupId}/invite`, {
        ids: Object.keys(users),
      })

    const addedUsersDict = users
    for (const user of data.addedUsers) {
      if (!(user in users)) {
        delete addedUsersDict[user]
      }
    }
    socket.emit("invitedPeople", {
      users: addedUsersDict,
      group: data.updatedGroup,
      myId,
    })
    return { groupId, users: data.addedUsers }
  }
)

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload
    },
    updateMessages: (state, action) => {
      const roomIndex = state.data.findIndex((room) => room._id === action.payload.roomId)
      state.data[roomIndex].messageHistory.push(action.payload.message)
    },
    toggleAddGroupCanvas: (state) => {
      state.addGroupCanvasOpen = !state.addGroupCanvasOpen
    },
    toggleInviteCanvas: (state) => {
      state.inviteCanvasOpen = !state.inviteCanvasOpen
    },
    addGroup: (state, action) => {
      state.data.push(action.payload)
    },
    addInvitedPeopleToDict: (state, action) => {
      for (const id in action.payload) {
        state.users[id] = action.payload[id]
      }
    },
    setUserTyping: (state, action) => {
      const groupIndex = state.data.findIndex(
        (group) => group._id === action.payload.groupId
      )
      if (!state.data[groupIndex]?.typing) {
        state.data[groupIndex].typing = {}
      }

      state.data[groupIndex].typing![action.payload.userId] = action.payload.date
    },
    removeUserTyping: (state, action) => {
      const groupIndex = state.data.findIndex(
        (group) => group._id === action.payload.groupId
      )
      if (state.data[groupIndex].typing![action.payload.userId] === action.payload.date) {
        delete state.data[groupIndex].typing![action.payload.userId]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConversations.fulfilled, (state, action) => {
        const usersArrays = action.payload.map((c) => c.users)
        const usersGroups = usersArrays.flat(2)
        const users = usersGroups.map((u) => u._id)

        const usersDict: any = {}

        users.forEach((u) => (usersDict[(u as IUser)._id] = u))

        const newConversations = action.payload.map((c) => {
          const newUsers = c.users.map((u) => {
            return { ...u, _id: (u._id as IUser)._id }
          })
          return { ...c, users: newUsers }
        })

        state.users = usersDict
        state.data = newConversations as any
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (conversation) => conversation._id === action.payload.conversationId
        )
        state.data[index].messageHistory = action.payload.data
      })
      .addCase(newGroup.fulfilled, (state, action) => {
        socket.emit("createdGroup", action.payload._id)
        state.data.push(action.payload)
      })
      .addCase(invitePeople.fulfilled, (state, action) => {
        const groupIndex = state.data.findIndex(
          (group) => group._id === action.payload.groupId
        )
        const users = action.payload.users.map((id: any) => {
          return { _id: id, role: "GUEST", banned: false }
        })
        state.data[groupIndex].users.push(...(users as any))
      })
      .addCase(newPrivateGroup.fulfilled, (state, action) => {
        socket.emit("createdGroup", action.payload.data._id)
        const addedUsers: { [key: string]: IUser } = {}
        action.payload.data.users.forEach(
          (u) => (addedUsers[u._id as string] = state.users[u._id as string])
        )
        addedUsers[action.payload.me._id] = action.payload.me
        socket.emit("inviteToPrivate", {
          users: addedUsers,
          group: action.payload.data,
          myId: action.payload.me._id,
        })
        state.data.push(action.payload.data)
      })
  },
})

export const selectConversationsData = (state: RootState) => state.conversations.data
export const selectActiveHistory = (state: RootState) => {
  const active = state.conversations.data.find(
    (conversation) => conversation._id === state.conversations.active
  )
  return active?.messageHistory
}
export const selectActiveConversation = (state: RootState) => {
  const active = state.conversations.data.find(
    (conversation) => conversation._id === state.conversations.active
  )
  return {
    title: active?.title,
    avatar: active?.avatar,
    users: active?.users.map((user) => user._id),
    typing: active?.typing,
  }
}
export const selectUsers = (state: RootState) => state.conversations.users
export const selectActiveConversationId = (state: RootState) => state.conversations.active
export const selectAddGroupCanvasState = (state: RootState) =>
  state.conversations.addGroupCanvasOpen
export const selectInviteCanvasState = (state: RootState) =>
  state.conversations.inviteCanvasOpen

export const {
  setActive,
  updateMessages,
  toggleAddGroupCanvas,
  toggleInviteCanvas,
  addGroup,
  addInvitedPeopleToDict,
  setUserTyping,
  removeUserTyping,
} = conversationsSlice.actions

export default conversationsSlice.reducer
