import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend/backend"
import { socket } from "../../components/Dashboard/Dashboard"
import {
  IConversation,
  IConversationStore,
  ISingleUser,
} from "../../typings/conversations"
import { IMessage } from "../../typings/messages"

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
  async ({ title, description }: { title: string; description: string }) => {
    const { data }: AxiosResponse<IConversation> = await backend.post("/groups/new", {
      title,
      description,
    })
    return data
  }
)

export const invitePeople = createAsyncThunk(
  "conversations/invitePeople",
  async ({ users, groupId }: { users: string[]; groupId: string }) => {
    const { data }: AxiosResponse<string[]> = await backend.post(
      `/groups/${groupId}/invite`,
      { users }
    )
    return data
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConversations.fulfilled, (state, action) => {
        const usersArrays = action.payload.map((c) => c.users)
        const usersGroups = usersArrays.flat(2)
        const users = usersGroups.map((u) => u._id)

        const usersDict: any = {}

        users.forEach((u) => (usersDict[(u as ISingleUser)._id] = u))

        state.users = usersDict
        state.data = action.payload
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (conversation) => conversation._id === action.payload.conversationId
        )
        state.data[index].messageHistory = action.payload.data
      })
      .addCase(newGroup.fulfilled, (state, action) => {
        state.data.push(action.payload)
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
  }
}
export const selectUsers = (state: RootState) => state.conversations.users
export const selectActiveConversationId = (state: RootState) => state.conversations.active
export const selectAddGroupCanvasState = (state: RootState) =>
  state.conversations.addGroupCanvasOpen
export const selectInviteCanvasState = (state: RootState) =>
  state.conversations.inviteCanvasOpen

export const { setActive, updateMessages, toggleAddGroupCanvas, toggleInviteCanvas } =
  conversationsSlice.actions

export default conversationsSlice.reducer
