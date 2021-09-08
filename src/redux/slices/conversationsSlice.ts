import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend/backend"
import { IConversation, IConversationStore } from "../../typings/conversations"
import { IMessage } from "../../typings/messages"

import { RootState } from "../app/store"

const initialState: IConversationStore = {
  data: [],
  active: "",
}

export const fetchUserConversations = createAsyncThunk("conversations/fetchUserConversations", async () => {
  const { data }: AxiosResponse<IConversation[]> = await backend.get("/users/me/chats")
  return data
})

export const fetchHistory = createAsyncThunk("conversations/fetchHistory", async (conversationId: string) => {
  const { data }: AxiosResponse<IMessage[]> = await backend.get(`groups/${conversationId}/history`)
  return { conversationId, data }
})

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserConversations.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        const index = state.data.findIndex(conversation => conversation._id === action.payload.conversationId)
        state.data[index].messageHistory = action.payload.data
      })
  },
})

export const selectConversationsData = (state: RootState) => state.conversations.data
export const selectActiveHistory = (state: RootState) => {
  const active = state.conversations.data.find(conversation => conversation._id === state.conversations.active)
  return active?.messageHistory
}
export const selectActiveConversation = (state: RootState) => {
  const active = state.conversations.data.find(conversation => conversation._id === state.conversations.active)
  return { title: active?.title, avatar: active?.avatar, users: active?.users.map(user => user._id) }
}
export const { setActive } = conversationsSlice.actions
export default conversationsSlice.reducer
