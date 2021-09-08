import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend/backend"
import { IUser, IUserStore } from "../../typings/users"
import { RootState } from "../app/store"

const initialState: IUserStore = {
  data: {
    _id: "",
    name: "",
    surname: "",
    email: "",
    groups: [],
    avatar: "",
    bio: "",
    status: "",
  },
}

export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
  const { data }: AxiosResponse<IUser> = await backend.get("/users/me")
  return data
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export const selectUserData = (state: RootState) => state.user.data

export default userSlice.reducer
