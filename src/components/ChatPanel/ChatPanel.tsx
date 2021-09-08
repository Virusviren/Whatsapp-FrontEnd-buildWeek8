import { Form, FormControl } from "react-bootstrap"
import { MdInsertEmoticon } from "react-icons/md"
import { ImAttachment } from "react-icons/im"
import Avatar from "../Avatar/Avatar"

import "./ChatPanel.css"
import Message from "../Message/Message"
import { useAppSelector } from "../../redux/app/hooks"
import { selectActiveConversation, selectActiveHistory } from "../../redux/slices/conversationsSlice"
import { selectUserData } from "../../redux/slices/userSlice"

const ChatPanel = () => {
  const { avatar, title, users } = useAppSelector(selectActiveConversation)
  const messages = useAppSelector(selectActiveHistory)
  const loggedInUser = useAppSelector(selectUserData)
  return (
    <div className="ChatPanel">
      <div className="d-flex align-items-center topbar">
        {avatar && <Avatar url={avatar!} />}
        <div className="ms-3">
          {title ? <h6>{title}</h6> : <h6>Select a conversation</h6>}
          <p className="text-muted">{users?.join(", ")}</p>
        </div>
      </div>
      <div className="messages">
        {messages?.map(message => (
          <Message
            key={message._id}
            message={message.content}
            position={message.sender === loggedInUser._id ? "right" : "left"}
            date={new Date(message.createdAt)}
            sender={message.sender}
          />
        ))}
      </div>
      <div className="input-bar d-flex align-items-center">
        <MdInsertEmoticon />
        <ImAttachment />
        <Form className="d-flex p-2 w-100">
          <FormControl type="text" placeholder="Type a message" aria-label="Type a message" className="rounded-pill" />
        </Form>
      </div>
    </div>
  )
}

export default ChatPanel
