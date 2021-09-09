import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { io } from "socket.io-client"
import { useAppDispatch } from "../../redux/app/hooks"
import {
  fetchUserConversations,
  updateMessages,
} from "../../redux/slices/conversationsSlice"
import { fetchUserData } from "../../redux/slices/userSlice"
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
  }, [])

  return (
    <Container fluid className="d-flex Dashboard p-0">
      <Conversations />
      <ChatPanel />
    </Container>
  )
}

export default Dashboard
