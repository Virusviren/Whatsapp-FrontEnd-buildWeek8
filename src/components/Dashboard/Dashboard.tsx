import React from "react"

import { Container } from "react-bootstrap"
import ChatPanel from "../ChatPanel/ChatPanel"
import Conversations from "../Conversations/Conversations"
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <Container fluid className="d-flex Dashboard p-0">
      <Conversations />
      <ChatPanel
        title="Group Name"
        avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!}
        participants={["Tiago", "Viljams", "Nando", "Viren"]}
      />
    </Container>
  )
}

export default Dashboard
