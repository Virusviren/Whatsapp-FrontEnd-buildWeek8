import { Form, FormControl } from "react-bootstrap"
import { MdInsertEmoticon } from "react-icons/md"
import { GrAttachment } from "react-icons/gr"
import Avatar from "../Avatar/Avatar"

import "./ChatPanel.css"
import Message from "../Message/Message"

interface ChatPanelProps {
  title: string
  participants: string[]
  avatar: string
}

const ChatPanel = ({ title, participants, avatar }: ChatPanelProps) => {
  return (
    <div className="ChatPanel">
      <div className="d-flex align-items-center topbar">
        <Avatar url={avatar} />
        <div className="ms-3">
          <h6>{title}</h6>
          <p className="text-muted">{participants.join(", ")}</p>
        </div>
      </div>
      <div className="messages">
        <Message
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          position="right"
          date={new Date()}
          sender="Tiago"
        />
        <Message
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          position="left"
          date={new Date()}
          sender="Viljams"
        />
        <Message
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          position="left"
          date={new Date()}
          sender="Nando"
        />
        <Message
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          position="left"
          date={new Date()}
          sender="Viren"
        />
        <Message
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          position="right"
          date={new Date()}
          sender="Tiago"
        />
        <Message
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          position="right"
          date={new Date()}
          sender="Tiago"
        />
      </div>
      <div className="input-bar d-flex align-items-center">
        <MdInsertEmoticon />
        <GrAttachment />
        <Form className="d-flex p-2 w-100">
          <FormControl type="text" placeholder="Type a message" aria-label="Type a message" className="rounded-pill" />
        </Form>
      </div>
    </div>
  )
}

export default ChatPanel
