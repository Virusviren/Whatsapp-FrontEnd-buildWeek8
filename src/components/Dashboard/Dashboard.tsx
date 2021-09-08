import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useAppDispatch } from "../../redux/app/hooks"
import { fetchUserConversations } from "../../redux/slices/conversationsSlice"
import { fetchUserData } from "../../redux/slices/userSlice"
import ChatPanel from "../ChatPanel/ChatPanel"
import Conversations from "../Conversations/Conversations"
import "./Dashboard.css"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUserData())
    dispatch(fetchUserConversations())
  }, [])
  return (
    <Container fluid className="d-flex Dashboard p-0">
      <Conversations />
      <ChatPanel />
    </Container>
  )
}

export default Dashboard
