import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { io } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import {
  addGroup,
  addInvitedPeopleToDict,
  fetchUserConversations,
  updateMessages,
} from "../../redux/slices/conversationsSlice"
import { fetchUserData, selectUserData } from "../../redux/slices/userSlice"
import ChatPanel from "../ChatPanel/ChatPanel"
import Conversations from "../Conversations/Conversations"
import "./Dashboard.css"

export const socket = io(process.env.REACT_APP_BE_URL_DEV!, { transports: ["websocket"] })

const Dashboard = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserData())
    dispatch(fetchUserConversations())
  }, [])

  useEffect(() => {
    socket.on("message", ({ message, room }: any) => {
      dispatch(updateMessages({ roomId: room, message }))
    })
    socket.on("invited", ({ group, users }) => {
      dispatch(addGroup(group))
      console.log(users)
      dispatch(addInvitedPeopleToDict(users))
    })
  }, [])

  return (
    <Container fluid className="d-flex Dashboard p-0">
      <Conversations />
      <ChatPanel />
    </Container>
  )
}

export default Dashboard
