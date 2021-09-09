import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend/backend"
import { socket } from "../../components/Dashboard/Dashboard"
import { IUser, IUserStore } from "../../typings/users"
import { RootState } from "../app/store"

const initialState: IUserStore = {
  data: {
    _id: "",
    name: "",
    surname: "",
    email: "",
    avatar: "",
    bio: "",
    status: "",
  },
  profileCanvasOpen: false,
}

export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
  const { data }: AxiosResponse<IUser> = await backend.get("/users/me")
  socket.emit("setId", data._id)
  return data
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleCanvas: (state) => {
      state.profileCanvasOpen = !state.profileCanvasOpen
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export const selectUserData = (state: RootState) => state.user.data
export const selectCanvasStatus = (state: RootState) => state.user.profileCanvasOpen

export const { toggleCanvas } = userSlice.actions

export default userSlice.reducer
