import { Form, FormControl } from "react-bootstrap"
import { MdInsertEmoticon } from "react-icons/md"
import { ImAttachment } from "react-icons/im"
import Avatar from "../Avatar/Avatar"

import "./ChatPanel.css"
import Message from "../Message/Message"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import {
  selectActiveConversation,
  selectActiveConversationId,
  selectActiveHistory,
  selectUsers,
  toggleInviteCanvas,
} from "../../redux/slices/conversationsSlice"
import { selectUserData } from "../../redux/slices/userSlice"
import { FormEvent, useState, useEffect } from "react"
import backend from "../../backend/backend"
import { socket } from "../Dashboard/Dashboard"
import { IoMdPersonAdd } from "react-icons/io"

const ChatPanel = () => {
  const [message, setMessage] = useState("")
  const { avatar, title, users, typing } = useAppSelector(selectActiveConversation)
  const conversationId = useAppSelector(selectActiveConversationId)
  const messages = useAppSelector(selectActiveHistory)
  const loggedInUser = useAppSelector(selectUserData)
  const allUsers = useAppSelector(selectUsers)
  const me = useAppSelector(selectUserData)

  const [typingUsers, setTypingUsers] = useState<string[]>([])

  useEffect(() => {
    typing && setTypingUsers(Object.keys(typing).map((id) => allUsers[id].name))
  }, [typing])

  const dispatch = useAppDispatch()

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const createdMessage = await backend.post(`/groups/${conversationId}/message`, {
        content: message,
      })
      socket.emit("newMessage", { message: createdMessage, room: conversationId })
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="ChatPanel">
      <div className="d-flex align-items-center topbar">
        {avatar && <Avatar url={avatar!} />}
        <div className="ms-3 me-auto">
          {title ? <h6>{title}</h6> : <h6>Select a conversation</h6>}
          <p className="text-muted">
            {users
              ?.map((u) => (u === me._id ? me.name : allUsers[u as string]?.name))
              .join(", ")}
          </p>
        </div>
        <IoMdPersonAdd
          size="2em"
          className="me-4"
          onClick={() => dispatch(toggleInviteCanvas())}
        />
      </div>
      <div className="messages">
        {messages?.map((message) => (
          <Message
            key={message._id}
            message={message.content}
            position={message.sender === loggedInUser._id ? "right" : "left"}
            date={new Date(message.createdAt)}
            sender={message.sender === me._id ? me.name : allUsers[message.sender].name}
          />
        ))}
      </div>
      {typingUsers.length !== 0 && (
        <div>
          <p>
            {typingUsers.length === 1
              ? typingUsers[0] + " is typing..."
              : typingUsers.join(", ") + " are typing..."}
          </p>
        </div>
      )}
      <div className="input-bar d-flex align-items-center">
        <MdInsertEmoticon />
        <ImAttachment />
        <Form className="d-flex p-2 w-100" onSubmit={handleSendMessage}>
          <FormControl
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              socket.emit("typing", conversationId)
            }}
            className="rounded-pill"
          />
        </Form>
      </div>
    </div>
  )
}

export default ChatPanel
