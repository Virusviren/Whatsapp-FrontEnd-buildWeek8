import { Form, FormControl } from "react-bootstrap"
import { MdInsertEmoticon } from "react-icons/md"
import { GrAttachment } from "react-icons/gr"
import Avatar from "../Avatar/Avatar"

import "./ChatPanel.css"

interface ChatPanelProps {
  title: string
  participants: string[]
  avatar: string
}

const ChatPanel = ({ title, participants, avatar }: ChatPanelProps) => {
  return (
    <div className="ChatPanel d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center topbar">
        <Avatar url={avatar} />
        <div>
          <h6>{title}</h6>
          <p className="text-muted">{participants.join(", ")}</p>
        </div>
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
